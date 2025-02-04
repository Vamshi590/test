import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Redis } from '@upstash/redis/cloudflare';
const questions = new Hono();
questions.post("/ask-question/:id", async (c) => {
    const body = await c.req.json();
    const params = c.req.param();
    const userid = parseInt(params.id);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const question = await prisma.$transaction(async (tx) => {
            const newQuestion = await tx.questions.create({
                data: {
                    userId: userid,
                    question: body.title,
                    question_description: body.description,
                    anonymous: body.anonymous,
                    urgency: body.urgency,
                    questionReferences: {
                        create: body.referenceTags.map((ref) => ({ reference: ref })),
                    },
                    // Create multiple image links
                    question_image_links: body.imageUrls?.length ? {
                        create: body.imageUrls.map((url) => ({
                            question_image_link: url
                        }))
                    } : undefined
                },
                include: {
                    question_image_links: true,
                    questionReferences: true
                }
            });
            return newQuestion;
        }, {
            timeout: 10000
        });
        return c.json({
            status: "success",
            data: question
        });
    }
    catch (e) {
        console.error(e);
        return c.json({
            status: "error",
            message: "Failed to create question"
        }, 500);
    }
});
questions.get("/:id", async (c) => {
    const params = c.req.param();
    const userId = parseInt(params.id);
    // Initialize Redis
    const redis = Redis.fromEnv(c.env);
    try {
        // Try to get cached questions
        const cacheKey = `questions:${userId}`;
        const cachedQuestions = await redis.get(cacheKey);
        if (cachedQuestions) {
            return c.json({
                status: "success",
                data: cachedQuestions,
                source: "cache"
            });
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        // Get user and questions in parallel
        const [user, allQuestions] = await Promise.all([
            prisma.user.findUnique({
                where: { id: userId },
                select: {
                    city: true,
                    department: true,
                    organisation_name: true,
                    memberships: true
                }
            }),
            prisma.questions.findMany({
                where: {
                    userId: { not: userId }
                },
                include: {
                    answers: true,
                    User: {
                        select: {
                            name: true,
                            organisation_name: true,
                            city: true,
                            department: true,
                            memberships: true
                        }
                    },
                    question_image_links: true
                },
                orderBy: [
                    { urgency: 'desc' },
                    { asked_at: 'desc' }
                ],
                take: 100 // Limit initial fetch
            })
        ]);
        if (!user) {
            return c.json({ status: "error", message: "User not found" }, 404);
        }
        // Sort questions by relevance in memory
        const sortedQuestions = allQuestions.sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;
            // Score based on urgency
            const urgencyScore = { HIGH: 30, MEDIUM: 20, LOW: 10 };
            scoreA += urgencyScore[a.urgency] || 0;
            scoreB += urgencyScore[b.urgency] || 0;
            // Score based on user attributes
            if (a.User?.city === user.city && a.User?.department === user.department)
                scoreA += 20;
            if (b.User?.city === user.city && b.User?.department === user.department)
                scoreB += 20;
            if (a.User?.organisation_name === user.organisation_name && a.User?.department === user.department)
                scoreA += 15;
            if (b.User?.organisation_name === user.organisation_name && b.User?.department === user.department)
                scoreB += 15;
            // Score based on memberships
            const userSocieties = new Set(user.memberships.map(m => m.societyname).filter(Boolean));
            if (userSocieties.size > 0) {
                if (a.User?.memberships?.some(m => userSocieties.has(m.societyname)))
                    scoreA += 10;
                if (b.User?.memberships?.some(m => userSocieties.has(m.societyname)))
                    scoreB += 10;
            }
            // If scores are equal, sort by date
            if (scoreB === scoreA) {
                return new Date(b.asked_at).getTime() - new Date(a.asked_at).getTime();
            }
            return scoreB - scoreA;
        });
        const finalQuestions = sortedQuestions.slice(0, 50);
        // Cache the results
        await redis.set(cacheKey, finalQuestions, { ex: 300 });
        return c.json({
            status: "success",
            data: finalQuestions,
            source: "database"
        });
    }
    catch (e) {
        console.error(e);
        return c.json({
            status: "error",
            message: "Failed to fetch questions"
        }, 500);
    }
});
// Add cache invalidation endpoint
questions.post("/invalidate-cache/:id", async (c) => {
    const params = c.req.param();
    const userId = parseInt(params.id);
    const redis = Redis.fromEnv(c.env);
    try {
        await redis.del(`questions:${userId}`);
        return c.json({
            status: "success",
            message: "Questions cache invalidated"
        });
    }
    catch (e) {
        console.error(e);
        return c.json({
            status: "error",
            message: "Failed to invalidate questions cache"
        }, 500);
    }
});
export default questions;
