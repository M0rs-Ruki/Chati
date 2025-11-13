import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/public/page
 * PUBLIC ENDPOINT - Get all pages (no authentication required)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 500);
    
    const pages = await prisma.page.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    
    return NextResponse.json({
      message: "Pages fetched successfully",
      data: pages,
      count: pages.length
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching pages" },
      { status: 500 }
    );
  }
}
