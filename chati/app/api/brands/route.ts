import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can view brands." },
        { status: 403 }
      );
    }

    const brands = await prisma.brand.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Brands fetched successfully",
      data: brands,
    });
  } catch (error) {
    console.error("[ERROR] Error fetching brands:", error);
    return NextResponse.json(
      { message: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}
