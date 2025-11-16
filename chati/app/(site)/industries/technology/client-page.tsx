"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrandSlider } from "@/components/brand-slider";
import {
  Sparkles,
  Rocket,
  Users,
  Bell,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Zap,
  LifeBuoy,
  BookOpen,
  Code,
  Target,
  Repeat,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function TechnologyClientPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: block1Ref, isVisible: block1InView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: block2Ref, isVisible: block2InView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: featuresRef, isVisible: featuresInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: benefitsRef, isVisible: benefitsInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: useCasesRef, isVisible: useCasesInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({
    threshold: 0.1,
  });

  const features = [
    {
      icon: Rocket,
      title: "User Onboarding",
      description:
        "Guide new users through setup with interactive tutorials and automated assistance",
    },
    {
      icon: LifeBuoy,
      title: "Technical Support",
      description:
        "Provide instant support with AI-powered troubleshooting and ticket management",
    },
    {
      icon: Bell,
      title: "Product Updates",
      description:
        "Notify users about new features, releases, and important system updates",
    },
    {
      icon: BookOpen,
      title: "Documentation Sharing",
      description:
        "Share guides, API docs, and tutorials directly in conversations",
    },
    {
      icon: Users,
      title: "Customer Success",
      description:
        "Proactive engagement to ensure users get maximum value from your product",
    },
    {
      icon: MessageSquare,
      title: "Feedback Collection",
      description:
        "Gather user feedback and feature requests to improve your product",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "55% Higher Activation",
      description: "Increase in user activation and product adoption",
    },
    {
      icon: Users,
      title: "40% Better Retention",
      description: "Improvement in customer retention rates",
    },
    {
      icon: LifeBuoy,
      title: "70% Faster Support",
      description: "Reduction in average support response time",
    },
    {
      icon: Zap,
      title: "98% Open Rate",
      description: "Instant delivery ensures users see your messages",
    },
  ];

  const useCases = [
    {
      title: "Trial Onboarding",
      description: "Convert trial users with guided setup and engagement",
      icon: Rocket,
    },
    {
      title: "Feature Adoption",
      description: "Drive usage of new features with targeted messaging",
      icon: Target,
    },
    {
      title: "Churn Prevention",
      description: "Identify and re-engage at-risk users proactively",
      icon: Repeat,
    },
    {
      title: "API Support",
      description: "Help developers integrate with documentation and examples",
      icon: Code,
    },
    {
      title: "Downtime Alerts",
      description: "Notify users instantly about maintenance and incidents",
      icon: Bell,
    },
    {
      title: "Upgrade Campaigns",
      description: "Encourage plan upgrades with personalized offers",
      icon: TrendingUp,
    },
  ];

  const faqsColumn1 = [
    {
      question: "How can WhatsApp improve SaaS user onboarding?",
      answer:
        "WhatsApp provides a familiar, low-friction channel for guiding new users. Send personalized setup instructions, answer questions in real-time, and automate common onboarding tasks—all resulting in higher activation rates and faster time-to-value.",
    },
    {
      question: "Can I integrate WhatsApp with my product?",
      answer:
        "Yes! Chati integrates with popular SaaS tools like Intercom, HubSpot, Salesforce, and custom applications via API. Trigger messages based on user behavior, sync customer data, and create seamless workflows.",
    },
    {
      question: "How do you handle technical support queries?",
      answer:
        "Our AI chatbot can troubleshoot common issues, search your knowledge base, and escalate complex problems to your support team. Users get instant help, and your team handles only the queries that need human expertise.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "Can I send product update notifications?",
      answer:
        "Send release notes, feature announcements, and important updates directly to users. Segment your audience to ensure relevant communications and track engagement to measure impact.",
    },
    {
      question: "How does it help with customer retention?",
      answer:
        "Proactive engagement is key to retention. Send usage tips, check in with inactive users, celebrate milestones, and provide personalized recommendations—all automated based on user behavior and lifecycle stage.",
    },
    {
      question: "Is it suitable for developer-focused products?",
      answer:
        "Yes! Share API documentation, code examples, and technical guides. Help developers troubleshoot integration issues and notify them about API changes or deprecations—all within WhatsApp.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50/30 py-10 sm:py-12 md:py-16">
        {/* Background Blob */}
        <div
          className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px] 
      bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-3xl"
        />

        <div ref={heroRef} className="container relative mx-auto px-4 z-10">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* TEXT CONTENT */}
            <div
              className={`transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 bg-purple-100 text-purple-700 w-fit"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Technology & SaaS Solutions
              </Badge>

              <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">
                  Scale Your SaaS with
                </span>
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  WhatsApp Automation
                </span>
              </h1>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Increase user activation by 55% with automated onboarding,
                instant technical support, and proactive engagement via
                WhatsApp.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button size="lg" variant="outline" asChild>
                  <Link
                    href={`https://wa.me/${
                      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
                    }`}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Book Demo
                  </Link>
                </Button>
              </div>

              {/* Highlights */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-muted-foreground">
                    55% Higher Activation
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-muted-foreground">
                    40% Better Retention
                  </span>
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                <Image
                  src="/saas-dashboard-with-user-onboarding-notifications-o.jpg"
                  alt="SaaS dashboard showing user onboarding and product notifications on WhatsApp"
                  width={600}
                  height={500}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandSlider />

      {/* Block 1: Image Left, Content Right - User Onboarding */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50/40 via-white to-rose-50/30 py-10 sm:py-12 md:py-14">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-pink-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-tr from-rose-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* IMAGE */}
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block1InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-rose-400/15 to-purple-400/20 blur-2xl rounded-3xl scale-105" />
                <Image
                  src="/smartphone-showing-interactive-onboarding-tutorial.jpg"
                  alt="Smartphone showing interactive onboarding tutorial"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                block1InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 bg-pink-100 text-pink-700 border-pink-200"
                variant="outline"
              >
                User Onboarding
              </Badge>

              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
                Activate Users Faster
              </h2>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Guide new users through setup with personalized tutorials,
                answer questions instantly, and automate onboarding tasks for
                55% higher activation.
              </p>

              {/* Features */}
              <div className="space-y-4">
                {/* 1 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 group-hover:bg-pink-200 transition-all shadow-sm">
                    <Rocket className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Interactive Tutorials
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Step-by-step guides with screenshots and videos.
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 group-hover:bg-rose-200 transition-all shadow-sm">
                    <Target className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Personalized Guidance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tailor onboarding flows per user role & industry.
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-all shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Progress Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Auto-nudge users who get stuck in onboarding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Technical Support */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/30 py-10 sm:py-12 md:py-14">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-indigo-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-tr from-violet-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* CONTENT */}
            <div
              className={`transition-all duration-1000 ${
                block2InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 bg-indigo-100 text-indigo-700 border-indigo-200"
                variant="outline"
              >
                Technical Support
              </Badge>

              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
                Instant Support, Happy Users
              </h2>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Offer 24/7 support with AI-powered troubleshooting,
                documentation search, and smart escalation to human agents when
                necessary.
              </p>

              <div className="space-y-4">
                {/* 1 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 group-hover:bg-indigo-200 transition-all shadow-sm">
                    <LifeBuoy className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI-Powered Help</h3>
                    <p className="text-sm text-muted-foreground">
                      Bot handles FAQs & common errors instantly.
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 group-hover:bg-violet-200 transition-all shadow-sm">
                    <Code className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Developer Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Share API docs, code snippets & integration help.
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-all shadow-sm">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Smart Escalation</h3>
                    <p className="text-sm text-muted-foreground">
                      Auto-route complex issues to the right team member.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div
              className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                block2InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 via-violet-400/15 to-purple-400/20 blur-2xl rounded-3xl scale-105" />
                <Image
                  src="/support-chat-interface-with-ai-troubleshooting-an.jpg"
                  alt="AI support troubleshooting interface"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Compact */}
      <section ref={featuresRef} className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              featuresInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Complete SaaS Engagement Platform
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to onboard, support, and retain customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-lg transition-all duration-300 ${
                  featuresInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-11 h-11 bg-gradient-to-br from-purple-100 to-pink-50 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Compact */}
      <section
        ref={benefitsRef}
        className="py-12 md:py-14 bg-gradient-to-br from-purple-50/40 to-pink-50/30"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Why SaaS Companies Choose Chati
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join innovative tech companies growing with WhatsApp
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  benefitsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Compact */}
      <section ref={useCasesRef} className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              useCasesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Technology & SaaS Use Cases
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Discover how SaaS companies use WhatsApp to grow their business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-lg transition-all duration-300 group ${
                  useCasesInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <useCase.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1.5">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Compact */}
      <section ref={faqRef} className="py-12 md:py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              faqInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Common questions about WhatsApp Business API for SaaS
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div
                className={`transition-all duration-700 ${
                  faqInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {faqsColumn1.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white border border-gray-200 rounded-lg px-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-4 text-sm">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div
                className={`transition-all duration-700 delay-200 ${
                  faqInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {faqsColumn2.map((faq, index) => (
                    <AccordionItem
                      key={index + 3}
                      value={`item-${index + 3}`}
                      className="bg-white border border-gray-200 rounded-lg px-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-4 text-sm">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
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

      {/* CTA Section - Compact */}
      <section className="py-12 md:py-14 bg-gradient-to-br from-purple-600 to-pink-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Scale Your SaaS Business?
          </h2>
          <p className="text-base md:text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join innovative tech companies using WhatsApp to onboard users
            faster and drive product adoption
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent"
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
      </section>
    </div>
  );
}

export default TechnologyClientPage;
