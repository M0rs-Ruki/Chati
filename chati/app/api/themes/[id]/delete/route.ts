import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";
import type { ApiResponse } from "@/lib/theme-types";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user (Admin or Editor can delete themes)
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check if user has permission (ADMIN or EDITOR)
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can delete themes." },
        { status: 403 }
      );
    }

    // Rate limiting
    const rateLimitError = checkRateLimit(
      user.id,
      RATE_LIMIT_CONFIGS.themeDelete,
      "theme-delete"
    );
    if (rateLimitError) {
      return rateLimitError;
    }

    const { id: themeId } = await params;

    // Check if theme exists
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme) {
      return NextResponse.json(
        { message: "Theme not found" },
        { status: 404 }
      );
    }

    // Prevent deletion of default theme (optional business rule)
    if (theme.isDefault) {
      return NextResponse.json(
        { 
          message: "Cannot delete the default theme. Please set another theme as default first." 
        },
        { status: 409 }
      );
    }

    // Delete theme using transaction for safety
    await prisma.$transaction(async (tx) => {
      await tx.theme.delete({
        where: { id: themeId },
      });
    });

    // Audit logging
    console.info(
      `[AUDIT] Theme deleted - ID: ${themeId}, Name: ${theme.name}, By: ${user.email} (${user.role})`
    );

    const response: ApiResponse<{ success: boolean }> = {
      message: "Theme deleted successfully",
      data: { success: true },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[ERROR] Error deleting theme:", error);
    return NextResponse.json(
      { message: "Failed to delete theme" },
      { status: 500 }
    );
  }
}
