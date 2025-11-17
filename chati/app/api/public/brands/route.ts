import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const brands = await prisma.brand.findMany({
      where: { status: "ACTIVE" }, // Only active brands
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        logoUrl: true,
      },
    });

    return NextResponse.json({
      message: "Brands fetched successfully",
      data: brands,
    });
  } catch (error) {
    console.error("[ERROR] Error fetching brands:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch brands",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
