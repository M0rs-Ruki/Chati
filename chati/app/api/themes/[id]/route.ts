import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    const themeId = params.id;
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

    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme) {
      return NextResponse.json({ message: "Theme not found" }, { status: 404 });
    }

    if (isDefault === true) {
      await prisma.theme.updateMany({
        where: { id: { not: themeId } },
        data: { isDefault: false },
      });
    }

    const updatedTheme = await prisma.theme.update({
      where: { id: themeId },
      data: {
        ...(name && { name }),
        ...(primaryColor && { primaryColor }),
        ...(secondaryColor !== undefined && { secondaryColor }),
        ...(accentColor !== undefined && { accentColor }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(faviconUrl !== undefined && { faviconUrl }),
        ...(typography !== undefined && { typography }),
        ...(isDefault !== undefined && { isDefault }),
      },
    });

    return NextResponse.json({
      message: "Theme updated successfully",
      data: updatedTheme,
    });
  } catch (error) {
    console.error("Error updating theme:", error);
    return NextResponse.json(
      { message: "Failed to update theme" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    const themeId = params.id;

    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme) {
      return NextResponse.json({ message: "Theme not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Theme fetched successfully",
      data: theme,
    });
  } catch (error) {
    console.error("Error fetching theme:", error);
    return NextResponse.json(
      { message: "Failed to fetch theme" },
      { status: 500 }
    );
  }
}
