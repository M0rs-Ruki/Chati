import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/public/doc
 * PUBLIC ENDPOINT - Get all documentation (no authentication required)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 500);
    
    const docs = await prisma.documentation.findMany({
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
      message: "Documentation fetched successfully",
      data: docs,
      count: docs.length
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching documents" },
      { status: 500 }
    );
  }
}
