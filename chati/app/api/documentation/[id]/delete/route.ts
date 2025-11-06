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

    const doc = await prisma.documentation.findUnique({
      where: { id: docId },
    });

    if (!doc) {
      return NextResponse.json(
        { message: "Documentation not found" },
        { status: 404 }
      );
    }

    if (doc.authorId !== user!.id && user!.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden: You can only delete your own documentation" },
        { status: 403 }
      );
    }

    await prisma.documentation.delete({
      where: { id: docId },
    });

    return NextResponse.json({
      message: "Documentation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting documentation:", error);
    return NextResponse.json(
      { message: "Failed to delete documentation" },
      { status: 500 }
    );
  }
}
