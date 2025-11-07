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
    const userId = params.id;

    // Fetch target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Permission checks
    if (user.role === "EDITOR") {
      // Editors can only delete their own account
      if (user.id !== userId) {
        return NextResponse.json(
          { message: "Forbidden: You can only delete your own account" },
          { status: 403 }
        );
      }
    }

    if (user.role === "ADMIN") {
      // Admins can delete editors and themselves
      // But cannot delete other admins
      if (targetUser.role === "ADMIN" && user.id !== userId) {
        return NextResponse.json(
          { message: "Forbidden: Admins cannot delete other admins" },
          { status: 403 }
        );
      }
    }

    // Delete user
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
}
