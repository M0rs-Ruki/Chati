import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import {
  paginationSchema,
  userListFiltersSchema,
  validateSchema,
} from "@/lib/validation";
import type { GetUsersResponse } from "@/lib/user-types";
import { Prisma } from "@prisma/client";

/**
 * GET /api/user
 * Retrieves a paginated list of users with optional filters (Admin only)
 *
 * @param req - Next.js request object
 * @returns Paginated list of users or error response
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check authorization - only admins can view all users
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Forbidden: Only admins can view all users",
        },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userRead,
      "user-list"
    );
    if (rateLimitError) return rateLimitError;

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const queryParams = {
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      role: searchParams.get("role"),
      status: searchParams.get("status"),
      search: searchParams.get("search"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
    };

    // Validate pagination parameters
    const paginationValidation = validateSchema(paginationSchema, {
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
    const filtersValidation = validateSchema(userListFiltersSchema, {
      role: queryParams.role,
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

    const { role, status, search, sortBy, sortOrder } = filtersValidation.data;

    // Build where clause
    const where: Prisma.UserWhereInput = {};

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    // Calculate pagination
    const skip = (pageNum - 1) * limitNum;

    // Build orderBy object
    const orderBy: Prisma.UserOrderByWithRelationInput = {
      [sortBy as string]: sortOrder,
    };

    // Execute query with pagination
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          createdAt: true,
        },
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);
    const hasMore = pageNum < totalPages;

    return NextResponse.json({
      message: "Users fetched successfully",
      data: users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    console.error("[ERROR] Failed to fetch users:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch users",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
