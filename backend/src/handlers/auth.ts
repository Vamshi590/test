import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import * as jwt from 'jsonwebtoken';

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
  
  // Handle multiple Set-Cookie headers
  if (cookies?.length) {
    // For multiple cookies, we need to return them as separate headers
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

  const response: APIGatewayProxyResult = {
    statusCode,
    headers,
    body: statusCode === 204 ? '' : JSON.stringify(body),
    isBase64Encoded: false
  };
  console.log('Response:', JSON.stringify(response, null, 2));
  return response;
};

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  category: z.enum(["doctor", "student", "organisation"], {
    errorMap: () => ({ message: "Invalid category" }),
  }),
});

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(204, null);
  }

  try {
    const path = event.path;
    const body = event.body ? JSON.parse(event.body) : {};
    console.log('Request body:', JSON.stringify(body, null, 2));

    if (path.endsWith('/auth/signup')) {
      console.log('Processing signup request');
      const validation = signupSchema.safeParse(body);

      if (!validation.success) {
        return createResponse(400, {
          message: "Validation failed",
          errors: validation.error.errors
        });
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: body.email }
        });

        if (existingUser) {
          return createResponse(409, {
            message: "User already exists"
          });
        }

        const user = await prisma.user.create({
          data: {
            email: body.email,
            name : body.fullname,
            password: body.password,
            category: body.category
          }
        });

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '1h' }
        );

        // Set secure HTTP-only cookie with the JWT token
        const cookie = `auth=${token}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600`;

        return createResponse(201, {
          message: "User created successfully",
          user: {
            id: user.id,
            email: user.email,
            category: user.category
          }
        }, [cookie]);

      } catch (dbError: unknown) {
        console.error('Database error:', dbError);
        const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error';
        return createResponse(500, {
          message: "Database error",
          error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        });
      }
    }

    if (path.endsWith('/auth/signin')) {
      const { email, password } = body;

      if (!email || !password) {
        return createResponse(400, { error: "Email and password are required" });
      }

      try {
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user || user.password !== password) { // Note: In production, use proper password comparison
          return createResponse(401, { error: "Invalid credentials" });
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email, category: user.category },
          process.env.JWT_SECRET || 'default-secret'
        );

        // Set cookie with proper attributes
        const cookieOptions = [
          `token=${token}`,
          'Path=/',
          'HttpOnly',
          'SameSite=None',
          'Secure',
          `Expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}` // 7 days
        ].join('; ');

        return createResponse(200, {
          message: "Login successful",
          token
        }, [cookieOptions]);
      } catch (dbError: unknown) {
        console.error('Database error:', dbError);
        const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error';
        return createResponse(500, {
          message: "Database error",
          error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        });
      }
    }

    return createResponse(404, {
      message: "Route not found"
    });

  } catch (error) {
    console.error('Error in handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return createResponse(500, {
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
};
