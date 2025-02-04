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


    try {
        const body = JSON.parse(event.body || '{}');

        const { userId, postId } = body

        if(!userId || !postId) {
            return createResponse(400, { message: "User ID or Post ID are required" });
        }

        const comment = await prisma.comments.create({
            data: {
                postsId: postId,
                commented_user_id: userId,
                comment: body.comment
            }
        })

        return createResponse(200, { status: "success", comment });
    } catch (error) {
        console.error(error);
        return createResponse(500, { 
            status: "error",
            message: "Operation failed",
            error 
        });
    }
};

