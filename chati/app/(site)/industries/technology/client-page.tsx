"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FAQSection from "@/components/section/FAQSection";
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

  const faqsColumnFAQSection1 = [
    {
      question: "How can SaaS companies use WhatsApp for customer onboarding?",
      answer: "SaaS companies can automate the entire onboarding journey via WhatsApp—send welcome messages with getting-started guides, deliver personalized setup tutorials based on user actions, share quick-start videos, provide feature walkthroughs, offer contextual tips when users complete milestones, and trigger drip campaigns that guide trial users through activation steps. WhatsApp onboarding achieves 85% engagement rates compared to 20% for email, accelerating time-to-value by 60%."
    },
    {
      question: "Can WhatsApp help reduce customer churn?",
      answer: "Absolutely! Set up automated alerts for inactive users with re-engagement tips, send feature recommendations based on usage patterns, provide proactive support for struggling users, share success stories and best practices, offer personalized check-ins from customer success teams, and deliver renewal reminders with incentives. WhatsApp's instant, conversational approach increases user engagement by 45% and reduces churn by 25-35% through timely interventions."
    },
    {
      question: "How does WhatsApp improve trial-to-paid conversions?",
      answer: "Use WhatsApp drip sequences to nurture trial users—send activation messages highlighting quick wins, showcase underutilized premium features, share customer success stories, provide usage analytics showing value delivered, send trial expiration alerts with upgrade incentives, and offer time-limited discounts. Personalized WhatsApp campaigns based on product-qualified leads (PQL) signals achieve 30-50% higher conversion rates than generic email nurture sequences."
    },
    {
      question: "Can we provide technical support via WhatsApp?",
      answer: "Yes! Offer 24/7 first-line support through AI chatbots that answer FAQs, troubleshoot common issues, and provide setup guidance. Enable users to submit bug reports with screenshots, share error logs, schedule support calls, and escalate complex issues to live agents with full conversation context. WhatsApp support reduces ticket resolution time by 40%, decreases support costs by 30%, and improves customer satisfaction scores by 25%."
    }
  ];
  
  const faqsColumnFAQSection2 = [
    {
      question: "How can we integrate WhatsApp with our SaaS platform?",
      answer: "Integrate WhatsApp Business API with your SaaS platform via webhooks and REST APIs to trigger event-based messages—welcome new sign-ups, notify users about account activity, send usage alerts, deliver payment confirmations, share feature updates, and sync user data bidirectionally. Popular integrations include Salesforce, HubSpot, Intercom, Segment, and Zapier, creating a unified ecosystem where customer interactions flow seamlessly between platforms."
    },
    {
      question: "What types of automated messages can SaaS companies send?",
      answer: "Send trial start confirmations with onboarding links, usage milestone celebrations ('You created your 10th project!'), feature announcement updates, billing notifications and payment receipts, subscription renewal reminders, downgrade prevention offers, webinar invitations, product update changelogs, security alerts, and personalized upgrade recommendations—all triggered automatically based on user behavior, subscription tier, and engagement patterns for maximum relevance."
    },
    {
      question: "Can we use WhatsApp for product announcements and updates?",
      answer: "Absolutely! Share new feature launches with demo videos, product roadmap updates, changelog highlights, beta program invitations, maintenance notifications, security updates, integration announcements, and educational content about advanced capabilities. Rich media messages with GIFs, tutorial videos, and interactive buttons achieve 60-80% read rates and 35-50% click-through rates—ensuring your product updates reach and engage users effectively."
    },
    {
      question: "Is WhatsApp scalable for growing SaaS businesses?",
      answer: "Yes! WhatsApp Business API is built for scale, supporting unlimited contacts, multi-agent teams, automated workflows, and high-volume messaging. Whether you have 100 or 1 million users, you can segment audiences, personalize messages, trigger behavioral campaigns, and maintain 1-on-1 conversations. Leading SaaS companies report handling 50,000+ monthly conversations per agent while maintaining sub-2-minute response times through intelligent automation and live agent collaboration."
    }
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
      <FAQSection
        badgeText="Common Questions"
        title="Frequently Asked Questions"
        description="Everything you need to know about WhatsApp for Technology"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

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
