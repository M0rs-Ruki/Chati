import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/public/theme
 * PUBLIC ENDPOINT - Get the active/default theme
 */
export async function GET(request: NextRequest) {
  try {
    // Get the default theme or the first theme
    const theme = await prisma.theme.findFirst({
      where: { isDefault: true },
      orderBy: { updatedAt: 'desc' },
    });
    
    // If no default theme, get any theme
    const activeTheme = theme || await prisma.theme.findFirst({
      orderBy: { updatedAt: 'desc' },
    });
    
    if (!activeTheme) {
      // Return default hardcoded theme if none exists in DB
      return NextResponse.json({
        message: "Using default theme",
        data: {
          id: "default",
          name: "Default Theme",
          primaryColor: "#2563eb", // blue-600
          secondaryColor: "#7c3aed", // purple-600
          accentColor: "#10b981", // green-500
          logoUrl: null,
          faviconUrl: null,
          typography: "Inter",
          isDefault: true,
        }
      });
    }
    
    return NextResponse.json({
      message: "Theme fetched successfully",
      data: activeTheme
    });
  } catch (error) {
    console.error("Error fetching theme:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching theme" },
      { status: 500 }
    );
  }
}
