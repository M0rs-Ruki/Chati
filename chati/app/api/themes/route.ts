import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Fetch all themes sorted by newest first
    const themes = await prisma.theme.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Themes fetched successfully",
      data: themes,
    });
  } catch (error) {
    console.error("Error fetching themes:", error);
    return NextResponse.json(
      { message: "Failed to fetch themes" },
      { status: 500 }
    );
  }
}
