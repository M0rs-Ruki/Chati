import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get default theme
    const theme = await prisma.theme.findFirst({
      where: { isDefault: true },
    });

    if (!theme) {
      // Return default colors if no theme
      return NextResponse.json({
        primaryColor: "#3B82F6",
        secondaryColor: "#8B5CF6",
        accentColor: "#10B981",
        logoUrl: null,
      });
    }

    return NextResponse.json(theme);
  } catch (error) {
    console.error("Failed to fetch theme:", error);
    return NextResponse.json({
      primaryColor: "#3B82F6",
      secondaryColor: "#8B5CF6",
      accentColor: "#10B981",
      logoUrl: null,
    });
  }
}
