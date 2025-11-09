import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    const mediaId = params.id;

    const media = await prisma.media.findUnique({
      where: { id: mediaId },
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
    });

    if (!media) {
      return NextResponse.json({ message: "Media not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Media fetched successfully",
      data: media,
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { message: "Failed to fetch media" },
      { status: 500 }
    );
  }
}
