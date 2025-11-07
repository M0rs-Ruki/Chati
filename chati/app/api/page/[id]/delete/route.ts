import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import { pageIdSchema, validatePageSchema } from "@/lib/page-validation";
import type { DeletePageResponse } from "@/lib/page-types";
import { Prisma } from "@prisma/client";

/**
 * DELETE /api/page/[id]/delete
 * Deletes a page (hard delete)
 * Both ADMIN and EDITOR can delete any page
 *
 * @param req - Next.js request object
 * @param params - Route parameters containing page ID
 * @returns Success response or error
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Authenticate user - Both ADMIN and EDITOR can delete
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check authorization - only admins and editors can delete pages
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          message: "Forbidden: Only admins and editors can delete pages",
        },
        { status: 403 }
      );
    }

    // Validate page ID format
    const pageIdValidation = validatePageSchema(pageIdSchema, params.id);
    if (!pageIdValidation.success) {
      return NextResponse.json(
        {
          message: "Invalid page ID format",
          errors: pageIdValidation.errors,
        },
        { status: 400 }
      );
    }

    const pageId = pageIdValidation.data;

    // Apply strict rate limiting for deletions
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userDelete, // Reusing user delete config
      "page-delete"
    );
    if (rateLimitError) return rateLimitError;

    // Check if page exists
    const page = await prisma.page.findUnique({
      where: { id: pageId },
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
      },
    });

    if (!page) {
      return NextResponse.json(
        {
          message: "Page not found",
        },
        { status: 404 }
      );
    }

    // Perform deletion in a transaction to ensure consistency
    await prisma.$transaction(async (tx) => {
      // Delete the page
      await tx.page.delete({
        where: { id: pageId },
      });
    });

    // Log deletion for audit purposes
    console.info(
      `[AUDIT] Page deleted: ${pageId} (${page.slug} - "${page.title}") by user: ${user.id} (${user.email})`
    );

    return NextResponse.json({
      message: "Page deleted successfully",
      data: { success: true },
    });
  } catch (error) {
    console.error("[ERROR] Failed to delete page:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Page not found",
          },
          { status: 404 }
        );
      }

      // Foreign key constraint violation (if any relations exist in future)
      if (error.code === "P2003" || error.code === "P2014") {
        return NextResponse.json(
          {
            message: "Cannot delete page with existing related data",
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to delete page",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
