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
  const { user, error } = await authenticateRequest(req);
  if (error) return error;

  try {
    const body = await req.json();
    const { title, content, imageUrl, metadata } = body;
    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    let slug = generateSlug(title);

    const existingDoc = await prisma.documentation.findUnique({
      where: { slug },
    });

    if (existingDoc) {
      slug = `${slug}-${Date.now()}`;
    }

    const defaultMetadata = {
      tags: [],
      description: "",
    };

    const doc = await prisma.documentation.create({
      data: {
        title,
        slug,
        content: content || {},
        imageUrl: imageUrl || null,
        metadata: metadata || defaultMetadata,
        authorId: user.userId,
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
        message: "Documentation created successfully",
        data: doc,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating documentation:", error);
    return NextResponse.json(
      { message: "Failed to create documentation" },
      { status: 500 }
    );
  }
}
