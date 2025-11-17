import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import { Prisma } from "@prisma/client";

/**
 * GET /api/brands
 * Retrieves all brands
 * Requires ADMIN or EDITOR role
 */
export async function GET(req: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can view brands." },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userRead, // Using userRead for listing brands
      "brands-list"
    );
    if (rateLimitError) return rateLimitError;

    const brands = await prisma.brand.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Brands fetched successfully",
      data: brands,
    });
  } catch (error) {
    console.error("[ERROR] Error fetching brands:", error);
    return NextResponse.json(
      { 
        message: "Failed to fetch brands",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
