import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Ensure this route is not cached and runs on every request
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const brands = await prisma.brand.findMany({
      where: { status: "ACTIVE" }, // Only active brands
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        theme: true
      },
    });

    return NextResponse.json({
      message: "Brands fetched successfully",
      data: brands,
    });
  } catch (error) {
    console.error("[ERROR] Error fetching brands:", error);

    // Provide more detailed error information
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const isDatabaseError =
      errorMessage.includes("Prisma") || errorMessage.includes("database");

    return NextResponse.json(
      {
        message: "Failed to fetch brands",
        errors: [
          isDatabaseError
            ? "Database connection error. Please check your database configuration."
            : "An unexpected error occurred. Please try again later.",
        ],
        error:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
