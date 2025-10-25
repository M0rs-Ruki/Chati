import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { error, user } = await requireAuth(req);
    if (error)
      return NextResponse.json(
        { error: `Unauthorized: ${error}` },
        { status: 401 }
      );

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize)
      return NextResponse.json(
        { error: "File size exceeds 5MB" },
        { status: 400 }
      );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "chati-cms",
      resource_type: "auto",
    });

    const media = await prisma.media.create({
      data: {
        url: uploadResponse.secure_url,
        alt: alt || file.name,
        width: uploadResponse.width || null,
        height: uploadResponse.height || null,
        contentType: file.type,
        size: file.size,
        createdById: user!.userId,
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        media,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload media error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
