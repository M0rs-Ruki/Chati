import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await authenticateRequest(req);
  if (error) return error;

  try {
    const docId = params.id;
    const body = await req.json();
    const { title, content, metadata, imageUrl, status } = body;

    const doc = await prisma.documentation.findUnique({
      where: { id: docId },
    });

    if (!doc) {
      return NextResponse.json(
        { message: "Documentation not found" },
        { status: 404 }
      );
    }

    if (doc.authorId !== user.userId && user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden: You can only edit your own documentation" },
        { status: 403 }
      );
    }

    const updatedDoc = await prisma.documentation.update({
      where: { id: docId },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(metadata !== undefined && { metadata }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(status !== undefined && { status }),
        ...(status === "PUBLISHED" && { publishedAt: new Date() }),
      },
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
