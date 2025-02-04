import { PrismaClient } from "@prisma/client";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { z } from "zod";
// import { verify } from "hono/jwt";

// Initialize Prisma Client for serverless environment
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// CORS configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Requested-With',
  'Content-Type': 'application/json',
};

// Helper function to wrap responses with CORS headers
const createResponse = (statusCode: number, body: any, cookies?: string[]): APIGatewayProxyResult => {
  const headers: Record<string, string> = {
    ...corsHeaders
  };
  
  if (cookies?.length) {
    return {
      statusCode,
      multiValueHeaders: {
        'Set-Cookie': cookies,
        ...Object.entries(corsHeaders).reduce((acc, [key, value]) => {
          acc[key] = [value];
          return acc;
        }, {} as Record<string, string[]>)
      },
      body: statusCode === 204 ? '' : JSON.stringify(body),
      isBase64Encoded: false
    };
  }

  return {
    statusCode,
    headers,
    body: statusCode === 204 ? '' : JSON.stringify(body),
    isBase64Encoded: false
  };
};

// // Authentication middleware for Lambda
// const authMiddleware = async (event: APIGatewayProxyEvent): Promise<{ isAuthenticated: boolean; error?: APIGatewayProxyResult }> => {
//   try {
//     // Try getting the token from cookies
//     const token = event.headers.cookie?.split('auth=')[1]?.split(';')[0];

//     if (!token) {
//       return {
//         isAuthenticated: false,
//         error: createResponse(401, {
//           success: false,
//           message: "No token found in cookies",
//           redirect: "/auth/signup"
//         })
//       };
//     }

//     try {
//       // Verify the token
//       await verify(token, process.env.JWT_SECRET || '');
//       return { isAuthenticated: true };
//     } catch (verifyError) {
//       console.log('Token verification error:', verifyError);
//       return {
//         isAuthenticated: false,
//         error: createResponse(401, {
//           success: false,
//           message: "Invalid token",
//           redirect: "/auth/signup"
//         })
//       };
//     }
//   } catch (error) {
//     console.error("Auth middleware error:", error);
//     return {
//       isAuthenticated: false,
//       error: createResponse(500, {
//         success: false,
//         message: "Internal Server Error",
//         redirect: "/auth/signup"
//       })
//     };
//   }
// };

// Zod schema for doctor signup
const doctorSignupSchema = z.object({
  country: z.string().min(2, "Country must be specified"),
  city: z.string().min(2, "City must be specified"),
  organisation_name: z.string().min(2, "Hospital name must be specified"),
  department: z.string().min(2, "Specialization must be specified"),
  degree: z.string().min(2, "Degree must be specified"),
  userid: z.number().int().positive("User ID must be a positive integer")
});

// Zod schema for student signup
const studentSignupSchema = z.object({
  country: z.string().min(2, "Country must be specified"),
  city: z.string().min(2, "City must be specified"),
  institute_name: z.string().min(2, "Institute name must be specified"),
  department: z.string().min(2, "Specialization must be specified"),
  degree: z.string().min(2, "Degree must be specified"),
  userid: z.number().int().positive("User ID must be a positive integer")
});

// Zod schema for organisation signup
const organisationSignupSchema = z.object({
  country: z.string().min(2, "Country must be specified"),
  city: z.string().min(2, "City must be specified"),
  organisation_name: z.string().min(2, "Organisation name must be specified"),
  organisation_type: z.string().min(4, "Organisation type must be valid"),
  userid: z.number().int().positive("User ID must be a positive integer")
});

// Doctor signup handler
export const doctorSignupHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }

  // Check authentication
  // const authResult = await authMiddleware(event);
  // if (!authResult.isAuthenticated) {
  //   return authResult.error!;
  // }

  try {
    const body = JSON.parse(event.body || '{}');
    const validationResult = doctorSignupSchema.safeParse(body);

    if (!validationResult.success) {
      return createResponse(400, {
        success: false,
        errors: validationResult.error.errors
      });
    }

    const { country, city, organisation_name, department, degree, userid } = validationResult.data;

    const id = userid;

    // Check if user exists and update their details
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return createResponse(404, {
        success: false,
        message: "User not found"
      });
    }

    // Update user with doctor details
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        country,
        city,
        organisation_name,
        department,
        specialisation_field_of_study : degree,
      }
    });

    return createResponse(200, {
      success: true,
      message: "Doctor profile updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        country: updatedUser.country,
        city: updatedUser.city,
        organisation_name: updatedUser.organisation_name,
        department: updatedUser.department,
        degree: updatedUser.specialisation_field_of_study
      }
    });

  } catch (error) {
    console.error("Doctor signup error:", error);
    return createResponse(500, {
      success: false,
      message: "Internal server error during doctor signup"
    });
  }
};

// Student signup handler
export const studentSignupHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }

  // Check authentication
  // const authResult = await authMiddleware(event);
  // if (!authResult.isAuthenticated) {
  //   return authResult.error!;
  // }

  try {
    const body = JSON.parse(event.body || '{}');
    const validationResult = studentSignupSchema.safeParse(body);

    if (!validationResult.success) {
      return createResponse(400, {
        success: false,
        errors: validationResult.error.errors
      });
    }

    const { country, city, institute_name, department, degree, userid } = validationResult.data;

    const id = userid;

    // Check if user exists and update their details
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return createResponse(404, {
        success: false,
        message: "User not found"
      });
    }

    // Update user with student details
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        country,
        city,
        organisation_name : institute_name,
        department,
        specialisation_field_of_study : degree
      }
    });

    return createResponse(200, {
      success: true,
      message: "Student profile updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        country: updatedUser.country,
        city: updatedUser.city,
        institute_name: updatedUser.organisation_name,
      }
    });

  } catch (error) {
    console.error("Student signup error:", error);
    return createResponse(500, {
      success: false,
      message: "Internal server error during student signup"
    });
  }
};

// Organisation signup handler
export const organisationSignupHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }

  // Check authentication
  // const authResult = await authMiddleware(event);
  // if (!authResult.isAuthenticated) {
  //   return authResult.error!;
  // }

  try {
    const body = JSON.parse(event.body || '{}');
    const validationResult = organisationSignupSchema.safeParse(body);

    if (!validationResult.success) {
      return createResponse(400, {
        success: false,
        errors: validationResult.error.errors
      });
    }

    const { country, city, organisation_name, organisation_type, userid } = validationResult.data;
    const id = userid;

    // Check if user exists and update their details
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return createResponse(404, {
        success: false,
        message: "User not found"
      });
    }

    // Update user with organisation details
    const updatedUser = await prisma.organisations.update({
      where: { id },
      data: {
        country,
        city,
        organisation_name,
        organisation_type 
        
      }
    });

    return createResponse(200, {
      success: true,
      message: "Organisation profile updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        country: updatedUser.country,
        city: updatedUser.city,
        organisation_name: updatedUser.organisation_name,
      }
    });

  } catch (error) {
    console.error("Organisation signup error:", error);
    return createResponse(500, {
      success: false,
      message: "Internal server error during organisation signup"
    });
  }
};