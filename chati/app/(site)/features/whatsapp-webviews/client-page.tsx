"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrandSlider } from "@/components/brand-slider"
import { Globe, TrendingUp, ShoppingCart, ArrowRight, CheckCircle2, Zap, Users, Shield, Plane, Heart, GraduationCap, DollarSign, Building2, Truck, Film, Hotel, Sparkles, MousePointerClick, Clock, Target, ExternalLink, X } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function WhatsAppWebViewsPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: problemRef, isVisible: problemInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: benefitsRef, isVisible: benefitsInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: useCasesRef, isVisible: useCasesInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: howItWorksRef, isVisible: howItWorksInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({ threshold: 0.1 })

  const benefits = [
    {
      icon: TrendingUp,
      title: "Enhanced User Experience",
      description:
        "Keep users inside WhatsApp for a faster, smoother experience. No app switching, no loading delays—just instant access to content that drives engagement and satisfaction.",
    },
    {
      icon: Target,
      title: "Increased Conversion Rates",
      description:
        "Eliminate drop-offs caused by external redirects. Customers complete purchases, bookings, and form submissions directly in WhatsApp, boosting conversions by up to 3x.",
    },
    {
      icon: Users,
      title: "Streamlined Customer Support",
      description:
        "Handle order tracking, issue resolution, and real-time support all within the chat interface. Faster responses, happier customers, and reduced support overhead.",
    },
    {
      icon: Sparkles,
      title: "Personalized Interactions",
      description:
        "Deliver tailored product recommendations, custom offers, and dynamic content within the conversation to enhance engagement and build lasting customer loyalty.",
    },
    {
      icon: MousePointerClick,
      title: "Simplified Data Collection",
      description:
        "Gather customer information seamlessly through embedded forms and surveys without leaving WhatsApp. Make data collection effortless and increase completion rates.",
    },
    {
      icon: Shield,
      title: "Enhanced Security & Trust",
      description:
        "Leverage WhatsApp's secure, end-to-end encrypted environment to build trust with customers while protecting sensitive transactions and personal information.",
    },
  ]

  const useCases = [
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description:
        "Display full product catalogs with images, pricing, and variants. Let customers browse, add to cart, and complete checkout—all without leaving WhatsApp.",
      impact: "3x higher conversions",
    },
    {
      icon: Plane,
      title: "Travel & Tourism",
      description:
        "Provide virtual destination tours, enable flight bookings, hotel reservations, and check-ins seamlessly. Complete travel experiences inside WhatsApp chat.",
      impact: "60% faster bookings",
    },
    {
      icon: Heart,
      title: "Healthcare",
      description:
        "Host secure live chat consultations with doctors, enable appointment scheduling, prescription access, and medical record viewing—all within a trusted environment.",
      impact: "95% patient satisfaction",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description:
        "Conduct interactive live classes with real-time quizzes, assignment submissions, course enrollment, and progress tracking directly inside WhatsApp conversations.",
      impact: "80% engagement boost",
    },
    {
      icon: DollarSign,
      title: "Finance",
      description:
        "Enable instant loan approvals with AI-driven eligibility checks, facilitate secure bank transfers, investment tracking, and financial consultations via WhatsApp.",
      impact: "5x faster approvals",
    },
    {
      icon: Building2,
      title: "Real Estate",
      description:
        "Offer immersive 3D virtual property tours, schedule instant viewings, share floor plans, and complete rental agreements without external browser redirects.",
      impact: "70% more inquiries",
    },
    {
      icon: Truck,
      title: "Logistics",
      description:
        "Enable real-time shipment tracking with dynamic updates, delivery rescheduling, proof of delivery, and instant booking—all accessible within WhatsApp chat.",
      impact: "90% fewer support calls",
    },
    {
      icon: Film,
      title: "Entertainment",
      description:
        "Stream live events, sell exclusive merchandise, offer event ticket booking, and provide personalized content recommendations directly in WhatsApp conversations.",
      impact: "4x merchandise sales",
    },
    {
      icon: Hotel,
      title: "Hospitality",
      description:
        "Provide personalized travel itineraries, in-app concierge services, room service ordering, spa bookings, and local recommendations without leaving the chat.",
      impact: "85% guest satisfaction",
    },
  ]

  const faqsColumn1 = [
    {
      question: "What are WhatsApp WebViews?",
      answer:
        "WhatsApp WebViews allow you to load complete web pages directly inside WhatsApp conversations. Instead of redirecting customers to external browsers, they interact with your content, forms, catalogs, or booking systems without ever leaving the chat interface.",
    },
    {
      question: "How do WebViews improve conversion rates?",
      answer:
        "External browser redirects cause significant drop-offs due to slow loading, app switching, and user distraction. WebViews eliminate these friction points by keeping users engaged inside WhatsApp, resulting in up to 3x higher conversion rates for bookings, purchases, and form submissions.",
    },
    {
      question: "Can I use WebViews for e-commerce checkout?",
      answer:
        "Yes! WebViews are perfect for e-commerce. You can display full product catalogs, let customers browse multiple options, add items to cart, and complete secure checkout—all without leaving WhatsApp. This reduces cart abandonment and increases completed purchases.",
    },
  ]

  const faqsColumn2 = [
    {
      question: "Are WebViews secure for sensitive data?",
      answer:
        "Absolutely. WebViews operate within WhatsApp's secure, end-to-end encrypted environment. All interactions, form submissions, and transactions are protected with the same security standards as regular WhatsApp messages, ensuring customer data remains safe.",
    },
    {
      question: "What types of content can I embed in WebViews?",
      answer:
        "You can embed almost any web content: product catalogs, booking systems, forms, surveys, payment gateways, virtual tours, live streaming, quizzes, dashboards, and more. If it's a web page, it can be loaded inside WhatsApp with WebViews.",
    },
    {
      question: "Do I need coding skills to implement WebViews?",
      answer:
        "Not necessarily. Our platform provides easy-to-use tools and templates for common use cases like forms, catalogs, and booking systems. For custom implementations, basic web development knowledge is helpful, but our support team can guide you through the process.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50/30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div ref={heroRef} className="container relative mx-auto px-4 py-16 md:py-20 lg:py-24 z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left Content */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 w-fit shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                No More Browser Redirects
              </Badge>

              <h1 className="mb-4 text-balance leading-tight tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                  Open Web Pages
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
                  Inside WhatsApp Chat
                </span>
              </h1>

              <p className="mb-6 text-lg text-muted-foreground md:text-xl max-w-xl leading-relaxed">
                Stop losing customers to external browsers. Keep users engaged inside WhatsApp with embedded WebViews
                and boost conversions by up to 3x with seamless booking, shopping, and form experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                >
                  Get Started with WebViews
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                  asChild
                >
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-emerald-600">3x</div>
                  <div className="text-sm text-muted-foreground">Higher Conversions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-muted-foreground">External Redirects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">85%</div>
                  <div className="text-sm text-muted-foreground">Less Drop-offs</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-green-400/15 to-blue-400/20 blur-3xl rounded-full transform scale-110" />
                <Image
                  src="/modern-smartphone-showing-whatsapp-chat-interface-.jpg"
                  alt="WhatsApp WebViews showing embedded web page with product catalog inside chat conversation without external browser redirect"
                  width={500}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BrandSlider */}
      <BrandSlider />

      {/* Problem Section */}
      <section
        ref={problemRef}
        className="relative overflow-hidden bg-gradient-to-br from-red-50/30 via-white to-orange-50/20 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              problemInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm bg-red-100 text-red-700 border-red-200" variant="outline">
              The Problem
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Why Businesses Lose Customers on WhatsApp
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              External browser redirects create friction that costs you sales every single day
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Problem Card 1 */}
            <Card
              className={`p-8 border-2 border-red-200 bg-gradient-to-br from-red-50 to-white transition-all duration-1000 ${
                problemInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Browser Redirections = Drop-offs</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every time a user is sent to an external website, they face slow loading times, app switching friction,
                and distraction. Most never complete the journey.
              </p>
              <div className="flex items-center gap-2 text-red-600 font-semibold">
                <X className="w-5 h-5" />
                <span>65% of users abandon external links</span>
              </div>
            </Card>

            {/* Problem Card 2 */}
            <Card
              className={`p-8 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white transition-all duration-1000 delay-200 ${
                problemInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white rotate-180" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Lost Sales = Lost Revenue</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Potential customers abandon carts and bookings because of too many steps, leading to massive missed
                opportunities and decreased conversion rates.
              </p>
              <div className="flex items-center gap-2 text-orange-600 font-semibold">
                <X className="w-5 h-5" />
                <span>70% cart abandonment on external sites</span>
              </div>
            </Card>
          </div>

          {/* Solution CTA */}
          <div
            className={`mt-12 text-center transition-all duration-1000 delay-400 ${
              problemInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="p-8 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">The Solution: WhatsApp WebViews</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Keep users engaged inside WhatsApp and get more sales, bookings, and signups effortlessly—no external
                redirects, no drop-offs, just pure engagement.
              </p>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg">
                Eliminate Drop-offs Today
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/20 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm bg-emerald-100 text-emerald-700 border-emerald-200" variant="outline">
              Key Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Why WhatsApp WebViews Transform{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Customer Experience
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Deliver seamless, engaging experiences that keep customers inside WhatsApp and drive real business results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-500 border-2 hover:border-emerald-300 ${
                  benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section
        ref={useCasesRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              useCasesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200" variant="outline">
              Industry Applications
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              WebViews for Every Industry
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See how businesses across industries use WhatsApp WebViews to drive engagement and revenue
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-500 border hover:border-blue-300 group ${
                  useCasesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{useCase.description}</p>
                <Badge className="bg-green-100 text-green-700 border-green-200" variant="outline">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {useCase.impact}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/20 to-emerald-50/30 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              howItWorksInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm bg-green-100 text-green-700 border-green-200" variant="outline">
              Simple Implementation
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Give Users Something New & Exciting
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Simplify complex processes like booking buses with hundreds of stops, browsing extensive product catalogs,
              or completing multi-step forms—all directly within the chat
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            {/* Left: Visual */}
            <div
              className={`relative transition-all duration-1000 ${
                howItWorksInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 blur-3xl rounded-full" />
                <Image
                  src="/smartphone-showing-whatsapp-chat-with-embedded-int.jpg"
                  alt="WhatsApp WebView implementation showing booking form embedded inside chat conversation"
                  width={400}
                  height={500}
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Right: Features */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                howItWorksInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <Card className="p-6 border-2 hover:border-emerald-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Open Web Within WhatsApp</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Load complete web pages, booking systems, catalogs, and forms directly inside WhatsApp. No
                      external browser required.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Enhanced Engagement</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Simplify complex processes with interactive interfaces. Handle hundreds of options, multi-step
                      flows, and rich media seamlessly.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-green-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Maximized Conversions</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Eliminate drop-offs and boost completion rates. Keep users engaged from discovery to purchase
                      without friction.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 hover:border-purple-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Instant Access</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      No app downloads, no account creation, no delays. Customers access everything instantly within
                      their familiar WhatsApp environment.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm" variant="outline">
              Common Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about WhatsApp WebViews
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div
                className={`transition-all duration-1000 ${
                  faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {faqsColumn1.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white border-2 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Right Column */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {faqsColumn2.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 3}`}
                      className="bg-white border-2 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Stop Losing Customers. Start Using WebViews.
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Keep users engaged inside WhatsApp and watch your conversions soar. Eliminate external redirects, reduce
            drop-offs by 85%, and deliver seamless experiences customers love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
              Get Started with WebViews
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent font-medium"
              asChild
            >
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
