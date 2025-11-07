import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    const body = await req.json();
    const { title, content, authorId, metadata, status } = body;
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { message: "Title, content, and authorId are required" },
        { status: 400 }
      );
    }

    let slug = generateSlug(title);
    const existingPage = await prisma.page.findUnique({ where: { slug } });
    if (existingPage) {
      slug += `-${Date.now()}`;
    }

    const defaultContent = {
      blocks: [],
    };

    const defaultMetadata = {
      description: "",
      keywords: [],
    };

    // Create page
    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content: content || defaultContent,
        metadata: metadata || defaultMetadata,
        authorId: user.id,
        status: "DRAFT",
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

    return NextResponse.json(
      {
        message: "Page created successfully",
        data: page,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { message: "Failed to create page" },
      { status: 500 }
    );
  }
}
