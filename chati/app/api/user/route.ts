import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";

/**
 * GET /api/user
 * Retrieves all users (Admin and Editor can view)
 *
 * @param req - Next.js request object
 * @returns List of all users or error response
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Both ADMIN and EDITOR can view all users
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          message: "Forbidden: Only admins and editors can view users",
        },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userRead,
      "user-list"
    );
    if (rateLimitError) return rateLimitError;

    // Fetch all users, ordered by creation date (newest first)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("[ERROR] Failed to fetch users:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch users",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
