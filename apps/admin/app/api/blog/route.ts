import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

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

export async function POST(req: Request) {
  try {
    const { error, user } = await requireAuth(req);
    if (error) return error;

    const body = await req.json();
    const {
      slug,
      title,
      excerpt,
      content,
      coverId,
      coverImage, // allow either id or URL
      categoryId,
      tagIds = [],
      seoTitle,
      seoDescription,
      status, // optional
    } = body as any;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "slug, title, and content are required" },
        { status: 400 }
      );
    }

    const exists = await prisma.blogPost.findUnique({ where: { slug } });
    if (exists) {
      return NextResponse.json(
        { error: "Blog post with this slug already exists" },
        { status: 409 }
      );
    }

    const contentJson =
      typeof content === "string" ? { html: content } : content;

    // Prepare relations
    let coverRel: any = undefined;
    if (coverId) {
      coverRel = { connect: { id: coverId } };
    } else if (coverImage) {
      const media = await prisma.media.upsert({
        where: { url: coverImage },
        update: {},
        create: { url: coverImage, alt: title },
        select: { id: true },
      });
      coverRel = { connect: { id: media.id } };
    }

    let seoRel: any = undefined;
    if (seoTitle || seoDescription) {
      const seo = await prisma.seoMeta.create({
        data: {
          title: seoTitle || title,
          description: seoDescription || excerpt || "",
          canonical: `/blog/${slug}`,
        },
        select: { id: true },
      });
      seoRel = { connect: { id: seo.id } };
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        excerpt: excerpt ?? null,
        content: contentJson,
        status: status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
        authorId: user!.userId,
        ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
        ...(tagIds.length
          ? { tags: { set: tagIds.map((id: string) => ({ id })) } }
          : {}),
        ...(coverRel ? { cover: coverRel } : {}),
        ...(seoRel ? { seo: seoRel } : {}),
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
        tags: true,
        cover: true,
        seo: true,
      },
    });

    return NextResponse.json(
      { message: "Blog post created successfully", post },
      { status: 201 }
    );
  } catch (e) {
    console.error("Create blog post error:", e);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
