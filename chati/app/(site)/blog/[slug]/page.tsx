import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"
import BlogPostPage from "./client-page"

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fetch blog post from API or fallback to static data
async function getBlogPost(slug: string) {
  try {
    // Construct base URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    process.env.NEXT_PUBLIC_APP_URL ||
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    'http://localhost:3000');
    
    const fullUrl = `${baseUrl}/api/public/blog/slug/${slug}`;
    
    console.log('Fetching blog post from:', fullUrl);
    
    const response = await fetch(fullUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log('Successfully fetched blog post:', result.data?.title);
      return result.data
    } else {
      console.error('API fetch failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching blog post from API:', error)
  }
  
  // Fallback to static data
  console.log('Falling back to static data for slug:', slug);
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
