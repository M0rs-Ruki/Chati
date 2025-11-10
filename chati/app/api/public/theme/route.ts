import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const themes = await prisma.theme.findMany();
    return NextResponse.json(themes);
  } catch (error) {
    console.error("Error fetching themes:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching themes" },
      { status: 500 }
    );
  }
}
