import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can view brand." },
        { status: 403 }
      );
    }

    const brand = await prisma.brand.findUnique({
      where: { id: params.id },
    });

    if (!brand) {
      return NextResponse.json(
        { message: "Brand not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Brand fetched successfully",
      data: brand,
    });
  } catch (error) {
    console.error("[ERROR] Error fetching brand:", error);
    return NextResponse.json(
      { message: "Failed to fetch brand" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can delete brand." },
        { status: 403 }
      );
    }

    const brand = await prisma.brand.delete({
      where: { id: params.id },
    });

    if (!brand) {
      return NextResponse.json(
        { message: "Brand not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Brand deleted successfully",
      data: brand,
    });
  } catch (error) {
    console.error("[ERROR] Error deleting brand:", error);
    return NextResponse.json(
      { message: "Failed to delete brand" },
      { status: 500 }
    );
  }
}

