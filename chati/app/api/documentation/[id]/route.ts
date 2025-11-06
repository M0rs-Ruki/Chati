import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { PublishStatus } from "@prisma/client";

// Type-safe request body for update
interface UpdateDocumentationRequest {
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
    const docId = params.id;

    // Validate documentation ID format
    if (!docId || typeof docId !== "string") {
      return NextResponse.json(
        { message: "Invalid documentation ID" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body: UpdateDocumentationRequest = await req.json();
    const { title, content, metadata, imageUrl, status } = body;

    // Validate status if provided
    const validStatuses: PublishStatus[] = ["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    // Find documentation
    const doc = await prisma.documentation.findUnique({
      where: { id: docId },
    });

    if (!doc) {
      return NextResponse.json(
        { message: "Documentation not found" },
        { status: 404 }
      );
    }

    // Check authorization (only author or admin can edit)
    if (doc.authorId !== user!.id && user!.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden: You can only edit your own documentation" },
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
    }

    // Update documentation
    const updatedDoc = await prisma.documentation.update({
      where: { id: docId },
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
      message: "Documentation updated successfully",
      data: updatedDoc,
    });
  } catch (error) {
    console.error("Error updating documentation:", error);

    // Type-safe error handling
    if (error instanceof Error) {
      if ("code" in error && error.code === "P2025") {
        return NextResponse.json(
          { message: "Documentation not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { message: "Failed to update documentation" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await authenticateRequest(req);
  if (error) return error;

  try {
    const docId = params.id;

    // Validate documentation ID
    if (!docId || typeof docId !== "string") {
      return NextResponse.json(
        { message: "Invalid documentation ID" },
        { status: 400 }
      );
    }

    const doc = await prisma.documentation.findUnique({
      where: { id: docId },
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

    return NextResponse.json({
      message: "Documentation fetched successfully",
      data: doc,
    });
  } catch (error) {
    console.error("Error fetching documentation:", error);
    return NextResponse.json(
      { message: "Failed to fetch documentation" },
      { status: 500 }
    );
  }
}
