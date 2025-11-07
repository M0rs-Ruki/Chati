import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Authenticate user
  const { user, error } = await authenticateRequest(req);
  if (error) return error;
  try {
    const userId = params.id;
    const body = await req.json();
    const { newPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Fetch target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Permission checks
    if (user.role === "EDITOR") {
      // Editors can only change their own password
      if (user.id !== userId) {
        return NextResponse.json(
          { message: "Forbidden: You can only change your own password" },
          { status: 403 }
        );
      }
    }

    if (user.role === "ADMIN") {
      // Admins can change their own password and any editor's password
      // But cannot change other admin's password
      if (targetUser.role === "ADMIN" && user.id !== userId) {
        return NextResponse.json(
          { message: "Forbidden: Admins cannot change other admins passwords" },
          { status: 403 }
        );
      }
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { message: "Failed to change password" },
      { status: 500 }
    );
  }
}
