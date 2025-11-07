import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import {
  changePasswordAdminSchema,
  changePasswordEditorSchema,
  userIdSchema,
  validateSchema,
} from "@/lib/validation";
import type { ChangePasswordResponse } from "@/lib/user-types";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

/**
 * PUT /api/user/[id]/password
 * Changes a user's password
 * - Editors can only change their own password (requires old password)
 * - Admins can change any editor's password or their own (no old password required for others)
 *
 * @param req - Next.js request object
 * @param params - Route parameters containing user ID
 * @returns Success response or error
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Validate user ID format
    const userIdValidation = validateSchema(userIdSchema, params.id);
    if (!userIdValidation.success) {
      return NextResponse.json(
        {
          message: "Invalid user ID format",
          errors: userIdValidation.errors,
        },
        { status: 400 }
      );
    }

    const userId = userIdValidation.data;

    // Apply strict rate limiting for password changes
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.password,
      "password-change"
    );
    if (rateLimitError) return rateLimitError;

    // Parse request body
    const body = await req.json().catch(() => ({}));

    // Fetch target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        status: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Check if user account is active
    if (targetUser.status !== "ACTIVE") {
      return NextResponse.json(
        {
          message: "Cannot change password for disabled account",
        },
        { status: 403 }
      );
    }

    // ========================================
    // EDITOR FLOW
    // ========================================
    if (user.role === "EDITOR") {
      // Editors can only change their own password
      if (user.id !== userId) {
        return NextResponse.json(
          {
            message: "Forbidden: You can only change your own password",
          },
          { status: 403 }
        );
      }

      // Validate with old password requirement
      const validation = validateSchema(changePasswordEditorSchema, body);

      if (!validation.success) {
        return NextResponse.json(
          {
            message: "Validation failed",
            errors: validation.errors,
          },
          { status: 400 }
        );
      }

      const { oldPassword, newPassword } = validation.data;

      // Verify current password exists
      if (!targetUser.password) {
        return NextResponse.json(
          {
            message: "Password not set for this user",
          },
          { status: 400 }
        );
      }

      // Verify old password
      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        targetUser.password
      );

      if (!isOldPasswordValid) {
        return NextResponse.json(
          {
            message: "Current password is incorrect",
          },
          { status: 401 }
        );
      }

      // Check that new password is different from old password
      const isSamePassword = await bcrypt.compare(
        newPassword,
        targetUser.password
      );

      if (isSamePassword) {
        return NextResponse.json(
          {
            message: "New password must be different from current password",
          },
          { status: 400 }
        );
      }

      // Hash new password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      // Log password change for audit purposes
      console.info(
        `[AUDIT] Password changed: User ${userId} (${targetUser.email}) changed their own password`
      );

      return NextResponse.json({
        message: "Password changed successfully",
        data: { success: true },
      });
    }

    // ========================================
    // ADMIN FLOW
    // ========================================
    if (user.role === "ADMIN") {
      // Admins cannot change other admin's passwords
      if (targetUser.role === "ADMIN" && user.id !== userId) {
        return NextResponse.json(
          {
            message: "Forbidden: Admins cannot change other admins' passwords",
          },
          { status: 403 }
        );
      }

      // If admin is changing their own password, require old password
      if (user.id === userId) {
        const validation = validateSchema(changePasswordEditorSchema, body);

        if (!validation.success) {
          return NextResponse.json(
            {
              message: "Validation failed",
              errors: validation.errors,
            },
            { status: 400 }
          );
        }

        const { oldPassword, newPassword } = validation.data;

        // Verify current password exists
        if (!targetUser.password) {
          return NextResponse.json(
            {
              message: "Password not set for this user",
            },
            { status: 400 }
          );
        }

        // Verify old password
        const isOldPasswordValid = await bcrypt.compare(
          oldPassword,
          targetUser.password
        );

        if (!isOldPasswordValid) {
          return NextResponse.json(
            {
              message: "Current password is incorrect",
            },
            { status: 401 }
          );
        }

        // Check that new password is different from old password
        const isSamePassword = await bcrypt.compare(
          newPassword,
          targetUser.password
        );

        if (isSamePassword) {
          return NextResponse.json(
            {
              message: "New password must be different from current password",
            },
            { status: 400 }
          );
        }

        // Hash new password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await prisma.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });

        // Log password change
        console.info(
          `[AUDIT] Password changed: Admin ${userId} (${targetUser.email}) changed their own password`
        );

        return NextResponse.json({
          message: "Password changed successfully",
          data: { success: true },
        });
      }

      // Admin changing another editor's password - no old password required
      const validation = validateSchema(changePasswordAdminSchema, body);

      if (!validation.success) {
        return NextResponse.json(
          {
            message: "Validation failed",
            errors: validation.errors,
          },
          { status: 400 }
        );
      }

      const { newPassword } = validation.data;

      // Hash new password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      // Log password change for audit purposes
      console.info(
        `[AUDIT] Password reset: Admin ${user.id} reset password for user ${userId} (${targetUser.email})`
      );

      return NextResponse.json({
        message: "Password changed successfully",
        data: { success: true },
      });
    }

    // Should never reach here
    return NextResponse.json(
      {
        message: "Forbidden: Invalid role",
      },
      { status: 403 }
    );
  } catch (error) {
    console.error("[ERROR] Failed to change password:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "User not found",
          },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to change password",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
