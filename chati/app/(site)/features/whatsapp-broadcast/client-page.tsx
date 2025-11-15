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
  Radio,
  Users,
  Calendar,
  Target,
  BarChart3,
  Zap,
  Clock,
  FileText,
  ArrowRight,
  Send,
  Filter,
  TrendingUp,
  MessageSquare,
  Globe,
  Shield,
  Sparkles,
  Database,
  LineChart,
  PieChart,
  Activity,
  Layers,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const FloatingBroadcastIcons = () => {
  return (
    <>
      {/* Radio/Broadcast Icon */}
      <div className="absolute top-[15%] left-[10%] w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Radio className="w-7 h-7 text-white" />
      </div>

      {/* Send Icon */}
      <div className="absolute top-[25%] right-[15%] w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl animate-float-delayed z-20">
        <Send className="w-6 h-6 text-white" />
      </div>

      {/* Users Icon */}
      <div className="absolute bottom-[30%] left-[5%] w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Users className="w-8 h-8 text-white" />
      </div>

      {/* Target Icon */}
      <div className="absolute bottom-[15%] right-[10%] w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-2xl animate-float-delayed z-20">
        <Target className="w-7 h-7 text-white" />
      </div>

      {/* BarChart Icon */}
      <div className="absolute top-[45%] right-[5%] w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-2xl animate-float z-20">
        <BarChart3 className="w-6 h-6 text-white" />
      </div>
    </>
  );
};

export default function WhatsAppBroadcastPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: block1Ref, isVisible: block1InView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: block2Ref, isVisible: block2InView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: block3Ref, isVisible: block3InView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: cdpAnalyticsRef, isVisible: cdpAnalyticsInView } =
    useIntersectionObserver({ threshold: 0.1 });
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
      icon: Users,
      title: "Audience Segmentation",
      description:
        "Create targeted segments based on customer behavior, demographics, and engagement history for personalized messaging.",
    },
    {
      icon: Calendar,
      title: "Campaign Scheduling",
      description:
        "Schedule broadcasts in advance and send messages at optimal times for maximum engagement across time zones.",
    },
    {
      icon: FileText,
      title: "Rich Media Support",
      description:
        "Send images, videos, documents, and interactive buttons to create engaging broadcast campaigns.",
    },
    {
      icon: Target,
      title: "Personalization",
      description:
        "Use custom fields and variables to personalize each message with customer names, order details, and more.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Track delivery rates, read receipts, click-through rates, and engagement metrics in real-time dashboards.",
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description:
        "Send thousands of messages instantly with our high-performance infrastructure and reliable delivery.",
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description:
        "Apply advanced filters to target specific customer groups based on tags, custom fields, and behavior.",
    },
    {
      icon: Clock,
      title: "Drip Campaigns",
      description:
        "Set up automated drip campaigns to nurture leads and engage customers over time with scheduled sequences.",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "98% Open Rate",
      description:
        "WhatsApp messages have significantly higher open rates compared to email, ensuring your message gets seen.",
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description:
        "Reach customers directly on their preferred messaging platform with instant, personal communication.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Send broadcasts to customers worldwide with support for multiple languages and international numbers.",
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description:
        "Stay compliant with data protection regulations with built-in consent management and opt-out handling.",
    },
  ];

  const useCases = [
    {
      title: "Product Launches",
      description:
        "Announce new products and services to your entire customer base with engaging multimedia content.",
      icon: Sparkles,
    },
    {
      title: "Promotional Campaigns",
      description:
        "Drive sales with targeted promotional offers, discount codes, and limited-time deals.",
      icon: Target,
    },
    {
      title: "Event Invitations",
      description:
        "Invite customers to webinars, workshops, and events with RSVP tracking and reminders.",
      icon: Calendar,
    },
    {
      title: "Order Updates",
      description:
        "Keep customers informed about order status, shipping updates, and delivery notifications.",
      icon: Send,
    },
    {
      title: "Customer Surveys",
      description:
        "Gather feedback and insights with interactive surveys and polls sent via WhatsApp.",
      icon: BarChart3,
    },
    {
      title: "Re-engagement",
      description:
        "Win back inactive customers with personalized re-engagement campaigns and special offers.",
      icon: Users,
    },
  ];

  const faqsColumn1 = [
    {
      question: "What is WhatsApp Broadcast?",
      answer:
        "WhatsApp Broadcast allows you to send messages to multiple contacts at once. Unlike group messages, broadcast messages appear as individual chats, making communication more personal and professional.",
    },
    {
      question: "How many contacts can I send broadcasts to?",
      answer:
        "With our platform, you can send broadcasts to thousands of contacts simultaneously. The exact limit depends on your plan and WhatsApp Business API limits.",
    },
    {
      question: "Can I schedule broadcasts in advance?",
      answer:
        "Yes, you can schedule broadcasts for any future date and time. Our system will automatically send the messages at the scheduled time, even across different time zones.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "How do I segment my audience?",
      answer:
        "You can create segments based on tags, custom fields, purchase history, engagement levels, and more. Our advanced filtering system makes it easy to target the right audience.",
    },
    {
      question: "Can I track broadcast performance?",
      answer:
        "Our analytics dashboard shows delivery rates, read receipts, click-through rates, and engagement metrics for every broadcast campaign.",
    },
    {
      question: "What types of media can I send?",
      answer:
        "You can send text, images, videos, documents, PDFs, and interactive buttons. Rich media content helps increase engagement and conversion rates.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50/30">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 pr-0 md:pr-4 py-12 md:py-14 lg:py-16 z-10"
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
            {/* Left Content */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-green-100 text-green-700 hover:bg-green-200 w-fit shadow-sm"
              >
                <Radio className="w-3.5 h-3.5 mr-1.5" />
                WhatsApp Broadcast Messaging
              </Badge>

              <h1 className="mb-4 text-balance leading-tight tracking-tight">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  Reach Thousands of Customers
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
                  With One Click
                </span>
              </h1>

              <p className="mb-6 text-base text-muted-foreground md:text-lg max-w-xl leading-relaxed">
                Send personalized WhatsApp broadcasts to your entire customer
                base instantly. Schedule campaigns, segment audiences, and track
                engagement with our powerful broadcast messaging platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                >
                  Start Broadcasting Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="
              border-2 
              bg-white 
              text-gray-800 
              hover:bg-green-50 
              hover:border-green-500 
              hover:text-green-600 
              font-medium 
              shadow-sm 
              transition-all
            "
                  asChild
                >
                  <Link href="/pricing/calculator">Calculate Costs</Link>
                </Button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-green-600">
                    98%
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Open Rate
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">
                    10K+
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Messages/Min
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-purple-600">
                    24/7
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Automation
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image - Replaced with new stable image with border, removed floating animation */}
            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-lg">
                {/* Decorative gradient blob behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/15 to-purple-400/20 blur-3xl rounded-full transform scale-110" />

                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wp-broadcast-xj8pDcUVcczA1H2ptj6ksB3KWsZYO3.webp"
                  alt="WhatsApp Business broadcast messaging interface showing Brand zone verified account sending promotional campaign to multiple customers with delivery status tracking, read receipts, and reply indicators"
                  width={600}
                  height={700}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BrandSlider component */}
      <BrandSlider />

      {/* Block 1: Image Left, Content Right - Broadcast Messaging Power */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/30 via-white to-blue-50/40 py-10 sm:py-12 md:py-16 lg:py-20"
      >
        {/* Background Effects */}
        <div className="absolute top-10 left-10 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-2 items-center">
            {/* Left Side - Image */}
            <div
              className={`order-1 lg:order-1 flex items-center justify-center lg:justify-start transition-all duration-1000 delay-300 ${
                block1InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-green-400/20 blur-2xl rounded-3xl transform scale-105" />

                <div className="relative z-10 w-full aspect-[4/3]">
                  <Image
                    src="/whatsapp-audience-segmentation-dashboard-showing-c.jpg"
                    alt="WhatsApp audience segmentation dashboard showing customer groups, filters, tags, and targeted broadcast campaigns with personalization options"
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 55vw"
                    className="object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div
              className={`order-2 lg:order-2 transition-all duration-1000 ${
                block1InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 md:mb-4 shadow-sm bg-purple-100 text-purple-700 border-purple-200"
                variant="outline"
              >
                Broadcast Messaging Power
              </Badge>
              <h2 className="mb-4 md:mb-5 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Send Powerful Broadcast Messages
              </h2>
              <p className="mb-6 md:mb-8 text-pretty text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Reach thousands of customers instantly with personalized
                broadcast campaigns. Schedule messages, track delivery, and
                measure engagement with our powerful broadcasting tools.
              </p>

              <div className="space-y-4 md:space-y-5">
                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Mass Message Distribution
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Send messages to thousands of contacts simultaneously with
                      automated delivery and real-time tracking.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <Target className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Campaign Scheduling
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Plan and schedule your campaigns in advance for optimal
                      timing and maximum engagement.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <Filter className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Performance Analytics
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Track delivery rates, read receipts, and engagement
                      metrics to optimize your messaging strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Smart Audience Targeting */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/30 via-white to-blue-50/40 py-10 sm:py-12 md:py-16 lg:py-20"
      >
        {/* Background Effects */}
        <div className="absolute top-10 left-10 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-2 items-center">
            {/* Left Side - Content */}
            <div
              className={`order-2 lg:order-1 transition-all duration-1000 ${
                block2InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 md:mb-4 shadow-sm bg-purple-100 text-purple-700 border-purple-200"
                variant="outline"
              >
                Smart Audience Targeting
              </Badge>
              <h2 className="mb-4 md:mb-5 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Target the Right Customers Every Time
              </h2>
              <p className="mb-6 md:mb-8 text-pretty text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Create highly targeted broadcast campaigns using advanced
                segmentation and filtering. Send personalized messages to
                specific customer groups based on behavior, demographics,
                purchase history, and engagement levels for maximum impact and
                conversion.
              </p>

              <div className="space-y-4 md:space-y-5">
                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Advanced Customer Segmentation
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Create unlimited segments based on tags, custom fields,
                      location, language, purchase behavior, and engagement
                      history. Target VIP customers, cart abandoners, or
                      inactive users with precision.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <Target className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Dynamic Personalization
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Personalize every message with customer names, order
                      details, loyalty points, and custom variables. Make each
                      broadcast feel like a personal conversation, not mass
                      marketing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <Filter className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Smart Filtering & Exclusions
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Apply multiple filters simultaneously and exclude specific
                      groups. Prevent message fatigue by automatically excluding
                      customers who recently received broadcasts or opted out.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div
              className={`order-1 lg:order-2 flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                block2InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-green-400/20 blur-2xl rounded-3xl transform scale-105" />

                <div className="relative z-10 w-full aspect-[4/3]">
                  <Image
                    src="/whatsapp-audience-segmentation-dashboard-showing-c.jpg"
                    alt="WhatsApp audience segmentation dashboard showing customer groups, filters, tags, and targeted broadcast campaigns with personalization options"
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 55vw"
                    className="object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Image Left, Content Right - Campaign Analytics */}
      <section
        ref={block3Ref}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/40 via-white to-blue-50/30 py-10 sm:py-12 md:py-16 lg:py-20"
      >
        <div className="absolute top-10 right-10 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-green-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-2 items-center">
            {/* Left Side - Image */}
            <div
              className={`order-1 lg:order-1 flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block3InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-green-400/15 to-purple-400/20 blur-2xl rounded-3xl transform scale-105" />

                <div className="relative z-10 w-full aspect-[4/3]">
                  <Image
                    src="/whatsapp-broadcast-analytics-dashboard-showing-cam.jpg"
                    alt="WhatsApp broadcast analytics dashboard showing campaign performance metrics, delivery rates, read receipts, click-through rates, conversion tracking, and ROI analysis"
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 55vw"
                    className="object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div
              className={`order-2 lg:order-2 transition-all duration-1000 delay-300 ${
                block3InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 md:mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200"
                variant="outline"
              >
                Campaign Analytics & Insights
              </Badge>
              <h2 className="mb-4 md:mb-5 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Measure What Matters with Deep Analytics
              </h2>
              <p className="mb-6 md:mb-8 text-pretty text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Track every aspect of your broadcast campaigns with
                comprehensive analytics and reporting. Understand customer
                engagement, optimize message timing, and improve campaign
                performance with data-driven insights that help you make smarter
                marketing decisions.
              </p>

              <div className="space-y-4 md:space-y-5">
                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Comprehensive Campaign Metrics
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Track delivery rates, read receipts, click-through rates,
                      and conversion metrics for every broadcast. See exactly
                      how many customers opened, read, and acted on your
                      messages in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      ROI & Revenue Tracking
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Connect broadcasts to actual sales and revenue. Track
                      which campaigns drive the most conversions, calculate ROI,
                      and identify your most profitable messaging strategies.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Optimal Timing Insights
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Discover the best times to send broadcasts based on
                      historical engagement data. Our AI analyzes customer
                      behavior patterns to recommend optimal send times for
                      maximum open and response rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CDP Analytics Section */}
      <section
        ref={cdpAnalyticsRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-12 sm:py-16 md:py-20 lg:py-24"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div
            className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
              cdpAnalyticsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-3 md:mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200"
              variant="outline"
            >
              Customer Data Platform Integration
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance">
              Analytics & Reports Powered by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Unified Customer Data
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Consolidate customer data from multiple sources, gain actionable
              insights, and orchestrate multi-channel campaigns across WhatsApp,
              RCS, SMS, email, and social media—all from one powerful Customer
              Data Platform.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 mb-10 sm:mb-12">
            {/* Left: Analytics Dashboard Image */}
            <div
              className={`transition-all duration-1000 ${
                cdpAnalyticsInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/20 blur-2xl rounded-3xl transform scale-105" />

                <div className="relative z-10 w-full aspect-[4/3]">
                  <Image
                    src="/customer-data-platform-analytics-dashboard-showing.jpg"
                    alt="Customer Data Platform analytics dashboard showing unified customer profiles, real-time broadcast metrics, multi-channel campaign performance, segmentation insights, and ROI tracking across WhatsApp, RCS, SMS, email, and social media"
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 50vw"
                    className="object-contain drop-shadow-2xl rounded-2xl hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Key CDP Features */}
            <div
              className={`space-y-5 md:space-y-6 transition-all duration-1000 delay-300 ${
                cdpAnalyticsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex gap-3 md:gap-4 items-start group">
                <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-md">
                  <Database className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground mb-1 md:mb-2 text-base md:text-lg">
                    Unified Customer Data Consolidation
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Automatically consolidate customer data from 20+ platforms
                    including Razorpay, Shopify, Facebook Leads, India Mart,
                    Justdial, Webhooks, PetPooja, 99Acres, and Housing.com.
                    Create unified customer profiles that combine purchase
                    history, engagement data, and behavioral insights for
                    smarter targeting.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 items-start group">
                <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-md">
                  <Layers className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground mb-1 md:mb-2 text-base md:text-lg">
                    Multi-Channel Campaign Orchestration
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Coordinate campaigns across WhatsApp, RCS, SMS, email, and
                    social media from a single platform. Track customer journeys
                    across channels, optimize message timing, and ensure
                    consistent messaging for maximum engagement and conversion
                    rates.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 items-start group">
                <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-md">
                  <LineChart className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground mb-1 md:mb-2 text-base md:text-lg">
                    Real-Time Analytics & Actionable Insights
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Monitor broadcast performance in real-time with
                    comprehensive dashboards showing delivery rates, engagement
                    metrics, conversion tracking, and revenue attribution. Get
                    AI-powered recommendations to optimize campaign timing,
                    messaging, and audience targeting.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 items-start group">
                <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 group-hover:from-orange-200 group-hover:to-orange-100 transition-all shadow-md">
                  <Target className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground mb-1 md:mb-2 text-base md:text-lg">
                    Advanced Customer Segmentation
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Create dynamic segments using attributes, tags, sources,
                    purchase behavior, engagement history, and custom fields.
                    Build lookalike audiences, identify high-value customers,
                    and personalize every interaction based on comprehensive
                    customer profiles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Integrations Showcase */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              cdpAnalyticsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="p-6 sm:p-8 bg-white/80 backdrop-blur-sm border-2 shadow-xl">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  Seamless Platform Integrations
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  Connect your entire tech stack and consolidate customer data
                  from all your business tools
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {[
                  { name: "Razorpay", icon: "💳" },
                  { name: "Shopify", icon: "🛍️" },
                  { name: "Facebook Leads", icon: "📱" },
                  { name: "India Mart", icon: "🏪" },
                  { name: "Justdial", icon: "📞" },
                  { name: "Webhooks", icon: "🔗" },
                  { name: "PetPooja", icon: "🍽️" },
                  { name: "99Acres", icon: "🏠" },
                  { name: "Housing.com", icon: "🏘️" },
                  { name: "Custom APIs", icon: "⚙️" },
                ].map((platform, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                      {platform.icon}
                    </div>
                    <div className="text-xs font-medium text-center text-gray-700">
                      {platform.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg text-sm sm:text-base"
                  asChild
                >
                  <Link href="/features/cdp">
                    Explore Customer Data Platform
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* Key Metrics Cards */}
          <div
            className={`grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 transition-all duration-1000 delay-700 ${
              cdpAnalyticsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="p-5 sm:p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                    Real-Time
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Data Sync
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Customer data syncs in real-time across all platforms, ensuring
                you always have the most up-to-date information for targeting
                and personalization.
              </p>
            </Card>

            <Card className="p-5 sm:p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
                  <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                    360°
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Customer View
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Get a complete 360-degree view of every customer with unified
                profiles combining data from all touchpoints and interactions.
              </p>
            </Card>

            <Card className="p-5 sm:p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-100 hover:shadow-lg transition-all sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    3.5x
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Higher ROI
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Businesses using our CDP-powered analytics see 3.5x higher ROI
                on broadcast campaigns through better targeting and
                personalization.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section
        ref={featuresRef}
        className="py-12 md:py-14 bg-gradient-to-b from-white via-green-50/20 to-white"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              featuresInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Broadcast Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and optimize your WhatsApp
              broadcast campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-300 border-gray-200 ${
                  featuresInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        ref={benefitsRef}
        className="py-12 md:py-14 bg-gradient-to-br from-green-50/40 via-white to-blue-50/30"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose WhatsApp Broadcast?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Leverage the power of WhatsApp to reach your customers where they
              are most active
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        ref={useCasesRef}
        className="py-12 md:py-14 bg-gradient-to-br from-white via-blue-50/20 to-green-50/10"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              useCasesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Broadcast Use Cases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how businesses use WhatsApp broadcasts to drive
              engagement and growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-300 border-gray-200 group ${
                  useCasesInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="py-12 md:py-14 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              faqInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about WhatsApp broadcast messaging
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Left Column - 3 FAQs */}
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
                      className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Right Column - 3 FAQs */}
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
                      key={index}
                      value={`item-${index + 3}`}
                      className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
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

      {/* CTA Section */}
      <section className="py-12 md:py-14 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Broadcasting?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using our platform to reach customers
            with personalized WhatsApp broadcasts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
