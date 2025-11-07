import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import { userIdSchema, validateSchema } from "@/lib/validation";
import type { DeleteUserResponse } from "@/lib/user-types";
import { Prisma } from "@prisma/client";

/**
 * DELETE /api/user/[id]/delete
 * Deletes a user account (hard delete)
 * - Editors can only delete their own account
 * - Admins can delete any editor or their own account
 * - Admins cannot delete other admins
 *
 * @param req - Next.js request object
 * @param params - Route parameters containing user ID
 * @returns Success response or error
 */
export async function DELETE(
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

    // Apply strict rate limiting for deletions
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userDelete,
      "user-delete"
    );
    if (rateLimitError) return rateLimitError;

    // Fetch target user with related data counts
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        _count: {
          select: {
            blogPosts: true,
            documentations: true,
          },
        },
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

    // Authorization checks
    if (user.role === "EDITOR") {
      // Editors can only delete their own account
      if (user.id !== userId) {
        return NextResponse.json(
          {
            message: "Forbidden: You can only delete your own account",
          },
          { status: 403 }
        );
      }
    }

    if (user.role === "ADMIN") {
      // Admins cannot delete other admins
      if (targetUser.role === "ADMIN" && user.id !== userId) {
        return NextResponse.json(
          {
            message: "Forbidden: Admins cannot delete other admins",
          },
          { status: 403 }
        );
      }
    }

    // Check for related content
    const hasBlogPosts = targetUser._count.blogPosts > 0;
    const hasDocumentations = targetUser._count.documentations > 0;

    if (hasBlogPosts || hasDocumentations) {
      // Provide informative message about related content
      const relatedContent = [];
      if (hasBlogPosts) {
        relatedContent.push(`${targetUser._count.blogPosts} blog post(s)`);
      }
      if (hasDocumentations) {
        relatedContent.push(`${targetUser._count.documentations} documentation(s)`);
      }

      return NextResponse.json(
        {
          message: `Cannot delete user with existing content: ${relatedContent.join(", ")}. Please reassign or delete this content first.`,
        },
        { status: 409 }
      );
    }

    // Perform deletion in a transaction to ensure consistency
    await prisma.$transaction(async (tx) => {
      // Delete the user
      await tx.user.delete({
        where: { id: userId },
      });
    });

    // Log deletion for audit purposes
    console.info(
      `[AUDIT] User deleted: ${userId} (${targetUser.email}) by: ${user.id} (${user.email})`
    );

    return NextResponse.json({
      message: "User deleted successfully",
      data: { success: true },
    });
  } catch (error) {
    console.error("[ERROR] Failed to delete user:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "User not found",
          },
          { status: 404 }
        );
      }

      // Foreign key constraint violation
      if (error.code === "P2003" || error.code === "P2014") {
        return NextResponse.json(
          {
            message: "Cannot delete user with existing related data",
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to delete user",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
