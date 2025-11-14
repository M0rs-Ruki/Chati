import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import type { BlogPost } from "@/lib/blog-data";
import BlogPostPage from "./client-page";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Fetch blog post DIRECTLY from database (no API calls)
async function getBlogPost(slug: string) {
  try {
    console.log("🔍 Fetching blog post from database for slug:", slug);

    // Fetch directly from database
    const post = await prisma.blogPost.findUnique({
      where: { slug },
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

    if (post) {
      console.log("✅ Successfully fetched blog post:", post.title);
      return post;
    } else {
      console.log("⚠️ Post not found in database, checking static posts");
    }
  } catch (error) {
    console.error("❌ Error fetching blog post from database:", error);
  }

  // Fallback to static data
  console.log("📚 Falling back to static data for slug:", slug);
  return blogPosts.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  // Generate paths for static blog posts
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Handle both API format and static data format
  const postData = post as any;
  const title = post.title;
  const description = postData.excerpt || postData.metadata?.description || "";
  const tags = postData.tags || postData.metadata?.tags || [];
  const author =
    typeof post.author === "object" && post.author
      ? post.author.name || "Chati Team"
      : post.author || "Chati Team";
  const date =
    postData.date ||
    postData.publishedAt ||
    postData.createdAt ||
    new Date().toISOString();
  const imageUrl = postData.thumbnail || postData.imageUrl || "/og-blog.png";
  const category =
    postData.category || postData.metadata?.category || "General";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://chati.ai";
  const postUrl = `${baseUrl}/blog/${slug}`;
  const readTime = postData.readTime || postData.metadata?.readTime || "5 min read";
  const modifiedDate = postData.updatedAt || date;

  // Generate comprehensive keywords from metadata
  const keywords = [
    ...tags,
    "WhatsApp Business",
    "customer engagement",
    "business automation",
    category,
    "Chati blog",
    "WhatsApp API",
    "messaging platform",
  ].filter(Boolean);

  return {
    title: `${title} | Chati Blog - WhatsApp Business Insights`,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: author }],
    creator: author,
    publisher: "Chati",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: postUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      modifiedTime: modifiedDate,
      authors: [author],
      tags: Array.isArray(tags) ? tags : [],
      section: category,
      url: postUrl,
      siteName: "Chati - WhatsApp Business API Platform",
      locale: "en_US",
      images: [
        {
          url: imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@chati",
      creator: "@chati",
      images: [
        imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`,
      ],
    },
    category,
    other: {
      "article:read-time": readTime,
      "article:author": author,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Transform Prisma post to match BlogPost interface
  const transformedPost: BlogPost = {
    ...(post as any),
    author:
      typeof post.author === "object" && post.author
        ? {
            id: post.author.id,
            name: post.author.name || "Chati Team",
            email: post.author.email,
          }
        : undefined,
  };

  return <BlogPostPage post={transformedPost} />;
}
