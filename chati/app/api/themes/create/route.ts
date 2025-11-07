import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    const body = await req.json();
    const {
      name,
      primaryColor,
      secondaryColor,
      accentColor,
      logoUrl,
      faviconUrl,
      typography,
    } = body;

    if (!name || !primaryColor || !secondaryColor || !logoUrl) {
      return NextResponse.json(
        { message: "Name and primaryColor are required" },
        { status: 400 }
      );
    }

    const existingTheme = await prisma.theme.findUnique({
      where: { name },
    });

    if (existingTheme) {
      return NextResponse.json(
        { message: "Theme with this name already exists" },
        { status: 409 }
      );
    }

    await prisma.theme.updateMany({
      data: { isDefault: false },
    });

    const theme = await prisma.theme.create({
      data: {
        name,
        primaryColor,
        secondaryColor: secondaryColor || null,
        accentColor: accentColor || null,
        logoUrl: logoUrl || null,
        faviconUrl: faviconUrl || null,
        typography: typography || null,
        isDefault: true,
      },
    });

    return NextResponse.json(
      {
        message: "Theme created successfully and set as active",
        data: theme,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating theme:", error);
    return NextResponse.json(
      { message: "Failed to create theme" },
      { status: 500 }
    );
  }
}
