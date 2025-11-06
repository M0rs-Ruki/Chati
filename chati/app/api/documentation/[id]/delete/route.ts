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
    const docId = params.id;

    // Validate documentation ID
    if (!docId || typeof docId !== "string") {
      return NextResponse.json(
        { message: "Invalid documentation ID" },
        { status: 400 }
      );
    }

    // Find documentation
    const doc = await prisma.documentation.findUnique({
      where: { id: docId },
      select: {
        id: true,
        authorId: true,
        title: true,
      },
    });

    if (!doc) {
      return NextResponse.json(
        { message: "Documentation not found" },
        { status: 404 }
      );
    }

    // Check authorization (only author or admin can delete)
    if (doc.authorId !== user!.id && user!.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden: You can only delete your own documentation" },
        { status: 403 }
      );
    }

    // Delete documentation
    await prisma.documentation.delete({
      where: { id: docId },
    });

    return NextResponse.json({
      message: "Documentation deleted successfully",
      data: {
        id: doc.id,
        title: doc.title,
      },
    });
  } catch (error) {
    console.error("Error deleting documentation:", error);

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
      { message: "Failed to delete documentation" },
      { status: 500 }
    );
  }
}
