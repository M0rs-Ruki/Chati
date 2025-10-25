import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

// GET all pages
export async function GET(req: Request) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const pages = await prisma.page.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        sections: {
          orderBy: { order: "asc" },
          select: { id: true, kind: true, order: true, visible: true },
        },
        theme: {
          select: { id: true, name: true, primaryColor: true },
        },
        seo: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ pages }, { status: 200 });
  } catch (error) {
    console.error("Get pages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

// POST create new page
export async function POST(req: Request) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const body = await req.json();
    const { slug, title, description, layout, themeId } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug },
    });

    if (existingPage) {
      return NextResponse.json(
        { error: "Page with this slug already exists" },
        { status: 409 }
      );
    }

    const page = await prisma.page.create({
      data: {
        slug,
        title,
        description: description || null,
        layout: layout || "STANDARD",
        status: "DRAFT",
        themeId: themeId || null,
      },
      include: {
        sections: true,
        theme: true,
      },
    });

    return NextResponse.json(
      {
        message: "Page created successfully",
        page,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create page error:", error);
    return NextResponse.json(
      { error: "Failed to create page" },
      { status: 500 }
    );
  }
}
