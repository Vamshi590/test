import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from "@prisma/client";
import { Redis } from '@upstash/redis';
import { z } from "zod";

// Initialize Prisma Client
const prisma = new PrismaClient();
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// CORS configuration
const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
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

// Schema validation
const askQuestionSchema = z.object({
    title: z.string().min(1, "Question title is required"),
    description: z.string().min(1, "Question description is required"),
    anonymous: z.boolean(),
    urgency: z.boolean(),
    imageUrls: z.array(z.string()).optional()
});

// Create question handler
export const createQuestion: APIGatewayProxyHandler = async (event) => {
    // Handle OPTIONS request for CORS
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

        const body = JSON.parse(event.body || '{}');
        const validation = askQuestionSchema.safeParse(body);

        if (!validation.success) {
            return createResponse(400, {
                message: "Validation failed",
                errors: validation.error.errors
            });
        }

        const question = await prisma.questions.create({
            data: {
                userId: userid,
                question: body.title,
                question_description: body.description,
                anonymous: body.anonymous,
                urgency: body.urgency,
                question_image_links: body.imageUrls?.length ? {
                    create: body.imageUrls.map((url: string) => ({
                        question_image_link: url
                    }))
                } : undefined
            },
            include: {
                question_image_links: true,
                questionReferences: true
            }
        });

        return createResponse(201, {
            status: "success",
            data: question
        });
    } catch (error) {
        console.error('Error in createQuestion:', error);
        return createResponse(500, {
            status: "error",
            message: "Failed to create question"
        });
    }
};

// Get questions handler
export const getQuestions: APIGatewayProxyHandler = async (event) => {
    // Handle OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
        return createResponse(204, {});
    }

    try {
        const userid = parseInt(event.pathParameters?.id || '0');
        const page = parseInt(event.queryStringParameters?.page || '1');
        const pageSize = 7; // Match the feed page size

        if (!userid) {
            return createResponse(400, {
                status: "error",
                message: "Invalid user ID"
            });
        }

        const cacheKey = `questions:${userid}:page:${page}`;
        const cachedQuestions = await redis.get(cacheKey);
        
        if (cachedQuestions) {
            return createResponse(200, {
                status: "success",
                data: {
                    items: cachedQuestions,
                    page,
                    hasMore: (cachedQuestions as any[]).length === pageSize
                },
                source: "cache"
            });
        }

        const skip = (page - 1) * pageSize;

        const [user, totalQuestions] = await Promise.all([
            prisma.user.findUnique({
                where: { id: userid },
                select: {
                    city: true,
                    department: true,
                    organisation_name: true,
                    memberships: true
                }
            }),
            prisma.questions.count({
                where: {
                    userId: { not: userid }
                }
            })
        ]);

        if (!user) {
            return createResponse(404, {
                status: "error",
                message: "User not found"
            });
        }

        // Get user societies for matching
        const userSocieties = new Set(user.memberships.map(m => m.societyname).filter(Boolean));

        // Fetch questions with pagination
        const questions = await prisma.questions.findMany({
            where: {
                userId: { not: userid }
            },
            include: {
                answers: {
                    select: {
                        id: true,
                        answer_description: true,
                        questionsId: true,
                        answered_user_id : true,
                    }
                },
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
            take: pageSize + 1, // Fetch one extra to determine if there are more items
            skip
        });

        const hasMore = questions.length > pageSize;
        const questionsToReturn = questions.slice(0, pageSize);

        // Calculate relevance scores and sort
        const scoredQuestions = questionsToReturn.map(question => {
            let score = 0;
            const urgencyScore = { true: 30, false: 20, LOW: 10 };
            
            // Urgency score
            
            // Location and department matching
            if (question.User?.city === user.city && question.User?.department === user.department) {
                score += 20;
            }
            
            // Organization and department matching
            if (question.User?.organisation_name === user.organisation_name && 
                question.User?.department === user.department) {
                score += 15;
            }
            
            // Society matching
            if (userSocieties.size > 0 && 
                question.User?.memberships?.some(m => userSocieties.has(m.societyname))) {
                score += 10;
            }

            return {
                ...question,
                relevanceScore: score
            };
        }).sort((a, b) => {
            if (b.relevanceScore === a.relevanceScore) {
                return new Date(b.asked_at).getTime() - new Date(a.asked_at).getTime();
            }
            return b.relevanceScore - a.relevanceScore;
        });

        // Remove the relevanceScore from the final output
        const finalQuestions = scoredQuestions.map(({ relevanceScore, ...question }) => question);

        // Cache the results
        await redis.set(cacheKey, finalQuestions, { ex: 300 });

        return createResponse(200, {
            status: "success",
            data: {
                items: finalQuestions,
                page,
                hasMore,
                totalQuestions
            },
            source: "database"
        });
    } catch (error) {
        console.error('Error in getQuestions:', error);
        return createResponse(500, {
            status: "error",
            message: "Failed to fetch questions"
        });
    }
};

// Invalidate cache handler
export const invalidateCache: APIGatewayProxyHandler = async (event) => {
    // Handle OPTIONS request for CORS
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

        const cacheKey = `questions:${userid}`;
        await redis.del(cacheKey);
        
        return createResponse(200, {
            status: "success",
            message: "Questions cache invalidated"
        });
    } catch (error) {
        console.error('Error in invalidateCache:', error);
        return createResponse(500, {
            status: "error",
            message: "Failed to invalidate questions cache"
        });
    }
};
