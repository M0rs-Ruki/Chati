import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

// Type-safe request body
interface CreateDocumentationRequest {
  title: string;
  content: Record<string, any>;
  metadata?: {
    tags?: string[];
    description?: string;
    [key: string]: any;
  };
  imageUrl?: string;
}

// Generate slug from title
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
    // Parse request body with type safety
    const body: CreateDocumentationRequest = await req.json();
    const { title, content, imageUrl, metadata } = body;

    // Validation
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { message: "Title is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "object") {
      return NextResponse.json(
        { message: "Content is required and must be a valid object" },
        { status: 400 }
      );
    }

    // Generate slug from title
    let slug = generateSlug(title);

    // Check if slug already exists
    const existingDoc = await prisma.documentation.findUnique({
      where: { slug },
    });

    // If slug exists, append timestamp
    if (existingDoc) {
      slug = `${slug}-${Date.now()}`;
    }

    // Prepare metadata with defaults
    const defaultMetadata = {
      tags: [],
      description: "",
    };

    const finalMetadata = metadata
      ? { ...defaultMetadata, ...metadata }
      : defaultMetadata;

    // Create documentation
    const doc = await prisma.documentation.create({
      data: {
        title: title.trim(),
        slug,
        content,
        imageUrl: imageUrl || null,
        metadata: finalMetadata,
        authorId: user!.id,
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

    // Type-safe error handling
    if (error instanceof Error) {
      // Check for Prisma-specific errors
      if ("code" in error && error.code === "P2002") {
        return NextResponse.json(
          { message: "Documentation with this slug already exists" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: "Failed to create documentation" },
      { status: 500 }
    );
  }
}
