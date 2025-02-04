import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { parse as parseCookie } from "cookie";

const prisma = new PrismaClient();

// CORS configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers":
  "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Requested-With",
  "Content-Type": "application/json",
};

// Helper function to wrap responses with CORS headers
const createResponse = (
  statusCode: number,
  body: any,
  cookies?: string[]
): APIGatewayProxyResult => {
  const headers: Record<string, string> = {
    ...corsHeaders,
  };

  // Handle multiple Set-Cookie headers
  if (cookies?.length) {
    // For multiple cookies, we need to return them as separate headers
    return {
      statusCode,
      multiValueHeaders: {
        "Set-Cookie": cookies,
        ...Object.entries(corsHeaders).reduce((acc, [key, value]) => {
          acc[key] = [value];
          return acc;
        }, {} as Record<string, string[]>),
      },
      body: statusCode === 204 ? "" : JSON.stringify(body),
      isBase64Encoded: false,
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode,
    headers,
    body: statusCode === 204 ? "" : JSON.stringify(body),
    isBase64Encoded: false,
  };
  console.log("Response:", JSON.stringify(response, null, 2));
  return response;
};

export const handler: APIGatewayProxyHandler = async (event) => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
      isBase64Encoded: false,
    };
  }

  try {
    const cookies = event.headers.Cookie || event.headers.cookie;
    const verifytoken = cookies ? parseCookie(cookies).verifytoken : null;
    const userId = event.queryStringParameters?.id;

    if (!userId) {
      return createResponse(400, { message: "User ID is required" });
    }

    const intUserId = parseInt(userId);

    if (verifytoken) {
      try {
        const decoded = jwt.verify(
          verifytoken,
          process.env.JWT_SECRET || ""
        ) as any;
        const intDecodedId = parseInt(decoded.userId);

        if (intDecodedId === intUserId) {
          return createResponse(200, { verified: true });
        } else {
          return createResponse(403, { message: "Token user mismatch" });
        }
      } catch (error) {
        // Token verification failed, continue to database check
        console.log("Token verification failed:", error);
      }
    }

    // If no cookie or invalid token, check database
    const user = await prisma.user.findUnique({
      where: { id: intUserId },
      select: {
        register_number: true,
        verified: true,
        medical_counsel: true,
        id: true,
        category: true,
      },
    });

    if (!user) {
      return createResponse(404, { message: "User not found" });
    }

    if (user.register_number && user.verified) {
      // User is verified, generate a new token
      const newToken = jwt.sign(
        {
          userId: user.id,
          registrationNo: user.register_number,
          medicalCouncil: user.medical_counsel,
        },
        process.env.JWT_SECRET || ""
      );

      // Set cookie in response headers
      const cookies = [
        `verifytoken=${newToken}; HttpOnly; Domain=http://localhost:5173  Max-Age=34559999; Path=/; SameSite=None; Secure`,
      ];

      return createResponse(
        200,
        {
          verified: true,
          category: user.category,
        },
        cookies
      );
    } else {
      return createResponse(200, {
        verified: false,
        category: user.category,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return createResponse(500, { message: "Internal server error" });
  }
};

export const verifyStudent: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
      isBase64Encoded: false,
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, studentid, collegeName, yearOfGraduation, userId, idlink } = body;

    if (!name || !studentid || !collegeName || !yearOfGraduation || !userId || !idlink) {
      return createResponse(400, { message: "Missing required fields" });
    }

    const intUserId = parseInt(userId);

    const userdetails = await prisma.user.findUnique({
      where: { id: intUserId },
      select: {
        category: true,
        verified: true,
        register_number: true
      },
    });

    if (!userdetails) {
      return createResponse(404, { message: "User not found" });
    }

    if (userdetails.verified) {

        const token = jwt.sign(
            {
              idNo: studentid,
              userId,
              collegeName,
            },
            process.env.JWT_SECRET || ""
          );

        const cookie = [`verifytoken=${token}; Domain=http://localhost:5173 HttpOnly; Secure; SameSite=None; Path=/; Max-Age=34559999`];
    

        return createResponse(200, { verified: true, userdetails}, cookie);
    }

    const student = await prisma.students.create({
      data: {
        name,
        idNo: studentid,
        collegeName,
        graduatingYear: yearOfGraduation,
        userId: intUserId,
        idlink : idlink
      },
    });

    if (!student) {
      return createResponse(400, {
        message: "Student verification failed. Please check your details.",
      });
    }

    if (student) {
      const token = jwt.sign(
        {
          idNo: studentid,
          userId,
          collegeName,
        },
        process.env.JWT_SECRET || ""
      );
      const cookie = [`verifytoken=${token}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600`];

      return createResponse(200, { verified: true, student},cookie);
    }

    return createResponse(400, {
      verified: false,
      message: "Student verification failed. Please check your details.",
    });
  } catch (error) {
    console.error("Error:", error);
    return createResponse(500, { message: "Internal server error" });
  }
};

// Doctor verification endpoint
export const verifyDoctor: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
      isBase64Encoded: false,
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { registrationNo, medicalCouncil, userId } = body;

    if (!registrationNo || !medicalCouncil || !userId) {
      return createResponse(400, { message: "Missing required fields" });
    }

    const intUserId = parseInt(userId);

    // Check if data exists in doctors table
    const doctorRecord = await prisma.doctors.findFirst({
      where: {
        registrationNo: registrationNo,
      },
    });

    if (doctorRecord) {
      // Parse stored doctors data
      const doctorsData = JSON.parse(doctorRecord.doctors);

      // Check if registration matches medical council
      const isValid = doctorsData.some(
        (doctor: any) => doctor.smcName === medicalCouncil
      );

      if (isValid) {
        const response = await prisma.user.update({
          where: { id: intUserId },
          data: {
            medical_counsel: medicalCouncil,
            register_number: registrationNo,
            verified: true,
          },
        });

        if (response) {
          const token = jwt.sign(
            {
              registrationNo,
              userId,
              medicalCouncil,
            },
            process.env.JWT_SECRET || ""
          );

          return createResponse(200, {
            verified: true,
            data: doctorsData,
            token,
          });
        }

        return createResponse(200, { verified: true, data: doctorsData });
      }

      return createResponse(200, { verified: false, data: doctorsData });
    }

    // If no local data, fetch from NMC
    const response = await fetch(
      "https://www.nmc.org.in/MCIRest/open/getDataFromService?service=searchDoctor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
        },
        body: JSON.stringify({ registrationNo }),
      }
    );

    const data = await response.json();

    // Store the response in doctors table regardless of validation
    await prisma.doctors.create({
      data: {
        registrationNo: registrationNo,
        doctors: JSON.stringify(data),
      },
    });

    if (Array.isArray(data) && data.length > 0) {
      // Check if registration matches medical council
      const isValid = data.some(
        (doctor: any) => doctor.smcName === medicalCouncil
      );

      if (isValid) {
        const response = await prisma.user.update({
          where: { id: intUserId },
          data: {
            medical_counsel: medicalCouncil,
            register_number: registrationNo,
            verified: true,
          },
        });

        if (response) {
          const token = jwt.sign(
            {
              registrationNo,
              userId,
              medicalCouncil,
            },
            process.env.JWT_SECRET || ""
          );

          return createResponse(200, { verified: true, data, token });
        }

        return createResponse(200, { verified: true, data });
      }

      return createResponse(200, { verified: false, data });
    }

    // Empty array or error response
    return createResponse(200, {
      verified: false,
      message: "No doctor found with given registration number",
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    return createResponse(500, {
      message: "Error verifying doctor registration",
    });
  }
};
