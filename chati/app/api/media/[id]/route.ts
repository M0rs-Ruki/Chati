import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { checkRateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";
import {
  mediaUpdateSchema,
  extractCloudinaryPublicId,
} from "@/lib/media-types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Apply rate limiting
    const identifier = getRateLimitIdentifier(req, user.id);
    const rateLimitResponse = checkRateLimit(
      identifier,
      {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 100,
        message: "Too many requests. Please try again later.",
      },
      "media:get"
    );
    if (rateLimitResponse) return rateLimitResponse;

    const mediaId = params.id;

    // Validate ID format
    if (!mediaId || mediaId.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid media ID",
        },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        {
          success: false,
          message: "Media not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Media fetched successfully",
      data: media,
    });
  } catch (error) {
    console.error("[MEDIA_GET_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch media",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check permissions
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Only admins and editors can update media.",
        },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const identifier = getRateLimitIdentifier(req, user.id);
    const rateLimitResponse = checkRateLimit(
      identifier,
      {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 30,
        message: "Too many update requests. Please try again later.",
      },
      "media:update"
    );
    if (rateLimitResponse) return rateLimitResponse;

    const mediaId = params.id;

    // Validate ID format
    if (!mediaId || mediaId.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid media ID",
        },
        { status: 400 }
      );
    }

    // Check if media exists
    const existingMedia = await prisma.media.findUnique({
      where: { id: mediaId },
      select: {
        id: true,
        createdById: true,
      },
    });

    if (!existingMedia) {
      return NextResponse.json(
        {
          success: false,
          message: "Media not found",
        },
        { status: 404 }
      );
    }

    // Only ADMIN or the creator can update
    if (user.role !== "ADMIN" && existingMedia.createdById !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. You can only update your own media.",
        },
        { status: 403 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON body",
        },
        { status: 400 }
      );
    }

    // Validate using Zod schema
    const validation = mediaUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const { alt } = validation.data;

    // Update media
    const updatedMedia = await prisma.media.update({
      where: { id: mediaId },
      data: {
        alt: alt,
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
      `[AUDIT] Media updated - ID: ${mediaId}, By: ${user.email} (${user.role})`
    );

    return NextResponse.json({
      success: true,
      message: "Media updated successfully",
      data: updatedMedia,
    });
  } catch (error) {
    console.error("[MEDIA_UPDATE_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update media",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check permissions - only ADMIN can delete
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Only admins can delete media.",
        },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const identifier = getRateLimitIdentifier(req, user.id);
    const rateLimitResponse = checkRateLimit(
      identifier,
      {
        windowMs: 60 * 60 * 1000, // 1 hour
        maxRequests: 50,
        message: "Too many deletion requests. Please try again later.",
      },
      "media:delete"
    );
    if (rateLimitResponse) return rateLimitResponse;

    const mediaId = params.id;

    // Validate ID format
    if (!mediaId || mediaId.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid media ID",
        },
        { status: 400 }
      );
    }

    // Check if media exists and get its details
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
      select: {
        id: true,
        url: true,
      },
    });

    if (!media) {
      return NextResponse.json(
        {
          success: false,
          message: "Media not found",
        },
        { status: 404 }
      );
    }

    // Extract Cloudinary public ID from URL
    const publicId = extractCloudinaryPublicId(media.url);

    // Delete from database first
    try {
      await prisma.media.delete({
        where: { id: mediaId },
      });
    } catch (dbError) {
      console.error("[DATABASE_DELETE_ERROR]", dbError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete media from database",
          error:
            process.env.NODE_ENV === "development" ? String(dbError) : undefined,
        },
        { status: 500 }
      );
    }

    // Then try to delete from Cloudinary (non-blocking)
    if (publicId) {
      try {
        await deleteFromCloudinary(publicId);
      } catch (cloudinaryError) {
        // Log but don't fail the request since DB deletion succeeded
        console.error(
          "[CLOUDINARY_DELETE_ERROR]",
          cloudinaryError,
          "PublicId:",
          publicId
        );
      }
    }

    // Audit log
    console.info(
      `[AUDIT] Media deleted - ID: ${mediaId}, By: ${user.email} (${user.role})`
    );

    return NextResponse.json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    console.error("[MEDIA_DELETE_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete media",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
