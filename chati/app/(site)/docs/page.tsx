import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Code,
  Shield,
  Plug,
  AlertCircle,
  Rocket,
  ChevronRight,
  Clock,
  Tag,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { docCategories } from "@/lib/docs-data";
import SearchAndSidebar from "@/components/docs/SearchAndSidebar";
import { prisma } from "@/lib/prisma";

const iconMap: Record<string, any> = {
  Rocket,
  Code,
  BookOpen,
  Shield,
  Plug,
  AlertCircle,
};

interface DbDoc {
  id: string;
  slug: string;
  title: string;
  status: string;
  metadata: any;
  imageUrl: string | null;
  author: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Server-side data fetching - DIRECT DATABASE QUERY
async function getDocumentation(): Promise<DbDoc[]> {
  try {
    const docs = await prisma.documentation.findMany({
      where: { status: "PUBLISHED" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return docs as any;
  } catch (error) {
    console.error("Error fetching docs from database:", error);
    return [];
  }
}

// Dynamic metadata generation
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const category = searchParams.category as string;
  const search = searchParams.search as string;

  let title =
    "WhatsApp Business API Documentation | Complete Integration Guide - Chati";
  let description =
    "Comprehensive WhatsApp Business API documentation with integration guides, message templates, automation workflows, security best practices, and code examples for developers.";

  if (category) {
    const cat = docCategories.find((c) => c.id === category);
    if (cat) {
      title = `${cat.title} Documentation - WhatsApp Business API | Chati`;
      description = `${
        cat.description
      } Learn more about ${cat.title.toLowerCase()} with detailed guides and examples.`;
    }
  } else if (search) {
    title = `Search Results for "${search}" - WhatsApp Business API Documentation`;
    description = `Find documentation and guides about "${search}" for WhatsApp Business API integration.`;
  }

  return {
    title,
    description,
    keywords:
      "WhatsApp Business API, WhatsApp API documentation, WhatsApp integration guide, message templates, WhatsApp automation, API security, developer documentation, WhatsApp Business Platform",
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://chati.chat/docs${category ? `?category=${category}` : ""}${
        search ? `?search=${search}` : ""
      }`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "https://chati.chat/docs",
    },
  };
}

export default async function DocsPage({ searchParams }: PageProps) {
  // Fetch docs on server
  const dbDocs = await getDocumentation();

  // Get search params
  const searchQuery = (searchParams.search as string) || "";
  const selectedCategory = (searchParams.category as string) || null;

  // Merge static docs with database docs
  const staticArticles = docCategories.flatMap((cat) => cat.articles);

  const dbArticles = dbDocs.map((doc) => ({
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    description:
      doc.metadata?.description ||
      doc.metadata?.excerpt ||
      "No description available",
    category: doc.metadata?.category || "Uncategorized",
    tags: doc.metadata?.tags || [],
    readTime: doc.metadata?.readTime || "5 min read",
    lastUpdated: new Date(doc.updatedAt).toLocaleDateString(),
    content: "",
  }));

  const allDocs = [...dbArticles];
  staticArticles.forEach((staticDoc) => {
    if (!allDocs.find((doc) => doc.slug === staticDoc.slug)) {
      allDocs.push(staticDoc);
    }
  });

  // Filter docs based on search params
  const filteredArticles = searchQuery
    ? allDocs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : selectedCategory
    ? allDocs.filter((doc) => doc.category === selectedCategory)
    : allDocs;

  const displayedCategories = selectedCategory
    ? docCategories.filter((cat) => cat.id === selectedCategory)
    : docCategories;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              WhatsApp Business API Documentation
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive guides, API references, and tutorials to help you
              integrate WhatsApp Business API into your applications
            </p>

            {/* Search Bar - Client Component */}
            <SearchAndSidebar
              initialSearch={searchQuery}
              filteredCount={filteredArticles.length}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar - Server Rendered */}
            <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] w-72 overflow-y-auto p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    <Link
                      href="/docs"
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !selectedCategory
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Documentation
                    </Link>
                    {docCategories.map((category) => {
                      const Icon = iconMap[category.icon];
                      return (
                        <Link
                          key={category.id}
                          href={`/docs?category=${category.id}`}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.id
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span>{category.title}</span>
                            <span className="ml-auto text-xs text-gray-500">
                              {category.articles.length}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Quick Links
                  </h3>
                  <div className="space-y-2 text-sm">
                    <Link
                      href="/docs/quick-start"
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      Quick Start Guide
                    </Link>
                    <Link
                      href="/docs/api-reference"
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      API Reference
                    </Link>
                    <Link
                      href="/docs/examples"
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      Code Examples
                    </Link>
                    <Link
                      href="/docs/changelog"
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      Changelog
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 max-w-5xl">
              {!searchQuery && !selectedCategory ? (
                <>
                  {/* Recent Documents */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">
                      Recent Documentation
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dbDocs.slice(0, 6).map((doc) => (
                        <Link key={doc.id} href={`/docs/${doc.slug}`}>
                          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group h-full">
                            {doc.imageUrl && (
                              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                <img
                                  src={doc.imageUrl}
                                  alt={doc.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                            )}
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {doc.metadata?.category || "Documentation"}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {doc.metadata?.readTime || "5 min"}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {doc.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {doc.metadata?.description ||
                                doc.metadata?.excerpt ||
                                "Click to read more"}
                            </p>
                            <div className="flex items-center text-sm text-blue-600 font-medium">
                              Read more
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                    {dbDocs.length === 0 && (
                      <Card className="p-12 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          No documentation yet
                        </h3>
                        <p className="text-gray-600">
                          Documentation will appear here once published
                        </p>
                      </Card>
                    )}
                  </div>

                  {/* All Articles */}
                  <div>
                    <h2 className="text-3xl font-bold mb-6">
                      All Documentation
                    </h2>
                    <div className="space-y-4">
                      {allDocs.map((article) => (
                        <Link key={article.id} href={`/docs/${article.slug}`}>
                          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {article.category}
                                  </Badge>
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {article.readTime}
                                  </span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                                  {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                  {article.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {article.tags && article.tags.length > 0 ? (
                                    article.tags
                                      .slice(0, 3)
                                      .map((tag: string) => (
                                        <span
                                          key={tag}
                                          className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                                        >
                                          <Tag className="w-3 h-3" />
                                          {tag}
                                        </span>
                                      ))
                                  ) : (
                                    <span className="text-xs text-gray-400">
                                      No tags
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Search/Filter Results */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">
                        {searchQuery
                          ? `Search Results for "${searchQuery}"`
                          : displayedCategories[0]?.title || "All Articles"}
                      </h2>
                      <Link href="/docs">
                        <Button variant="ghost" size="sm">
                          Clear
                        </Button>
                      </Link>
                    </div>
                    {selectedCategory && !searchQuery && (
                      <p className="text-gray-600 mb-6">
                        {displayedCategories[0]?.description}
                      </p>
                    )}
                  </div>

                  {filteredArticles.length === 0 ? (
                    <Card className="p-12 text-center">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No articles found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search or browse by category
                      </p>
                      <Link href="/docs">
                        <Button>View All Documentation</Button>
                      </Link>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredArticles.map((article) => (
                        <Link key={article.id} href={`/docs/${article.slug}`}>
                          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {article.category}
                                  </Badge>
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {article.readTime}
                                  </span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                                  {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                  {article.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {article.tags
                                    .slice(0, 3)
                                    .map((tag: string) => (
                                      <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                                      >
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                      </span>
                                    ))}
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
              asChild
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
