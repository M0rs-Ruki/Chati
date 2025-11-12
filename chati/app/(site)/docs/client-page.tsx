"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
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
  Menu,
  X,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { docCategories, searchArticles } from "@/lib/docs-data"

const iconMap: Record<string, any> = {
  Rocket,
  Code,
  BookOpen,
  Shield,
  Plug,
  AlertCircle,
}

// Database doc type
interface DbDoc {
  id: string
  slug: string
  title: string
  status: string
  metadata: any
  imageUrl: string | null
  author: {
    id: string
    name: string | null
    email: string
  } | null
  createdAt: string
  updatedAt: string
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dbDocs, setDbDocs] = useState<DbDoc[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch docs from database
  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetch('/api/public/doc?limit=100')
        if (response.ok) {
          const result = await response.json()
          setDbDocs(result.data || [])
        }
      } catch (error) {
        console.error('Error fetching docs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDocs()
  }, [])

  // Merge static docs with database docs
  const allDocs = useMemo(() => {
    const staticArticles = docCategories.flatMap((cat) => cat.articles)
    
    // Convert DB docs to article format
    const dbArticles = dbDocs.map((doc) => ({
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
      description: doc.metadata?.description || doc.metadata?.excerpt || 'No description available',
      category: doc.metadata?.category || 'Uncategorized',
      tags: doc.metadata?.tags || [],
      readTime: doc.metadata?.readTime || '5 min read',
      lastUpdated: new Date(doc.updatedAt).toLocaleDateString(),
      content: '', // Not needed for listing
    }))

    // Merge arrays, prioritizing database docs over static ones
    const merged = [...dbArticles]
    staticArticles.forEach((staticDoc) => {
      if (!merged.find((doc) => doc.slug === staticDoc.slug)) {
        merged.push({
          ...staticDoc,
        })
      }
    })

    return merged
  }, [dbDocs])

  const filteredArticles = useMemo(() => {
    if (searchQuery) {
      return allDocs.filter((doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    if (selectedCategory) {
      return allDocs.filter((doc) => doc.category === selectedCategory)
    }
    return allDocs
  }, [searchQuery, selectedCategory, allDocs])

  const displayedCategories = selectedCategory
    ? docCategories.filter((cat) => cat.id === selectedCategory)
    : docCategories

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
              Comprehensive guides, API references, and tutorials to help you integrate WhatsApp Business API into your
              applications
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 text-lg bg-white text-gray-900 border-0 shadow-xl rounded-xl focus-visible:ring-2 focus-visible:ring-white"
                />
              </div>
              {searchQuery && (
                <p className="text-sm text-blue-100 mt-3">
                  Found {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Mobile Sidebar Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden fixed bottom-6 right-6 z-50 shadow-lg rounded-full w-14 h-14 bg-transparent"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Sidebar */}
            <aside
              className={`${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0 fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-72 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 z-40 lg:z-0 p-6`}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setSelectedCategory(null)
                        setSidebarOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !selectedCategory ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Documentation
                    </button>
                    {docCategories.map((category) => {
                      const Icon = iconMap[category.icon]
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id)
                            setSidebarOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                            selectedCategory === category.id
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{category.title}</span>
                          <span className="ml-auto text-xs text-gray-500">{category.articles.length}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Links</h3>
                  <div className="space-y-2 text-sm">
                    <Link href="/docs/quick-start" className="block text-gray-700 hover:text-blue-600">
                      Quick Start Guide
                    </Link>
                    <Link href="/docs/api-reference" className="block text-gray-700 hover:text-blue-600">
                      API Reference
                    </Link>
                    <Link href="/docs/examples" className="block text-gray-700 hover:text-blue-600">
                      Code Examples
                    </Link>
                    <Link href="/docs/changelog" className="block text-gray-700 hover:text-blue-600">
                      Changelog
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 max-w-5xl">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <span className="ml-3 text-gray-600">Loading documentation...</span>
                </div>
              ) : !searchQuery && !selectedCategory && (
                <>
                  {/* Category Overview */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {docCategories.map((category) => {
                        const Icon = iconMap[category.icon]
                        return (
                          <Card
                            key={category.id}
                            className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                              <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                              {category.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                            <div className="flex items-center text-sm text-blue-600 font-medium">
                              {category.articles.length} articles
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </div>

                  {/* Popular Articles - Shows ALL database docs */}
                  <div>
                    <h2 className="text-3xl font-bold mb-6">All Articles</h2>
                    <div className="space-y-4">
                      {allDocs.map((article) => (
                        <Card
                          key={article.id}
                          className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                          onClick={() => (window.location.href = `/docs/${article.slug}`)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="text-xs">
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
                              <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {article.tags && article.tags.length > 0 ? (
                                  article.tags.slice(0, 3).map((tag: string) => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                                    >
                                      <Tag className="w-3 h-3" />
                                      {tag}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-xs text-gray-400">No tags</span>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {(searchQuery || selectedCategory) && (
                <>
                  {/* Search/Filter Results */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">
                        {searchQuery
                          ? `Search Results for "${searchQuery}"`
                          : displayedCategories[0]?.title || "All Articles"}
                      </h2>
                      {(searchQuery || selectedCategory) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSearchQuery("")
                            setSelectedCategory(null)
                          }}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    {selectedCategory && !searchQuery && (
                      <p className="text-gray-600 mb-6">{displayedCategories[0]?.description}</p>
                    )}
                  </div>

                  {filteredArticles.length === 0 ? (
                    <Card className="p-12 text-center">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                      <p className="text-gray-600 mb-4">Try adjusting your search or browse by category</p>
                      <Button
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory(null)
                        }}
                      >
                        View All Documentation
                      </Button>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredArticles.map((article) => (
                        <Card
                          key={article.id}
                          className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                          onClick={() => (window.location.href = `/docs/${article.slug}`)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="text-xs">
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
                              <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {article.tags.slice(0, 3).map((tag: string) => (
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
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
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
  )
}
