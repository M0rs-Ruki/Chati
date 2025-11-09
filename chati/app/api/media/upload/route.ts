import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { checkRateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";
import {
  MAX_FILE_SIZE,
  ALLOWED_MIME_TYPES,
  validateFileSignature,
  sanitizeFilename,
  mediaUploadSchema,
} from "@/lib/media-types";

export async function POST(req: NextRequest) {
  try {
    // Authenticate user (Admin or Editor can upload)
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check permissions
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Only admins and editors can upload media.",
        },
        { status: 403 }
      );
    }

    // Apply rate limiting - stricter for uploads
    const identifier = getRateLimitIdentifier(req, user.id);
    const rateLimitResponse = checkRateLimit(
      identifier,
      {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 20, // 20 uploads per 15 minutes
        message: "Too many upload requests. Please try again later.",
      },
      "media:upload"
    );
    if (rateLimitResponse) return rateLimitResponse;

    // Parse form data
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
        },
        { status: 400 }
      );
    }

    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;

    // Validation - file presence
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file provided",
        },
        { status: 400 }
      );
    }

    // Validation - alt text
    if (!alt || alt.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Alt text is required for accessibility",
        },
        { status: 400 }
      );
    }

    if (alt.trim().length > 500) {
      return NextResponse.json(
        {
          success: false,
          message: "Alt text must be less than 500 characters",
        },
        { status: 400 }
      );
    }

    // Validation - file size
    if (file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "File is empty",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`,
        },
        { status: 400 }
      );
    }

    // Validation - MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Convert file to buffer for validation and upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate file signature (magic numbers) to prevent MIME spoofing
    if (!validateFileSignature(buffer, file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "File content does not match its type. Possible file corruption or spoofing.",
        },
        { status: 400 }
      );
    }

    // Generate secure filename
    const timestamp = Date.now();
    const sanitizedName = sanitizeFilename(file.name);
    const fileName = `${timestamp}-${sanitizedName}`;

    // Upload to Cloudinary
    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(buffer, fileName);
    } catch (uploadError) {
      console.error("[CLOUDINARY_UPLOAD_ERROR]", uploadError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to upload file to storage",
          error:
            process.env.NODE_ENV === "development"
              ? String(uploadError)
              : undefined,
        },
        { status: 500 }
      );
    }

    // Save to database
    let media;
    try {
      media = await prisma.media.create({
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
    } catch (dbError) {
      console.error("[DATABASE_ERROR]", dbError);
      // TODO: Consider deleting from Cloudinary if DB save fails
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save media metadata",
          error:
            process.env.NODE_ENV === "development" ? String(dbError) : undefined,
        },
        { status: 500 }
      );
    }

    // Audit log
    console.info(
      `[AUDIT] Media uploaded - ID: ${media.id}, Size: ${media.size}bytes, By: ${user.email} (${user.role})`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Media uploaded successfully",
        data: media,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[MEDIA_UPLOAD_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload media",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
