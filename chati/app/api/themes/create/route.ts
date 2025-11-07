import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";
import { createThemeSchema } from "@/lib/theme-validation";
import { toPublicThemeData } from "@/lib/theme-types";
import type {
  ApiResponse,
  PublicThemeData,
  ErrorResponse,
} from "@/lib/theme-types";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    // Authenticate user (Admin or Editor can create themes)
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Check if user has permission (ADMIN or EDITOR)
    if (user.role !== "ADMIN" && user.role !== "EDITOR") {
      return NextResponse.json(
        {
          message: "Access denied. Only admins and editors can create themes.",
        },
        { status: 403 }
      );
    }

    // Rate limiting
    const rateLimitError = checkRateLimit(
      user.id,
      RATE_LIMIT_CONFIGS.themeCreate,
      "theme-create"
    );
    if (rateLimitError) {
      return rateLimitError;
    }

    // Parse and validate request body
    const body = await req.json();

    let validatedData;
    try {
      validatedData = createThemeSchema.parse(body);
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
    } = validatedData;

    // Check for duplicate theme name
    const existingTheme = await prisma.theme.findUnique({
      where: { name },
    });

    if (existingTheme) {
      return NextResponse.json(
        { message: "Theme with this name already exists" },
        { status: 409 }
      );
    }

    // Set all other themes to non-default before creating new default theme
    await prisma.theme.updateMany({
      data: { isDefault: false },
    });

    // Create new theme (always set as default)
    const theme = await prisma.theme.create({
      data: {
        name,
        primaryColor,
        secondaryColor: secondaryColor ?? null,
        accentColor: accentColor ?? null,
        logoUrl: logoUrl ?? null,
        faviconUrl: faviconUrl ?? null,
        typography: typography ?? null,
        isDefault: true,
      },
    });

    // Audit logging
    console.info(
      `[AUDIT] Theme created - ID: ${theme.id}, Name: ${theme.name}, By: ${user.email} (${user.role})`
    );

    const response: ApiResponse<PublicThemeData> = {
      message: "Theme created successfully and set as active",
      data: toPublicThemeData(theme),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("[ERROR] Error creating theme:", error);
    return NextResponse.json(
      { message: "Failed to create theme" },
      { status: 500 }
    );
  }
}
