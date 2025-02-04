import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import * as jwt from 'jsonwebtoken';
// Initialize Prisma Client outside the handler for connection reuse
let prisma;
// CORS configuration
const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
};
const signupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    category: z.enum(["doctor", "student", "organisation"], {
        errorMap: () => ({ message: "Invalid category" }),
    }),
});
export const handler = async (event) => {
    console.log('Event:', JSON.stringify(event, null, 2));
    // Initialize Prisma if not already initialized
    if (!prisma) {
        console.log('Initializing Prisma Client');
        prisma = new PrismaClient();
    }
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: ''
        };
    }
    try {
        const path = event.path;
        const body = event.body ? JSON.parse(event.body) : {};
        console.log('Request body:', JSON.stringify(body, null, 2));
        if (path.endsWith('/signup')) {
            console.log('Processing signup request');
            const validation = signupSchema.safeParse(body);
            if (!validation.success) {
                console.log('Validation failed:', validation.error);
                return {
                    statusCode: 400,
                    headers: corsHeaders,
                    body: JSON.stringify({
                        error: "Validation failed",
                        details: validation.error.errors.map((err) => ({
                            field: err.path[0],
                            message: err.message,
                        })),
                    })
                };
            }
            const { email, password, category } = validation.data;
            try {
                console.log('Creating user with category:', category);
                // Determine which table to use based on category
                const user = category === "organisation"
                    ? await prisma.organisations.create({
                        data: { email, password, category },
                    })
                    : await prisma.user.create({ data: { email, password, category } });
                console.log('User created successfully:', user.id);
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    category: user.category,
                }, process.env.JWT_SECRET || '');
                return {
                    statusCode: 200,
                    headers: {
                        ...corsHeaders,
                        'Set-Cookie': `auth=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}` // 1 week
                    },
                    body: JSON.stringify({
                        message: "User created successfully",
                        token,
                        id: user.id,
                    })
                };
            }
            catch (error) {
                console.error('Database error:', error);
                if (error.code === "P2002") {
                    return {
                        statusCode: 409,
                        headers: corsHeaders,
                        body: JSON.stringify({ error: "A user with this email already exists" })
                    };
                }
                throw error;
            }
        }
        if (path.endsWith('/signin')) {
            console.log('Processing signin request');
            const { email, provider } = body;
            if (!email) {
                return {
                    statusCode: 400,
                    headers: corsHeaders,
                    body: JSON.stringify({ message: "Email is required" })
                };
            }
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                const token = jwt.sign({
                    id: existingUser.id,
                    email: existingUser.email,
                    category: existingUser.category
                }, process.env.JWT_SECRET || '');
                return {
                    statusCode: 200,
                    headers: {
                        ...corsHeaders,
                        'Set-Cookie': `auth=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}` // 1 week
                    },
                    body: JSON.stringify({ exists: true, token })
                };
            }
            if (provider === "google") {
                return {
                    statusCode: 200,
                    headers: corsHeaders,
                    body: JSON.stringify({
                        exists: false,
                        message: "User not found. Please complete registration.",
                    })
                };
            }
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({ exists: false, message: "User not found" })
            };
        }
        return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Route not found" })
        };
    }
    catch (error) {
        console.error('Error in handler:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                message: "Internal server error",
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            })
        };
    }
    finally {
        // Disconnect Prisma client
        if (prisma) {
            await prisma.$disconnect();
        }
    }
};
