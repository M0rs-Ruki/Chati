import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowRight, Calendar, Rss } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts as staticBlogPosts } from "@/lib/blog-data";
import SearchAndFilter from "@/components/blog/SearchAndFilter";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering to ensure API calls work on production
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  status?: string;
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Server-side data fetching - DIRECTLY from database (no API calls)
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('🔍 Fetching blog posts directly from database');

    // Fetch directly from database instead of using API
    const blogs = await prisma.blogPost.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrl: true,
        status: true,
        metadata: true,
        publishedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        content: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    console.log('✅ Fetched from database:', blogs.length, 'posts');

    const transformedPosts = blogs.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.metadata?.description || "",
      content: post.content,
      author:
        typeof post.author === "object" ? post.author?.name : "Chati Team",
      date: post.publishedAt || post.createdAt,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      category: post.metadata?.category || "Uncategorized",
      thumbnail: post.imageUrl,
      imageUrl: post.imageUrl,
      readTime: post.metadata?.readTime || "5 min read",
      tags: post.metadata?.tags || [],
      metadata: post.metadata,
      status: post.status,
    }));

    console.log(`✅ Successfully transformed ${transformedPosts.length} blog posts`);
    return transformedPosts;
  } catch (err) {
    console.error("❌ Error fetching blogs from database:", err);
    console.error("Stack trace:", err instanceof Error ? err.stack : 'No stack trace');
    // Return empty array on error, static posts will be used
    return [];
  }
}

// Format date helper
function formatDate(post: BlogPost) {
  const dateStr = post.date || post.publishedAt || post.createdAt;
  if (!dateStr) return "Recent";

  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Dynamic metadata generation with enhanced SEO
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const category = searchParams.category as string;
  const search = searchParams.search as string;

  let title = "Blog - WhatsApp Business Tips, Guides & Best Practices | Chati";
  let description =
    "Discover expert insights on WhatsApp Business API, customer engagement strategies, automation tips, and e-commerce best practices. Stay updated with the latest trends in conversational commerce.";
  let keywords = [
    "WhatsApp Business blog",
    "WhatsApp Business API",
    "customer engagement tips",
    "chatbot automation",
    "e-commerce strategies",
    "WhatsApp marketing",
    "business messaging",
    "conversational commerce",
    "customer support automation",
    "WhatsApp integration",
    "business communication",
    "messaging API",
  ];

  if (category) {
    title = `${category} Articles - WhatsApp Business Blog | Chati`;
    description = `Explore ${category} articles about WhatsApp Business API, automation, and customer engagement strategies. Expert tips and best practices for ${category}.`;
    keywords.push(
      category.toLowerCase(),
      `${category} tips`,
      `${category} guide`
    );
  } else if (search) {
    title = `Search Results for "${search}" - WhatsApp Business Blog | Chati`;
    description = `Find articles and guides about "${search}" on WhatsApp Business, chatbots, and customer engagement. Expert insights and practical tips.`;
    keywords.push(search.toLowerCase());
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat";
  const blogUrl = `${baseUrl}/blog${
    category ? `?category=${encodeURIComponent(category)}` : ""
  }${search ? `?search=${encodeURIComponent(search)}` : ""}`;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Chati Team" }],
    creator: "Chati",
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
      type: "website",
      url: blogUrl,
      siteName: "Chati",
      locale: "en_US",
      images: [
        {
          url: `${baseUrl}/og-blog.png`,
          width: 1200,
          height: 630,
          alt: "Chati Blog - WhatsApp Business Insights",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@chati",
      creator: "@chati",
      images: [`${baseUrl}/og-blog.png`],
    },
    alternates: {
      canonical: blogUrl,
    },
    category: "Technology",
  };
}

export default async function BlogPage({ searchParams }: PageProps) {
  // Fetch data on server
  const apiPosts = await getBlogPosts();

  // Merge API posts with static posts (API posts take priority)
  const allPosts = [...apiPosts, ...staticBlogPosts];

  // Remove duplicates based on slug
  const uniquePosts = allPosts.reduce((acc: BlogPost[], current) => {
    const exists = acc.find((post) => post.slug === current.slug);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);

  // Get search params from URL
  const searchQuery = (searchParams.search as string) || "";
  const selectedCategory = (searchParams.category as string) || null;

  const categories = Array.from(
    new Set(uniquePosts.map((post) => post.category).filter(Boolean))
  ) as string[];

  // Filter posts based on search params
  const filteredPosts = uniquePosts.filter((post) => {
    const searchableContent = `${post.title} ${post.excerpt || ""} ${
      post.tags?.join(" ") || ""
    }`.toLowerCase();
    const matchesSearch = searchableContent.includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Chati Blog",
            description:
              "Expert insights on WhatsApp Business API, customer engagement, and automation strategies",
            url: `${
              process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"
            }/blog`,
            publisher: {
              "@type": "Organization",
              name: "Chati",
              logo: {
                "@type": "ImageObject",
                url: `${
                  process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"
                }/logo.png`,
              },
            },
            blogPost: filteredPosts.slice(0, 10).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt || post.metadata?.description || "",
              image: post.thumbnail || post.imageUrl || "",
              datePublished: post.date || post.publishedAt || post.createdAt,
              dateModified: post.date || post.publishedAt || post.createdAt,
              author: {
                "@type": "Person",
                name:
                  typeof post.author === "object"
                    ? post.author?.name
                    : post.author || "Chati Team",
              },
              publisher: {
                "@type": "Organization",
                name: "Chati",
                logo: {
                  "@type": "ImageObject",
                  url: `${
                    process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"
                  }/logo.png`,
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${
                  process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"
                }/blog/${post.slug}`,
              },
            })),
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
                item: `${
                  process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"
                }`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${
                  process.env.NEXT_PUBLIC_BASE_URL || "https://chati.chat"
                }/blog`,
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-12 md:py-14">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-purple-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-sm"
            >
              <BookOpen className="w-3 h-3 mr-1.5" />
              Blog & Resources
            </Badge>

            <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
              <span className="block text-foreground mb-1">
                Insights & Best Practices
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                for WhatsApp Business
              </span>
            </h1>

            <p className="mb-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Expert tips, guides, and strategies to help you master WhatsApp
              Business API, automation, and customer engagement.
            </p>

            {/* RSS Feed Link */}
            <div className="mb-4 flex justify-center">
              <Link
                href="/blog/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all"
                >
                  <Rss className="w-4 h-4" />
                  Subscribe to RSS Feed
                </Button>
              </Link>
            </div>

            <SearchAndFilter initialSearch={searchQuery} />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/blog">
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                className={
                  !selectedCategory ? "bg-blue-600 hover:bg-blue-700" : ""
                }
              >
                All Articles
              </Button>
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
              >
                <Button
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  className={
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700"
                      : ""
                  }
                >
                  {category}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No articles found matching your search.
              </p>
              <Link href="/blog">
                <Button variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </Link>
            </div>
          )}

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-[1400px] mx-auto">
              {filteredPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 flex flex-col"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative overflow-hidden"
                    aria-label={`Read article: ${post.title}`}
                  >
                    <div className="aspect-[16/9] relative bg-gray-100">
                      <Image
                        src={
                          post.thumbnail || post.imageUrl || "/placeholder.svg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <Badge className="absolute top-3 left-3 bg-blue-600 text-white border-none shadow-lg text-xs px-2 py-0.5">
                      {post.category || "Article"}
                    </Badge>
                  </Link>

                  <article className="p-4 flex flex-col flex-grow">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                      <time
                        className="flex items-center gap-1"
                        dateTime={
                          post.date || post.publishedAt || post.createdAt
                        }
                      >
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        <span>{formatDate(post)}</span>
                      </time>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        <span>{post.readTime || "5 min read"}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-base font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow leading-relaxed">
                      {post.excerpt || post.metadata?.description || ""}
                    </p>

                    {/* CTA */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-auto"
                      aria-label={`Continue reading ${post.title}`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group/btn w-full justify-center text-sm h-8"
                      >
                        Read More
                        <ArrowRight
                          className="ml-1 w-3 h-3 group-hover/btn:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Button>
                    </Link>
                  </article>
                </Card>
              ))}
            </div>
          )}

          {/* Display blog count */}
          {filteredPosts.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Showing {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "article" : "articles"}
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Customer Communication?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start using WhatsApp Business API to engage customers and grow your
            business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
              asChild
            >
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              >
                Start Free Trial
              </Link>
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
  );
}
