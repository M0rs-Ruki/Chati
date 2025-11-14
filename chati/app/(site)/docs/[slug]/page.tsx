import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug, getAllArticles } from "@/lib/docs-data"
import DocArticleClient from "./client-page"
import { prisma } from "@/lib/prisma"

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  
  // Try to fetch from DATABASE first
  let article = null
  try {
    const doc = await prisma.documentation.findUnique({
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
    if (doc) {
      article = doc;
    }
  } catch (error) {
    console.error('Error fetching doc from database:', error)
  }
  
  // Fallback to static data
  if (!article) {
    article = getArticleBySlug(slug)
  }

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  // Handle both database and static article types
  const articleData = article as any;
  const title = article.title;
  const description = articleData.metadata?.description || articleData.description || "WhatsApp Business API documentation and integration guide";
  const tags = articleData.metadata?.tags || articleData.tags || [];
  const imageUrl = articleData.imageUrl || "https://chati.ai/og-docs.jpg";
  const author = articleData.author?.name || "Chati Team";
  const publishedDate = articleData.createdAt || new Date().toISOString();
  const modifiedDate = articleData.updatedAt || publishedDate;
  const category = articleData.metadata?.category || articleData.category || "Documentation";
  const readTime = articleData.metadata?.readTime || articleData.readTime || "5 min read";

  const baseUrl = "https://chati.ai";
  const articleUrl = `${baseUrl}/docs/${slug}`;

  return {
    title: `${title} | WhatsApp Business API Documentation - Chati`,
    description,
    keywords: tags.join(", "),
    authors: [{ name: author }],
    creator: author,
    publisher: "Chati",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: articleUrl,
      siteName: "Chati - WhatsApp Business API Platform",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: [author],
      section: category,
      tags: tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@chati",
      images: [imageUrl],
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
    category,
    other: {
      "article:read-time": readTime,
    },
  }
}

export default async function DocArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  
  // Try to fetch from DATABASE first
  let article = null
  try {
    const doc = await prisma.documentation.findUnique({
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
    if (doc) {
      article = doc;
    }
  } catch (error) {
    console.error('Error fetching doc from database:', error)
  }
  
  // Fallback to static data
  if (!article) {
    article = getArticleBySlug(slug)
  }

  if (!article) {
    notFound()
  }

  return <DocArticleClient article={article} />
}
