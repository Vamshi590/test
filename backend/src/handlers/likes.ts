import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CORS configuration
const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
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

export const handler: APIGatewayProxyHandler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return createResponse(200, {});
    }

    const userId = event.pathParameters?.id;
    if (!userId) {
        return createResponse(400, { message: "User ID is required" });
    }

    const path = event.resource;

    try {
        const body = JSON.parse(event.body || '{}');

        const { userId, postId } = body

        if(!userId || !postId) {
            return createResponse(400, { message: "User ID or Post ID are required" });
        }

        switch (path) {
            case '/like':
                const like = await prisma.likes.create({
                    data: {
                        liked_user_id: parseInt(userId),
                        postsId: parseInt(postId)
                    },
                });

                return createResponse(200, {
                    message: "Post liked",
                    data: like,
                });

            case '/dislike':
                const dislike = await prisma.likes.deleteMany({
                    where: {
                        liked_user_id: parseInt(userId),
                        postsId: parseInt(postId)
                    },
                })
                return createResponse(200, { message : "Post like removed " ,dislike});

            case '/likes/:postId':
                const postIds = event.pathParameters?.id;
                if (!postIds) {
                    return createResponse(400, { message: "Post ID is required" });
                }
                const likes = await prisma.likes.findMany({
                    where: {
                        postsId: parseInt(postIds)
                    },
                });
                return createResponse(200, {likes});

           

            default:
                return createResponse(404, { message: "Endpoint not found" });
        }
    } catch (error) {
        console.error(error);
        return createResponse(500, { 
            status: "error",
            message: "Operation failed",
            error 
        });
    }
};

