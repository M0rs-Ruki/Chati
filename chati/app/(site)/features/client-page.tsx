"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Bot,
  Users,
  BarChart3,
  Zap,
  Shield,
  Workflow,
  Bell,
  Globe,
  Database,
  Lock,
  Clock,
  CheckCircle2,
  Sparkles,
  Target,
  TrendingUp,
  MessageCircle,
  Send,
  Calendar,
  Tag,
  FileText,
  Settings,
  Smartphone,
} from "lucide-react";
import { BrandSlider } from "@/components/brand-slider";
import { CounterAnimation } from "@/components/counter-animation";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import Image from "next/image";
import CTASection from "@/components/section/CTASection";

export default function ClientPage() {
  const { ref: statsRef, isVisible: isStatsVisible } =
    useIntersectionObserver();
  const { ref: featuresRef, isVisible: isFeaturesVisible } =
    useIntersectionObserver();

  return (
    <div className="flex flex-col">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Features - WhatsApp Business API & Automation Platform",
            description:
              "Comprehensive features for WhatsApp Business API, AI chatbots, multi-channel messaging, team collaboration, and automation tools.",
            url: "https://chati.ai/features",
            provider: {
              "@type": "Organization",
              name: "Chati.ai",
              url: "https://chati.ai",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50/30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 py-12 md:py-14 lg:py-16 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              className="mb-4 shadow-sm bg-green-100 text-green-700 border-green-200"
              variant="outline"
            >
              Platform Features
            </Badge>

            <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl lg:text-6xl leading-tight">
              Everything You Need to Scale Customer Communication
            </h1>

            <p className="mb-6 text-pretty text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              From AI-powered chatbots to multi-channel messaging, team
              collaboration, and advanced analytics—discover the comprehensive
              features that make Chati.ai the complete solution for modern
              business communication.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                asChild
              >
                <Link
                  href={
                    process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"
                  }
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                asChild
              >
                <Link
                  href={`https://wa.me/${
                    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
                  }`}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Schedule Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Slider */}
      <BrandSlider />

      {/* Core Features Grid */}
      <section
        ref={featuresRef}
        className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-12 md:py-14"
      >
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-green-400/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-10 text-center">
            <Badge className="mb-3 shadow-sm" variant="outline">
              Core Features
            </Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Powerful Tools for Every Business Need
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground text-lg">
              Our platform combines cutting-edge technology with intuitive
              design to deliver exceptional customer experiences
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessageSquare,
                title: "WhatsApp Business API",
                description:
                  "Official WhatsApp Business API integration with verified green tick, unlimited messaging, and rich media support",
                color: "from-green-100 to-green-50",
                iconColor: "text-green-600",
                delay: "delay-0",
              },
              {
                icon: Bot,
                title: "AI-Powered Chatbots",
                description:
                  "Intelligent chatbots with natural language processing, context awareness, and 24/7 automated customer support",
                color: "from-blue-100 to-blue-50",
                iconColor: "text-blue-600",
                delay: "delay-100",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description:
                  "Unified team inbox with conversation assignment, internal notes, and real-time collaboration features",
                color: "from-purple-100 to-purple-50",
                iconColor: "text-purple-600",
                delay: "delay-200",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description:
                  "Comprehensive dashboards with message delivery rates, response times, customer engagement metrics, and ROI tracking",
                color: "from-orange-100 to-orange-50",
                iconColor: "text-orange-600",
                delay: "delay-0",
              },
              {
                icon: Workflow,
                title: "Automation Workflows",
                description:
                  "Visual workflow builder for automated campaigns, drip sequences, and trigger-based messaging",
                color: "from-pink-100 to-pink-50",
                iconColor: "text-pink-600",
                delay: "delay-100",
              },
              {
                icon: Globe,
                title: "Multi-Channel Messaging",
                description:
                  "Manage WhatsApp, Instagram, Facebook Messenger, RCS, SMS, and email from one unified platform",
                color: "from-cyan-100 to-cyan-50",
                iconColor: "text-cyan-600",
                delay: "delay-200",
              },
              {
                icon: Database,
                title: "Customer Data Platform",
                description:
                  "Unified customer profiles with behavioral data, purchase history, and intelligent segmentation",
                color: "from-indigo-100 to-indigo-50",
                iconColor: "text-indigo-600",
                delay: "delay-0",
              },
              {
                icon: Send,
                title: "Broadcast Campaigns",
                description:
                  "Send targeted bulk messages with personalization, scheduling, and A/B testing capabilities",
                color: "from-teal-100 to-teal-50",
                iconColor: "text-teal-600",
                delay: "delay-100",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "Bank-level encryption, GDPR compliance, SOC 2 certification, and role-based access control",
                color: "from-red-100 to-red-50",
                iconColor: "text-red-600",
                delay: "delay-200",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm ${
                  isFeaturesVisible
                    ? `opacity-100 translate-y-0 ${feature.delay}`
                    : "opacity-0 translate-y-8"
                } transition-all duration-700`}
              >
                <CardHeader>
                  <div
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-sm`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Features Detail Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50/30 py-12 md:py-14">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <Badge
                className="mb-3 shadow-sm bg-green-100 text-green-700 border-green-200"
                variant="outline"
              >
                WhatsApp Business API
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Official WhatsApp Business Partner
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-lg leading-relaxed">
                As an official Meta Business Partner, we provide verified
                WhatsApp Business API access with the green tick badge, ensuring
                maximum trust and deliverability for your messages.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Verified Green Tick",
                    description:
                      "Build trust with official business verification and green tick badge",
                  },
                  {
                    icon: Zap,
                    title: "Unlimited Messaging",
                    description:
                      "No daily limits—send millions of messages to engage your entire customer base",
                  },
                  {
                    icon: Sparkles,
                    title: "Rich Media Support",
                    description:
                      "Send images, videos, documents, location, and interactive buttons",
                  },
                  {
                    icon: Target,
                    title: "Template Management",
                    description:
                      "Create, manage, and get approval for message templates in multiple languages",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 items-start group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                      <item.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/15 to-pink-400/20 blur-2xl rounded-3xl transform scale-105" />
              <Image
                src="/whatsapp-business-api-features.webp"
                alt="WhatsApp Business API features dashboard"
                width={600}
                height={500}
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-green-50/40 to-purple-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <Badge
              className="mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200"
              variant="outline"
            >
              Platform Performance
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform delivers exceptional results for thousands of
              companies across industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div
              className={`text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                isStatsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700`}
            >
              <CounterAnimation
                end={500}
                suffix="M+"
                className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-600 to-green-700 bg-clip-text text-transparent mb-2"
                duration={2500}
              />
              <p className="text-muted-foreground text-sm md:text-base font-medium">
                Messages Delivered
              </p>
            </div>

            <div
              className={`text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                isStatsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700 delay-100`}
            >
              <CounterAnimation
                end={10000}
                suffix="+"
                className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2"
                duration={2500}
              />
              <p className="text-muted-foreground text-sm md:text-base font-medium">
                Active Businesses
              </p>
            </div>

            <div
              className={`text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                isStatsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700 delay-200`}
            >
              <CounterAnimation
                end={98}
                suffix="%"
                className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2"
                duration={2500}
              />
              <p className="text-muted-foreground text-sm md:text-base font-medium">
                Customer Satisfaction
              </p>
            </div>

            <div
              className={`text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                isStatsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700 delay-300`}
            >
              <CounterAnimation
                end={85}
                suffix="%"
                className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2"
                duration={2500}
              />
              <p className="text-muted-foreground text-sm md:text-base font-medium">
                Faster Response Time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="relative overflow-hidden bg-white py-12 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <Badge className="mb-3 shadow-sm" variant="outline">
              More Features
            </Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
              Complete Feature Set
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground text-lg">
              Everything you need to manage customer communication at scale
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Calendar,
                title: "Campaign Scheduling",
                description: "Schedule messages for optimal delivery times",
              },
              {
                icon: Tag,
                title: "Smart Segmentation",
                description:
                  "Target customers with precision using tags and filters",
              },
              {
                icon: FileText,
                title: "Template Library",
                description: "Pre-approved templates for faster messaging",
              },
              {
                icon: Settings,
                title: "API & Webhooks",
                description: "Integrate with any system using REST APIs",
              },
              {
                icon: Lock,
                title: "Role-Based Access",
                description: "Control permissions with granular access levels",
              },
              {
                icon: Clock,
                title: "Business Hours",
                description: "Set availability and auto-responses",
              },
              {
                icon: Smartphone,
                title: "Mobile Apps",
                description: "iOS and Android apps for on-the-go management",
              },
              {
                icon: TrendingUp,
                title: "Growth Tools",
                description: "QR codes, chat widgets, and link generators",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border hover:border-primary/50 transition-all hover:shadow-md bg-white"
              >
                <CardHeader className="pb-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/20 py-12 md:py-14">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 text-center">
              <Badge className="mb-3 shadow-sm" variant="outline">
                FAQ
              </Badge>
              <h2 className="mb-3 text-balance text-3xl font-bold md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-base">
                Common questions about our features and platform capabilities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-3">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-3"
                >
                  <AccordionItem
                    value="item-1"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      Can I try the platform before committing?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Yes! We offer a 14-day free trial with full access to all
                      features. No credit card required to start. You can
                      explore the platform, test integrations, and send messages
                      to see how it works for your business.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      Do I need technical knowledge to use the platform?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Not at all! Our platform is designed for non-technical
                      users with an intuitive drag-and-drop interface. However,
                      we also provide APIs and webhooks for developers who want
                      advanced customization.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      Can I use my existing phone number?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Yes, you can use your existing business phone number for
                      WhatsApp Business API. We'll help you migrate it during
                      the onboarding process. The number must not be currently
                      registered on WhatsApp or WhatsApp Business App.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="space-y-3">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-3"
                >
                  <AccordionItem
                    value="item-4"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      How does the AI chatbot work?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Our AI chatbot uses natural language processing to
                      understand customer queries and provide relevant
                      responses. You can train it with your business data, FAQs,
                      and product information. It learns from interactions and
                      improves over time.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-5"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      What integrations are available?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      We integrate with popular platforms including Shopify,
                      WooCommerce, Salesforce, HubSpot, Zapier, and more. We
                      also provide REST APIs and webhooks for custom
                      integrations with any system.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-6"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      Is there a limit on team members?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      Team member limits depend on your plan. Starter plans
                      include up to 3 users, Professional plans up to 10 users,
                      and Enterprise plans offer unlimited team members with
                      advanced role-based access control.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        gradientFrom="from-blue-600"
        gradientVia="via-green-600"
        gradientTo="to-blue-700"
        title="Ready to Transform Your Customer Communication?"
        description="Start your free trial today and experience the power of our comprehensive messaging platform. No credit card required."
        primaryButtonText="Start Free Trial"
        primaryButtonLink={
          process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"
        }
        primaryButtonBgColor="bg-white"
        primaryButtonTextColor="text-green-600"
        primaryButtonHoverBg="hover:bg-gray-50"
        secondaryButtonText="Talk to Sales"
        secondaryButtonLink={`https://wa.me/${
          process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
        }`}
        showSecondaryButton={true}
        footerText="Free 14-day trial • No credit card required • Cancel anytime"
      />
    </div>
  );
}
