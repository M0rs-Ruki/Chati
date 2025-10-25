import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

// PUT reorder sections
export async function PUT(req: Request) {
  try {
    const { error } = await requireAuth(req);
    if (error)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { sections } = body;

    if (!Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json(
        { error: "sections array is required" },
        { status: 400 }
      );
    }

    await prisma.$transaction(
      sections.map(({ id, order }) =>
        prisma.section.update({
          where: { id },
          data: { order },
        })
      )
    );

    return NextResponse.json(
      { message: "Sections reordered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reorder sections error:", error);
    return NextResponse.json(
      { error: "Failed to reorder sections" },
      { status: 500 }
    );
  }
}
