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
const addclinicalreelSchema = z.object({
    title: z.string().min(1, "Question title is required"),
    description: z.string().min(1, "Question description is required"),
    userId : z.number(),
    imageUrls: z.array(z.string()).optional()
});

// Create question handler
export const createReel: APIGatewayProxyHandler = async (event) => {
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
        const finaldata = {...body, userId : userid}
        const validation = addclinicalreelSchema.safeParse(finaldata);

        if (!validation.success) {
            return createResponse(400, {
                message: "Validation failed",
                errors: validation.error.errors
            });
        }

        const reel = await prisma.clinicalReels.create({
            data: {
                userId: userid,
                reelTitle: body.title,
                reelDescription: body.description,
                reelMediaUrl: body.reelMedialink,
                referenceTags : body.referenceTags
            }
            
        });

        return createResponse(201, {
            status: "success",
            data: reel
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
export const getReels: APIGatewayProxyHandler = async (event) => {
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

        const cacheKey = `reels:${userid}:page:${page}`;
        const cachedReels = await redis.get(cacheKey);
        
        if (cachedReels) {
            return createResponse(200, {
                status: "success",
                data: {
                    items: cachedReels,
                    page,
                    hasMore: (cachedReels as any[]).length === pageSize
                },
                source: "cache"
            });
        }

        const skip = (page - 1) * pageSize;

        const user = await prisma.user.findUnique({
            where: { id: userid },
            select: {
                city: true,
                department: true,
                organisation_name: true,
                memberships: true
            }
        });

        if (!user) {
            return createResponse(404, {
                status: "error",
                message: "User not found"
            });
        }

        // Fetch reels with pagination, filtering, and sorting
        const reels = await prisma.clinicalReels.findMany({
            where: {
                userId: { not: userid },
             
            },
            select: {
                reelTitle: true,
                reelDescription: true,
                reelMediaUrl: true,
                postedAt: true,
                reelLikes : true,
                reelComments : true,
                referenceTags : true,

                user : {
                    select : {
                        id : true,
                        name : true,
                        profile_picture : true,
                        department : true,
                        organisation_name : true
                }
                }
            },
            orderBy: { postedAt: 'desc' },
            take: pageSize + 1,
            skip
        });

        const hasMore = reels.length > pageSize;
        const reelsToReturn = reels.slice(0, pageSize);

        // Cache the results
        await redis.set(cacheKey, reelsToReturn, { ex: 300 });

        return createResponse(200, {
            status: "success",
            data: {
                items: reelsToReturn,
                page,
                hasMore
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
