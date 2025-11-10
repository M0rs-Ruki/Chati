import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    if (!["ADMIN", "EDITOR"].includes(user.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const [
      totalPages,
      totalUsers,
      totalBlogs,
      totalMedias,
      recentPages,
      recentBlogs,
    ] = await Promise.all([
      prisma.page.count(),
      prisma.user.count(),
      prisma.blogPost.count(),
      prisma.media.count(),
      prisma.page.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          publishedAt: true,
          author: { select: { id: true, name: true } },
        },
      }),
      prisma.blogPost.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          publishedAt: true,
          author: { select: { id: true, name: true } },
        },
      }),
    ]);

    return NextResponse.json({
      message: "Dashboard summary fetched successfully",
      data: {
        totalPages,
        totalUsers,
        totalBlogs,
        totalMedias,
        recentPages,
        recentBlogs,
      },
    });
  } catch (error) {
    console.error("[DASHBOARD_SUMMARY] Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
