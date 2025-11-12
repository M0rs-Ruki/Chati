import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug, getAllArticles } from "@/lib/docs-data"
import DocArticleClient from "./client-page"

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
  
  // Try to fetch from database first
  let article = null
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/public/doc/slug/${slug}`, {
      next: { revalidate: 60 }
    })
    if (response.ok) {
      const result = await response.json()
      article = result.data
    }
  } catch (error) {
    console.error('Error fetching doc from API:', error)
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

  return {
    title: `${article.title} | WhatsApp Business API Documentation`,
    description: article.metadata?.description || article.description,
    keywords: article.metadata?.tags?.join(", ") || article.tags?.join(", "),
    openGraph: {
      title: article.title,
      description: article.metadata?.description || article.description,
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
  
  // Try to fetch from database first
  let article = null
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/public/doc/slug/${slug}`, {
      next: { revalidate: 60 }
    })
    if (response.ok) {
      const result = await response.json()
      article = result.data
    }
  } catch (error) {
    console.error('Error fetching doc from API:', error)
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
