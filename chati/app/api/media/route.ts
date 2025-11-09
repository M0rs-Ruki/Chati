import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "20", 10),
      100
    );
    const skip = (page - 1) * limit;

    const total = await prisma.media.count();

    const media = await prisma.media.findMany({
      select: {
        id: true,
        url: true,
        alt: true,
        type: true,
        size: true,
        uploadedAt: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { uploadedAt: "desc" },
      skip,
      take: limit,
    });

    return NextResponse.json({
      message: "Media fetched successfully",
      data: media,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { message: "Failed to fetch media" },
      { status: 500 }
    );
  }
}
