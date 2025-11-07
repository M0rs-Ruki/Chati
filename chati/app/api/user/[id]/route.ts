import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import {
  updateUserSchema,
  userIdSchema,
  validateSchema,
} from "@/lib/validation";
import type { GetUserResponse, UpdateUserResponse } from "@/lib/user-types";
import { Prisma } from "@prisma/client";

/**
 * GET /api/user/[id]
 * Retrieves a specific user by ID
 * Admins can view any user, editors can only view themselves
 *
 * @param req - Next.js request object
 * @param params - Route parameters containing user ID
 * @returns User data or error response
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Validate user ID format
    const userIdValidation = validateSchema(userIdSchema, params.id);
    if (!userIdValidation.success) {
      return NextResponse.json(
        {
          message: "Invalid user ID format",
          errors: userIdValidation.errors,
        },
        { status: 400 }
      );
    }

    const userId = userIdValidation.data;

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userRead,
      "user-detail"
    );
    if (rateLimitError) return rateLimitError;

    // Authorization check
    if (user.role !== "ADMIN" && user.id !== userId) {
      return NextResponse.json(
        {
          message: "Forbidden: You can only view your own profile",
        },
        { status: 403 }
      );
    }

    // Fetch user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
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

    if (!targetUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User fetched successfully",
      data: targetUser,
    });
  } catch (error) {
    console.error("[ERROR] Failed to fetch user:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch user",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user/[id]
 * Updates a user's information
 * Admins can update any editor or themselves
 * Editors can only update themselves (limited fields)
 *
 * @param req - Next.js request object
 * @param params - Route parameters containing user ID
 * @returns Updated user data or error response
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Validate user ID format
    const userIdValidation = validateSchema(userIdSchema, params.id);
    if (!userIdValidation.success) {
      return NextResponse.json(
        {
          message: "Invalid user ID format",
          errors: userIdValidation.errors,
        },
        { status: 400 }
      );
    }

    const userId = userIdValidation.data;

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userUpdate,
      "user-update"
    );
    if (rateLimitError) return rateLimitError;

    // Parse and validate request body
    const body = await req.json().catch(() => ({}));
    const validation = validateSchema(updateUserSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, role, status } = validation.data;

    // Fetch target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, email: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Authorization checks
    if (user.role === "EDITOR") {
      // Editors can only update their own profile
      if (user.id !== userId) {
        return NextResponse.json(
          {
            message: "Forbidden: Editors can only update their own profile",
          },
          { status: 403 }
        );
      }

      // Editors cannot change role or status
      if (role !== undefined || status !== undefined) {
        return NextResponse.json(
          {
            message: "Forbidden: Editors cannot change role or status",
          },
          { status: 403 }
        );
      }
    }

    if (user.role === "ADMIN") {
      // Admins cannot update other admins
      if (targetUser.role === "ADMIN" && user.id !== userId) {
        return NextResponse.json(
          {
            message: "Forbidden: Admins cannot update other admins",
          },
          { status: 403 }
        );
      }
    }

    // Check email uniqueness if email is being changed
    if (email && email !== targetUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (existingUser && existingUser.id !== userId) {
        return NextResponse.json(
          {
            message: "Email already in use by another user",
          },
          { status: 409 }
        );
      }
    }

    // Build update data
    const updateData: Prisma.UserUpdateInput = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (email !== undefined) {
      updateData.email = email;
    }

    // Only admins can update role and status
    if (user.role === "ADMIN") {
      if (role !== undefined) {
        updateData.role = role;
      }

      if (status !== undefined) {
        updateData.status = status;
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
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

    // Log user update for audit purposes
    console.info(
      `[AUDIT] User updated: ${updatedUser.id} (${updatedUser.email}) by: ${user.id}`
    );

    return NextResponse.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("[ERROR] Failed to update user:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: "Email already in use by another user",
          },
          { status: 409 }
        );
      }

      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "User not found",
          },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to update user",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
