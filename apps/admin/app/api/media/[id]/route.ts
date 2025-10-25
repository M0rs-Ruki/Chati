import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import cloudinary from "@/lib/cloudinary";

// GET single media
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { id } = await params;

    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json({ media }, { status: 200 });
  } catch (error) {
    console.error("Get media error:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// PUT update media (alt text)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { id } = await params;

    let body;
    try {
      const text = await req.text(); // Get raw text first
      console.log("Raw body:", text); // Debug log
      body = JSON.parse(text); // Parse manually
    } catch (parseError: any) {
      console.error("JSON parse error:", parseError.message);
      return NextResponse.json(
        { error: `Invalid JSON: ${parseError.message}` },
        { status: 400 }
      );
    }

    const { alt } = body;

    if (!alt) {
      return NextResponse.json(
        { error: "alt text is required" },
        { status: 400 }
      );
    }

    const media = await prisma.media.update({
      where: { id },
      data: { alt },
    });

    return NextResponse.json(
      {
        message: "Media updated successfully",
        media,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update media error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}

// DELETE media
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { id } = await params;

    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Extract public_id from Cloudinary URL
    const urlParts = media.url.split("/");
    const filename = urlParts[urlParts.length - 1];
    const publicId = `chati-cms/${filename.split(".")[0]}`;

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (cloudinaryError) {
      console.error("Cloudinary delete error:", cloudinaryError);
      // Continue even if Cloudinary delete fails
    }

    // Delete from database
    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Media deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete media error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}
