import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText, HelpCircle, Download, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources - Chati AI | Documentation & Guides",
  description:
    "Access Chati AI documentation, API reference, video tutorials, integration guides, and best practices for WhatsApp marketing.",
  openGraph: {
    title: "Resources - Chati AI",
    description: "Documentation and resources for Chati AI.",
    type: "website",
  },
}

export default function ResourcesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Resources & <span className="text-primary">Documentation</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Everything you need to get the most out of Chati AI. From guides to API documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Documentation</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: "Getting Started",
                description: "Learn the basics and set up your first campaign in minutes",
                link: "#",
              },
              {
                icon: FileText,
                title: "API Reference",
                description: "Complete API documentation for developers",
                link: "#",
              },
              {
                icon: Video,
                title: "Video Tutorials",
                description: "Step-by-step video guides for all features",
                link: "#",
              },
              {
                icon: HelpCircle,
                title: "FAQ",
                description: "Answers to common questions and troubleshooting",
                link: "#",
              },
              {
                icon: Download,
                title: "Integration Guides",
                description: "Connect Chati AI with your favorite tools",
                link: "#",
              },
              {
                icon: BookOpen,
                title: "Best Practices",
                description: "Tips and strategies for maximum ROI",
                link: "#",
              },
            ].map((doc, i) => {
              const Icon = doc.icon
              return (
                <Link
                  key={i}
                  href={doc.link}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <ExternalLink
                      size={18}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog & Articles */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Latest Articles</h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "How to Increase WhatsApp Engagement by 300%",
                category: "Marketing",
                date: "Oct 15, 2024",
                excerpt:
                  "Discover proven strategies to boost your WhatsApp marketing engagement and drive more conversions.",
              },
              {
                title: "WhatsApp Business API: Complete Guide for 2024",
                category: "Guide",
                date: "Oct 10, 2024",
                excerpt:
                  "Everything you need to know about the WhatsApp Business API and how to leverage it for your business.",
              },
              {
                title: "Automation Best Practices for Customer Support",
                category: "Tips",
                date: "Oct 5, 2024",
                excerpt:
                  "Learn how to automate customer support without losing the personal touch your customers expect.",
              },
              {
                title: "Case Study: How TechStore Increased Sales by 300%",
                category: "Case Study",
                date: "Sep 28, 2024",
                excerpt: "Real-world example of how one e-commerce company transformed their business with Chati AI.",
              },
              {
                title: "WhatsApp Marketing Trends for 2025",
                category: "Trends",
                date: "Sep 20, 2024",
                excerpt:
                  "Stay ahead of the curve with the latest trends in WhatsApp marketing and customer engagement.",
              },
              {
                title: "Integrating Chati AI with Your CRM",
                category: "Integration",
                date: "Sep 15, 2024",
                excerpt: "Step-by-step guide to seamlessly integrate Chati AI with popular CRM platforms.",
              },
            ].map((article, i) => (
              <Link
                key={i}
                href="#"
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-sm text-muted-foreground">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars & Events */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Upcoming Webinars</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Advanced WhatsApp Automation Strategies",
                date: "November 5, 2024",
                time: "2:00 PM IST",
                speaker: "Sarah Johnson",
                description: "Learn advanced automation techniques to scale your WhatsApp marketing.",
              },
              {
                title: "Maximizing ROI with WhatsApp Marketing",
                date: "November 12, 2024",
                time: "3:00 PM IST",
                speaker: "Rajesh Kumar",
                description: "Discover proven strategies to maximize your return on investment.",
              },
            ].map((webinar, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="mb-4">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Webinar
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{webinar.description}</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>📅 {webinar.date}</p>
                  <p>🕐 {webinar.time}</p>
                  <p>👤 {webinar.speaker}</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="#">Register Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our support team is here to help. Contact us anytime for assistance.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
