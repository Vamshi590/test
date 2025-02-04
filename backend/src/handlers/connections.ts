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

// Handler for getting suggested connections
export const handler: APIGatewayProxyHandler = async (event) => {
    // Handle OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
        return createResponse(200, {});
    }

    const userId = event.pathParameters?.id;
    if (!userId) {
        return createResponse(400, { message: "User ID is required" });
    }

    try {
        const userid = parseInt(userId);

        // Check cache first
        const cacheKey = `suggested_connections:${userid}`;
        const cached = await redis.get(cacheKey);
        
        if (cached) {
            return createResponse(200, {
                ...cached,
                source: 'cache'
            });
        }

        // Get current user's following list for mutual calculation
        const currentUserFollowing = await prisma.follow.findMany({
            where: { followerId: userid },
            select: { followingId: true }
        });

        const followingIds = currentUserFollowing.map(f => f.followingId);

        // Retrieve user's info to match relevant users
        const user = await prisma.user.findUnique({
            where: { id: userid },
            select: {
                name: true,
                specialisation_field_of_study: true,
                department: true,
                city: true,
                organisation_name: true,
            },
        });

        if (!user) {
            return createResponse(404, { message: "User not found" });
        }

        // Helper function to get mutual connections count
        const getMutualConnectionsCount = async (otherUserId: number) => {
            const otherUserFollowing = await prisma.follow.findMany({
                where: { followerId: otherUserId },
                select: { followingId: true }
            });
            const otherUserFollowingIds = otherUserFollowing.map(f => f.followingId);
            return followingIds.filter(id => otherUserFollowingIds.includes(id)).length;
        };

        // Get users by organization (max 20)
        const organizationUsers = await Promise.all((await prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: userid } },
                    { organisation_name: user.organisation_name },
                    {
                        NOT: {
                            followers: {
                                some: {
                                    followingId: userid,
                                },
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                department: true,
                organisation_name: true,
            },
            take: 20,
        })).map(async (user) => ({
            ...user,
            mutuals: await getMutualConnectionsCount(user.id)
        })));

        // Get users by location (max 20)
        const locationUsers = await Promise.all((await prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: userid } },
                    { city: user.city },
                    {
                        NOT: {
                            followers: {
                                some: {
                                    followingId: userid,
                                },
                            },
                        },
                    },
                    { id: { notIn: organizationUsers.map(u => u.id) } },
                ],
            },
            select: {
                id: true,
                name: true,
                department: true,
                organisation_name: true,
            },
            take: 20,
        })).map(async (user) => ({
            ...user,
            mutuals: await getMutualConnectionsCount(user.id)
        })));

        // Get users by department (max 20)
        const departmentUsers = await Promise.all((await prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: userid } },
                    { department: user.department },
                    {
                        NOT: {
                            followers: {
                                some: {
                                    followingId: userid,
                                },
                            },
                        },
                    },
                    { 
                        id: { 
                            notIn: [...organizationUsers.map(u => u.id), ...locationUsers.map(u => u.id)] 
                        } 
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                department: true,
                organisation_name: true,
            },
            take: 20,
        })).map(async (user) => ({
            ...user,
            mutuals: await getMutualConnectionsCount(user.id)
        })));

        const totalUsers = organizationUsers.length + locationUsers.length + departmentUsers.length;
        let otherUsers: Array<any> = [];

        // If total users is less than 80, fetch additional users
        if (totalUsers < 80) {
            otherUsers = await Promise.all((await prisma.user.findMany({
                where: {
                    AND: [
                        { id: { not: userid } },
                        {
                            NOT: {
                                followers: {
                                    some: {
                                        followingId: userid,
                                    },
                                },
                            },
                        },
                        {
                            id: {
                                notIn: [
                                    ...organizationUsers.map(u => u.id),
                                    ...locationUsers.map(u => u.id),
                                    ...departmentUsers.map(u => u.id)
                                ]
                            }
                        }
                    ]
                },
                select: {
                    id: true,
                    name: true,
                    department: true,
                    organisation_name: true,
                },
                orderBy: {
                    created_at: 'desc'
                },
                take: 80 - totalUsers
            })).map(async (user) => ({
                ...user,
                mutuals: await getMutualConnectionsCount(user.id)
            })));
        }

        const response = {
            organization_matches: organizationUsers,
            location_matches: locationUsers,
            department_matches: departmentUsers,
            other_users: otherUsers,
            user : user,
            source: 'database'
        };

        // Cache the response for 15 minutes (900 seconds)
        await redis.set(cacheKey, response, { ex: 3600 });

        return createResponse(200, response);
    } catch (error) {
        console.error(error);
        return createResponse(500, { message: "Error fetching related users" });
    } finally {
        await prisma.$disconnect();
    }
};

// Handler for getting network connections (followers/following)
export const getNetworkConnections: APIGatewayProxyHandler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return createResponse(200, {});
    }

    const userId = event.pathParameters?.id;
    if (!userId) {
        return createResponse(400, { message: "User ID is required" });
    }

    try {
        const userid = parseInt(userId);

        // Check cache first
        const cacheKey = `network_connections:${userid}`;
        const cached = await redis.get(cacheKey);
        
        if (cached) {
            return createResponse(200, {
                ...cached,
                source: 'cache'
            });
        }

        // Get followers (people who follow the user)
        const followers = await prisma.follow.findMany({
            where: {
                followingId: userid,
            },
            select: {
                follower: {
                    select: {
                        id: true,
                        name: true,
                        specialisation_field_of_study: true,
                        organisation_name: true,
                        city: true,
                    },
                },
            },
        });

        // Get following (people the user follows)
        const following = await prisma.follow.findMany({
            where: {
                followerId: userid,
            },
            select: {
                following: {
                    select: {
                        id: true,
                        name: true,
                        specialisation_field_of_study: true,
                        organisation_name: true,
                        city: true,
                    },
                },
            },
        });

        const response = {
            followers: followers.map((f) => f.follower),
            following: following.map((f) => f.following),
            source: 'database'
        };

        // Cache the response for 15 minutes (900 seconds)
        await redis.set(cacheKey, response, { ex: 3600 });

        return createResponse(200, response);
    } catch (error) {
        console.error("Error fetching network connections:", error);
        return createResponse(500, { message: "Error fetching network connections" });
    } finally {
        await prisma.$disconnect();
    }
};

// Handler for invalidating connection caches
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

        // Invalidate both suggested connections and network connections caches
        const suggestedCacheKey = `suggested_connections:${userid}`;
        const networkCacheKey = `network_connections:${userid}`;
        
        await Promise.all([
            redis.del(suggestedCacheKey),
            redis.del(networkCacheKey)
        ]);
        
        return createResponse(200, {
            status: "success",
            message: "Connections cache invalidated successfully"
        });
    } catch (error) {
        console.error('Error in invalidateCache:', error);
        return createResponse(500, {
            status: "error",
            message: "Failed to invalidate connections cache"
        });
    }
};



