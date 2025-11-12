"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { blogPosts as staticBlogPosts, getRelatedPosts } from "@/lib/blog-data"

interface BlogPost {
  id?: string
  slug: string
  title: string
  excerpt?: string
  content?: string | any
  author?: string | { id: string; name: string; email: string }
  date?: string
  publishedAt?: string | null
  createdAt?: string
  category?: string
  thumbnail?: string
  imageUrl?: string
  readTime?: string
  tags?: string[]
  metadata?: {
    tags?: string[]
    description?: string
    category?: string
    readTime?: string
  }
}

interface BlogPostPageProps {
  post: BlogPost
}

export default function BlogPostPage({ post: rawPost }: BlogPostPageProps) {
  // Normalize post data to handle both API and static formats
  const post = {
    ...rawPost,
    excerpt: rawPost.excerpt || rawPost.metadata?.description || '',
    author: typeof rawPost.author === 'object' ? rawPost.author?.name : rawPost.author || 'Chati Team',
    date: rawPost.date || rawPost.publishedAt || rawPost.createdAt || new Date().toISOString(),
    category: rawPost.category || rawPost.metadata?.category || 'General',
    thumbnail: rawPost.thumbnail || rawPost.imageUrl || '/placeholder.svg',
    readTime: rawPost.readTime || rawPost.metadata?.readTime || '5 min read',
    tags: rawPost.tags || rawPost.metadata?.tags || [],
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)

  // Helper to render content (handles both string HTML and JSON format)
  const renderContent = () => {
    if (!post.content) {
      return <p className="text-gray-600">No content available.</p>
    }

    // If content is a string (HTML), render it directly
    if (typeof post.content === 'string') {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="text-gray-700"
        />
      )
    }

    // If content is JSON object (from API database)
    if (typeof post.content === 'object') {
      // Check for HTML content in the object
      if (post.content.html) {
        return (
          <div 
            dangerouslySetInnerHTML={{ __html: post.content.html }} 
            className="text-gray-700"
          />
        )
      }
      
      // Check for markdown content
      if (post.content.markdown) {
        return (
          <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm leading-relaxed text-gray-700">
            {post.content.markdown}
          </pre>
        )
      }

      // Check for blocks (page builder format)
      if (post.content.blocks && Array.isArray(post.content.blocks)) {
        return (
          <div className="space-y-6">
            {post.content.blocks.map((block: any, index: number) => (
              <div key={index}>
                {block.type === 'paragraph' && (
                  <p className="text-gray-700 leading-relaxed">{block.data?.text || ''}</p>
                )}
                {block.type === 'heading' && (
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{block.data?.text || ''}</h2>
                )}
                {block.type === 'list' && (
                  <ul className="list-disc pl-6 space-y-2">
                    {block.data?.items?.map((item: string, i: number) => (
                      <li key={i} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )
      }

      // Fallback: show excerpt if available
      return (
        <div className="text-gray-700">
          <p>{post.excerpt || 'Content will be displayed here...'}</p>
        </div>
      )
    }

    return <p className="text-gray-600">Unable to display content.</p>
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Back Button - Positioned absolutely */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/blog">
            <Button
              variant="secondary"
              className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Hero Image Background */}
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={post.thumbnail || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>

        {/* Hero Content - Overlaid on image */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 md:pb-16">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4 bg-blue-600 text-white border-none shadow-lg">{post.category}</Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white text-balance leading-tight">
                {post.title}
              </h1>

                            <div className="flex flex-wrap items-center gap-6 text-gray-200">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-white/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Content */}
            <div
              className="prose prose-lg max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
                prose-ul:my-5 prose-ul:space-y-2
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
            >
              {renderContent()}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags && post.tags.length > 0 ? (
                  post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1"
                    >
                      #{tag}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No tags available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Related Articles</h2>

            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group block">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200 h-full">
                    <div className="aspect-[16/9] relative bg-gray-100">
                      <Image
                        src={relatedPost.thumbnail || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-4">
                      <Badge className="mb-2 bg-blue-100 text-blue-700 border-none text-xs">
                        {relatedPost.category}
                      </Badge>

                      <h3 className="text-sm font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {relatedPost.title}
                      </h3>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedPost.readTime}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Transform your customer communication with WhatsApp Business API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}>Start Free Trial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
