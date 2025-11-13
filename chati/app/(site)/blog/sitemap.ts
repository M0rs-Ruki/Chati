import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// Fetch blog posts DIRECTLY from database for sitemap
async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: { publishedAt: "desc" },
    });

    return posts;
  } catch (err) {
    console.error("Error fetching blogs for sitemap:", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat";
  const posts = await getBlogPosts();

  // Blog listing page
  const blogMainPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  };

  // Individual blog posts
  const blogPosts = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [blogMainPage, ...blogPosts];
}
