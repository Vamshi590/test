import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CORS configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Requested-With",
  "Content-Type": "application/json",
};

// Helper function to wrap responses with CORS headers
const createResponse = (
  statusCode: number,
  body: any
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
};

export const handler: APIGatewayProxyHandler = async (event) => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    return createResponse(200, {});
  }

  const userId = event.pathParameters?.id;
  if (!userId) {
    return createResponse(400, { message: "User ID is required" });
  }

  try {
    const userid = parseInt(userId);

    // Get current user's following list for mutual calculation
    const currentUserFollowing = await prisma.follow.findMany({
      where: { followerId: userid },
      select: { followingId: true },
    });

    const followingIds = currentUserFollowing.map((f) => f.followingId);

    // Retrieve user's info to match relevant users
    const user = await prisma.user.findUnique({
      where: { id: userid },
      select: {
        specialisation_field_of_study: true,
        department: true,
        city: true,
        organisation_name: true,
      },
    });

    if (!user) {
      return createResponse(404, { message: "User not found" });
    }

    const dbresponse = await prisma.students.findMany();

    const response = {
      students: dbresponse,
      source: "database",
    };

    // Cache the response for 15 minutes (900 seconds)

    return createResponse(200, response);
  } catch (error) {
    console.error(error);
    return createResponse(500, { message: "Error fetching related users" });
  } finally {
    await prisma.$disconnect();
  }
};

export const studentAccept: APIGatewayProxyHandler = async (event) => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    return createResponse(200, {});
  }

  const body = JSON.parse(event.body || "{}");
  const studentId = body.id;
  const status = body.status;

  if (!studentId || !status) {
    return createResponse(400, {
      message: "Student ID and status are required",
    });
  }

  try {
    const student = await prisma.students.findUnique({
      where: { id: studentId },
      select: { userId: true, idNo: true },
    });

    if (!student) {
      return createResponse(404, { message: "Student not found" });
    }

    const updateuser = await prisma.user.update({
      where: { id: student.userId || 0 },
      data: {
        verified: true,
        register_number: student.idNo,
      },
    });

    if (updateuser) {
      const updatedStudent = await prisma.students.delete({
        where: { id: studentId },
      });
    }

    return createResponse(200, { message: "Student accepted" });
  } catch (error) {
    console.error(error);
    return createResponse(500, { message: "Error accepting student" });
  } finally {
    await prisma.$disconnect();
  }
};


export const studentReject: APIGatewayProxyHandler = async (event) => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    return createResponse(200, {});
  }

  const body = JSON.parse(event.body || "{}");
  const studentId = body.id;
  const status = body.status;

  if (!studentId || !status) {
    return createResponse(400, {
      message: "Student ID and status are required",
    });
  }

  try {
    const student = await prisma.students.findUnique({
      where: { id: studentId },
      select: { userId: true, idNo: true },
    });

    if (!student) {
      return createResponse(404, { message: "Student not found" });
    }


    
      const updatedStudent = await prisma.students.delete({
        where: { id: studentId },
      });
    

    return createResponse(200, { message: "Student rejected" });
  } catch (error) {
    console.error(error);
    return createResponse(500, { message: "Error rejecting student" });
  } finally {
    await prisma.$disconnect();
  }
};


