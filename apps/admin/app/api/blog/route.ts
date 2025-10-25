import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

// GET all blog posts
export async function GET(req: Request) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const posts = await prisma.blogPost.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(categoryId && { categoryId }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
            { excerpt: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: {
          select: { id: true, title: true, slug: true },
        },
        tags: {
          select: { id: true, title: true, slug: true },
        },
        cover: {
          select: { id: true, url: true, alt: true },
        },
        seo: true,
      },
      orderBy: { updatedAt: "desc" },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const total = await prisma.blogPost.count({
      where: {
        ...(status && { status: status as any }),
        ...(categoryId && { categoryId }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
    });

    return NextResponse.json(
      {
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get blog posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST create new blog post
export async function POST(req: Request) {
  try {
    const { error, user } = await requireAuth(req);
    if (error) return error;

    const body = await req.json();
    const { slug, title, excerpt, content, coverId, categoryId, tagIds } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "slug, title, and content are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "Blog post with this slug already exists" },
        { status: 409 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        excerpt: excerpt || null,
        content,
        coverId: coverId || null,
        categoryId: categoryId || null,
        authorId: user!.userId,
        status: "DRAFT",
        ...(tagIds &&
          tagIds.length > 0 && {
            tags: {
              connect: tagIds.map((id: string) => ({ id })),
            },
          }),
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: true,
        tags: true,
        cover: true,
      },
    });

    return NextResponse.json(
      {
        message: "Blog post created successfully",
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create blog post error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
