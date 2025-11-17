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

const updateBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required").max(200, "Brand name must be less than 200 characters").trim().optional(),
  logoUrl: z.string().url("Logo URL must be a valid URL").optional(),
}).refine((data) => data.name !== undefined || data.logoUrl !== undefined, {
  message: "At least one field (name or logoUrl) must be provided for update",
});

/**
 * PUT /api/brands/[id]/edit
 * Updates a specific brand by ID
 * Requires ADMIN or EDITOR role
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can edit brand." },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userUpdate,
      "brand-update"
    );
    if (rateLimitError) return rateLimitError;

    const body = await req.json().catch(() => ({}));

    // Validate input
    const validation = updateBrandSchema.safeParse(body);
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

    const { name, logoUrl } = validation.data;

    // Check if brand exists
    const existingBrand = await prisma.brand.findUnique({
      where: { id: params.id },
    });

    if (!existingBrand) {
      return NextResponse.json(
        { message: "Brand not found." },
        { status: 404 }
      );
    }

    // Check for duplicate name if name is being changed
    if (name && name !== existingBrand.name) {
      const duplicateBrand = await prisma.brand.findFirst({
        where: {
          name: { equals: name, mode: "insensitive" },
          NOT: { id: params.id },
        },
      });

      if (duplicateBrand) {
        return NextResponse.json(
          { message: `Brand "${name}" already exists.` },
          { status: 409 }
        );
      }
    }

    // Build update data
    const updateData: Prisma.BrandUpdateInput = {};
    if (name !== undefined) updateData.name = name;
    if (logoUrl !== undefined) updateData.logoUrl = [logoUrl]; // logoUrl is String[] in schema

    const updatedBrand = await prisma.brand.update({
      where: { id: params.id },
      data: updateData,
    });

    console.info(`[AUDIT] Brand updated: ${updatedBrand.id} (${updatedBrand.name}) by user: ${user.id} (${user.email})`);

    return NextResponse.json({
      message: "Brand updated successfully",
      data: updatedBrand,
    });
  } catch (error) {
    console.error("[ERROR] Error updating brand:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Brand not found." },
          { status: 404 }
        );
      }
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "A brand with this name already exists." },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to update brand",
        errors: ["An unexpected error occurred. Please try again later."],
      },
      { status: 500 }
    );
  }
}