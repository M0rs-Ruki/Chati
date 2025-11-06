"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Video, Clock, Search, Play, X, BookOpen, CheckCircle2, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  youtubeId: string
  thumbnail: string
  views: string
  tags: string[]
}

const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "Getting Started with WhatsApp Business API",
    description:
      "Learn the fundamentals of WhatsApp Business API, including account setup, verification process, and initial configuration. Perfect for beginners starting their WhatsApp Business journey.",
    duration: "12:45",
    category: "Getting Started",
    level: "Beginner",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/whatsapp-business-api-setup.jpg",
    views: "15.2K",
    tags: ["setup", "basics", "account"],
  },
  {
    id: "2",
    title: "Sending Your First Message via API",
    description:
      "Step-by-step guide to sending your first message using WhatsApp Business API. Covers authentication, message formatting, and handling responses.",
    duration: "8:30",
    category: "API Basics",
    level: "Beginner",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/sending-whatsapp-message-api.jpg",
    views: "12.8K",
    tags: ["messaging", "api", "tutorial"],
  },
  {
    id: "3",
    title: "Creating Message Templates",
    description:
      "Master the art of creating effective message templates for WhatsApp Business. Learn about template structure, variables, buttons, and approval process.",
    duration: "15:20",
    category: "Templates",
    level: "Intermediate",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/whatsapp-message-templates.png",
    views: "10.5K",
    tags: ["templates", "messaging", "design"],
  },
  {
    id: "4",
    title: "Building Chatbots with WhatsApp API",
    description:
      "Comprehensive guide to building intelligent chatbots using WhatsApp Business API. Covers conversation flows, natural language processing, and automation strategies.",
    duration: "22:15",
    category: "Automation",
    level: "Advanced",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/whatsapp-chatbot-development.jpg",
    views: "18.3K",
    tags: ["chatbot", "automation", "ai"],
  },
  {
    id: "5",
    title: "Webhook Configuration & Event Handling",
    description:
      "Learn how to configure webhooks to receive real-time notifications from WhatsApp. Covers event types, security, and best practices for handling incoming data.",
    duration: "14:50",
    category: "Integration",
    level: "Intermediate",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/webhook-configuration-api.jpg",
    views: "9.7K",
    tags: ["webhooks", "integration", "events"],
  },
  {
    id: "6",
    title: "Media Messages: Images, Videos & Documents",
    description:
      "Complete tutorial on sending and receiving media files through WhatsApp Business API. Includes image optimization, video formats, and document handling.",
    duration: "11:40",
    category: "Media",
    level: "Intermediate",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/whatsapp-media-messages.jpg",
    views: "11.2K",
    tags: ["media", "images", "videos"],
  },
  {
    id: "7",
    title: "Interactive Messages & Quick Replies",
    description:
      "Discover how to create engaging interactive messages with buttons, lists, and quick replies to enhance customer experience and boost engagement rates.",
    duration: "13:25",
    category: "Advanced Features",
    level: "Intermediate",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/interactive-whatsapp-messages.jpg",
    views: "13.6K",
    tags: ["interactive", "buttons", "engagement"],
  },
  {
    id: "8",
    title: "E-commerce Integration with WhatsApp",
    description:
      "Learn how to integrate WhatsApp Business API with your e-commerce platform. Covers order notifications, cart recovery, and customer support automation.",
    duration: "19:30",
    category: "Use Cases",
    level: "Advanced",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/ecommerce-whatsapp-integration.png",
    views: "16.4K",
    tags: ["ecommerce", "integration", "automation"],
  },
  {
    id: "9",
    title: "Security Best Practices",
    description:
      "Essential security practices for WhatsApp Business API implementation. Covers authentication, data encryption, webhook security, and compliance requirements.",
    duration: "10:15",
    category: "Security",
    level: "Intermediate",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/api-security-best-practices.jpg",
    views: "8.9K",
    tags: ["security", "compliance", "best practices"],
  },
  {
    id: "10",
    title: "Analytics & Performance Monitoring",
    description:
      "Track and optimize your WhatsApp Business performance with analytics. Learn about key metrics, reporting tools, and data-driven optimization strategies.",
    duration: "16:05",
    category: "Analytics",
    level: "Advanced",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/analytics-dashboard-metrics.jpg",
    views: "7.8K",
    tags: ["analytics", "metrics", "optimization"],
  },
  {
    id: "11",
    title: "Broadcast Messaging Strategies",
    description:
      "Master the art of broadcast messaging on WhatsApp. Learn about audience segmentation, timing optimization, and compliance with WhatsApp policies.",
    duration: "14:20",
    category: "Marketing",
    level: "Intermediate",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/broadcast-messaging-strategy.jpg",
    views: "12.1K",
    tags: ["broadcast", "marketing", "strategy"],
  },
  {
    id: "12",
    title: "Customer Support Automation",
    description:
      "Build an efficient customer support system using WhatsApp Business API. Covers ticket management, automated responses, and escalation workflows.",
    duration: "18:45",
    category: "Customer Support",
    level: "Advanced",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/customer-support-automation.png",
    views: "14.7K",
    tags: ["support", "automation", "workflows"],
  },
]

export default function TutorialsClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const categories = Array.from(new Set(tutorials.map((t) => t.category)))
  const levels = ["Beginner", "Intermediate", "Advanced"]

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = !selectedCategory || tutorial.category === selectedCategory
    const matchesLevel = !selectedLevel || tutorial.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200"
      case "Intermediate":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Advanced":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleTutorialClick = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial)
    setTimeout(() => setIsPanelOpen(true), 10)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setTimeout(() => setSelectedTutorial(null), 300)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50/30 py-12 md:py-14">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-3 bg-purple-100 text-purple-700 hover:bg-purple-200 shadow-sm">
              <Video className="w-3 h-3 mr-1.5" />
              Video Tutorials
            </Badge>

            <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
              <span className="block text-foreground mb-1">Master WhatsApp Business API</span>
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                with Step-by-Step Video Guides
              </span>
            </h1>

            <p className="mb-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn from expert tutorials covering everything from basic setup to advanced automation. Watch, learn, and
              implement at your own pace.
            </p>

            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-5 text-sm border-2 focus:border-purple-500 rounded-xl shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  size="sm"
                  className={selectedCategory === null ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                    className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Skill Level</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedLevel === null ? "default" : "outline"}
                  onClick={() => setSelectedLevel(null)}
                  size="sm"
                  className={selectedLevel === null ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  All Levels
                </Button>
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    onClick={() => setSelectedLevel(level)}
                    size="sm"
                    className={selectedLevel === level ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-12 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          {filteredTutorials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No tutorials found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-[1400px] mx-auto">
              {filteredTutorials.map((tutorial) => (
                <Card
                  key={tutorial.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 flex flex-col cursor-pointer"
                  onClick={() => handleTutorialClick(tutorial)}
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-video relative bg-gray-100">
                      <img
                        src={tutorial.thumbnail || "/placeholder.svg"}
                        alt={tutorial.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 text-purple-600 ml-1" fill="currentColor" />
                        </div>
                      </div>
                      {/* Duration Badge */}
                      <Badge className="absolute bottom-3 right-3 bg-black/80 text-white border-none text-xs px-2 py-0.5">
                        <Clock className="w-3 h-3 mr-1" />
                        {tutorial.duration}
                      </Badge>
                    </div>
                    <Badge
                      className={`absolute top-3 left-3 border shadow-sm text-xs px-2 py-0.5 ${getLevelColor(tutorial.level)}`}
                    >
                      {tutorial.level}
                    </Badge>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    {/* Category */}
                    <Badge
                      variant="outline"
                      className="w-fit mb-2 text-xs px-2 py-0.5 border-purple-200 text-purple-700"
                    >
                      {tutorial.category}
                    </Badge>

                    {/* Title */}
                    <h3 className="text-base font-bold mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug">
                      {tutorial.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow leading-relaxed">
                      {tutorial.description}
                    </p>

                    {/* Views */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                      <span>{tutorial.views} views</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 h-7 text-xs"
                      >
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Overlay */}
      {selectedTutorial && (
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
            isPanelOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleClosePanel}
        />
      )}

      {/* Slide-in Panel */}
      {selectedTutorial && (
        <div
          className={`fixed top-0 right-0 h-full w-full lg:w-[900px] xl:w-[1100px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${
            isPanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={handleClosePanel}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Close video panel"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Player Section */}
          <div className="relative bg-black">
            <div className="aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${selectedTutorial.youtubeId}?autoplay=1`}
                title={selectedTutorial.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${getLevelColor(selectedTutorial.level)} border`}>{selectedTutorial.level}</Badge>
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  {selectedTutorial.category}
                </Badge>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">{selectedTutorial.title}</h2>
              <p className="text-base text-gray-600 leading-relaxed">{selectedTutorial.description}</p>
            </div>

            {/* Meta Info Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-center">
                <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500 mb-0.5">Duration</p>
                <p className="text-sm font-semibold text-gray-900">{selectedTutorial.duration}</p>
              </div>
              <div className="text-center border-x border-gray-300">
                <Video className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500 mb-0.5">Views</p>
                <p className="text-sm font-semibold text-gray-900">{selectedTutorial.views}</p>
              </div>
              <div className="text-center">
                <BookOpen className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-500 mb-0.5">Level</p>
                <p className="text-sm font-semibold text-gray-900">{selectedTutorial.level}</p>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="mb-6 p-5 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                What You'll Learn
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>Core concepts and fundamentals of {selectedTutorial.category.toLowerCase()}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>Step-by-step practical implementation guide</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>Industry best practices and optimization techniques</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>Common pitfalls to avoid and troubleshooting tips</span>
                </li>
              </ul>
            </div>

            {/* Topics Covered */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTutorial.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-3 pt-6 border-t">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 h-11" asChild>
                <Link href="/docs">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Documentation
                </Link>
              </Button>
              <Button variant="outline" className="w-full h-11 bg-transparent" asChild>
                <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}>Get Expert Help</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Watch our tutorials and start building powerful WhatsApp Business solutions today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
              <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}>Start Free Trial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
