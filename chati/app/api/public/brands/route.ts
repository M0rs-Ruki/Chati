import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/public/brands
 * Retrieves all brands for public display
 * PUBLIC ENDPOINT - No authentication required
 */
export async function GET(req: NextRequest) {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        logoUrl: true,
      },
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
