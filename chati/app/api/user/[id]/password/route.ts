import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await authenticateRequest(req);
  if (error) return error;
  try {
    // Authenticate user

    const userId = params.id;
    const body = await req.json();

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

      // Editor changing their OWN password - requires oldPassword
      const { oldPassword, newPassword, confirmPassword } = body;

      if (!oldPassword || !newPassword || !confirmPassword) {
        return NextResponse.json(
          {
            message:
              "Old password, new password, and confirm password are required",
          },
          { status: 400 }
        );
      }

      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "New password and confirm password do not match" },
          { status: 400 }
        );
      }

      // Password length validation
      if (newPassword.length < 6) {
        return NextResponse.json(
          { message: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }

      // Verify old password
      if (!targetUser.password) {
        return NextResponse.json(
          { message: "Password not set for this user" },
          { status: 400 }
        );
      }

      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        targetUser.password
      );
      if (!isOldPasswordValid) {
        return NextResponse.json(
          { message: "Old password is incorrect" },
          { status: 401 }
        );
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
    }

    if (user.role === "ADMIN") {
      // Admins cannot change other admin's passwords
      if (targetUser.role === "ADMIN" && user.id !== userId) {
        return NextResponse.json(
          { message: "Forbidden: Admins cannot change other admins passwords" },
          { status: 403 }
        );
      }

      // Admin changing password (own or editor's) - NO old password required
      const { newPassword, confirmPassword } = body;

      if (!newPassword || !confirmPassword) {
        return NextResponse.json(
          { message: "New password and confirm password are required" },
          { status: 400 }
        );
      }

      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "New password and confirm password do not match" },
          { status: 400 }
        );
      }

      // Password length validation
      if (newPassword.length < 6) {
        return NextResponse.json(
          { message: "Password must be at least 6 characters" },
          { status: 400 }
        );
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
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { message: "Failed to change password" },
      { status: 500 }
    );
  }
}
