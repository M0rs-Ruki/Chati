import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Chati AI Blog - WhatsApp Marketing Tips & Insights",
  description:
    "Read the latest articles on WhatsApp marketing, customer engagement strategies, and business automation tips from Chati AI experts.",
  openGraph: {
    title: "Chati AI Blog",
    description: "Latest insights on WhatsApp marketing and customer engagement.",
    type: "website",
  },
}

// Demo blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 WhatsApp Marketing Strategies That Drive 3x More Engagement",
    excerpt:
      "Discover proven strategies to maximize your WhatsApp marketing ROI and engage customers like never before.",
    author: "Sarah Johnson",
    date: "2024-10-25",
    category: "Marketing",
    image: "/whatsapp-marketing-strategy.jpg",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "How to Build Effective WhatsApp Chatbots Without Coding",
    excerpt:
      "Learn how to create intelligent chatbots using Chati AI's no-code automation builder to handle customer inquiries 24/7.",
    author: "Mike Chen",
    date: "2024-10-20",
    category: "Automation",
    image: "/chatbot-automation.jpg",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "WhatsApp Business API: Complete Guide for E-commerce Businesses",
    excerpt:
      "Everything you need to know about leveraging WhatsApp Business API to boost sales and customer satisfaction.",
    author: "Emily Rodriguez",
    date: "2024-10-15",
    category: "E-commerce",
    image: "/ecommerce-whatsapp.jpg",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Personalization at Scale: Using AI to Tailor WhatsApp Messages",
    excerpt:
      "Explore how AI-powered personalization can transform your customer interactions and increase conversion rates.",
    author: "David Kumar",
    date: "2024-10-10",
    category: "AI & Analytics",
    image: "/ai-personalization.jpg",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "GDPR Compliance in WhatsApp Marketing: What You Need to Know",
    excerpt: "Navigate the regulatory landscape and ensure your WhatsApp marketing campaigns are fully compliant.",
    author: "Lisa Thompson",
    date: "2024-10-05",
    category: "Compliance",
    image: "/gdpr-compliance.jpg",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "Case Study: How XYZ Company Increased Sales by 150% with WhatsApp",
    excerpt: "Real-world example of how a leading e-commerce brand transformed their customer engagement strategy.",
    author: "James Wilson",
    date: "2024-09-30",
    category: "Case Studies",
    image: "/case-study-success.jpg",
    readTime: "5 min read",
  },
]

export default function Blog() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Chati AI <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert insights, tips, and strategies for WhatsApp marketing success
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="space-y-3 border-t border-border pt-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={16} />
                        {post.author}
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                      Read More <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated with Latest Insights</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to our newsletter and get the latest WhatsApp marketing tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
