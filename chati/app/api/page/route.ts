import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  pagePaginationSchema,
  pageListFiltersSchema,
  validatePageSchema,
} from "@/lib/page-validation";
import { Prisma } from "@prisma/client";

/**
 * GET /api/page
 * Retrieves a paginated list of pages with optional filters
 * PUBLIC ENDPOINT - No authentication required
 *
 * @param req - Next.js request object
 * @returns Paginated list of pages or error response
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // NOTE: NO AUTHENTICATION - This is a public endpoint
    // Anyone can view all pages

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const queryParams = {
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      status: searchParams.get("status"),
      search: searchParams.get("search"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
    };

    // Validate pagination parameters
    const paginationValidation = validatePageSchema(pagePaginationSchema, {
      page: queryParams.page,
      limit: queryParams.limit,
    });

    if (!paginationValidation.success) {
      return NextResponse.json(
        {
          message: "Invalid pagination parameters",
          errors: paginationValidation.errors,
        },
        { status: 400 }
      );
    }

    const { page, limit } = paginationValidation.data;
    const pageNum = Number(page);
    const limitNum = Number(limit);

    // Validate filters
    const filtersValidation = validatePageSchema(pageListFiltersSchema, {
      status: queryParams.status,
      search: queryParams.search,
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
    });

    if (!filtersValidation.success) {
      return NextResponse.json(
        {
          message: "Invalid filter parameters",
          errors: filtersValidation.errors,
        },
        { status: 400 }
      );
    }

    const { status, search, sortBy, sortOrder } = filtersValidation.data;

    // Build where clause
    const where: Prisma.PageWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    // Calculate pagination
    const skip = (pageNum - 1) * limitNum;

    // Build orderBy object
    const orderBy: Prisma.PageOrderByWithRelationInput = {
      [sortBy as string]: sortOrder,
    };

    // Execute query with pagination
    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        where,
        select: {
          id: true,
          slug: true,
          title: true,
          status: true,
          publishedAt: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.page.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);
    const hasMore = pageNum < totalPages;

    return NextResponse.json({
      message: "Pages fetched successfully",
      data: pages,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    console.error("[ERROR] Failed to fetch pages:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch pages",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
