import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

// GET active theme (or all themes)
export async function GET(req: Request) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");

    if (all === "true") {
      // Get all themes
      const themes = await prisma.theme.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ themes }, { status: 200 });
    }

    // Get default/active theme
    const theme = await prisma.theme.findFirst({
      where: { isDefault: true },
    });

    if (!theme) {
      return NextResponse.json(
        { error: "No default theme found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ theme }, { status: 200 });
  } catch (error) {
    console.error("Get theme error:", error);
    return NextResponse.json(
      { error: "Failed to fetch theme" },
      { status: 500 }
    );
  }
}

// POST create new theme
export async function POST(req: Request) {
  try {
    const { error, user } = await requireAuth(req);
    if (error) return error;

    // Only ADMIN can create themes
    if (user!.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can create themes" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      name,
      primaryColor,
      secondaryColor,
      accentColor,
      logoUrl,
      faviconUrl,
      typography,
      isDefault,
    } = body;

    if (!name || !primaryColor || !secondaryColor) {
      return NextResponse.json(
        { error: "name, primaryColor, and secondaryColor are required" },
        { status: 400 }
      );
    }

    // If this is set as default, unset all other defaults
    if (isDefault) {
      await prisma.theme.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    const theme = await prisma.theme.create({
      data: {
        name,
        primaryColor,
        secondaryColor,
        accentColor: accentColor || null,
        logoUrl: logoUrl || null,
        faviconUrl: faviconUrl || null,
        typography: typography || null,
        isDefault: isDefault || false,
      },
    });

    return NextResponse.json(
      {
        message: "Theme created successfully",
        theme,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create theme error:", error);
    return NextResponse.json(
      { error: "Failed to create theme" },
      { status: 500 }
    );
  }
}

// PUT update default theme
export async function PUT(req: Request) {
  try {
    const { error, user } = await requireAuth(req);
    if (error) return error;

    // Only ADMIN can update themes
    if (user!.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can update themes" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      id,
      name,
      primaryColor,
      secondaryColor,
      accentColor,
      logoUrl,
      faviconUrl,
      typography,
      isDefault,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Theme id is required" },
        { status: 400 }
      );
    }

    // If setting as default, unset all others
    if (isDefault) {
      await prisma.theme.updateMany({
        where: {
          isDefault: true,
          NOT: { id },
        },
        data: { isDefault: false },
      });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (primaryColor !== undefined) updateData.primaryColor = primaryColor;
    if (secondaryColor !== undefined)
      updateData.secondaryColor = secondaryColor;
    if (accentColor !== undefined) updateData.accentColor = accentColor;
    if (logoUrl !== undefined) updateData.logoUrl = logoUrl;
    if (faviconUrl !== undefined) updateData.faviconUrl = faviconUrl;
    if (typography !== undefined) updateData.typography = typography;
    if (isDefault !== undefined) updateData.isDefault = isDefault;

    const theme = await prisma.theme.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Theme updated successfully",
        theme,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update theme error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update theme" },
      { status: 500 }
    );
  }
}
