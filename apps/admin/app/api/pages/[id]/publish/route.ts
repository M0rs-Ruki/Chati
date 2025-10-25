import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error, user } = await requireAuth(req);
    if (error) return error;

    // Only ADMIN and EDITOR can publish
    if (user!.role !== "ADMIN" && user!.role !== "EDITOR") {
      return NextResponse.json(
        { error: "Only admins and editors can publish pages" },
        { status: 403 }
      );
    }

    const { id } = await params;

    const page = await prisma.page.update({
      where: { id },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
      include: {
        sections: { orderBy: { order: "asc" } },
      },
    });

    // TODO: Trigger ISR revalidation webhook here

    return NextResponse.json(
      {
        message: "Page published successfully",
        page,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Publish page error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to publish page" },
      { status: 500 }
    );
  }
}
