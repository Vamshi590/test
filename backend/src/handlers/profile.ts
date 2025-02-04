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

    const userid = parseInt(userId);
    const path = event.resource;

    try {
        const body = JSON.parse(event.body || '{}');

        switch (path) {
            case '/publish-post/{id}':
                const post = await prisma.$transaction(async (tx) => {
                    const newPost = await tx.posts.create({
                        data: {
                            userId: userid,
                            title: body.title,
                            description: body.description,
                            postImageLinks: body.imageUrls?.length ? {
                                create: body.imageUrls.map((url: string) => ({
                                    postImageLink: url
                                }))
                            } : undefined
                        },
                        include: {
                            postImageLinks: true
                        }
                    });
                    return newPost;
                }, { timeout: 10000 });

                return createResponse(200, {
                    status: "success",
                    data: post,
                });

            case '/add-certificate/{id}':
                const mediaLink = body.imageUrl || '';
                const certificate = await prisma.certifications.create({
                    data: {
                        userId: userid,
                        certificateName: body.certificateName,
                        issuingOrganisation: body.issuingOrganisation,
                        issueDate: body.issueDate,
                        certificateURL: body.certificateURL,
                        descreption: body.descreption,
                        certificateMediaLink: mediaLink
                    },
                });
                return createResponse(200, certificate);

            case '/add-professional-experience/{id}':
                const experience = await prisma.professionalExperience.create({
                    data: {
                        userId: userid,
                        title: body.title,
                        organisation: body.organisation,
                        startDate: body.startDate,
                        endDate: body.endDate,
                        location: body.location,
                    },
                });
                return createResponse(200, experience);

            case '/add-education/{id}':
                const education = await prisma.education.create({
                    data: {
                        userId: userid,
                        schoolName: body.schoolName,
                        degree: body.degree,
                        department: body.department,
                        startDate: body.startDate,
                        endDate: body.endDate,
                        grade: body.grade,
                    },
                });
                return createResponse(200, education);

            case '/add-memberships/{id}':
                const membership = await prisma.memberships.create({
                    data: {
                        userId: userid,
                        societyname: body.societyName,
                        position: body.position,
                        relatedDepartment: body.relatedDepartment,
                        membershipId: body.membershipId,
                    },
                });
                return createResponse(200, membership);

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

export const getProfile: APIGatewayProxyHandler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return createResponse(200, {});
    }

    const userId = event.pathParameters?.id;
    if (!userId) {
        return createResponse(400, { message: "User ID is required" });
    }

    try {
        const userid = parseInt(userId);

        const userData = await prisma.user.findUnique({
            where: { id: userid },
            select: {
                id: true,
                name: true,
                city: true,
                profile_picture: true,
                specialisation_field_of_study: true,
                organisation_name: true,
                department: true,
                questions: true,
                posts: true,
                certifications: true,
                achievementsAwards: true,
                professionalExperience: true,
                education: true,
                memberships: true,
            },
        });

        if (!userData) {
            return createResponse(404, { message: "User not found" });
        }

        return createResponse(200, {
            status: "success",
            data: userData,
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return createResponse(500, {
            status: "error",
            message: "Failed to fetch profile data",
        });
    }
};
