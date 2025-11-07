import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    const pageId = params.id;

    // Check if page exists
    const page = await prisma.page.findUnique({
      where: { id: pageId },
    });

    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    // Delete page
    await prisma.page.delete({
      where: { id: pageId },
    });

    return NextResponse.json({
      message: "Page deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { message: "Failed to delete page" },
      { status: 500 }
    );
  }
}
