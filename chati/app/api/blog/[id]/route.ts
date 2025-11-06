import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { PublishStatus } from "@prisma/client";

// Type-safe request body for update
interface UpdateBlogRequest {
  title?: string;
  content?: Record<string, any>;
  metadata?: {
    tags?: string[];
    description?: string;
    [key: string]: any;
  };
  imageUrl?: string | null;
  status?: PublishStatus;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await authenticateRequest(req);
  if (error) return error;

  try {
    const blogId = params.id;

    // Validate blog ID format
    if (!blogId || typeof blogId !== "string") {
      return NextResponse.json(
        { message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body: UpdateBlogRequest = await req.json();
    const { title, content, metadata, imageUrl, status } = body;

    // Validate status if provided
    const validStatuses: PublishStatus[] = ["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    // Find blog post
    const blog = await prisma.blogPost.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Check authorization (only author or admin can edit)
    if (blog.authorId !== user!.id && user!.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden: You can only edit your own blogs" },
        { status: 403 }
      );
    }

    // Build update data object
    const updateData: any = {};
    
    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return NextResponse.json(
          { message: "Title must be a non-empty string" },
          { status: 400 }
        );
      }
      updateData.title = title.trim();
    }

    if (content !== undefined) {
      if (typeof content !== "object") {
        return NextResponse.json(
          { message: "Content must be a valid object" },
          { status: 400 }
        );
      }
      updateData.content = content;
    }

    if (metadata !== undefined) {
      updateData.metadata = metadata;
    }

    if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl;
    }

    if (status !== undefined) {
      updateData.status = status;
      // Set publishedAt when publishing
      if (status === "PUBLISHED" && !blog.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    // Update blog post
    const updatedBlog = await prisma.blogPost.update({
      where: { id: blogId },
      data: updateData,
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

    return NextResponse.json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);

    // Type-safe error handling
    if (error instanceof Error) {
      if ('code' in error && error.code === 'P2025') {
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// GET SINGLE BLOG
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = params.id;

    // Validate blog ID
    if (!blogId || typeof blogId !== "string") {
      return NextResponse.json(
        { message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const blog = await prisma.blogPost.findUnique({
      where: { id: blogId },
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

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
