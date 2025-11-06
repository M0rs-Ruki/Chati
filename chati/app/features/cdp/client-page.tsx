"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowRight,
  Database,
  Bell,
  Users,
  Target,
  BarChart3,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  MessageSquare,
  Mail,
  Smartphone,
  Instagram,
  Facebook,
  Send,
  ShoppingCart,
  CreditCard,
  Webhook,
  FileText,
  Home,
  Building2,
} from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { BrandSlider } from "@/components/brand-slider"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ClientPage() {
  const { ref: heroRef, isVisible: isHeroVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: dataConsolidationRef, isVisible: isDataConsolidationVisible } = useIntersectionObserver({
    threshold: 0.1,
  })
  const { ref: segmentationRef, isVisible: isSegmentationVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: campaignsRef, isVisible: isCampaignsVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: integrationsRef, isVisible: isIntegrationsVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: featuresRef, isVisible: isFeaturesVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: benefitsRef, isVisible: isBenefitsVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: useCasesRef, isVisible: isUseCasesVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: faqRef, isVisible: isFaqVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50/30 py-12 md:py-14 lg:py-16"
      >
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-4 shadow-sm bg-purple-100 text-purple-700 border-purple-200 w-fit" variant="outline">
                <Database className="mr-2 h-3.5 w-3.5" />
                Customer Data Platform
              </Badge>

              <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl lg:text-6xl leading-tight">
                Unify Customer Data for{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Smarter Campaigns
                </span>
              </h1>

              <p className="mb-6 text-pretty text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl">
                Transform scattered customer data into actionable insights. Create advanced segments, launch targeted
                multi-channel campaigns, and optimize every customer interaction with real-time analytics.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                  asChild
                >
                  <Link href={process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"}>
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
                  <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}>
                    <Bell className="mr-2 h-4 w-4" />
                    Book a Demo
                  </Link>
                </Button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-purple-600">360°</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Customer View</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">20+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Integrations</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-green-600">Real-time</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Analytics</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isHeroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative">
                {/* Decorative gradient behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-pink-400/20 blur-3xl rounded-3xl transform scale-105" />

                <Image
                  src="/customer-data-platform-dashboard-showing-unified-c.jpg"
                  alt="Customer Data Platform dashboard showing unified customer profiles with real-time analytics and segmentation tools"
                  width={700}
                  height={600}
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Slider */}
      <BrandSlider />

      {/* Data Consolidation Section */}
      <section
        ref={dataConsolidationRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-white py-12 md:py-14"
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left Image */}
            <div
              className={`relative transition-all duration-1000 ${
                isDataConsolidationVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-green-400/20 blur-2xl rounded-3xl transform scale-105" />

                <Image
                  src="/unified-customer-data-consolidation-dashboard-show.jpg"
                  alt="Unified customer data consolidation dashboard showing multiple data sources and integrations"
                  width={600}
                  height={500}
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isDataConsolidationVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200" variant="outline">
                <Database className="mr-2 h-3.5 w-3.5" />
                Data Consolidation
              </Badge>

              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                Consolidate Customer Data from{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Every Touchpoint
                </span>
              </h2>

              <p className="mb-6 text-pretty text-muted-foreground text-lg leading-relaxed">
                Bring together customer data from your CRM, e-commerce platform, social media, email campaigns, and more
                into a single, unified customer profile. Get a complete 360-degree view of every customer interaction.
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  "Automatic data synchronization from 20+ platforms",
                  "Real-time customer profile updates",
                  "Duplicate detection and data cleansing",
                  "Historical data tracking and versioning",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-blue-100 p-1">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg group" asChild>
                <Link href={process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"}>
                  Explore Data Consolidation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Segmentation Section */}
      <section
        ref={segmentationRef}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/50 via-white to-blue-50/30 py-12 md:py-14"
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div
              className={`transition-all duration-1000 ${
                isSegmentationVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200" variant="outline">
                <Target className="mr-2 h-3.5 w-3.5" />
                Advanced Segmentation
              </Badge>

              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                Create Laser-Focused{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Customer Segments
                </span>
              </h2>

              <p className="mb-6 text-pretty text-muted-foreground text-lg leading-relaxed">
                Build sophisticated customer segments based on behavior, demographics, purchase history, engagement
                levels, and custom attributes. Target the right audience with precision for maximum campaign
                effectiveness.
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  "Behavioral segmentation based on user actions",
                  "RFM analysis (Recency, Frequency, Monetary)",
                  "Predictive segments using AI and machine learning",
                  "Dynamic segments that update in real-time",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-purple-100 p-1">
                      <ArrowRight className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg group" asChild>
                <Link href={process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"}>
                  Start Segmenting
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Right Image */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${
                isSegmentationVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/15 to-blue-400/20 blur-2xl rounded-3xl transform scale-105" />

                <Image
                  src="/customer-segmentation-dashboard-showing-audience-g.jpg"
                  alt="Customer segmentation dashboard showing advanced audience targeting and behavioral analysis"
                  width={600}
                  height={500}
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Channel Campaigns Section */}
      <section
        ref={campaignsRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/20 to-white py-12 md:py-14"
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left Image */}
            <div
              className={`relative transition-all duration-1000 ${
                isCampaignsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/15 to-purple-400/20 blur-2xl rounded-3xl transform scale-105" />

                <Image
                  src="/multi-channel-campaign-dashboard-showing-whatsapp-.jpg"
                  alt="Multi-channel campaign dashboard showing orchestrated messaging across WhatsApp, RCS, SMS, and email"
                  width={600}
                  height={500}
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isCampaignsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <Badge className="mb-4 bg-green-100 text-green-700 border-green-200" variant="outline">
                <Send className="mr-2 h-3.5 w-3.5" />
                Multi-Channel Campaigns
              </Badge>

              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                Launch Targeted Campaigns Across{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Every Channel
                </span>
              </h2>

              <p className="mb-6 text-pretty text-muted-foreground text-lg leading-relaxed">
                Reach your customers where they are with personalized campaigns across WhatsApp, RCS, SMS, email,
                Instagram, and Facebook. Orchestrate seamless multi-touch journeys that drive engagement and
                conversions.
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  "WhatsApp, RCS, SMS, and email campaign orchestration",
                  "Personalized messaging based on customer data",
                  "A/B testing and campaign optimization",
                  "Real-time campaign performance analytics",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-green-100 p-1">
                      <ArrowRight className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg group" asChild>
                <Link href={process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"}>
                  Create Campaign
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section
        ref={integrationsRef}
        className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isIntegrationsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200" variant="outline">
              <Zap className="mr-2 h-3.5 w-3.5" />
              Platform Integrations
            </Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Connect with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                20+ Platforms
              </span>
            </h2>
            <p className="text-pretty text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Seamlessly integrate with your existing tools and platforms to consolidate customer data and automate
              workflows across your entire tech stack.
            </p>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 transition-all duration-1000 delay-200 ${
              isIntegrationsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              { name: "Razorpay", icon: CreditCard, color: "blue" },
              { name: "Shopify", icon: ShoppingCart, color: "green" },
              { name: "Facebook Leads", icon: Facebook, color: "blue" },
              { name: "India Mart", icon: Building2, color: "orange" },
              { name: "Justdial", icon: FileText, color: "red" },
              { name: "Webhooks", icon: Webhook, color: "purple" },
              { name: "PetPooja", icon: ShoppingCart, color: "orange" },
              { name: "99Acres", icon: Home, color: "blue" },
              { name: "Housing.com", icon: Building2, color: "red" },
              { name: "WhatsApp", icon: MessageSquare, color: "green" },
              { name: "Instagram", icon: Instagram, color: "pink" },
              { name: "Facebook", icon: Facebook, color: "blue" },
              { name: "Email", icon: Mail, color: "blue" },
              { name: "SMS", icon: Smartphone, color: "green" },
              { name: "RCS", icon: MessageSquare, color: "blue" },
            ].map((integration, index) => {
              const Icon = integration.icon
              return (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-3 rounded-lg bg-${integration.color}-50 group-hover:bg-${integration.color}-100 transition-colors`}
                    >
                      <Icon className={`h-6 w-6 text-${integration.color}-600`} />
                    </div>
                    <span className="text-sm font-medium text-center">{integration.name}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="border-2 font-medium bg-transparent" asChild>
              <Link href={process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"}>
                View All Integrations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section
        ref={featuresRef}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/50 via-white to-blue-50/30 py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isFeaturesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200" variant="outline">
              <Zap className="mr-2 h-3.5 w-3.5" />
              Powerful Features
            </Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Everything You Need for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Customer Success
              </span>
            </h2>
            <p className="text-pretty text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Comprehensive customer data platform features designed to help you understand, engage, and grow your
              customer base.
            </p>
          </div>

          <div
            className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-200 ${
              isFeaturesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              {
                icon: Database,
                title: "Unified Customer Profiles",
                description:
                  "Create comprehensive 360-degree customer profiles by consolidating data from all touchpoints into a single view.",
                color: "blue",
              },
              {
                icon: Target,
                title: "Advanced Segmentation",
                description:
                  "Build sophisticated audience segments using behavioral, demographic, and predictive criteria for precise targeting.",
                color: "purple",
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description:
                  "Monitor customer behavior, campaign performance, and business metrics with live dashboards and reports.",
                color: "green",
              },
              {
                icon: Send,
                title: "Multi-Channel Orchestration",
                description:
                  "Launch coordinated campaigns across WhatsApp, RCS, SMS, email, and social media from a single platform.",
                color: "blue",
              },
              {
                icon: Zap,
                title: "Marketing Automation",
                description:
                  "Automate customer journeys with trigger-based workflows, drip campaigns, and personalized messaging.",
                color: "orange",
              },
              {
                icon: TrendingUp,
                title: "Predictive Intelligence",
                description:
                  "Leverage AI and machine learning to predict customer behavior, churn risk, and lifetime value.",
                color: "purple",
              },
              {
                icon: Shield,
                title: "Data Privacy & Compliance",
                description:
                  "Enterprise-grade security with GDPR compliance, data encryption, and role-based access control.",
                color: "red",
              },
              {
                icon: Globe,
                title: "API & Webhooks",
                description:
                  "Flexible integration options with RESTful APIs, webhooks, and custom connectors for any platform.",
                color: "blue",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description:
                  "Work together with shared dashboards, campaign templates, and role-based permissions for your team.",
                color: "green",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`mb-4 inline-flex p-3 rounded-xl bg-${feature.color}-50`}>
                    <Icon className={`h-6 w-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/20 to-white py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isBenefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200" variant="outline">
              <TrendingUp className="mr-2 h-3.5 w-3.5" />
              Business Benefits
            </Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Drive Real{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Business Results
              </span>
            </h2>
            <p className="text-pretty text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Transform your customer data into measurable business outcomes with our comprehensive CDP solution.
            </p>
          </div>

          <div
            className={`grid gap-8 md:grid-cols-2 lg:grid-cols-4 transition-all duration-1000 delay-200 ${
              isBenefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              {
                stat: "3x",
                label: "Higher Engagement",
                description: "Personalized campaigns drive 3x more customer engagement",
              },
              {
                stat: "50%",
                label: "Time Saved",
                description: "Automate data consolidation and save 50% of manual work",
              },
              {
                stat: "2x",
                label: "Conversion Rate",
                description: "Targeted segmentation doubles conversion rates",
              },
              {
                stat: "40%",
                label: "Cost Reduction",
                description: "Optimize marketing spend with data-driven insights",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-3 text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {benefit.stat}
                </div>
                <div className="mb-2 text-lg font-semibold">{benefit.label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        ref={useCasesRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isUseCasesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200" variant="outline">
              <Target className="mr-2 h-3.5 w-3.5" />
              Use Cases
            </Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Perfect for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Every Industry
              </span>
            </h2>
            <p className="text-pretty text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              See how businesses across industries leverage our CDP to drive growth and customer satisfaction.
            </p>
          </div>

          <div
            className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-200 ${
              isUseCasesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              {
                title: "E-commerce & Retail",
                description:
                  "Personalize product recommendations, recover abandoned carts, and create targeted promotions based on purchase history and browsing behavior.",
                icon: ShoppingCart,
              },
              {
                title: "Real Estate",
                description:
                  "Segment leads by property preferences, automate follow-ups, and send personalized property listings across WhatsApp, SMS, and email.",
                icon: Home,
              },
              {
                title: "Financial Services",
                description:
                  "Deliver personalized banking offers, automate loan application follow-ups, and provide timely financial advice based on customer profiles.",
                icon: CreditCard,
              },
              {
                title: "Healthcare",
                description:
                  "Send appointment reminders, share health tips based on patient history, and automate prescription refill notifications.",
                icon: Bell,
              },
              {
                title: "Education",
                description:
                  "Engage students with personalized course recommendations, automate enrollment reminders, and track learning progress.",
                icon: FileText,
              },
              {
                title: "Hospitality & Travel",
                description:
                  "Create personalized travel packages, send booking confirmations, and automate post-stay feedback collection.",
                icon: Globe,
              },
            ].map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-blue-50">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{useCase.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{useCase.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/20 py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isFaqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200" variant="outline">
              <MessageSquare className="mr-2 h-3.5 w-3.5" />
              FAQ
            </Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-pretty text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about our Customer Data Platform.
            </p>
          </div>

          <div
            className={`grid gap-6 md:grid-cols-2 max-w-5xl mx-auto transition-all duration-1000 delay-200 ${
              isFaqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Column 1 */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-white border border-gray-200 rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    What is a Customer Data Platform (CDP)?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    A Customer Data Platform (CDP) is a software system that consolidates customer data from multiple
                    sources into a unified database, creating comprehensive customer profiles. It enables businesses to
                    segment audiences, personalize campaigns, and gain actionable insights across all customer
                    touchpoints.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-white border border-gray-200 rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    How does the CDP integrate with my existing tools?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Our CDP offers seamless integration with 20+ platforms including Razorpay, Shopify, Facebook Leads,
                    India Mart, Justdial, and more. We provide pre-built connectors, RESTful APIs, and webhooks for
                    custom integrations. Data synchronization happens in real-time, ensuring your customer profiles are
                    always up-to-date.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-white border border-gray-200 rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    Can I create custom customer segments?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Yes! Our advanced segmentation engine allows you to create unlimited custom segments based on any
                    combination of behavioral, demographic, transactional, and custom attributes. You can also create
                    dynamic segments that automatically update as customer data changes, and use AI-powered predictive
                    segments.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-4" className="bg-white border border-gray-200 rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    What channels can I use for campaigns?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    You can launch campaigns across multiple channels including WhatsApp Business API, RCS (Rich
                    Communication Services), SMS, Email, Instagram Direct Messages, and Facebook Messenger. Our platform
                    enables omnichannel orchestration, allowing you to coordinate campaigns across all channels from a
                    single interface.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-white border border-gray-200 rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    Is my customer data secure and compliant?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Absolutely. We implement enterprise-grade security with end-to-end encryption, secure data storage,
                    and regular security audits. Our platform is GDPR compliant and includes features for data privacy,
                    consent management, and role-based access control. We also provide audit trails and data retention
                    policies.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="bg-white border border-gray-200 rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    How quickly can I see results?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Most businesses see measurable improvements within the first 30 days. Our quick-start templates and
                    pre-built integrations allow you to launch your first campaign within hours. Real-time analytics
                    provide immediate visibility into campaign performance, customer engagement, and ROI.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 py-16 md:py-20">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Ready to Transform Your Customer Data?
          </h2>
          <p className="mb-8 text-pretty text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Start consolidating customer data, creating targeted segments, and launching personalized campaigns today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-xl hover:shadow-2xl transition-all group"
              asChild
            >
              <Link href={process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"}>
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-medium bg-transparent"
              asChild
            >
              <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}>
                <Bell className="mr-2 h-4 w-4" />
                Schedule Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
