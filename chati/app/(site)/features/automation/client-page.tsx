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
  Workflow,
  Zap,
  Clock,
  MessageSquare,
  Mail,
  Smartphone,
  Radio,
  GitBranch,
  Filter,
  Repeat,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  CreditCard,
  Facebook,
  Building2,
  Phone,
  Webhook,
  Home,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Sparkles,
  Play,
  Settings,
  MousePointerClick,
  Layers,
  Shield,
  Gauge,
  Lock,
  HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const FloatingWorkflowIcons = () => {
  return (
    <>
      {/* Workflow Icon */}
      <div className="absolute top-[15%] left-[10%] w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Workflow className="w-7 h-7 text-white" />
      </div>

      {/* Zap Icon */}
      <div className="absolute top-[25%] right-[15%] w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-2xl animate-float-delayed z-20">
        <Zap className="w-6 h-6 text-white" />
      </div>

      {/* Clock Icon */}
      <div className="absolute bottom-[30%] left-[5%] w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Clock className="w-8 h-8 text-white" />
      </div>

      {/* GitBranch Icon */}
      <div className="absolute bottom-[15%] right-[10%] w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-2xl animate-float-delayed z-20">
        <GitBranch className="w-7 h-7 text-white" />
      </div>

      {/* Repeat Icon */}
      <div className="absolute top-[45%] right-[5%] w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Repeat className="w-6 h-6 text-white" />
      </div>
    </>
  );
};

export default function AutomationWorkflowPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: workflowRef, isVisible: workflowInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: noCodeHeroRef, isVisible: noCodeHeroInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: enterpriseHeroRef, isVisible: enterpriseHeroInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: integrationsRef, isVisible: integrationsInView } =
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

  const integrations = [
    { name: "Razorpay", icon: CreditCard, color: "from-blue-500 to-blue-600" },
    {
      name: "Shopify",
      icon: ShoppingCart,
      color: "from-green-500 to-green-600",
    },
    {
      name: "Facebook Leads",
      icon: Facebook,
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "India Mart",
      icon: Building2,
      color: "from-orange-500 to-orange-600",
    },
    { name: "Justdial", icon: Phone, color: "from-red-500 to-red-600" },
    { name: "Webhooks", icon: Webhook, color: "from-purple-500 to-purple-600" },
    {
      name: "PetPooja",
      icon: ShoppingCart,
      color: "from-pink-500 to-pink-600",
    },
    { name: "99Acres", icon: Home, color: "from-indigo-500 to-indigo-600" },
    { name: "Housing.com", icon: Home, color: "from-teal-500 to-teal-600" },
    { name: "Custom API", icon: Settings, color: "from-gray-500 to-gray-600" },
  ];

  const features = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description:
        "Create complex automation workflows with an intuitive drag-and-drop interface. No coding required.",
    },
    {
      icon: Clock,
      title: "Smart Delays & Timing",
      description:
        "Add delays in minutes, hours, or days between actions. Schedule messages for optimal engagement times.",
    },
    {
      icon: GitBranch,
      title: "Conditional Logic",
      description:
        "Create branching workflows based on user actions, attributes, or custom conditions for personalized experiences.",
    },
    {
      icon: Filter,
      title: "Advanced Segmentation",
      description:
        "Target specific audience segments with filters based on demographics, behavior, and custom attributes.",
    },
    {
      icon: Repeat,
      title: "Recurring Workflows",
      description:
        "Set up recurring automation workflows that run daily, weekly, or monthly for ongoing campaigns.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Track workflow performance with detailed analytics on delivery rates, engagement, and conversions.",
    },
    {
      icon: Zap,
      title: "Real-time Triggers",
      description:
        "Trigger workflows instantly based on events from integrated platforms like purchases, form submissions, or lead captures.",
    },
    {
      icon: Settings,
      title: "Custom Variables",
      description:
        "Use dynamic variables to personalize messages with customer names, order details, and custom data fields.",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Conversions",
      description:
        "Automated follow-ups and timely messages increase conversion rates by up to 3x compared to manual outreach.",
    },
    {
      icon: Clock,
      title: "Save Time",
      description:
        "Automate repetitive tasks and save 20+ hours per week on manual messaging and follow-ups.",
    },
    {
      icon: Target,
      title: "Better Targeting",
      description:
        "Deliver personalized messages to the right audience at the right time with advanced segmentation and triggers.",
    },
    {
      icon: Users,
      title: "Scale Effortlessly",
      description:
        "Handle thousands of conversations simultaneously without increasing team size or workload.",
    },
  ];

  const useCases = [
    {
      title: "Lead Nurturing",
      description:
        "Automatically follow up with leads from Facebook, India Mart, or Justdial with personalized WhatsApp messages.",
      icon: Target,
    },
    {
      title: "Order Confirmations",
      description:
        "Send instant order confirmations and updates via WhatsApp when customers purchase from Shopify or PetPooja.",
      icon: CheckCircle2,
    },
    {
      title: "Payment Reminders",
      description:
        "Trigger automated payment reminders via SMS and WhatsApp when Razorpay payments are pending or failed.",
      icon: CreditCard,
    },
    {
      title: "Drip Campaigns",
      description:
        "Create multi-step drip campaigns with delays to educate, engage, and convert prospects over time.",
      icon: Repeat,
    },
    {
      title: "Abandoned Cart Recovery",
      description:
        "Automatically send WhatsApp messages to customers who abandon their Shopify carts with personalized offers.",
      icon: ShoppingCart,
    },
    {
      title: "Property Alerts",
      description:
        "Notify potential buyers instantly via WhatsApp when new properties matching their criteria are listed on 99Acres or Housing.com.",
      icon: Home,
    },
  ];

  const faqsColumn1 = [
    {
      question: "What is an automation workflow?",
      answer:
        "An automation workflow is a series of automated actions triggered by specific events or conditions. For example, when a Facebook lead is captured, the workflow can automatically send a WhatsApp message, wait 2 hours, then send an SMS, and follow up with an email the next day—all without manual intervention.",
    },
    {
      question: "Which platforms can trigger workflows?",
      answer:
        "You can trigger workflows from 20+ platforms including Razorpay, Shopify, Facebook Leads, India Mart, Justdial, PetPooja, 99Acres, Housing.com, and custom webhooks. Any event from these platforms can start an automation workflow.",
    },
    {
      question: "Can I send messages across multiple channels?",
      answer:
        "Yes! Each workflow can include actions for WhatsApp, RCS, SMS, and email. You can send messages on one or multiple channels, with custom delays between each message for optimal engagement.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "How do delays work in workflows?",
      answer:
        "You can add delays between workflow actions in minutes, hours, or days. For example, send a WhatsApp message immediately, wait 2 hours, send an SMS, wait 1 day, then send an email. Delays ensure messages are sent at optimal times without overwhelming customers.",
    },
    {
      question: "Can I create conditional workflows?",
      answer:
        "Use conditional logic to create branching workflows based on user actions, attributes, or responses. For example, if a customer clicks a link, send one message; if they don't, send a different follow-up message.",
    },
    {
      question: "How do I track workflow performance?",
      answer:
        "Our analytics dashboard shows detailed metrics for each workflow including trigger count, delivery rates, open rates, click rates, and conversions. You can see which workflows perform best and optimize accordingly.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50/30">
        {/* Background Glow Elements */}
        <div className="absolute top-0 right-0 w-[320px] sm:w-[420px] md:w-[500px] h-[320px] sm:h-[420px] md:h-[500px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[260px] sm:w-[360px] md:w-[420px] h-[260px] sm:h-[360px] md:h-[420px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-12 sm:py-14 lg:py-20 z-10"
        >
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* LEFT SECTION */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 w-fit shadow-sm"
              >
                <Workflow className="w-3.5 h-3.5 mr-1.5" />
                Automation Workflows
              </Badge>

              <h1 className="mb-4 leading-tight tracking-tight text-balance">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Automate Your Marketing
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Across All Channels
                </span>
              </h1>

              <p className="mb-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Create powerful automation workflows that trigger WhatsApp, RCS,
                SMS, and email campaigns from Facebook Leads, Shopify, Razorpay,
                and 20+ integrations. Build sophisticated drip sequences with
                delays, conditions, and multi-step actions.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group w-full sm:w-auto"
                >
                  Start Automating
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white text-gray-800 hover:bg-green-50 hover:border-green-500 hover:text-green-600 font-medium shadow-sm transition-all w-full sm:w-auto"
                  asChild
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                {[
                  {
                    icon: MessageSquare,
                    label: "WhatsApp",
                    bg: "bg-green-100",
                    text: "text-green-600",
                  },
                  {
                    icon: Smartphone,
                    label: "RCS",
                    bg: "bg-indigo-100",
                    text: "text-indigo-600",
                  },
                  {
                    icon: Radio,
                    label: "SMS",
                    bg: "bg-blue-100",
                    text: "text-blue-600",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    bg: "bg-orange-100",
                    text: "text-orange-600",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center mb-2`}
                    >
                      <item.icon className={`w-5 h-5 ${item.text}`} />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE (IMAGE) */}
            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
                {/* Halo Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-pink-400/20 blur-2xl rounded-full scale-110" />

                <FloatingWorkflowIcons />

                <Image
                  src="/automation-workflow-builder-showing-triggers-del.jpg"
                  alt="Workflow automation interface showing triggers, delays, multi-channel actions"
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

      <BrandSlider />

      <section
        ref={workflowRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-blue-50/20 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              workflowInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <Badge
              className="mb-4 bg-purple-100 text-purple-700 border-purple-200"
              variant="outline"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              How It Works
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Visual Workflow Automation
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how automation workflows trigger multi-channel campaigns with
              intelligent delays, conditions, and personalized messaging.
            </p>
          </div>

          {/* Steps Container */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-10 md:space-y-12 relative">
              {/* STEP 1 */}
              <div
                className={`transition-all duration-700 ${
                  workflowInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-6"
                }`}
              >
                <Card className="p-5 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 shadow-md hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md">
                      <Play className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1">
                      <Badge className="bg-blue-600 text-white mb-1">
                        Step 1: Trigger
                      </Badge>
                      <h3 className="text-xl font-bold">
                        Facebook Lead Captured
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        When a new lead submits your Facebook Lead Ad form, the
                        workflow starts automatically.
                      </p>
                    </div>

                    <Facebook className="w-10 h-10 text-blue-600 opacity-40 hidden md:block" />
                  </div>
                </Card>
              </div>

              {/* Line */}
              <div className="flex justify-center">
                <div className="w-1 h-10 bg-gradient-to-b from-blue-400 to-green-400 rounded-full animate-pulse" />
              </div>

              {/* STEP 2 */}
              <div
                className={`transition-all duration-700 delay-150 ${
                  workflowInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                }`}
              >
                <Card className="p-5 md:p-6 bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 shadow-md hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-md">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1">
                      <Badge className="bg-green-600 text-white mb-1">
                        Step 2: Immediate Action
                      </Badge>
                      <h3 className="text-xl font-bold">
                        Send WhatsApp Welcome Message
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        “Hi {`{name}`}, thanks for your interest! Here's what
                        you need to know…”
                      </p>
                    </div>

                    <MessageSquare className="w-10 h-10 text-green-600 opacity-40 hidden md:block" />
                  </div>
                </Card>
              </div>

              {/* Delay */}
              <div className="flex justify-center items-center gap-2 md:gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-purple-400 rounded-full" />
                <Card className="px-4 py-2 bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-700 text-sm">
                      Wait 2 hours
                    </span>
                  </div>
                </Card>
                <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-indigo-400 rounded-full" />
              </div>

              {/* STEP 3 */}
              <div
                className={`transition-all duration-700 delay-300 ${
                  workflowInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                }`}
              >
                <Card className="p-5 md:p-6 bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-200 shadow-md hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md">
                      <Smartphone className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1">
                      <Badge className="bg-indigo-600 text-white mb-1">
                        Step 3: Follow-up
                      </Badge>
                      <h3 className="text-xl font-bold">
                        Send RCS Message with Rich Media
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        Deliver an interactive message with product images and
                        action buttons.
                      </p>
                    </div>

                    <Smartphone className="w-10 h-10 text-indigo-600 opacity-40 hidden md:block" />
                  </div>
                </Card>
              </div>

              {/* Delay */}
              <div className="flex justify-center items-center gap-2 md:gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-orange-400 rounded-full" />
                <Card className="px-4 py-2 bg-orange-50 border border-orange-200">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-700 text-sm">
                      Wait 1 day
                    </span>
                  </div>
                </Card>
                <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-pink-400 rounded-full" />
              </div>

              {/* STEP 4 */}
              <div
                className={`transition-all duration-700 delay-500 ${
                  workflowInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                }`}
              >
                <Card className="p-5 md:p-6 bg-gradient-to-r from-pink-50 to-pink-100/50 border border-pink-200 shadow-md hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-md">
                      <Mail className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1">
                      <Badge className="bg-pink-600 text-white mb-1">
                        Step 4: Final Step
                      </Badge>
                      <h3 className="text-xl font-bold">
                        Send Email with Offer
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        Share case studies, testimonials, and a personalized
                        offer to close the deal.
                      </p>
                    </div>

                    <Mail className="w-10 h-10 text-pink-600 opacity-40 hidden md:block" />
                  </div>
                </Card>
              </div>

              {/* Final Success */}
              <div className="flex justify-center pt-4">
                <Card className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 shadow-lg border-0">
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-bold text-lg">
                      Workflow Complete — Lead Nurtured Successfully!
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Features */}
          <div
            className={`mt-14 grid md:grid-cols-3 gap-6 transition-all duration-700 delay-800 ${
              workflowInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {[
              {
                icon: GitBranch,
                title: "Conditional Logic",
                text: "Add branching workflows based on user behavior.",
                color: "purple",
              },
              {
                icon: Clock,
                title: "Flexible Delays",
                text: "Send messages at the perfect moment.",
                color: "blue",
              },
              {
                icon: Repeat,
                title: "Multi-Step Sequences",
                text: "Design complete customer journeys with many steps.",
                color: "green",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-6 text-center hover:shadow-lg transition-all"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Workflow Diagram Section */}
      <section
        ref={noCodeHeroRef}
        className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50/30 py-16 md:py-20"
      >
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Content */}
            <div
              className={`transition-all duration-1000 ${
                noCodeHeroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-green-100 text-green-700 hover:bg-green-200 w-fit shadow-sm"
              >
                <MousePointerClick className="w-3.5 h-3.5 mr-1.5" />
                No-Code Platform
              </Badge>

              <h2 className="mb-4 text-balance leading-tight tracking-tight">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  Build Complex Workflows
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Without Writing Code
                </span>
              </h2>

              <p className="mb-6 text-base text-muted-foreground md:text-lg leading-relaxed">
                Our intuitive drag-and-drop workflow builder empowers marketers,
                sales teams, and business owners to create sophisticated
                automation workflows without any technical expertise. Design
                multi-step campaigns, add conditional logic, and integrate with
                20+ platforms—all through a visual interface that anyone can
                master in minutes.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Visual Drag-and-Drop Interface
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Build workflows by simply dragging triggers, actions, and
                      delays onto the canvas. No coding required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Pre-Built Templates
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Start with proven workflow templates for lead nurturing,
                      abandoned cart recovery, and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Real-Time Testing & Preview
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Test your workflows before going live with our built-in
                      preview and testing tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                >
                  Try Workflow Builder
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                >
                  Watch Demo Video
                </Button>
              </div>
            </div>

            {/* Image */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                noCodeHeroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/15 to-purple-400/20 blur-3xl rounded-full transform scale-110" />
                <Image
                  src="/automation-workflow-builder-showing-triggers-del.jpg"
                  alt="No-code automation workflow builder with drag-and-drop interface showing visual workflow design for WhatsApp, RCS, SMS, and email campaigns"
                  width={600}
                  height={700}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl shadow-2xl"
                />

                {/* Floating Feature Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-4 animate-float z-20 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        Workflow Steps
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        Unlimited
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float-delayed z-20 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Setup Time</div>
                      <div className="text-lg font-bold text-gray-900">
                        5 Minutes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section
        ref={integrationsRef}
        className="py-12 md:py-14 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              integrationsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 bg-blue-100 text-blue-700 border-blue-200"
              variant="outline"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Platform Integrations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trigger Workflows from 20+ Platforms
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with your favorite tools and platforms to trigger
              automation workflows instantly
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {integrations.map((integration, index) => (
              <Card
                key={index}
                className={`p-6 text-center hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                  integrationsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${integration.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <integration.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-sm">{integration.name}</h3>
              </Card>
            ))}
          </div>

          <div
            className={`text-center mt-8 transition-all duration-700 delay-500 ${
              integrationsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-gray-600 mb-4">
              And many more integrations available...
            </p>
            <Button
              variant="outline"
              className="border-2 bg-transparent"
              asChild
            >
              <Link href="/integrations">View All Integrations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section
        ref={featuresRef}
        className="py-12 md:py-14 bg-gradient-to-b from-white via-purple-50/20 to-white"
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
              Powerful Automation Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create sophisticated automation workflows
              that drive results
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
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
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
        className="py-12 md:py-14 bg-gradient-to-br from-purple-50/40 via-white to-blue-50/30"
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
              Why Choose Automation Workflows?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your marketing and sales with intelligent automation
              that works 24/7
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
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={enterpriseHeroRef}
        className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/20 py-16 md:py-20"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-slate-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Image */}
            <div
              className={`relative order-2 lg:order-1 transition-all duration-1000 delay-300 ${
                enterpriseHeroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-lg mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 via-blue-400/15 to-purple-400/20 blur-3xl rounded-full transform scale-110" />
                <Image
                  src="/automation-workflow-builder-showing-triggers-del.jpg"
                  alt="Enterprise automation dashboard showing scalable workflows, team collaboration, and advanced analytics for business process automation"
                  width={600}
                  height={700}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl shadow-2xl"
                />

                {/* Floating Stats Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float z-20 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Gauge className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Uptime</div>
                      <div className="text-lg font-bold text-gray-900">
                        99.9%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 animate-float-delayed z-20 hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Messages/Day</div>
                      <div className="text-lg font-bold text-gray-900">1M+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className={`order-1 lg:order-2 transition-all duration-1000 ${
                enterpriseHeroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-slate-100 text-slate-700 hover:bg-slate-200 w-fit shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                Enterprise-Grade
              </Badge>

              <h2 className="mb-4 text-balance leading-tight tracking-tight">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  Scale Your Automation
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  To Enterprise Level
                </span>
              </h2>

              <p className="mb-6 text-base text-muted-foreground md:text-lg leading-relaxed">
                Built for businesses that need reliability, security, and scale.
                Our enterprise automation platform handles millions of messages
                daily with 99.9% uptime, advanced security features, team
                collaboration tools, and dedicated support. From startups to
                Fortune 500 companies, we power automation workflows that drive
                real business results.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="p-4 bg-white border-2 border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    99.9%
                  </div>
                  <div className="text-sm text-gray-600">Platform Uptime</div>
                </Card>

                <Card className="p-4 bg-white border-2 border-gray-100 hover:border-green-200 transition-colors">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    1M+
                  </div>
                  <div className="text-sm text-gray-600">Messages Per Day</div>
                </Card>

                <Card className="p-4 bg-white border-2 border-gray-100 hover:border-purple-200 transition-colors">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">
                    Enterprise Support
                  </div>
                </Card>

                <Card className="p-4 bg-white border-2 border-gray-100 hover:border-orange-200 transition-colors">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    SOC 2
                  </div>
                  <div className="text-sm text-gray-600">Compliant</div>
                </Card>
              </div>

              {/* Enterprise Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Advanced security with SSO, 2FA, and role-based access
                    control
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Team collaboration with workflow sharing and approval
                    workflows
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HeadphonesIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Dedicated account manager and priority support
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                >
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                  asChild
                >
                  <Link href="/enterprise">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        ref={useCasesRef}
        className="py-12 md:py-14 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/10"
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
              Automation Workflow Use Cases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how businesses use automation workflows to streamline
              operations and boost conversions
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
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
              Everything you need to know about automation workflows and
              multi-channel campaigns
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
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
      <section className="py-12 md:py-14 bg-gradient-to-br from-purple-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Automate Your Marketing?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Start creating powerful automation workflows that drive conversions
            and save time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
