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

    const themeId = params.id;

    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme) {
      return NextResponse.json({ message: "Theme not found" }, { status: 404 });
    }

    await prisma.theme.delete({
      where: { id: themeId },
    });

    return NextResponse.json({
      message: "Theme deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting theme:", error);
    return NextResponse.json(
      { message: "Failed to delete theme" },
      { status: 500 }
    );
  }
}
