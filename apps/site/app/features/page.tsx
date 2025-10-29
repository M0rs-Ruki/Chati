import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Zap, Users, BarChart3, Lock, Cpu, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Features - Chati AI | Complete WhatsApp Marketing Features",
  description:
    "Discover all Chati AI features: messaging automation, team collaboration, analytics, security, integrations, and global scalability.",
  openGraph: {
    title: "Features - Chati AI",
    description: "Everything you need to succeed on WhatsApp with Chati AI.",
    type: "website",
  },
}

export default function FeaturesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Everything You Need to <span className="text-primary">Succeed on WhatsApp</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our comprehensive feature set designed to help you build, manage, and scale customer
              conversations.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Messaging & Automation */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Messaging & Automation</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Bulk messaging campaigns",
                  "Scheduled message delivery",
                  "Template management",
                  "Personalization tokens",
                  "A/B testing",
                  "Automated responses",
                  "Chatbot builder",
                  "Conditional workflows",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Team & Collaboration */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Team & Collaboration</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Multi-agent support",
                  "Role-based access control",
                  "Team inbox",
                  "Assignment routing",
                  "Internal notes",
                  "Activity logs",
                  "Audit trails",
                  "Team performance metrics",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Analytics & Insights */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Analytics & Insights</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Real-time dashboards",
                  "Campaign performance tracking",
                  "Conversion analytics",
                  "Customer journey mapping",
                  "ROI calculation",
                  "Custom reports",
                  "Data export",
                  "Predictive analytics",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security & Compliance */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Security & Compliance</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "End-to-end encryption",
                  "GDPR compliance",
                  "CCPA compliance",
                  "SOC 2 certification",
                  "Data residency options",
                  "Two-factor authentication",
                  "IP whitelisting",
                  "Regular security audits",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Integration & API */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Integration & API</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "REST API",
                  "Webhooks",
                  "CRM integrations",
                  "E-commerce integrations",
                  "Payment gateway support",
                  "Zapier integration",
                  "Custom integrations",
                  "API documentation",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Global & Scalability */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Global & Scalability</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Support for 36+ languages",
                  "Multi-currency support",
                  "Global infrastructure",
                  "99.9% uptime SLA",
                  "Auto-scaling",
                  "Unlimited contacts",
                  "Unlimited campaigns",
                  "Enterprise support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Chati AI?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Official WhatsApp Partner",
                desc: "Direct integration with WhatsApp Business API for guaranteed reliability and support.",
              },
              {
                title: "AI-Powered Intelligence",
                desc: "Advanced AI capabilities for smarter automation, better insights, and personalized experiences.",
              },
              {
                title: "Proven Results",
                desc: "97% open rates and 10-65% ROI increase for our customers. Real results, real growth.",
              },
              {
                title: "Easy to Use",
                desc: "Intuitive interface requires no technical knowledge. Get started in minutes, not weeks.",
              },
              {
                title: "Dedicated Support",
                desc: "24/7 customer support with dedicated account managers for enterprise customers.",
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden fees. Pay only for what you use with flexible, scalable pricing plans.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Power of Chati AI</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Start your free trial today and discover how Chati AI can transform your customer engagement strategy.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
