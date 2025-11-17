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
 * GET /api/brands/[id]
 * Retrieves a specific brand by ID
 * Requires ADMIN or EDITOR role
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can view brand." },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userRead, // Using userRead for fetching brand
      "brand-read"
    );
    if (rateLimitError) return rateLimitError;

    const brand = await prisma.brand.findUnique({
      where: { id: params.id },
    });

    if (!brand) {
      return NextResponse.json(
        { message: "Brand not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Brand fetched successfully",
      data: brand,
    });
  } catch (error) {
    console.error("[ERROR] Error fetching brand:", error);
    return NextResponse.json(
      { 
        message: "Failed to fetch brand",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/brands/[id]
 * Deletes a specific brand by ID
 * Requires ADMIN or EDITOR role
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can delete brand." },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userDelete,
      "brand-delete"
    );
    if (rateLimitError) return rateLimitError;

    const brand = await prisma.brand.delete({
      where: { id: params.id },
    });

    console.info(`[AUDIT] Brand deleted: ${brand.id} (${brand.name}) by user: ${user.id} (${user.email})`);

    return NextResponse.json({
      message: "Brand deleted successfully",
      data: brand,
    });
  } catch (error) {
    console.error("[ERROR] Error deleting brand:", error);
    
    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Brand not found." },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { 
        message: "Failed to delete brand",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}

