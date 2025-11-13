import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"
import BlogPostPage from "./client-page"

// Fetch blog post from API or fallback to static data
async function getBlogPost(slug: string) {
  try {
    // Determine the correct base URL for production
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    process.env.NEXT_PUBLIC_APP_URL ||
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    'http://localhost:3000');
    
    const response = await fetch(
      `${baseUrl}/api/public/blog/slug/${slug}`,
      { 
        cache: 'no-store' // Changed from no-store to ensure fresh data
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
  const author = typeof post.author === 'object' ? post.author?.name : post.author || 'Chati Team'
  const date = post.date || post.publishedAt || post.createdAt
  const imageUrl = post.thumbnail || post.imageUrl || '/og-blog.png'
  const category = post.category || post.metadata?.category || 'General'
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chati.chat'
  const postUrl = `${baseUrl}/blog/${slug}`

  // Generate comprehensive keywords
  const keywords = [
    ...tags,
    'WhatsApp Business',
    'customer engagement',
    'business automation',
    category,
    'Chati blog',
  ].filter(Boolean)

  return {
    title: `${title} | Chati Blog`,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: author }],
    creator: author,
    publisher: "Chati",
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
      modifiedTime: date,
      authors: [author],
      tags: Array.isArray(tags) ? tags : [],
      url: postUrl,
      siteName: "Chati",
      locale: "en_US",
      images: [
        {
          url: imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`,
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
      images: [imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`],
    },
    alternates: {
      canonical: postUrl,
    },
    category,
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
