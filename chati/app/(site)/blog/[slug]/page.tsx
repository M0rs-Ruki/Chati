import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"
import BlogPostPage from "./client-page"

// Fetch blog post from API or fallback to static data
async function getBlogPost(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/public/blog/slug/${slug}`,
      { 
        cache: 'no-store' // Always get fresh data
      }
    )
    
    if (response.ok) {
      const result = await response.json()
      return result.data
    }
  } catch (error) {
    console.error('Error fetching blog post from API:', error)
  }
  
  // Fallback to static data
  return blogPosts.find((p) => p.slug === slug)
}

export async function generateStaticParams() {
  // Generate paths for static blog posts
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  // Handle both API format and static data format
  const title = post.title
  const description = post.excerpt || post.metadata?.description || ''
  const tags = post.tags || post.metadata?.tags || []
  const author = typeof post.author === 'object' ? post.author?.name : post.author
  const date = post.date || post.publishedAt || post.createdAt

  return {
    title: `${title} | Chati Blog`,
    description,
    keywords: Array.isArray(tags) ? tags.join(", ") : '',
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      authors: author ? [author] : [],
      url: `https://chati.chat/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostPage post={post} />
}
