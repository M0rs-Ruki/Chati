import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Password strength regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export async function POST(req: Request) {
  try {
    // 1. Parse and validate input
    const body = await req.json();
    const { name, email, password, role } = body;

    // Required fields validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
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

    // Name validation
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { message: "Name must be between 2 and 100 characters" },
        { status: 400 }
      );
    }

    // Password strength validation
    if (!PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
        { status: 400 }
      );
    }

    // Role validation (if provided)
    const validRoles = ["ADMIN", "EDITOR"];
    if (role && !validRoles.includes(role)) {
      return NextResponse.json(
        { message: "Invalid role specified" },
        { status: 400 }
      );
    }

    // 2. Check JWT_SECRET environment variable
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // 3. Check if user already exists
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // 4. Hash password with salt
    const salt = await bcrypt.genSalt(12); // Increased from 10 to 12 for better security
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create new user
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: role || "EDITOR",
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    // 6. Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      jwtSecret,
      {
        expiresIn: "7d",
        issuer: "chati-app",
        audience: "chati-api",
      }
    );

    // 7. Return success response
    const response = NextResponse.json(
      {
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      {
        status: 201,
        headers: {
          // Security headers
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );

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
    console.error("Registration error:", error);

    // Check for specific Prisma errors
    if (error && typeof error === "object" && "code" in error) {
      // P2002 is Prisma's unique constraint violation code
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "An account with this email already exists" },
          { status: 409 }
        );
      }
    }

    // Generic error message to avoid leaking information
    return NextResponse.json(
      { message: "An error occurred during registration. Please try again" },
      { status: 500 }
    );
  }
}
