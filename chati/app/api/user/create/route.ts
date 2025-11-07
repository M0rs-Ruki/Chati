import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import { createUserSchema, validateSchema } from "@/lib/validation";
import type { CreateUserResponse } from "@/lib/user-types";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

/**
 * POST /api/user/create
 * Creates a new user (Admin only)
 *
 * @param req - Next.js request object
 * @returns Created user data or error response
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check authorization - only admins can create users
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Forbidden: Only admins can create users",
        },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userCreate,
      "user-create"
    );
    if (rateLimitError) return rateLimitError;

    // Parse and validate request body
    const body = await req.json().catch(() => ({}));
    const validation = validateSchema(createUserSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { email, name, password, role } = validation.data;
    const status = (validation.data as any).status;

    // CRITICAL: Admins can ONLY create EDITORS, not other ADMINS
    if (role === "ADMIN") {
      return NextResponse.json(
        {
          message:
            "Forbidden: Admins cannot create other admin accounts. You can only create editor accounts.",
        },
        { status: 403 }
      );
    }

    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(12); // Increased from 10 for better security
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        status: status || "ACTIVE",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Log user creation for audit purposes
    console.info(
      `[AUDIT] User created: ${newUser.id} (${newUser.email}) by admin: ${user.id}`
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ERROR] Failed to create user:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: "User with this email already exists",
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to create user",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
