import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await authenticateRequest(req);
  if (error) return error;

  try {
    const blogId = params.id;

    // Validate blog ID
    if (!blogId || typeof blogId !== "string") {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    // Find blog post
    const blog = await prisma.blogPost.findUnique({
      where: { id: blogId },
      select: {
        id: true,
        authorId: true,
        title: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Check authorization (only author or admin can delete)
    if (blog.authorId !== user!.id && user!.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden: You can only delete your own blogs" },
        { status: 403 }
      );
    }

    // Delete blog post
    await prisma.blogPost.delete({
      where: { id: blogId },
    });

    return NextResponse.json({
      message: "Blog deleted successfully",
      data: {
        id: blog.id,
        title: blog.title,
      },
    });
  } catch (error) {
    console.error("Error deleting blog:", error);

    // Type-safe error handling
    if (error instanceof Error) {
      if ("code" in error && error.code === "P2025") {
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
