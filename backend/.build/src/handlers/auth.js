import { PrismaClient } from "@prisma/client";
import { z } from "zod";
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
        if (path.endsWith('/auth/signup')) {
            console.log('Processing signup request');
            const validation = signupSchema.safeParse(body);
            if (!validation.success) {
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
            // Check if user exists
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });
            if (existingUser) {
                return {
                    statusCode: 409,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: "User already exists" })
                };
            }
            // Create new user
            const user = await prisma.user.create({
                data: {
                    email,
                    password, // Note: In production, hash the password
                    category
                }
            });
            // Generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email, category: user.category }, process.env.JWT_SECRET || 'default-secret');
            return {
                statusCode: 200,
                headers: {
                    ...corsHeaders,
                    'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax`
                },
                body: JSON.stringify({
                    message: "User created successfully",
                    user: {
                        id: user.id,
                        email: user.email,
                        category: user.category
                    }
                })
            };
        }
        if (path.endsWith('/auth/signin')) {
            const { email, password } = body;
            if (!email || !password) {
                return {
                    statusCode: 400,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: "Email and password are required" })
                };
            }
            const user = await prisma.user.findUnique({
                where: { email }
            });
            if (!user || user.password !== password) { // Note: In production, use proper password comparison
                return {
                    statusCode: 401,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: "Invalid credentials" })
                };
            }
            const token = jwt.sign({ id: user.id, email: user.email, category: user.category }, process.env.JWT_SECRET || 'default-secret');
            return {
                statusCode: 200,
                headers: {
                    ...corsHeaders,
                    'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax`
                },
                body: JSON.stringify({
                    message: "Login successful",
                    user: {
                        id: user.id,
                        email: user.email,
                        category: user.category
                    }
                })
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
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                message: "Internal server error",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
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
