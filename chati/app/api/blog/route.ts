import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PublishStatus } from "@prisma/client";

// Type-safe query parameters
interface BlogQueryParams {
  status?: PublishStatus;
  page: number;
  limit: number;
}

export async function GET(req: NextRequest) {
  try {
    console.log('📝 Blog API called');
    
    // Query parameters for filtering and pagination
    const searchParams = req.nextUrl.searchParams;
    const statusParam = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "10", 10),
      100
    ); // Max 100 items
    const skip = (page - 1) * limit;

    console.log('📊 Query params:', { statusParam, page, limit, skip });

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

    console.log('🔍 WHERE clause:', where);

    // Get total count for pagination
    const total = await prisma.blogPost.count({ where });
    
    console.log('📈 Total count:', total);

    // Fetch blogs
    const blogs = await prisma.blogPost.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        status: true,
        metadata: true,
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

    console.log('✅ Fetched blogs:', blogs.length, 'posts');
    console.log('📝 Blog titles:', blogs.map(b => b.title));

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
    console.error("❌ Error fetching blogs:", error);
    console.error("Stack:", error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      { 
        message: "Failed to fetch blogs",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
