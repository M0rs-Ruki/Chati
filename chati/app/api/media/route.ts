import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { checkRateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  try {
    // Authenticate user first
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Apply rate limiting
    const identifier = getRateLimitIdentifier(req, user.id);
    const rateLimitResponse = checkRateLimit(
      identifier,
      {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 100,
        message: "Too many media requests. Please try again later.",
      },
      "media:list"
    );
    if (rateLimitResponse) return rateLimitResponse;

    // Parse and validate query parameters
    const searchParams = req.nextUrl.searchParams;
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "20", 10), 1),
      100
    );
    const skip = (page - 1) * limit;

    // Optional filters
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    // Build where clause
    const where: any = {};
    if (type) {
      where.type = type;
    }
    if (search) {
      where.alt = {
        contains: search,
        mode: "insensitive",
      };
    }

    // Get total count and media items
    const [total, media] = await Promise.all([
      prisma.media.count({ where }),
      prisma.media.findMany({
        where,
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
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Media fetched successfully",
      data: media,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
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
