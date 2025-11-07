import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import {
  pageIdSchema,
  updatePageSchema,
  slugSchema,
  validatePageSchema,
} from "@/lib/page-validation";
import type { GetPageResponse, UpdatePageResponse } from "@/lib/page-types";
import { Prisma } from "@prisma/client";

/**
 * GET /api/page/[id]
 * Retrieves a specific page by ID
 * PUBLIC ENDPOINT - No authentication required
 *
 * @param req - Next.js request object
 * @param params - Route parameters containing page ID
 * @returns Page data or error response
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // NOTE: NO AUTHENTICATION - This is a public endpoint
    // Anyone can view a specific page

    // Validate page ID format
    const pageIdValidation = validatePageSchema(pageIdSchema, params.id);
    if (!pageIdValidation.success) {
      return NextResponse.json(
        {
          message: "Invalid page ID format",
          errors: pageIdValidation.errors,
        },
        { status: 400 }
      );
    }

    const pageId = pageIdValidation.data;

    // Fetch page
    const page = await prisma.page.findUnique({
      where: { id: pageId },
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

    if (!page) {
      return NextResponse.json(
        {
          message: "Page not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Page fetched successfully",
      data: page,
    });
  } catch (error) {
    console.error("[ERROR] Failed to fetch page:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch page",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/page/[id]
 * Updates a page's information
 * Both ADMIN and EDITOR can update any page
 *
 * @param req - Next.js request object
 * @param params - Route parameters containing page ID
 * @returns Updated page data or error response
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Authenticate user - Both ADMIN and EDITOR can update
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check authorization - only admins and editors can update pages
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          message: "Forbidden: Only admins and editors can update pages",
        },
        { status: 403 }
      );
    }

    // Validate page ID format
    const pageIdValidation = validatePageSchema(pageIdSchema, params.id);
    if (!pageIdValidation.success) {
      return NextResponse.json(
        {
          message: "Invalid page ID format",
          errors: pageIdValidation.errors,
        },
        { status: 400 }
      );
    }

    const pageId = pageIdValidation.data;

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userUpdate, // Reusing user update config
      "page-update"
    );
    if (rateLimitError) return rateLimitError;

    // Parse and validate request body
    const body = await req.json().catch(() => ({}));
    const validation = validatePageSchema(updatePageSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { title, slug, content, metadata, status } = validation.data;

    // Fetch current page
    const currentPage = await prisma.page.findUnique({
      where: { id: pageId },
      select: {
        id: true,
        slug: true,
        status: true,
        publishedAt: true,
      },
    });

    if (!currentPage) {
      return NextResponse.json(
        {
          message: "Page not found",
        },
        { status: 404 }
      );
    }

    // Check slug uniqueness if slug is being changed
    if (slug && slug !== currentPage.slug) {
      const existingPage = await prisma.page.findUnique({
        where: { slug },
        select: { id: true, title: true },
      });

      if (existingPage && existingPage.id !== pageId) {
        return NextResponse.json(
          {
            message: `Slug "${slug}" is already used by another page: "${existingPage.title}". Please use a different slug.`,
          },
          { status: 409 }
        );
      }
    }

    // Build update data
    const updateData: Prisma.PageUpdateInput = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    if (slug !== undefined) {
      updateData.slug = slug;
    }

    if (content !== undefined) {
      updateData.content = content as any;
    }

    if (metadata !== undefined) {
      updateData.metadata = metadata as any;
    }

    if (status !== undefined) {
      updateData.status = status;

      // Set publishedAt if status is being changed to PUBLISHED and it wasn't published before
      if (status === "PUBLISHED" && !currentPage.publishedAt) {
        updateData.publishedAt = new Date();
      }

      // Clear publishedAt if status is being changed from PUBLISHED to something else
      if (status !== "PUBLISHED" && currentPage.status === "PUBLISHED") {
        updateData.publishedAt = null;
      }
    }

    // Update page
    const updatedPage = await prisma.page.update({
      where: { id: pageId },
      data: updateData,
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

    // Log page update for audit purposes
    console.info(
      `[AUDIT] Page updated: ${updatedPage.id} (${updatedPage.slug}) by user: ${user.id} (${user.email})`
    );

    return NextResponse.json({
      message: "Page updated successfully",
      data: updatedPage,
    });
  } catch (error) {
    console.error("[ERROR] Failed to update page:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message:
              "Slug is already used by another page. Please use a different slug.",
          },
          { status: 409 }
        );
      }

      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Page not found",
          },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to update page",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
