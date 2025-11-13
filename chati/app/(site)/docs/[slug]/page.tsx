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

  return {
    title: `${article.title} | WhatsApp Business API Documentation`,
    description: articleData.metadata?.description || articleData.description || "",
    keywords: articleData.metadata?.tags?.join(", ") || articleData.tags?.join(", ") || "",
    openGraph: {
      title: article.title,
      description: articleData.metadata?.description || articleData.description || "",
      type: "article",
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
