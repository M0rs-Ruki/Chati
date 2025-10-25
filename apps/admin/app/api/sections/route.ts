import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

// GET Sections for a page
export async function GET(req: Request) {
  try {
    const { error } = await requireAuth(req);
    if (error)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get("pageId") as string;

    if (!pageId) {
      return NextResponse.json(
        { error: "pageId query parameter is required" },
        { status: 400 }
      );
    }

    const sections = await prisma.section.findMany({
      where: { pageId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ sections }, { status: 200 });
  } catch (error) {
    console.error("Get sections error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sections" },
      { status: 500 }
    );
  }
}

// POST create new section
export async function POST(req: Request) {
  try {
    const { error } = await requireAuth(req);
    if (error)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { pageId, kind, data, order, visible } = body;

    if (!pageId || !kind || !data)
      return NextResponse.json(
        { error: "pageId, kind and data are required" },
        { status: 400 }
      );

    const page = await prisma.page.findUnique({ where: { id: pageId } });
    if (!page)
      return NextResponse.json({ error: "Page not found" }, { status: 404 });

    let sectionOrder = order;
    if (!sectionOrder && sectionOrder !== 0) {
      const lastSection = await prisma.section.findFirst({
        where: { pageId },
        orderBy: { order: "desc" },
      });
      sectionOrder = lastSection ? lastSection.order + 1 : 0;
    }

    const section = await prisma.section.create({
      data: {
        pageId,
        kind,
        data,
        order: sectionOrder,
        visible: visible !== undefined ? visible : true,
      },
    });

    return NextResponse.json(
      {
        message: "Section created successfully",
        section,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create section error:", error);
    return NextResponse.json(
      { error: "Failed to create section" },
      { status: 500 }
    );
  }
}

