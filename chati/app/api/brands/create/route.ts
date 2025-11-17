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

// Updated schema for logo objects
const logoSchema = z.object({
  name: z.string().min(1, "Logo name is required"),
  url: z.string().url("Logo URL must be valid"),
});

const createBrandSchema = z.object({
  name: z
    .string()
    .min(1, "Brand name is required")
    .max(200, "Brand name must be less than 200 characters")
    .trim(),
  logoUrl: z.array(logoSchema).min(1, "At least one logo is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

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

    const rateLimitIdentifier = getRateLimitIdentifier(req, user.id);
    const rateLimitError = checkRateLimit(
      rateLimitIdentifier,
      RATE_LIMIT_CONFIGS.userCreate,
      "brand-create"
    );
    if (rateLimitError) return rateLimitError;

    const body = await req.json().catch(() => ({}));

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

    const existingBrand = await prisma.brand.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });

    if (existingBrand) {
      return NextResponse.json(
        { message: `Brand "${name}" already exists.` },
        { status: 409 }
      );
    }

    const newBrand = await prisma.brand.create({
      data: {
        name,
        logoUrl: logoUrl as any, // Prisma will store this as Json
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
