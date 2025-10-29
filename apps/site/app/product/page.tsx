import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MessageSquare, BarChart3, Shield, Workflow } from "lucide-react"

export const metadata: Metadata = {
  title: "Product - Chati AI | WhatsApp Marketing Platform Features",
  description:
    "Explore Chati AI's powerful features including Team Inbox, Advanced Analytics, No-Code Automation, and Enterprise Security for WhatsApp marketing.",
  openGraph: {
    title: "Product - Chati AI",
    description: "Discover the complete WhatsApp marketing solution with Chati AI.",
    type: "website",
  },
}

export default function ProductPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The Complete <span className="text-primary">WhatsApp Marketing</span> Solution
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Everything you need to build, manage, and scale customer conversations on WhatsApp. From automation to
              analytics, we've got you covered.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Powerful Features Built for Growth</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Feature 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Team Inbox</h3>
                <p className="text-muted-foreground mb-4">
                  Centralized messaging hub for your entire team. Route conversations intelligently, collaborate
                  seamlessly, and never miss a customer message.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    Multi-agent support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    Smart routing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    Real-time notifications
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive insights into campaign performance, customer engagement, and ROI. Make data-driven
                  decisions with real-time dashboards.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    Real-time dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    Conversion tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    Custom reports
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">No-Code Automation</h3>
                <p className="text-muted-foreground mb-4">
                  Build powerful workflows without writing a single line of code. Create chatbots, automate responses,
                  and scale customer interactions.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    Visual workflow builder
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    AI-powered chatbots
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    Conditional logic
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                <p className="text-muted-foreground mb-4">
                  Bank-level security with GDPR and CCPA compliance. Your customer data is protected with
                  industry-leading encryption and standards.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    GDPR compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    SOC 2 certified
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Seamless Integrations</h2>
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
            Connect Chati AI with your favorite tools and platforms. Build a unified customer experience across all
            channels.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "CRM Systems", desc: "Sync customer data with Salesforce, HubSpot, and more" },
              { name: "E-commerce", desc: "Integrate with Shopify, WooCommerce, and Magento" },
              { name: "Payment Gateways", desc: "Accept payments via Stripe, PayPal, and Razorpay" },
              { name: "Analytics", desc: "Connect to Google Analytics, Mixpanel, and Amplitude" },
              { name: "Webhooks", desc: "Custom integrations with any REST API" },
              { name: "Zapier", desc: "Connect to 5000+ apps through Zapier" },
            ].map((integration, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">{integration.name}</h3>
                <p className="text-sm text-muted-foreground">{integration.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Customer Engagement?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses using Chati AI to scale their WhatsApp marketing and customer support.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
