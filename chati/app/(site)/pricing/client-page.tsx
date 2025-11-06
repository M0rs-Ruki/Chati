"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  X,
  ArrowRight,
  Calculator,
  Zap,
  Building2,
  Rocket,
  Crown,
  Radio,
  Code,
  Inbox,
  Upload,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Bot,
  Phone,
  Tag,
  Calendar,
  Filter,
  Workflow,
  Mail,
  GitBranch,
  CreditCard,
  Plug,
  Webhook,
  Droplets,
  HeadphonesIcon,
  Shield,
  Sparkles,
  UserCog,
  Server,
  Lock,
  Globe,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

const pricingPlans = [
  {
    name: "Starter",
    tagline: "Focus on startups",
    icon: Zap,
    description: "Perfect for startups getting started with WhatsApp automation",
    monthlyPrice: 999,
    yearlyPrice: 9590,
    savings: "20%",
    features: [
      { text: "Broadcast only", icon: Radio, included: true },
      { text: "API access", icon: Code, included: true },
      { text: "Basic inbox", icon: Inbox, included: true },
      { text: "Upload contacts", icon: Upload, included: true },
      { text: "Basic template support", icon: FileText, included: true },
      { text: "Up to 3 users", icon: Users, included: true },
      { text: "5,000 messages queued per day", icon: MessageSquare, included: true },
      { text: "Basic reports", icon: BarChart3, included: true },
      { text: "No chatbot", icon: Bot, included: false },
      { text: "No automation flows", icon: Workflow, included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    tagline: "Built for growing teams",
    icon: Building2,
    description: "For growing businesses with higher volume and automation needs",
    monthlyPrice: 1999,
    yearlyPrice: 19190,
    savings: "20%",
    features: [
      { text: "Everything in Starter plan", icon: Check, included: true },
      { text: "Chatbot builder (basic)", icon: Bot, included: true },
      { text: "1 WhatsApp number", icon: Phone, included: true },
      { text: "Team inbox with assignment", icon: Inbox, included: true },
      { text: "Tags and custom fields", icon: Tag, included: true },
      { text: "Campaign scheduling", icon: Calendar, included: true },
      { text: "Basic segmentation", icon: Filter, included: true },
      { text: "Up to 10 users", icon: Users, included: true },
      { text: "20,000 messages queued per day", icon: MessageSquare, included: true },
      { text: "Basic workflow automation", icon: Workflow, included: true },
      { text: "Template analytics", icon: BarChart3, included: true },
      { text: "Email support", icon: Mail, included: true },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    tagline: "Business automation tier",
    icon: Rocket,
    description: "For businesses requiring advanced automation and integrations",
    monthlyPrice: 2999,
    yearlyPrice: 28790,
    savings: "20%",
    features: [
      { text: "Everything in Professional plan", icon: Check, included: true },
      { text: "Advanced chatbot flows", icon: GitBranch, included: true },
      { text: "Advanced automation", icon: Workflow, included: true },
      { text: "Multiple WhatsApp numbers", icon: Phone, included: true },
      { text: "Unlimited users", icon: Users, included: true },
      { text: "Advanced segmentation", icon: Filter, included: true },
      { text: "Payment links", icon: CreditCard, included: true },
      { text: "CRM integrations", icon: Plug, included: true },
      { text: "Webhooks", icon: Webhook, included: true },
      { text: "Drip campaigns", icon: Droplets, included: true },
      { text: "Priority chat support", icon: HeadphonesIcon, included: true },
      { text: "50,000 messages queued per day", icon: MessageSquare, included: true },
      { text: "Role-based access control", icon: Shield, included: true },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
]

const enterpriseFeatures = [
  { text: "Dedicated onboarding", icon: UserCog },
  { text: "AI agent", icon: Sparkles },
  { text: "On-premises or dedicated infrastructure", icon: Server },
  { text: "SLA guarantee", icon: Shield },
  { text: "Number masking", icon: Phone },
  { text: "IP restriction", icon: Lock },
  { text: "Custom integrations", icon: Plug },
  { text: "Unlimited messaging queues", icon: MessageSquare },
  { text: "Personal account manager", icon: UserCheck },
]

export default function PricingClientPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
              Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Simple, Transparent Pricing for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Every Business
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance">
              Choose the perfect plan for your business needs. Clear upgrade path from startup to enterprise.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <span className={cn("text-sm font-medium", billingCycle === "monthly" && "text-green-600")}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={cn(
                "relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300",
                billingCycle === "yearly" ? "bg-green-600" : "bg-gray-300",
              )}
              role="switch"
              aria-checked={billingCycle === "yearly"}
            >
              <span
                className={cn(
                  "inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300",
                  billingCycle === "yearly" ? "translate-x-7" : "translate-x-1",
                )}
              />
            </button>
            <span className={cn("text-sm font-medium", billingCycle === "yearly" && "text-green-600")}>
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-700 border-green-200">Save 20%</Badge>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-14">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4",
                  plan.popular && "border-green-500 border-2 shadow-xl scale-105",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-emerald-50">
                      <plan.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                    </div>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        ₹
                        {billingCycle === "monthly"
                          ? plan.monthlyPrice.toLocaleString()
                          : plan.yearlyPrice.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-sm text-green-600 mt-2">
                        Save ₹{(plan.monthlyPrice * 12 - plan.yearlyPrice).toLocaleString()} per year
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 shrink-0 mt-0.5" />
                        )}
                        <span className={cn("text-sm", feature.included ? "text-gray-700" : "text-gray-400")}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={cn(
                      "w-full group",
                      plan.popular
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-white hover:bg-green-50 text-green-600 border-2 border-green-600",
                    )}
                    asChild
                  >
                    <Link href="/contact">
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Enterprise Section */}
      <section className="py-12 md:py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50/50 to-purple-50/50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <CardContent className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg">
                      <Crown className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Custom Enterprise</h2>
                      <p className="text-sm text-muted-foreground">Tailored for your organization</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Need more than our Enterprise plan? We offer fully customized solutions with dedicated
                    infrastructure, AI agents, and personalized support for large-scale operations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white group" asChild>
                      <Link href="/contact">
                        Contact Sales
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                      asChild
                    >
                      <Link href="/pricing/calculator">View Calculator</Link>
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {enterpriseFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-purple-100 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-purple-100 to-pink-50">
                        <feature.icon className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Calculator CTA Section */}
      <section className="py-12 md:py-14 bg-gradient-to-b from-blue-50/30 via-white to-green-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
              Smart Pricing Calculator
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Calculate Your Exact Costs</h2>
            <p className="text-lg text-muted-foreground">
              Get instant pricing estimates based on your message volume, country, and plan selection with our
              intelligent calculator
            </p>
          </div>

          <Card className="max-w-4xl mx-auto overflow-hidden border-2 border-green-200 bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50/50 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <CardContent className="p-8 md:p-10 text-center space-y-6">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg">
                  <Calculator className="h-10 w-10" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Ready to Calculate Your Costs?</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Use our advanced pricing calculator to get accurate cost estimates. Select your country, message volume,
                and plan to see real-time pricing with smart volume-based discounts.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                  <Globe className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">30+ Countries</p>
                    <p className="text-xs text-muted-foreground">Global pricing support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Smart Margins</p>
                    <p className="text-xs text-muted-foreground">Volume-based pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                  <Calculator className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Real-time</p>
                    <p className="text-xs text-muted-foreground">Instant calculations</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white group" asChild>
                  <Link href="/pricing/calculator">
                    Open Pricing Calculator
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-14 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about our pricing</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What's included in the free trial?",
                a: "All plans come with a 14-day free trial with full access to features. No credit card required.",
              },
              {
                q: "Can I upgrade my plan later?",
                a: "Yes, you can upgrade at any time. We've designed a clear upgrade path from Starter to Professional to Enterprise, making it easy to scale as your business grows.",
              },
              {
                q: "How does volume-based pricing work?",
                a: "Our smart pricing calculator automatically applies volume discounts. Higher message volumes get better per-message rates: 4 paise for under 20K, 3 paise for 20K-1M, 2 paise for 1M-5M, and 1 paise for over 5M messages.",
              },
              {
                q: "What's the difference between plans?",
                a: "Each plan builds on the previous one. Starter focuses on basic broadcasting, Professional adds chatbot and automation, Enterprise includes advanced features and integrations, and Custom Enterprise offers dedicated infrastructure and AI agents.",
              },
              {
                q: "Do you offer custom enterprise solutions?",
                a: "Yes, we offer fully customized solutions for large enterprises with specific needs including dedicated infrastructure, AI agents, SLA guarantees, and personal account managers. Contact our sales team for details.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="animate-in fade-in slide-in-from-bottom-4 hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
