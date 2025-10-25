import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

// GET single page
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { id } = await params;

    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
        theme: true,
        seo: true,
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ page }, { status: 200 });
  } catch (error) {
    console.error("Get page error:", error);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

// PUT update page
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { id } = await params;
    const body = await req.json();
    const { slug, title, description, layout, themeId } = body;

    // Check if slug is taken by another page
    if (slug) {
      const existingPage = await prisma.page.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });

      if (existingPage) {
        return NextResponse.json(
          { error: "Slug already in use" },
          { status: 409 }
        );
      }
    }

    const updateData: any = {};
    if (slug !== undefined) updateData.slug = slug;
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (layout !== undefined) updateData.layout = layout;
    if (themeId !== undefined) updateData.themeId = themeId;

    const page = await prisma.page.update({
      where: { id },
      data: updateData,
      include: {
        sections: { orderBy: { order: "asc" } },
        theme: true,
      },
    });

    return NextResponse.json(
      {
        message: "Page updated successfully",
        page,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Update page error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: unknown }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}

// DELETE page
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { id } = await params;

    await prisma.page.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Page deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Delete page error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: unknown }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}
