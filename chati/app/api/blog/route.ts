import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { PublishStatus } from "@prisma/client";

// Type-safe query parameters
interface BlogQueryParams {
  status?: PublishStatus;
  page: number;
  limit: number;
}

export async function GET(req: NextRequest) {
  const { user, error } = await authenticateRequest(req);
  if (error) return error;

  try {
    // Query parameters for filtering and pagination
    const searchParams = req.nextUrl.searchParams;
    const statusParam = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "10", 10),
      100
    ); // Max 100 items
    const skip = (page - 1) * limit;

    // Validate status parameter
    const validStatuses: PublishStatus[] = [
      "DRAFT",
      "REVIEW",
      "PUBLISHED",
      "ARCHIVED",
    ];
    const status =
      statusParam && validStatuses.includes(statusParam as PublishStatus)
        ? (statusParam as PublishStatus)
        : undefined;

    // Build filter object with proper typing
    const where: { status?: PublishStatus } = {};
    if (status) {
      where.status = status;
    }

    // Get total count for pagination
    const total = await prisma.blogPost.count({ where });

    // Fetch blogs
    const blogs = await prisma.blogPost.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
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
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    return NextResponse.json({
      message: "Blogs fetched successfully",
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
