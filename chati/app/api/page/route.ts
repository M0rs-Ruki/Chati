import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/page
 * PUBLIC ENDPOINT
 * Returns all pages (with optional pagination + status filter)
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);

    // Parse pagination
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const skip = (page - 1) * limit;

    // Optional: status filter
    const status = searchParams.get("status");

    const where: any = {};
    if (status) where.status = status;

    // Fetch total count
    const total = await prisma.page.count({ where });

    // Query pages
    const pages = await prisma.page.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        publishedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" }, // Default only
      skip,
      take: limit,
    });

    return NextResponse.json({
      message: "Pages fetched successfully",
      data: pages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page < Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[ERROR] Failed to fetch pages:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch pages",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
