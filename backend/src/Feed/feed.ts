import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Redis } from '@upstash/redis/cloudflare';

const feed = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
  };
}>();

feed.get("/:id", async (c) => {
    const params = c.req.param();
    const userid = parseInt(params.id);
    const redis = Redis.fromEnv(c.env);

    try {
        const cacheKey = `feed:${userid}`;
        const cachedFeed = await redis.get(cacheKey);
        
        if (cachedFeed) {
            return c.json({
                status: "success",
                data: cachedFeed,
                source: "cache"
            });
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        // Parallel fetch all required data
        const [user, allContent, connections] = await Promise.all([
            // Get user details
            prisma.user.findUnique({
                where: { id: userid },
                select: {
                    city: true,
                    department: true,
                    organisation_name: true,
                    memberships: true,
                    name: true
                }
            }),
            // Get combined posts and questions
            prisma.$transaction([
                prisma.posts.findMany({
                    where: { userId: { not: userid } },
                    include: {
                        User: {
                            select: {
                                name: true,
                                organisation_name: true,
                                city: true,
                                department: true,
                                profile_picture: true,
                                memberships: true
                            }
                        },
                        postImageLinks: true,
                        _count: {
                            select: {
                                likes: true,
                                comments: true,
                                shares: true
                            }
                        }
                    },
                    orderBy: { posted_at: 'desc' },
                    take: 100
                }),
                prisma.questions.findMany({
                    where: { userId: { not: userid } },
                    include: {
                        answers: true,
                        User: {
                            select: {
                                name: true,
                                organisation_name: true,
                                city: true,
                                department: true,
                                profile_picture: true,
                                memberships: true
                            }
                        },
                        question_image_links: true,
                        _count: {
                            select: {
                                answers: true
                            }
                        }
                    },
                    orderBy: [
                        { urgency: 'desc' },
                        { asked_at: 'desc' }
                    ],
                    take: 100
                })
            ]),
            // Get user connections
            prisma.follow.findMany({
                where: {
                    OR: [
                        { followerId: userid },
                        { followingId: userid }
                    ]
                }
            })
        ]);

        if (!user) {
            return c.json({ status: "error", message: "User not found" }, 404);
        }

        const [posts, questions] = allContent;
        const connectionIds = new Set([
            ...connections.map(c => c.followerId),
            ...connections.map(c => c.followingId)
        ].filter(id => id !== userid));

        // Calculate content scores
        const calculateScore = (item: any) => {
            let score = 0;
            const itemUser = item.User;
            const engagement = item._count;

            // Connection score (highest priority)
            if (connectionIds.has(item.userId)) score += 50;

            // Engagement score
            score += (engagement.likes || 0) * 2;
            score += (engagement.comments || engagement.answers || 0) * 3;
            score += (engagement.shares || 0) * 4;

            // Location and department match
            if (itemUser?.city === user.city) score += 20;
            if (itemUser?.department === user.department) score += 30;
            
            // Organization match
            if (itemUser?.organisation_name === user.organisation_name) score += 25;

            // Membership match
            const userSocieties = new Set(user.memberships
                .map(m => m.societyname)
                .filter((name): name is string => name !== null));

            if (userSocieties.size > 0 && itemUser?.memberships?.some((m: { societyname: string | "" }) => 
                userSocieties.has(m.societyname))) score += 15;

            // Urgency score for questions
            if ('urgency' in item) {
                const urgencyScore = { HIGH: 15, MEDIUM: 10, LOW: 5 };
                score += urgencyScore[item.urgency as keyof typeof urgencyScore] || 0;
            }

            // Recency score (decay factor)
            const ageInHours = (Date.now() - new Date(item.posted_at || item.asked_at || Date.now()).getTime()) / (1000 * 60 * 60);
            score *= Math.exp(-ageInHours / 168); // Week decay


            return score;
        };

        // Score and combine all content
        const scoredContent = [...posts, ...questions]
            .map(item => ({
                item,
                score: calculateScore(item),
                type: 'posted_at' in item ? 'post' : 'question'
            }))
            .sort((a, b) => b.score - a.score);


        // Get recommended users
        const recommendedUsers = await prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: userid } },
                    { id: { notIn: Array.from(connectionIds) } },
                    {
                        OR: [
                            { department: user.department },
                            { city: user.city },
                            { organisation_name: user.organisation_name },
                            {
                                memberships: {
                                    some: {
                                        societyname: {
                                            in: user.memberships
                                                .map(m => m.societyname)
                                                .filter((name): name is string => name !== null)
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                organisation_name: true,
                city: true,
                department: true,
                profile_picture: true
            },
            take: 5
        });

        // Remove pagination and return all content
        const result = {
            data: scoredContent.map(({ item }) => item),
            recommendedUsers,
            userDetails: {
                name: user.name,
                city: user.city,
                department: user.department,
                organisation_name: user.organisation_name
            }
        };

        // Cache results
        await redis.set(cacheKey, result, { ex: 300 });

        return c.json({
            status: "success",
            ...result,
            source: "database"
        });

    } catch(e) {
        console.error(e);
        return c.json({status: "error", message: "Failed to get feed"}, 500);
    }
});

// Add a cache invalidation endpoint
feed.post("/invalidate-cache/:id", async (c) => {
    const params = c.req.param();
    const userid = parseInt(params.id);

    const redis = new Redis({
        url: c.env.UPSTASH_REDIS_REST_URL,
        token: c.env.UPSTASH_REDIS_REST_TOKEN,
    });

    try {
        await redis.del(`feed:${userid}`);
        return c.json({ status: "success", message: "Cache invalidated" });
    } catch (e) {
        console.error(e);
        return c.json({ status: "error", message: "Failed to invalidate cache" }, 500);
    }
});

export default feed;