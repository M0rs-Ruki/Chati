import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import { createPageSchema, validatePageSchema } from "@/lib/page-validation";
import type { CreatePageResponse } from "@/lib/page-types";
import { Prisma } from "@prisma/client";

/**
 * Generates a URL-friendly slug from a title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * POST /api/page/create
 * Creates a new page (Admin and Editor can create)
 *
 * @param req - Next.js request object
 * @returns Created page data or error response
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate user - Both ADMIN and EDITOR can create pages
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check authorization - only admins and editors can create pages
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          message: "Forbidden: Only admins and editors can create pages",
        },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userCreate, // Reusing user create config
      "page-create"
    );
    if (rateLimitError) return rateLimitError;

    // Parse and validate request body
    const body = await req.json().catch(() => ({}));
    const validation = validatePageSchema(createPageSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { title, content, metadata, status } = validation.data;

    // Generate slug from title
    const slug = generateSlug(title);

    if (!slug) {
      return NextResponse.json(
        {
          message: "Failed to generate slug from title. Please use a valid title with alphanumeric characters.",
        },
        { status: 400 }
      );
    }

    // Check if slug already exists - NO DUPLICATES ALLOWED
    const existingPage = await prisma.page.findUnique({
      where: { slug },
      select: { id: true, title: true },
    });

    if (existingPage) {
      return NextResponse.json(
        {
          message: `A page with similar title already exists. Slug "${slug}" is already taken by "${existingPage.title}". Please use a different title.`,
        },
        { status: 409 }
      );
    }

    // Default content and metadata if not provided
    const defaultContent = {
      blocks: [],
    };

    const defaultMetadata = {
      description: "",
      keywords: [],
      tags: [],
    };

    // Set publishedAt if status is PUBLISHED
    const publishedAt = status === "PUBLISHED" ? new Date() : null;

    // Create page with authenticated user as author
    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content: (content as any) || defaultContent,
        metadata: (metadata as any) || defaultMetadata,
        status: status || "DRAFT",
        publishedAt,
        authorId: user.id, // Use authenticated user's ID as author
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Log page creation for audit purposes
    console.info(
      `[AUDIT] Page created: ${page.id} (${page.slug}) by user: ${user.id} (${user.email})`
    );

    return NextResponse.json(
      {
        message: "Page created successfully",
        data: page,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ERROR] Failed to create page:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: "A page with this slug already exists. Please use a different title.",
          },
          { status: 409 }
        );
      }

      if (error.code === "P2003") {
        return NextResponse.json(
          {
            message: "Invalid author ID",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to create page",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
