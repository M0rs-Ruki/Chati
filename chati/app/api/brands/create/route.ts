import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          message: "Access denied. Only admins and editors can create brands.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, logoUrl } = body;

    if (!name || !logoUrl) {
      return NextResponse.json(
        { message: "Name and images are required to create a brand." },
        { status: 400 }
      );
    }

    const newBrand = await prisma.brand.create({
      data: {
        name,
        logoUrl,
      },
    });

    return NextResponse.json(
      {
        message: "Brand created successfully",
        data: newBrand,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ERROR] Error creating brand:", error);
    return NextResponse.json(
      { message: "Failed to create brand" },
      { status: 500 }
    );
  }
}
