"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookmarkPlus,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts as staticBlogPosts, getRelatedPosts } from "@/lib/blog-data";
import { useState } from "react";

interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string | any;
  author?: string | { id: string; name: string; email: string };
  date?: string;
  publishedAt?: string | null;
  createdAt?: string;
  category?: string;
  thumbnail?: string;
  imageUrl?: string;
  readTime?: string;
  tags?: string[];
  metadata?: {
    tags?: string[];
    description?: string;
    category?: string;
    readTime?: string;
  };
}

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post: rawPost }: BlogPostPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Normalize post data to handle both API and static formats
  const post = {
    ...rawPost,
    excerpt: rawPost.excerpt || rawPost.metadata?.description || "",
    author:
      typeof rawPost.author === "object"
        ? rawPost.author?.name
        : rawPost.author || "Chati Team",
    date:
      rawPost.date ||
      rawPost.publishedAt ||
      rawPost.createdAt ||
      new Date().toISOString(),
    category: rawPost.category || rawPost.metadata?.category || "General",
    thumbnail: rawPost.thumbnail || rawPost.imageUrl || "/placeholder.svg",
    readTime: rawPost.readTime || rawPost.metadata?.readTime || "5 min read",
    tags: rawPost.tags || rawPost.metadata?.tags || [],
  };

  const relatedPosts = getRelatedPosts(post.slug, 3);

  // Helper to render content (handles both string HTML and JSON format)
  const renderContent = () => {
    if (!post.content) {
      return <p className="text-gray-600">No content available.</p>;
    }

    // If content is a string (HTML), render it directly
    if (typeof post.content === "string") {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="text-gray-700"
        />
      );
    }

    // If content is JSON object (from API database)
    if (typeof post.content === "object") {
      // Check for HTML content in the object
      if (post.content.html) {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: post.content.html }}
            className="text-gray-700"
          />
        );
      }

      // Check for markdown content
      if (post.content.markdown) {
        return (
          <pre className="whitespace-pre-wrap bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-sm leading-relaxed text-gray-700 border border-gray-200">
            {post.content.markdown}
          </pre>
        );
      }

      // Check for blocks (page builder format)
      if (post.content.blocks && Array.isArray(post.content.blocks)) {
        return (
          <div className="space-y-6">
            {post.content.blocks.map((block: any, index: number) => (
              <div
                key={index}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {block.type === "paragraph" && (
                  <p className="text-gray-700 leading-relaxed">
                    {block.data?.text || ""}
                  </p>
                )}
                {block.type === "heading" && (
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {block.data?.text || ""}
                  </h2>
                )}
                {block.type === "list" && (
                  <ul className="list-disc pl-6 space-y-2">
                    {block.data?.items?.map((item: string, i: number) => (
                      <li key={i} className="text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );
      }

      // Fallback: show excerpt if available
      return (
        <div className="text-gray-700">
          <p>{post.excerpt || "Content will be displayed here..."}</p>
        </div>
      );
    }

    return <p className="text-gray-600">Unable to display content.</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data for SEO - Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.thumbnail,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Chati",
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"}/logo.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"}/blog/${rawPost.slug}`,
            },
            articleSection: post.category,
            keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
            wordCount: typeof post.content === "string" ? post.content.split(" ").length : 0,
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"}/blog/${rawPost.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>

        {/* Back Button - Enhanced with hover effects */}
        <div className="absolute top-6 left-6 z-20 animate-in fade-in slide-in-from-left duration-500">
          <Link href="/blog">
            <Button
              variant="secondary"
              className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:-translate-x-1 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Hero Image Background with Zoom Effect */}
        <div className="relative h-[450px] md:h-[550px] overflow-hidden group">
          <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-105">
            <Image
              src={post.thumbnail || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />

          {/* Animated Overlay Pattern */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.15),transparent_50%)] animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </div>

        {/* Hero Content - Enhanced typography and animations */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 md:pb-20">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 px-4 py-1.5 text-sm font-semibold">
                  {post.category}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <div className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center" aria-hidden="true">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">{post.author}</span>
                  </span>
                </div>
                <time className="flex items-center gap-2 hover:text-white transition-colors duration-200" dateTime={post.date} itemProp="datePublished">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </time>
                <div className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>{post.readTime}</span>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <BookmarkPlus
                      className={`w-4 h-4 mr-2 transition-all duration-300 ${
                        isBookmarked ? "fill-white" : ""
                      }`}
                    />
                    Save
                  </Button>

                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                      onClick={() => setShowShareMenu(!showShareMenu)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>

                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors">
                          <Twitter className="w-4 h-4 text-blue-400" />
                          Twitter
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors">
                          <Facebook className="w-4 h-4 text-blue-600" />
                          Facebook
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors">
                          <Linkedin className="w-4 h-4 text-blue-700" />
                          LinkedIn
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content - Enhanced with better spacing and visual hierarchy */}
      <article className="py-16 md:py-24 bg-white" itemScope itemType="https://schema.org/BlogPosting">
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="image" content={post.thumbnail} />
        <meta itemProp="datePublished" content={post.date} />
        <meta itemProp="dateModified" content={post.date} />
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Reading Progress Bar */}
            <div className="sticky top-0 z-40 -mx-4 md:-mx-0 mb-8">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden shadow-sm">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                  style={{ width: "0%" }}
                />
              </div>
            </div>

            {/* Enhanced Excerpt */}
            {post.excerpt && (
              <div className="mb-12 p-6 border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg animate-in fade-in slide-in-from-left duration-700">
                <p className="text-xl text-gray-700 leading-relaxed font-medium italic" itemProp="description">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Content with enhanced prose styling */}
            <div
              className="prose prose-lg max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-20
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-gradient-to-r prose-h2:from-blue-600 prose-h2:to-transparent
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-[17px]
                prose-ul:my-6 prose-ul:space-y-3
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-semibold prose-strong:bg-yellow-50 prose-strong:px-1
                prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-blue-700 hover:prose-a:underline prose-a:transition-all
                prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-blue-600
                prose-img:rounded-xl prose-img:shadow-lg animate-in fade-in duration-1000"
              itemProp="articleBody"
            >
              {renderContent()}
            </div>

            {/* Tags Section - Enhanced design */}
            <div className="mt-16 pt-10 border-t-2 border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Tagged in
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags && post.tags.length > 0 ? (
                  post.tags.map((tag, index) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-blue-100 hover:to-purple-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer animate-in fade-in duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      #{tag}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No tags available</p>
                )}
              </div>
            </div>

            {/* Author CTA Card */}
            <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Written by {post.author}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Creating content to help you understand WhatsApp Business
                    API better and grow your business.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-white transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts - Enhanced cards */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-in fade-in duration-700">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Continue Reading
              </h2>
              <p className="text-gray-600">
                More articles you might find interesting
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block animate-in fade-in slide-in-from-bottom-8 duration-700"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-gray-200 h-full bg-white hover:-translate-y-2 hover:border-blue-300">
                    <div className="aspect-[16/9] relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <Image
                        src={relatedPost.thumbnail || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-5">
                      <Badge className="mb-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-none text-xs font-semibold hover:from-blue-200 hover:to-purple-200 transition-all duration-300">
                        {relatedPost.category}
                      </Badge>

                      <h3 className="text-base font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-snug">
                        {relatedPost.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime}
                        </span>
                        <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all duration-300">
                          <span>Read more</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with gradient and animations */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Ready to Transform Your Communication?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses using WhatsApp Business API to
              deliver exceptional customer experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex items-center justify-center gap-8 text-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">10k+</span>
                <span className="text-sm">Active Users</span>
              </div>
              <div className="w-px h-8 bg-blue-300" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">99.9%</span>
                <span className="text-sm">Uptime</span>
              </div>
              <div className="w-px h-8 bg-blue-300" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">24/7</span>
                <span className="text-sm">Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
