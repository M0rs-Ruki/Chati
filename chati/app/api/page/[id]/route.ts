import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    const pageId = params.id;

    const page = await prisma.page.findUnique({
      where: { id: pageId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Page fetched successfully",
      data: page,
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { message: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    const pageId = params.id;
    const body = await req.json();
    const { title, content, metadata, status } = body;

    const page = await prisma.page.findUnique({
      where: { id: pageId },
    });

    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    // Update page
    const updatedPage = await prisma.page.update({
      where: { id: pageId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(metadata && { metadata }),
        ...(status && { status }),
        ...(status === "PUBLISHED" &&
          !page.publishedAt && { publishedAt: new Date() }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Page updated successfully",
      data: updatedPage,
    });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { message: "Failed to update page" },
      { status: 500 }
    );
  }
}


