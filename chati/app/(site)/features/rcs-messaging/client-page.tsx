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
  Send,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  ImageIcon,
  Video,
  MousePointerClick,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ShoppingCart,
  Heart,
  GraduationCap,
  Plane,
  Building2,
  DollarSign,
  MessageSquare,
  Zap,
  BarChart3,
  Globe,
  Star,
  Users,
  Clock,
  ArrowRightLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function RCSMessagingPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: featuresRef, isVisible: featuresInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: fallbackRef, isVisible: fallbackInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: comparisonRef, isVisible: comparisonInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: benefitsRef, isVisible: benefitsInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: useCasesRef, isVisible: useCasesInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({
    threshold: 0.1,
  });

  const keyFeatures = [
    {
      icon: ShieldCheck,
      title: "Verified Business Badge",
      description:
        "Display your company name, logo, and verified badge on every message. Build instant trust with customers who can recognize authentic business communications, reducing spam concerns and increasing open rates by 35%.",
    },
    {
      icon: ImageIcon,
      title: "Rich Media Support",
      description:
        "Send high-resolution images (up to 2MB), videos, GIFs, and audio files without compression. Showcase products with stunning visuals that maintain quality, unlike SMS/MMS which heavily compresses media.",
    },
    {
      icon: MousePointerClick,
      title: "Interactive Action Buttons",
      description:
        "Add clickable CTA buttons directly in messages: 'Shop Now', 'Book Appointment', 'Track Order'. Enable one-tap actions without leaving the messaging app, improving conversion rates by 60%.",
    },
    {
      icon: Globe,
      title: "Scrollable Carousels",
      description:
        "Create horizontal scrollable product catalogs with images, descriptions, and action buttons. Let customers browse multiple items in one message, perfect for e-commerce, real estate, and travel bookings.",
    },
    {
      icon: MessageSquare,
      title: "2,000 Character Messages",
      description:
        "Send up to 2,000 characters per message without splitting into multiple texts. Deliver complete information, detailed descriptions, and rich content in a single, cohesive message—no more fragmented SMS.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Delivery Analytics",
      description:
        "Track delivered, read, and click-through rates in real-time. See exactly when customers engage with your messages, which buttons they click, and measure campaign ROI with precision analytics.",
    },
  ];

  const fallbackFeatures = [
    {
      icon: ArrowRightLeft,
      title: "Automatic Channel Switching",
      description:
        "If RCS isn't available on a recipient's device, messages automatically fall back to WhatsApp within seconds. No manual intervention—the system handles everything to ensure delivery.",
    },
    {
      icon: CheckCircle2,
      title: "99% Delivery Guarantee",
      description:
        "Multi-channel fallback (RCS → WhatsApp → SMS) ensures your message reaches every customer, regardless of their device capabilities or carrier support. Never lose a customer to technical limitations.",
    },
    {
      icon: Clock,
      title: "Instant Failover",
      description:
        "Fallback happens in milliseconds, not minutes. Customers receive your message on an alternative channel immediately if RCS fails, maintaining conversation flow and engagement without delays.",
    },
  ];

  const rcsVsSmsComparison = [
    {
      feature: "Character Limit",
      rcs: "2,000 characters",
      sms: "160 characters",
    },
    {
      feature: "Media Quality",
      rcs: "High-res images/videos",
      sms: "Compressed MMS",
    },
    {
      feature: "Interactive Buttons",
      rcs: "✓ Full support",
      sms: "✗ Not supported",
    },
    {
      feature: "Brand Verification",
      rcs: "✓ Verified badge",
      sms: "✗ Just phone number",
    },
    { feature: "Read Receipts", rcs: "✓ Real-time", sms: "✗ Limited" },
    { feature: "Carousels", rcs: "✓ Supported", sms: "✗ Not supported" },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "60% Higher Conversions",
      description:
        "Interactive buttons and rich media drive 60% more conversions compared to plain SMS. Customers can take action instantly with one-tap buttons, reducing friction in the purchase journey.",
      metric: "60% More Conversions",
    },
    {
      icon: Star,
      title: "3x Better Click-Through",
      description:
        "Verified branding and engaging visuals generate 3x higher click-through rates. Customers trust verified businesses and are more likely to engage with rich, interactive content.",
      metric: "3x Click Rate",
    },
    {
      icon: ShieldCheck,
      title: "35% Higher Open Rates",
      description:
        "Verified business badge builds trust, leading to 35% higher open rates. Customers instantly recognize your brand and feel confident opening messages from verified senders.",
      metric: "35% Open Rate Boost",
    },
    {
      icon: DollarSign,
      title: "50% Lower Cost per Conversion",
      description:
        "Higher engagement and conversion rates result in 50% lower cost per acquisition. RCS delivers better ROI than traditional SMS or even email marketing campaigns.",
      metric: "50% Cost Reduction",
    },
  ];

  const useCases = [
    {
      icon: ShoppingCart,
      title: "E-commerce Product Showcases",
      description:
        "Send scrollable product carousels with high-quality images, prices, and 'Buy Now' buttons. Let customers browse your catalog and purchase directly from the message with one tap.",
      example:
        "Fashion retailer increased mobile conversions by 75% with RCS product carousels",
    },
    {
      icon: Heart,
      title: "Healthcare Appointment Management",
      description:
        "Send appointment reminders with 'Confirm', 'Reschedule', or 'Cancel' buttons. Include clinic directions, doctor photos, and pre-appointment instructions with rich media support.",
      example:
        "Medical clinic reduced no-shows by 60% with interactive RCS appointment reminders",
    },
    {
      icon: GraduationCap,
      title: "Education Course Enrollment",
      description:
        "Share course catalogs with video previews, instructor profiles, and 'Enroll Now' buttons. Deliver rich educational content with images, syllabi, and one-tap registration.",
      example:
        "Online university increased course enrollments by 45% with RCS marketing campaigns",
    },
    {
      icon: Plane,
      title: "Travel Booking Confirmations",
      description:
        "Send boarding passes, hotel vouchers, and itineraries with interactive buttons for check-in, upgrades, or rebooking. Include maps, directions, and travel tips with rich media.",
      example:
        "Travel agency improved customer satisfaction scores by 40% with RCS booking updates",
    },
    {
      icon: Building2,
      title: "Real Estate Property Tours",
      description:
        "Share property listings with image carousels, virtual tour videos, and 'Schedule Viewing' buttons. Let buyers browse multiple properties and book appointments instantly.",
      example:
        "Real estate firm generated 3x more property viewings with RCS listing campaigns",
    },
    {
      icon: DollarSign,
      title: "Banking Transaction Alerts",
      description:
        "Send secure transaction notifications with account balance, merchant details, and action buttons like 'View Statement' or 'Block Card' for fraud alerts with verified branding.",
      example:
        "Bank reduced fraud response time by 80% with instant RCS transaction alerts",
    },
  ];

  const faqsColumn1 = [
    {
      question: "What is RCS messaging and how does it work?",
      answer:
        "RCS (Rich Communication Services) is the next-generation messaging protocol that upgrades traditional SMS. It works over mobile data or Wi-Fi to deliver app-like experiences with rich media, interactive buttons, verified branding, and real-time analytics—all within the native messaging app, no separate app download required.",
    },
    {
      question: "How does automatic fallback to WhatsApp work?",
      answer:
        "If RCS isn't supported on a recipient's device (older phones, certain carriers), our system instantly detects this and automatically sends the message via WhatsApp instead. This happens in milliseconds without any manual intervention, ensuring 99% delivery across all devices.",
    },
    {
      question: "Can I send RCS messages at scale for broadcast campaigns?",
      answer:
        "Yes! Our platform supports bulk RCS broadcasting to thousands or millions of contacts simultaneously. You can send personalized RCS campaigns with rich media, interactive buttons, and automated fallback to WhatsApp/SMS for maximum reach and engagement.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "Do customers need a special app to receive RCS messages?",
      answer:
        "No! RCS works natively in the default messaging app on Android devices (Google Messages, Samsung Messages) and iOS 18+ devices. Customers receive RCS messages just like regular texts—no app download or special setup required on their end.",
    },
    {
      question: "How do I get a verified business badge for RCS?",
      answer:
        "We handle the RCS business verification process for you. You provide business documentation (registration, tax ID, etc.), and we submit to Google for verification. Once approved (typically 2-4 weeks), your company name, logo, and verified badge appear on all RCS messages.",
    },
    {
      question: "What's the cost difference between RCS and SMS?",
      answer:
        "RCS typically costs 2-3x more than SMS per message, but delivers 3x better engagement and 60% higher conversions. The improved ROI more than justifies the cost. Plus, automatic fallback to SMS for non-RCS devices means you only pay RCS rates when messages are delivered via RCS.",
    },
  ];

  const faqsColumnFAQSection1 = [
    {
      question: "What is RCS messaging?",
      answer:
        "RCS (Rich Communication Services) is the next-generation messaging protocol that replaces traditional SMS. It enables businesses to send rich, interactive messages with images, videos, carousels, action buttons, read receipts, typing indicators, and verified brand identity—all within the native messaging app on Android devices without requiring app downloads.",
    },
    {
      question: "How does WhatsApp fallback work with RCS?",
      answer:
        "Fallback ensures 100% message delivery by automatically switching channels. If RCS isn't available on the recipient's device or fails to deliver within seconds, the message is instantly re-routed to WhatsApp. If WhatsApp delivery also fails, it falls back to SMS as the final layer—guaranteeing your message always reaches customers.",
    },
    {
      question: "What devices support RCS messaging?",
      answer:
        "RCS works on most Android devices (Android 5.0+) using default messaging apps like Google Messages and Samsung Messages. iPhone users with iOS 18+ can also receive RCS messages. If a device doesn't support RCS, our platform automatically detects this and uses fallback channels like WhatsApp or SMS.",
    },
    {
      question: "What features does RCS offer that SMS doesn't?",
      answer:
        "RCS provides verified business branding with logos and company names, high-resolution images and videos, interactive buttons and carousels, real-time typing indicators, read receipts, location sharing, product catalogs, appointment booking, and two-way conversations—transforming basic text messages into rich, app-like experiences that drive 35% higher engagement than SMS.",
    },
  ];

  const faqsColumnFAQSection2 = [
    {
      question: "How do I know if my message was sent via RCS or fallback?",
      answer:
        "Our platform provides real-time delivery analytics showing exactly which channel delivered each message—RCS, WhatsApp, or SMS. You'll see delivery status, read receipts, interaction rates, and response times for every channel. This transparency helps you understand customer preferences and optimize your messaging strategy.",
    },
    {
      question: "Is RCS messaging secure?",
      answer:
        "Yes, RCS messages between Google Messages users are end-to-end encrypted, just like WhatsApp. For business messaging, RCS uses carrier-grade security with verified sender authentication, preventing spoofing and phishing. Recipients see your verified business name and logo, building trust and ensuring customers know messages are legitimate.",
    },
    {
      question: "What's the best fallback sequence for important messages?",
      answer:
        "For critical messages like OTPs, payment confirmations, or delivery alerts, use RCS → WhatsApp → SMS fallback. Start with RCS for the richest experience, fall back to WhatsApp for high engagement rates, and use SMS as the universal backup. This multi-layer approach ensures 99.9% delivery while maximizing the quality of customer interactions.",
    },
    {
      question: "Can I personalize RCS messages and track engagement?",
      answer:
        "Absolutely! RCS supports dynamic personalization with customer names, order details, recommendations, and custom fields. You get detailed analytics including delivery rates, read receipts, button clicks, carousel swipes, reply rates, and conversion tracking. A/B test rich media, messaging flows, and CTAs to continuously optimize performance and ROI.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50/30">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[360px] md:w-[420px] h-[360px] md:h-[420px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[360px] h-[300px] md:h-[360px] bg-gradient-to-tr from-cyan-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-10 md:py-12 lg:py-14 z-10"
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
            {/* LEFT CONTENT */}
            <div
              className={`flex flex-col justify-center transition-all duration-700 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-200 w-fit shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                Next-Gen Messaging
              </Badge>

              {/* Heading */}
              <h1 className="mb-3 text-balance leading-tight tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-1">
                  RCS Business Messaging
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  with WhatsApp Fallback
                </span>
              </h1>

              {/* Description */}
              <p className="mb-4 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Send branded, interactive RCS messages with rich media, verified
                badges, and action buttons. Automatic fallback to WhatsApp
                ensures 99% delivery even when RCS isn't available.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all group"
                >
                  Start RCS Campaign
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">60%</div>
                  <div className="text-xs text-muted-foreground">
                    Higher Conversions
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">3x</div>
                  <div className="text-xs text-muted-foreground">
                    Better CTR
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">99%</div>
                  <div className="text-xs text-muted-foreground">
                    Delivery Rate
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-700 delay-150 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-6"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-400/15 to-teal-400/20 blur-3xl rounded-full scale-105" />

                <Image
                  src="/modern-smartphone-showing-rcs-message-with-verifie.jpg"
                  alt="RCS messaging interface showing verified business badge, rich media, and action buttons with WhatsApp fallback"
                  width={460}
                  height={540}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BrandSlider */}
      <BrandSlider />

      {/* Key Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="relative overflow-hidden bg-gradient-to-br from-cyan-50/30 via-white to-blue-50/20 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              featuresInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-cyan-100 text-cyan-700 border-cyan-200"
              variant="outline"
            >
              Rich Features
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Everything SMS Can't Do,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                RCS Delivers
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform basic text messaging into engaging, interactive
              experiences with RCS capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-500 border-2 hover:border-cyan-300 ${
                  featuresInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fallback System Section */}
      <section
        ref={fallbackRef}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/30 via-white to-emerald-50/20 py-10 md:py-14 lg:py-16"
      >
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[340px] h-[340px] bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-emerald-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          {/* HEADER */}
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              fallbackInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-green-100 text-green-700 border-green-200"
              variant="outline"
            >
              Smart Delivery
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
              Automatic Fallback to{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                WhatsApp & SMS
              </span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Intelligent routing ensures your messages reach customers across
              RCS, WhatsApp, and SMS — even if one channel fails.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {fallbackFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className={`p-6 hover:shadow-lg transition-all duration-500 border-2 hover:border-green-300 ${
                    fallbackInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>

            {/* FALLBACK FLOW — FULLY RESPONSIVE */}
            <div
              className={`p-6 sm:p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 transition-all duration-700 delay-500 ${
                fallbackInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                {/* STEP 1 - RCS */}
                <div className="flex items-center gap-4 min-w-[220px]">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground">
                      Try RCS First
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Rich, interactive delivery
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />

                {/* STEP 2 - WhatsApp */}
                <div className="flex items-center gap-4 min-w-[220px]">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground">
                      Fallback to WhatsApp
                    </div>
                    <div className="text-sm text-muted-foreground">
                      If RCS unavailable
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />

                {/* STEP 3 - SMS */}
                <div className="flex items-center gap-4 min-w-[220px]">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground">
                      Final SMS Backup
                    </div>
                    <div className="text-sm text-muted-foreground">
                      100% delivery guaranteed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RCS vs SMS Comparison */}
      <section
        ref={comparisonRef}
        className="relative overflow-hidden bg-gradient-to-br from-orange-50/20 via-white to-yellow-50/30 py-10 md:py-14 lg:py-16"
      >
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-gradient-to-br from-orange-300/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-gradient-to-tr from-yellow-300/20 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          {/* Header */}
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              comparisonInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-orange-100 text-orange-700 border-orange-200"
              variant="outline"
            >
              Feature Comparison
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
              RCS vs Traditional SMS
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              See how RCS revolutionizes business messaging with capabilities
              SMS simply can't match.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-2">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 font-semibold text-sm sm:text-base">
                <div>Feature</div>
                <div className="text-center">RCS</div>
                <div className="text-center">SMS</div>
              </div>

              {/* Table Rows */}
              {rcsVsSmsComparison.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 p-4 border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } transition-all duration-500 ${
                    comparisonInView
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="font-semibold text-foreground text-sm sm:text-base">
                    {row.feature}
                  </div>

                  <div className="text-center text-green-600 font-medium text-sm sm:text-base">
                    {row.rcs}
                  </div>

                  <div className="text-center text-gray-500 text-sm sm:text-base">
                    {row.sms}
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/30 py-10 md:py-14 lg:py-16"
      >
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-cyan-300/20 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          {/* Header */}
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200"
              variant="outline"
            >
              Business Impact
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
              Measurable Results with RCS
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real metrics showing how RCS transforms customer engagement and
              business outcomes.
            </p>
          </div>

          {/* BENEFIT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-500 border-2 hover:border-blue-300 text-center ${
                  benefitsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-md mx-auto">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>

                <div className="flex justify-center">
                  <Badge
                    className="mb-3 bg-blue-100 text-blue-700 border-blue-200"
                    variant="outline"
                  >
                    {benefit.metric}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {benefit.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section
        ref={useCasesRef}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/20 via-white to-pink-50/30 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              useCasesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-purple-100 text-purple-700 border-purple-200"
              variant="outline"
            >
              Industry Applications
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              RCS for Every Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See how industries leverage RCS to transform customer
              communication and drive growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-500 border hover:border-purple-300 group ${
                  useCasesInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {useCase.description}
                </p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-purple-600 font-medium flex items-start gap-2">
                    <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{useCase.example}</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        badgeText="Common Questions"
        title="Frequently Asked Questions"
        description="Everything you need to know about RCS messaging and WhatsApp fallback"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Ready to Upgrade from SMS to RCS?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Start sending rich, interactive, verified RCS messages with
            automatic WhatsApp fallback. Boost engagement by 60%, increase
            conversions by 3x, and ensure 99% delivery with intelligent
            multi-channel routing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              Launch Your First RCS Campaign
              <Send className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent font-medium"
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
