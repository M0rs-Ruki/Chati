import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing - Chati AI | Transparent WhatsApp Marketing Pricing",
  description:
    "Simple, transparent pricing for Chati AI. Choose from Starter, Professional, or Enterprise plans. No hidden fees, cancel anytime.",
  openGraph: {
    title: "Pricing - Chati AI",
    description: "Affordable WhatsApp marketing pricing plans for businesses of all sizes.",
    type: "website",
  },
}

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 10,000 contacts",
        "Basic automation",
        "Team inbox (2 agents)",
        "Email support",
        "Basic analytics",
        "WhatsApp Business API",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "For growing businesses scaling operations",
      features: [
        "Up to 100,000 contacts",
        "Advanced automation",
        "Team inbox (10 agents)",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
        "API access",
        "Dedicated account manager",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited contacts",
        "Custom automation",
        "Unlimited agents",
        "24/7 phone support",
        "Custom analytics",
        "White-label options",
        "SLA guarantee",
        "Dedicated infrastructure",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Choose the perfect plan for your business. No hidden fees, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-lg border transition-all ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 ring-2 ring-primary md:scale-105"
                    : "border-border bg-card"
                }`}
              >
                <div className="p-8">
                  {plan.highlighted && (
                    <div className="inline-block mb-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>

                  <Button className="w-full mb-8" variant={plan.highlighted ? "default" : "outline"} asChild>
                    <Link href="/contact">{plan.cta}</Link>
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
              },
              {
                q: "Is there a setup fee?",
                a: "No, there are no setup fees or hidden charges. You only pay for the plan you choose.",
              },
              {
                q: "Do you offer discounts for annual billing?",
                a: "Yes, we offer 20% discount when you pay annually. Contact our sales team for more details.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, bank transfers, and digital wallets. Enterprise customers can arrange custom payment terms.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes, all plans come with a 14-day free trial. No credit card required to get started.",
              },
              {
                q: "What happens if I exceed my contact limit?",
                a: "We'll notify you when you're approaching your limit. You can upgrade anytime or purchase additional contacts as needed.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses using Chati AI. Start your free trial today, no credit card required.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
