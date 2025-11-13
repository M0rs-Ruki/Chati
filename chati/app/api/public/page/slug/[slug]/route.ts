import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/public/page/slug/[slug]
 * PUBLIC ENDPOINT - Get page by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const page = await prisma.page.findUnique({
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

    if (!page) {
      return NextResponse.json(
        { message: "Page not found" },
        { status: 404 }
      );
    }

    // Return all pages regardless of status (show everything)
    return NextResponse.json({
      message: "Page fetched successfully",
      data: page
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the page" },
      { status: 500 }
    );
  }
}
