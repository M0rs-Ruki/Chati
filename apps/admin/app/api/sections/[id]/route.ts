import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

// GET single section
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const section = await prisma.section.findUnique({
      where: { id },
      include: {
        page: {
          select: { id: true, title: true, slug: true },
        },
      },
    });

    if (!section)
      return NextResponse.json({ error: "Section not found" }, { status: 404 });

    return NextResponse.json({ section }, { status: 200 });
  } catch (error) {
    console.error("Get section error:", error);
    return NextResponse.json(
      { error: "Failed to fetch section" },
      { status: 500 }
    );
  }
}

// PUT update section
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { kind, data, order, visible } = body;

    const updatedData: any = {};
    if (kind !== undefined) updatedData.kind = kind;
    if (data !== undefined) updatedData.data = data;
    if (order !== undefined) updatedData.order = order;
    if (visible !== undefined) updatedData.visible = visible;

    const section = await prisma.section.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(
      {
        message: "Section updated successfully",
        section,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update section error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update section" },
      { status: 500 }
    );
  }
}

// DELETE section
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    await prisma.section.delete({ where: { id } });

    return NextResponse.json(
      { message: "Section deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete section error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete section" },
      { status: 500 }
    );
  }
}
