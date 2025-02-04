import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from "@prisma/client";
import { Redis } from '@upstash/redis';

const prisma = new PrismaClient();
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// CORS configuration
const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Requested-With',
    'Content-Type': 'application/json',
};

// Helper function to wrap responses with CORS headers
const createResponse = (statusCode: number, body: any): APIGatewayProxyResult => {
    return {
        statusCode,
        headers: corsHeaders,
        body: JSON.stringify(body)
    };
};

export const getFeed: APIGatewayProxyHandler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return createResponse(204, {});
    }

    try {
        const userid = parseInt(event.pathParameters?.id || '0');
        if (!userid) {
            return createResponse(400, { 
                status: "error", 
                message: "Invalid user ID" 
            });
        }

        // Get page number from query parameters, default to 1
        const page = parseInt(event.queryStringParameters?.page || '1');
        const pageSize = 7; // Items per page

        // Cache key includes pagination
        const cacheKey = `feed:${userid}:page:${page}`;
        const cachedFeed = await redis.get(cacheKey);
        
        if (cachedFeed) {
            return createResponse(200, {
                status: "success",
                data: cachedFeed,
                source: "cache"
            });
        }

        // Get user and their connections first
        const [user, connections] = await Promise.all([
            prisma.user.findUnique({
                where: { id: userid },
                select: {
                    city: true,
                    department: true,
                    organisation_name: true,
                    memberships: {
                        select: {
                            societyname: true
                        }
                    }
                }
            }),
            prisma.follow.findMany({
                where: {
                    OR: [
                        { followerId: userid },
                        { followingId: userid }
                    ]
                },
                select: {
                    followerId: true,
                    followingId: true
                }
            })
        ]);

        if (!user) {
            return createResponse(404, {
                status: "error",
                message: "User not found"
            });
        }

        // Pre-compute connection IDs set for faster lookups
        const connectionIds = new Set([
            ...connections.map(c => c.followerId),
            ...connections.map(c => c.followingId)
        ].filter(id => id !== userid));

        // Pre-compute user societies set for faster lookups
        const userSocieties = new Set(user.memberships
            .map(m => m.societyname)
            .filter((name): name is string => name !== null));

        // Fetch limited content with pagination
        const [posts, questions] = await Promise.all([
            prisma.posts.findMany({
                where: { userId: { not: userid } },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    posted_at: true,
                    userId: true,
                    postImageLinks: {
                        select: {
                            postImageLink: true
                        }
                    },
                    User: {
                        select: {
                            name: true,
                            organisation_name: true,
                            city: true,
                            department: true,
                            profile_picture: true,
                            memberships: {
                                select: {
                                    societyname: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                            shares: true
                        }
                    }
                },
                orderBy: {
                    posted_at: 'desc'
                },
                take: pageSize * 2 // Fetch slightly more for scoring
            }),
            prisma.questions.findMany({
                where: { userId: { not: userid } },
                select: {
                    id: true,
                    question: true,
                    question_description: true,
                    asked_at: true,
                    userId: true,
                    question_image_links: true,
                    User: {
                        select: {
                            name: true,
                            organisation_name: true,
                            city: true,
                            department: true,
                            profile_picture: true,
                            memberships: {
                                select: {
                                    societyname: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            questionLikes: true,
                            answers: true,
                            questionComments: true
                        }
                    }
                },
                orderBy: {
                    asked_at: 'desc'
                },
                take: pageSize * 2 // Fetch slightly more for scoring
            })
        ]);

        // Optimized score calculation
        const calculateScore = (item: any): number => {
            let score = 0;
            const itemUser = item.User;
            const engagement = item._count;

            // Connection score
            if (connectionIds.has(item.userId)) {
                score += 50;
            }
            
            // Engagement score
            if ('likes' in engagement) {
                score += engagement.likes * 2 + 
                        engagement.comments * 3 + 
                        engagement.shares * 4;
            } else {
                score += engagement.questionLikes * 2 + 
                        engagement.answers * 3 + 
                        engagement.questionComments * 4;
            }

            // Location and department matching
            if (itemUser?.city === user.city) score += 20;
            if (itemUser?.department === user.department) score += 30;
            if (itemUser?.organisation_name === user.organisation_name) score += 25;

            // Society matching - only if user has societies
            if (userSocieties.size > 0 && 
                itemUser?.memberships?.some((m: { societyname: string }) => m.societyname && userSocieties.has(m.societyname))) {
                score += 40;
            }

            return score;
        };

        // Score and combine content
        const scoredContent = [
            ...posts.map(post => ({
                ...post,
                type: 'post',
                score: calculateScore(post)
            })),
            ...questions.map(question => ({
                ...question,
                type: 'question',
                score: calculateScore(question)
            }))
        ]
        .sort((a, b) => b.score - a.score)
        .slice((page - 1) * pageSize, page * pageSize);

        const response = {
            items: scoredContent,
            page,
            pageSize,
            hasMore: posts.length === pageSize * 2 || questions.length === pageSize * 2
        };

        // Cache for 10 minutes since feed content changes frequently
        await redis.set(cacheKey, response, { ex: 600 });

        return createResponse(200, {
            status: "success",
            data: response,
            source: "database"
        });

    } catch (error) {
        console.error('Error in getFeed:', error);
        return createResponse(500, {
            status: "error",
            message: "Internal server error"
        });
    }
};

export const invalidateCache: APIGatewayProxyHandler = async (event) => {
    // Handle OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
        return createResponse(200, {});
    }

    try {
        const userid = parseInt(event.pathParameters?.id || '0');
        if (!userid) {
            return createResponse(400, {
                status: "error",
                message: "Invalid user ID"
            });
        }

        await redis.del(`feed:${userid}`);
        return createResponse(200, {
            status: "success",
            message: "Cache invalidated"
        });

    } catch (e) {
        console.error(e);
        return createResponse(500, {
            status: "error",
            message: "Failed to invalidate cache"
        });
    }
};
