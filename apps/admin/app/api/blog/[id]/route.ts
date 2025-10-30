import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

// GET single blog post
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: true,
        tags: true,
        cover: true,
        seo: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Get blog post error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT update blog post
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { id } = await params;
    const body = await req.json();
    const {
      slug,
      title,
      excerpt,
      content,
      coverId,
      coverImage,
      categoryId,
      tagIds, // full set
      status,
      seoTitle,
      seoDescription,
    } = body as any;

    if (slug) {
      const exists = await prisma.blogPost.findFirst({
        where: { slug, NOT: { id } },
      });
      if (exists)
        return NextResponse.json(
          { error: "Slug already in use" },
          { status: 409 }
        );
    }

    const contentJson =
      content === undefined
        ? undefined
        : typeof content === "string"
        ? { html: content }
        : content;

    const data: any = {};
    if (slug !== undefined) data.slug = slug;
    if (title !== undefined) data.title = title;
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (contentJson !== undefined) data.content = contentJson;
    if (status !== undefined)
      data.status = status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

    // Category
    if (categoryId === "") data.category = { disconnect: true };
    else if (categoryId !== undefined)
      data.category = categoryId
        ? { connect: { id: categoryId } }
        : { disconnect: true };

    // Tags: replace set atomically
    if (tagIds !== undefined) {
      data.tags = {
        set: (Array.isArray(tagIds) ? tagIds : []).map((tid: string) => ({
          id: tid,
        })),
      };
    }

    // Cover
    if (coverId === "" || coverImage === "") data.cover = { disconnect: true };
    else if (coverId) data.cover = { connect: { id: coverId } };
    else if (coverImage) {
      const media = await prisma.media.upsert({
        where: { url: coverImage },
        update: {},
        create: { url: coverImage, alt: title || "Cover" },
        select: { id: true },
      });
      data.cover = { connect: { id: media.id } };
    }

    // SEO: upsert or update then connect if new
    if (seoTitle !== undefined || seoDescription !== undefined) {
      const current = await prisma.blogPost.findUnique({
        where: { id },
        select: { seoId: true, slug: true, title: true, excerpt: true },
      });
      if (current?.seoId) {
        await prisma.seoMeta.update({
          where: { id: current.seoId },
          data: {
            title: seoTitle ?? title ?? current.title,
            description: seoDescription ?? excerpt ?? current.excerpt ?? "",
            canonical: `/blog/${slug ?? current.slug}`,
          },
        });
      } else {
        const created = await prisma.seoMeta.create({
          data: {
            title: seoTitle ?? title ?? "Untitled",
            description: seoDescription ?? excerpt ?? "",
            canonical: `/blog/${slug ?? current?.slug ?? ""}`,
          },
          select: { id: true },
        });
        data.seo = { connect: { id: created.id } };
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data,
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
        tags: true,
        cover: true,
        seo: true,
      },
    });

    return NextResponse.json({
      message: "Blog post updated successfully",
      post,
    });
  } catch (error: any) {
    console.error("Update blog post error:", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE blog post
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const { id } = await params;

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete blog post error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
