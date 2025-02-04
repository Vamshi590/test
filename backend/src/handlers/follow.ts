import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


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

// Handler for getting suggested connections
export const handler: APIGatewayProxyHandler = async (event) => {
    // Handle OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
        return createResponse(200, {});
    }

    const followerId = event.pathParameters?.followindId;
    const followingId = event.pathParameters?.id;


    if (!followerId || !followingId) {
        return createResponse(400, { message: "User ID is required" , success:false });
    }

    if(followerId === followingId) {
        return createResponse(400, { message: "Users cannot follow themselves" });
    }

    try {
    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: parseInt(followerId),
            followingId: parseInt(followingId),
          },
        },
    });

    if (existingFollow) {
        return createResponse(400, { message: "Already following this user" , success:false });
    }

    const follow = await prisma.follow.create({
        data: {
            followerId: parseInt(followerId),
            followingId: parseInt(followingId),
        },
    })

    return createResponse(200, { message: "Followed successfully" , success:true , follow });

    } catch (error) {
        console.error(error);
        return createResponse(500, { message: "Error following user" , success:false });
    } finally {
        await prisma.$disconnect();
    }
};







