import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Rate limiting map (in production, use Redis or similar)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export async function POST(req: Request) {
  try {
    // 1. Parse and validate input
    const body = await req.json();
    const { email, password } = body;

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // 2. Rate limiting check
    const clientIdentifier = email.toLowerCase();
    const now = Date.now();
    const attempts = loginAttempts.get(clientIdentifier);

    if (attempts) {
      if (attempts.count >= MAX_ATTEMPTS) {
        const timeSinceLastAttempt = now - attempts.lastAttempt;
        if (timeSinceLastAttempt < LOCKOUT_DURATION) {
          const remainingTime = Math.ceil((LOCKOUT_DURATION - timeSinceLastAttempt) / 60000);
          return NextResponse.json(
            { message: `Too many login attempts. Please try again in ${remainingTime} minutes` },
            { status: 429 }
          );
        } else {
          // Reset attempts after lockout duration
          loginAttempts.delete(clientIdentifier);
        }
      }
    }

    // 3. Check JWT_SECRET environment variable
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // 4. Find user in database
    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        status: true,
      }
    });

    // Generic error message to prevent user enumeration
    const invalidCredentialsResponse = NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );

    if (!user) {
      // Track failed attempt
      const currentAttempts = loginAttempts.get(clientIdentifier) || { count: 0, lastAttempt: now };
      loginAttempts.set(clientIdentifier, {
        count: currentAttempts.count + 1,
        lastAttempt: now
      });
      return invalidCredentialsResponse;
    }

    // 5. Check if user account is active
    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { message: "Account is disabled. Please contact support" },
        { status: 403 }
      );
    }

    // 6. Verify password exists (OAuth users might not have password)
    if (!user.password) {
      return NextResponse.json(
        { message: "Invalid authentication method" },
        { status: 401 }
      );
    }

    // 7. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Track failed attempt
      const currentAttempts = loginAttempts.get(clientIdentifier) || { count: 0, lastAttempt: now };
      loginAttempts.set(clientIdentifier, {
        count: currentAttempts.count + 1,
        lastAttempt: now
      });
      return invalidCredentialsResponse;
    }

    // 8. Clear failed login attempts on successful login
    loginAttempts.delete(clientIdentifier);

    // 9. Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      jwtSecret,
      { 
        expiresIn: "7d",
        issuer: "chati-app",
        audience: "chati-api"
      }
    );

    // 10. Return success response (never include password)
    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, { 
      status: 200,
      headers: {
        // Security headers
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      }
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: "/",
    });

    return response;

  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error("Login error:", error);
    
    // Generic error message to avoid leaking information
    return NextResponse.json(
      { message: "An error occurred during login. Please try again" },
      { status: 500 }
    );
  }
}
