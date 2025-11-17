import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import {
  checkRateLimit,
  getRateLimitIdentifier,
  RATE_LIMIT_CONFIGS,
} from "@/lib/rate-limit";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const createBrandSchema = z.object({
  name: z
    .string()
    .min(1, "Brand name is required")
    .max(200, "Brand name must be less than 200 characters")
    .trim(),
  logoUrl: z.union([
    z.string().url("Logo URL must be a valid URL"),
    z
      .array(z.string().url("Each logo URL must be a valid URL"))
      .min(1, "At least one logo URL is required"),
  ]),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

/**
 * POST /api/brands/create
 * Creates a new brand
 * Requires ADMIN or EDITOR role
 */
export async function POST(req: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          message: "Access denied. Only admins and editors can create brands.",
        },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userCreate,
      "brand-create"
    );
    if (rateLimitError) return rateLimitError;

    const body = await req.json().catch(() => ({}));

    // Validate input
    const validation = createBrandSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => {
        const path = err.path.join(".");
        return path ? `${path}: ${err.message}` : err.message;
      });
      return NextResponse.json(
        {
          message: "Validation failed",
          errors,
        },
        { status: 400 }
      );
    }

    const { name, logoUrl, status } = validation.data;

    // Check for duplicate brand name
    const existingBrand = await prisma.brand.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });

    if (existingBrand) {
      return NextResponse.json(
        { message: `Brand "${name}" already exists.` },
        { status: 409 }
      );
    }

    // Ensure logoUrl is an array
    const logoUrlArray = Array.isArray(logoUrl) ? logoUrl : [logoUrl];

    const newBrand = await prisma.brand.create({
      data: {
        name,
        logoUrl: logoUrlArray,
        status: status || "INACTIVE",
      },
    });

    console.info(
      `[AUDIT] Brand created: ${newBrand.id} (${newBrand.name}) by user: ${user.id} (${user.email})`
    );

    return NextResponse.json(
      {
        message: "Brand created successfully",
        data: newBrand,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ERROR] Error creating brand:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: "A brand with this name already exists.",
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to create brand",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}
