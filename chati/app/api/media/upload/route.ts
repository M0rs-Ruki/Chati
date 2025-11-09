import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    // Authenticate user (Admin or Editor can upload)
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check permissions
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can upload media." },
        { status: 403 }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;

    // Validation
    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    if (!alt || alt.trim().length === 0) {
      return NextResponse.json(
        { message: "Alt text is required" },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, fileName);

    // Save to database
    const media = await prisma.media.create({
      data: {
        url: uploadResult.url,
        alt: alt.trim(),
        type: file.type,
        size: uploadResult.size,
        createdById: user.id,
      },
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

    // Audit log
    console.info(
      `[AUDIT] Media uploaded - ID: ${media.id}, By: ${user.email} (${user.role})`
    );

    return NextResponse.json(
      {
        message: "Media uploaded successfully",
        data: media,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json(
      { message: "Failed to upload media" },
      { status: 500 }
    );
  }
}
