"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { ArrowRight, Zap, Shield, TrendingUp, Users, Brain, CheckCircle2, BarChart3, Bell } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { TypingAnimation } from "@/components/typing-animation"
import { BrandSlider } from "@/components/brand-slider"
import { FloatingSocialIcons } from "@/components/floating-social-icons"
import { FloatingCDPElements } from "@/components/floating-cdp-elements"
import dynamic from "next/dynamic"
import { CounterAnimation } from "@/components/counter-animation"
import { BackToTop } from "@/components/back-to-top"
import Image from "next/image"
import { StructuredData } from "@/components/structured-data"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { throttle } from "@/lib/performance-utils"

const MultiChannelHero = dynamic(
  () => import("@/components/multi-channel-hero").then((mod) => ({ default: mod.MultiChannelHero })),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  },
)

export default function ClientPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  const { ref: cdpSectionRef, isVisible: isCDPVisible } = useIntersectionObserver()
  const { ref: whatsappSectionRef, isVisible: isWhatsAppVisible } = useIntersectionObserver()

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY)
    }, 100) // Only update every 100ms

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col">
      <StructuredData />

      {/* Hero Section with Elegant Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50/30">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div ref={heroRef} className="container relative mx-auto px-4 pr-0 md:pr-4 py-8 md:py-10 z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 w-fit shadow-sm">
                <Bell className="h-3.5 w-3.5 animate-pulse" />
                <span>Official WhatsApp Business API Partner</span>
              </div>

              <h1 className="mb-3 text-balance leading-tight tracking-tight">
                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1">
                  Transform Your Business
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold">
                  <span className="text-foreground">with </span>
                  <TypingAnimation
                    words={["WhatsApp API", "Instagram Messaging", "Facebook Messenger", "Multi-Channel Chat"]}
                    className="inline-block"
                  />
                </span>
              </h1>

              <p className="mb-4 text-sm text-muted-foreground md:text-base max-w-xl leading-relaxed">
                Connect with customers on their favorite platforms. Send promotional offers, automate conversations, and
                grow your business with verified messaging solutions.
              </p>

              <div className="flex flex-col gap-2.5 sm:flex-row mb-4">
                <Button
                  size="default"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                  asChild
                >
                  <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}>
                    <Bell className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    Book a Meeting
                  </Link>
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                  asChild
                >
                  <Link href={process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"}>
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chati%20gdpr-N88djHefyRDj9jPmx3BCHqi9AfhyZw.webp"
                  alt="GDPR Compliant, Meta Business Partner, 500+ Global Businesses"
                  width={600}
                  height={80}
                  className="h-12 md:h-14 w-auto opacity-100"
                  priority
                />
              </div>
            </div>

            <div className="relative flex items-end justify-end lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2 -mr-4 md:mr-0">
              <div className="relative w-full h-full flex items-end justify-end">
                {/* Decorative gradient blob behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/15 to-pink-400/20 blur-3xl rounded-full transform scale-110" />

                <FloatingSocialIcons />

                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp%20API%20with%20Chati-08HzE4mXORVAqoHcQ7VqW35AqrbaJJ.png"
                  alt="Professional using WhatsApp Business API for customer engagement"
                  width={500}
                  height={500}
                  className="relative z-10 h-auto w-full sm:w-auto max-h-[380px] sm:max-h-[400px] lg:max-h-[450px] object-contain object-bottom drop-shadow-2xl lg:ml-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Slider Section - Clean White Background */}
      <BrandSlider />

      {/* Multi-Channel Hero Section after Brand Slider */}
      <MultiChannelHero />

      {/* CDP Integration Section - Full-section background with prominent woman image */}
      <section
        ref={cdpSectionRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30"
      >
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 pr-0 md:pr-4 py-8 md:py-10 z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Content */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 delay-300 ${
                isCDPVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-3 shadow-sm bg-purple-100 text-purple-700 border-purple-200 w-fit" variant="outline">
                Customer Data Platform
              </Badge>

              <h2 className="mb-3 text-balance text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
                Unify Customer Data for Smarter Campaigns
              </h2>

              <p className="mb-5 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                Connect every touchpoint into one powerful platform. Deliver personalized WhatsApp, RCS, and Messenger
                campaigns powered by real-time insights and behavioral data.
              </p>

              <div className="space-y-3 mb-5">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Unified Customer Profiles</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Aggregate data from CRM, e-commerce, and analytics into a single view for targeted messaging
                      campaigns.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Smart Automation</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Trigger personalized messages based on customer actions—purchases, cart activity, and engagement
                      milestones.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Omnichannel Orchestration</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Design seamless experiences across WhatsApp, RCS, Messenger, email, and SMS with consistent
                      messaging.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="default"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                  asChild
                >
                  <Link href={process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"}>
                    Explore CDP Features
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                  asChild
                >
                  <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}>Talk to Expert</Link>
                </Button>
              </div>
            </div>

            {/* Right Image - Full-section background treatment with floating elements */}
            <div
              className={`relative flex items-end justify-end lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2 -mr-4 md:mr-0 transition-all duration-1000 ${
                isCDPVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full h-full flex items-end justify-end">
                {/* Decorative gradient blob behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-pink-400/20 blur-3xl rounded-full transform scale-110" />

                <FloatingCDPElements />

                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cdp-marketing-chati-jj1mEBghwP4J7UYyMyOw2kT2xxs1fs.png"
                  alt="Customer Data Platform showing unified customer journey with real-time analytics, CRM integration, location intelligence, weather-based targeting, purchase tracking, and omnichannel messaging"
                  width={500}
                  height={600}
                  className="relative z-10 h-auto w-full sm:w-auto max-h-[380px] sm:max-h-[400px] lg:max-h-[450px] object-contain object-bottom drop-shadow-2xl lg:ml-auto"
                  loading="lazy"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Business API Section - Enhanced with animations and larger image */}
      <section
        ref={whatsappSectionRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-green-50/40 to-purple-50/30 py-8 md:py-10"
      >
        {/* Decorative gradient orbs matching Stats section */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[55%_45%] items-center">
            {/* Left Side - Image with scroll animations */}
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                isWhatsAppVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                {/* Decorative gradient behind image for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/15 to-pink-400/20 blur-2xl rounded-3xl transform scale-105" />

                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-Business-API-chati-UjTKYnDjjzxGyBOH01t8NWD8x7N749.png"
                  alt="WhatsApp Business API features including 24/7 AI chatbot support, automated reminders and updates on WhatsApp, payment collection, and invoice downloads for seamless customer engagement"
                  width={700}
                  height={600}
                  className="relative z-10 w-full h-auto max-w-2xl max-h-[450px] object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  priority={false}
                />
              </div>
            </div>

            {/* Right Side - Content with scroll animations */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isWhatsAppVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-3 shadow-sm bg-green-100 text-green-700 border-green-200" variant="outline">
                WhatsApp Business API
              </Badge>
              <h2 className="mb-3 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Scale Your Business with WhatsApp
              </h2>
              <p className="mb-5 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Connect with 2+ billion WhatsApp users worldwide. Automate customer conversations, send instant
                notifications, and deliver personalized experiences that drive engagement and revenue.
              </p>

              <div className="space-y-3">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <Brain className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">AI-Powered Chatbots</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Deploy intelligent chatbots that understand context, handle complex queries, and provide instant
                      support 24/7 across multiple languages.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Smart Notifications</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Send order updates, shipping alerts, appointment reminders, and promotional offers with rich
                      media, buttons, and interactive elements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Advanced Analytics</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Track message delivery, read rates, response times, and customer engagement with comprehensive
                      analytics and real-time dashboards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all group"
                  asChild
                >
                  <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}>
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
                  asChild
                >
                  <Link href="/features">View Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Elegant Gradient Background matching theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-green-50/40 to-purple-50/30 py-10 md:py-12">
        {/* Decorative gradient orbs */}
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <Badge className="mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200" variant="outline">
              Trusted Worldwide
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powering Global Business Communication
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of companies using our platform to transform their customer communication
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CounterAnimation
                end={500}
                suffix="M+"
                className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-600 to-green-700 bg-clip-text text-transparent mb-2"
                duration={2500}
              />
              <p className="text-muted-foreground text-sm md:text-base font-medium">Messages Delivered</p>
            </div>

            <div className="text-center p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CounterAnimation
                end={10000}
                suffix="+"
                className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2"
                duration={2500}
              />
              <p className="text-muted-foreground text-sm md:text-base font-medium">Active Businesses</p>
            </div>

            <div className="text-center p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CounterAnimation
                end={98}
                suffix="%"
                className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2"
                duration={2500}
              />
              <p className="text-muted-foreground text-sm md:text-base font-medium">Customer Satisfaction</p>
            </div>

            <div className="text-center p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CounterAnimation
                end={85}
                suffix="%"
                className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2"
                duration={2500}
              />
              <p className="text-muted-foreground text-sm md:text-base font-medium">Faster Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Subtle Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-12 md:py-16">
        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-green-400/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 text-center">
            <Badge className="mb-3 shadow-sm" variant="outline">
              Features
            </Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-5xl">Everything You Need to Succeed</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Our comprehensive AI platform provides all the tools you need to automate, analyze, and optimize your
              business operations.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Advanced AI Models</CardTitle>
                <CardDescription>
                  Leverage state-of-the-art machine learning models trained on billions of data points.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-secondary/50 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Process millions of requests per second with our optimized infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>
                  Forecast trends and make data-driven decisions with powerful analytics tools.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-secondary/50 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>Work seamlessly with your team with real-time collaboration features.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Custom Dashboards</CardTitle>
                <CardDescription>
                  Build personalized dashboards to track the metrics that matter most to you.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              variant="outline"
              className="shadow-sm hover:shadow-md transition-shadow bg-transparent"
              asChild
            >
              <Link href="/features">
                View All Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section - Two-column layout with smooth animations */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/20 py-12 md:py-14">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 text-center">
              <Badge className="mb-3 shadow-sm" variant="outline">
                FAQ
              </Badge>
              <h2 className="mb-3 text-balance text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-base">
                Quick answers to common questions about our messaging platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Left Column */}
              <div className="space-y-3">
                <Accordion type="single" collapsible className="w-full space-y-3">
                  <AccordionItem
                    value="item-1"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      What is WhatsApp Business API and how does it differ from WhatsApp Business App?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      WhatsApp Business API is designed for medium to large businesses to communicate with customers at
                      scale. Unlike the WhatsApp Business App, the API allows multiple users, automation, integration
                      with CRM systems, and can handle unlimited conversations simultaneously.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      How quickly can I get started with the platform?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      You can start sending messages within 24-48 hours. Our team will help you with account setup,
                      WhatsApp Business verification, and integration. Most businesses are fully operational within 3-5
                      business days.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      What messaging channels do you support?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      We support WhatsApp Business API, Instagram Messaging, Facebook Messenger, RCS (Rich Communication
                      Services), SMS, and email. All channels can be managed from a single unified inbox with consistent
                      automation and analytics.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <Accordion type="single" collapsible className="w-full space-y-3">
                  <AccordionItem
                    value="item-4"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      Is my customer data secure and compliant?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      Yes, we are fully GDPR compliant and follow industry-standard security practices. All data is
                      encrypted in transit and at rest. We are also SOC 2 certified and regularly undergo security
                      audits to ensure your data remains protected.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-5"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      Can I integrate with my existing CRM or e-commerce platform?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      We offer native integrations with popular platforms like Shopify, WooCommerce, Salesforce,
                      HubSpot, and more. We also provide REST APIs and webhooks for custom integrations with any system.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-6"
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      What kind of support do you provide?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      We offer 24/7 customer support via WhatsApp, email, and live chat. Enterprise customers get
                      dedicated account managers, priority support, and custom onboarding. Our technical team is always
                      available to help with integrations and troubleshooting.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimalistic and compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-green-600 to-blue-700 py-10 md:py-12">
        {/* Decorative elements for depth */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance">
              Grow Better with Cati Today
            </h2>

            <p className="text-base md:text-lg text-white/90 mb-5 max-w-2xl mx-auto text-pretty leading-relaxed">
              Join thousands of businesses transforming their customer communication. Start your free trial and see
              results in days, not months.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                size="default"
                className="bg-white text-green-600 hover:bg-gray-50 font-semibold shadow-xl hover:shadow-2xl transition-all px-6 group"
                asChild
              >
                <Link href={process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"}>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="default"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-medium shadow-lg backdrop-blur-sm px-6 bg-transparent"
                asChild
              >
                <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}>
                  <Bell className="mr-2 h-4 w-4" />
                  Talk to Sales
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-xs text-white/80">No credit card required • Free 14-day trial • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* BackToTop Component */}
      <BackToTop />
    </div>
  )
}
