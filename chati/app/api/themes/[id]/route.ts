import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";
import { updateThemeSchema } from "@/lib/theme-validation";
import { toPublicThemeData } from "@/lib/theme-types";
import type {
  ApiResponse,
  PublicThemeData,
  ErrorResponse,
} from "@/lib/theme-types";
import { ZodError } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user (Admin or Editor can view themes)
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check if user has permission (ADMIN or EDITOR)
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        { message: "Access denied. Only admins and editors can view themes." },
        { status: 403 }
      );
    }

    // Rate limiting
    const rateLimitError = checkRateLimit(
      user.id,
      RATE_LIMIT_CONFIGS.themeRead,
      "theme-read"
    );
    if (rateLimitError) {
      return rateLimitError;
    }

    const { id: themeId } = await params;

    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme) {
      return NextResponse.json({ message: "Theme not found" }, { status: 404 });
    }

    const response: ApiResponse<PublicThemeData> = {
      message: "Theme fetched successfully",
      data: toPublicThemeData(theme),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[ERROR] Error fetching theme:", error);
    return NextResponse.json(
      { message: "Failed to fetch theme" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user (Admin or Editor can update themes)
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check if user has permission (ADMIN or EDITOR)
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          message: "Access denied. Only admins and editors can update themes.",
        },
        { status: 403 }
      );
    }

    // Rate limiting
    const rateLimitError = checkRateLimit(
      user.id,
      RATE_LIMIT_CONFIGS.themeUpdate,
      "theme-update"
    );
    if (rateLimitError) {
      return rateLimitError;
    }

    const { id: themeId } = await params;

    // Parse and validate request body
    const body = await req.json();

    let validatedData;
    try {
      validatedData = updateThemeSchema.parse(body);
    } catch (err) {
      if (err instanceof ZodError) {
        const errorResponse: ErrorResponse = {
          message: "Validation failed",
          errors: err.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        };
        return NextResponse.json(errorResponse, { status: 400 });
      }
      throw err;
    }

    const {
      name,
      primaryColor,
      secondaryColor,
      accentColor,
      logoUrl,
      faviconUrl,
      typography,
      isDefault,
    } = validatedData;

    // Check if theme exists
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme) {
      return NextResponse.json({ message: "Theme not found" }, { status: 404 });
    }

    // If changing name, check for duplicates
    if (name && name !== theme.name) {
      const existingTheme = await prisma.theme.findUnique({
        where: { name },
      });

      if (existingTheme) {
        return NextResponse.json(
          { message: "Theme with this name already exists" },
          { status: 409 }
        );
      }
    }

    // If setting this theme as default, set all others to non-default
    if (isDefault === true) {
      await prisma.theme.updateMany({
        where: { id: { not: themeId } },
        data: { isDefault: false },
      });
    }

    // Update theme
    const updatedTheme = await prisma.theme.update({
      where: { id: themeId },
      data: {
        ...(name !== undefined && { name }),
        ...(primaryColor !== undefined && { primaryColor }),
        ...(secondaryColor !== undefined && { secondaryColor }),
        ...(accentColor !== undefined && { accentColor }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(faviconUrl !== undefined && { faviconUrl }),
        ...(typography !== undefined && { typography }),
        ...(isDefault !== undefined && { isDefault }),
      },
    });

    // Audit logging
    console.info(
      `[AUDIT] Theme updated - ID: ${updatedTheme.id}, Name: ${updatedTheme.name}, By: ${user.email} (${user.role})`
    );

    const response: ApiResponse<PublicThemeData> = {
      message: "Theme updated successfully",
      data: toPublicThemeData(updatedTheme),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[ERROR] Error updating theme:", error);
    return NextResponse.json(
      { message: "Failed to update theme" },
      { status: 500 }
    );
  }
}
