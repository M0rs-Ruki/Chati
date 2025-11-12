import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/public/doc/slug/[slug]
 * PUBLIC ENDPOINT - Get documentation by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const doc = await prisma.documentation.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!doc) {
      return NextResponse.json(
        { message: "Documentation not found" },
        { status: 404 }
      );
    }

    // Return all docs regardless of status (show everything)
    return NextResponse.json({
      message: "Documentation fetched successfully",
      data: doc
    });
  } catch (error) {
    console.error("Error fetching documentation:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the documentation" },
      { status: 500 }
    );
  }
}
