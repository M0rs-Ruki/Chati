import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";
import { toPublicThemeData } from "@/lib/theme-types";
import type { ApiResponse, PublicThemeData } from "@/lib/theme-types";

export async function GET(req: NextRequest) {
  try {
    // Authenticate user (Admin or Editor can view themes)
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check if user has permission (ADMIN or EDITOR)
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can view themes." },
        { status: 403 }
      );
    }

    // Rate limiting
    const rateLimitError = checkRateLimit(
      user.id,
      RATE_LIMIT_CONFIGS.themeRead,
      "theme-read"
    );
    if (rateLimitError) {
      return rateLimitError;
    }

    // Fetch all themes sorted by newest first
    const themes = await prisma.theme.findMany({
      orderBy: { createdAt: "desc" },
    });

    const publicThemes = themes.map(toPublicThemeData);

    const response: ApiResponse<PublicThemeData[]> = {
      message: "Themes fetched successfully",
      data: publicThemes,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[ERROR] Error fetching themes:", error);
    return NextResponse.json(
      { message: "Failed to fetch themes" },
      { status: 500 }
    );
  }
}
