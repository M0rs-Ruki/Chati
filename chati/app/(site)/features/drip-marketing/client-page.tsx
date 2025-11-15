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
  Send,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  Zap,
  Users,
  TrendingUp,
  RefreshCw,
  Sparkles,
  ShoppingCart,
  Heart,
  GraduationCap,
  Plane,
  Building2,
  DollarSign,
  MessageSquare,
  Mail,
  Smartphone,
  Globe,
  AlertTriangle,
  CheckCircle,
  ArrowRightLeft,
  BarChart3,
  Calendar,
  Filter,
  Repeat,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function DripMarketingPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: fallbackRef, isVisible: fallbackInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: featuresRef, isVisible: featuresInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: howItWorksRef, isVisible: howItWorksInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: benefitsRef, isVisible: benefitsInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: useCasesRef, isVisible: useCasesInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({
    threshold: 0.1,
  });

  const channels = [
    {
      icon: MessageSquare,
      name: "WhatsApp",
      color: "from-green-500 to-emerald-600",
      priority: "Primary",
      openRate: "98%",
    },
    {
      icon: Globe,
      name: "RCS",
      color: "from-blue-500 to-cyan-600",
      priority: "Secondary",
      openRate: "95%",
    },
    {
      icon: Smartphone,
      name: "SMS",
      color: "from-purple-500 to-pink-600",
      priority: "Tertiary",
      openRate: "90%",
    },
    {
      icon: Mail,
      name: "Email",
      color: "from-orange-500 to-red-600",
      priority: "Fallback",
      openRate: "20%",
    },
  ];

  const keyFeatures = [
    {
      icon: Repeat,
      title: "Intelligent Multi-Channel Fallback",
      description:
        "Automatically switch from WhatsApp to RCS to SMS to email if a message fails to deliver. Ensure 99% message delivery with smart channel prioritization and instant fallback routing.",
    },
    {
      icon: Calendar,
      title: "Behavior-Triggered Sequences",
      description:
        "Launch drip campaigns based on user actions like signup, purchase, cart abandonment, or link clicks. Send perfectly timed messages that match your customer's journey.",
    },
    {
      icon: Clock,
      title: "Time-Delay Automation",
      description:
        "Schedule messages with precise delays—minutes, hours, or days apart. Build sophisticated nurture sequences that guide customers from awareness to conversion automatically.",
    },
    {
      icon: Filter,
      title: "Dynamic Audience Segmentation",
      description:
        "Automatically segment contacts based on behavior, engagement, or custom attributes. Send personalized drip sequences tailored to each audience segment for maximum relevance.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Campaign Analytics",
      description:
        "Track delivery rates, open rates, click rates, and conversions across all channels. See which messages perform best and optimize your sequences for higher engagement.",
    },
    {
      icon: Target,
      title: "A/B Testing & Optimization",
      description:
        "Test different message variations, timing, and channel sequences. Use data-driven insights to continuously improve campaign performance and maximize ROI.",
    },
  ];

  const howItWorksSteps = [
    {
      step: "1",
      title: "Design Your Drip Sequence",
      description:
        "Create a multi-step campaign with triggers (signup, purchase, etc.), message content for each channel, and time delays between messages. Use our visual builder to map your customer journey.",
      icon: Send,
    },
    {
      step: "2",
      title: "Set Channel Priority & Fallback",
      description:
        "Choose your preferred channel order: WhatsApp → RCS → SMS → Email. Configure fallback rules so if one channel fails, the system automatically tries the next channel instantly.",
      icon: ArrowRightLeft,
    },
    {
      step: "3",
      title: "Activate & Monitor",
      description:
        "Launch your drip campaign and watch as messages send automatically based on triggers and timing. Monitor real-time delivery, open rates, and engagement across all channels in one dashboard.",
      icon: BarChart3,
    },
    {
      step: "4",
      title: "Optimize Performance",
      description:
        "Analyze campaign metrics to see which channels, messages, and timing work best. Adjust your sequences, test variations, and continuously improve conversion rates over time.",
      icon: TrendingUp,
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "99% Message Delivery",
      description:
        "Never lose a customer due to failed messages. Multi-channel fallback ensures your message reaches every contact, even if their primary channel is unavailable.",
      metric: "99% Delivery",
    },
    {
      icon: TrendingUp,
      title: "3x Higher Engagement",
      description:
        "Automated, behavior-triggered sequences deliver relevant messages at the perfect time, driving 3x more engagement compared to generic broadcast campaigns.",
      metric: "3x Engagement",
    },
    {
      icon: Clock,
      title: "75% Time Savings",
      description:
        "Set up your drip campaigns once and let automation handle the rest. Save 75% of your time on manual outreach while reaching more customers effectively.",
      metric: "75% Time Saved",
    },
    {
      icon: DollarSign,
      title: "4x Better ROI",
      description:
        "Intelligent channel routing uses the most cost-effective channel first, then falls back only when needed. Reduce costs while maximizing conversions for 4x better ROI.",
      metric: "4x ROI Boost",
    },
  ];

  const useCases = [
    {
      icon: ShoppingCart,
      title: "E-commerce Welcome Series",
      description:
        "Send a 5-day welcome sequence: Day 1 WhatsApp intro → Day 2 RCS product catalog → Day 3 SMS first-order discount → Day 5 Email exclusive offers. Fallback ensures delivery.",
      example:
        "Boost new customer conversions by 45% with automated onboarding",
    },
    {
      icon: AlertTriangle,
      title: "Cart Abandonment Recovery",
      description:
        "Trigger instant WhatsApp reminder when cart is abandoned → 1 hour later send RCS with product images → 6 hours later send SMS with discount code → Next day email final offer.",
      example: "Recover 35% of abandoned carts with multi-channel follow-ups",
    },
    {
      icon: GraduationCap,
      title: "Course Enrollment Nurture",
      description:
        "Start with WhatsApp course intro → 2 days later RCS student testimonials → 5 days later SMS early-bird discount → 1 week later email enrollment deadline reminder.",
      example:
        "Increase course enrollments by 60% with behavior-triggered sequences",
    },
    {
      icon: Heart,
      title: "Patient Appointment Reminders",
      description:
        "Send WhatsApp appointment confirmation → 24 hours before send RCS with clinic directions → 2 hours before send SMS final reminder → Follow up with email health tips.",
      example: "Reduce no-shows by 70% with multi-touch reminder campaigns",
    },
    {
      icon: Plane,
      title: "Travel Booking Follow-Up",
      description:
        "Post-booking: WhatsApp confirmation → 1 week before RCS itinerary → 24 hours before SMS check-in reminder → After trip email review request with incentive.",
      example:
        "Increase customer satisfaction scores by 40% with automated touchpoints",
    },
    {
      icon: Building2,
      title: "Real Estate Lead Nurture",
      description:
        "Property inquiry: WhatsApp instant response → 1 day later RCS virtual tour → 3 days later SMS viewing appointment → 1 week later email similar properties.",
      example:
        "Convert 50% more leads with persistent multi-channel follow-ups",
    },
  ];

  const faqsColumn1 = [
    {
      question: "What is drip marketing or sequence marketing?",
      answer:
        "Drip marketing (also called sequence marketing) is an automated series of messages sent to customers based on specific triggers (like signup or purchase) or time delays. Unlike one-time broadcasts, drip campaigns deliver multiple touchpoints over days or weeks, nurturing leads through their customer journey with perfectly timed, relevant content.",
    },
    {
      question: "How does multi-channel fallback work?",
      answer:
        "Multi-channel fallback automatically switches to a backup channel if the primary channel fails. For example: try WhatsApp first → if undelivered, immediately switch to RCS → if RCS fails, send via SMS → if SMS fails, fall back to email. This ensures 99% message delivery without manual intervention or losing customers.",
    },
    {
      question: "Can I customize the channel order and fallback rules?",
      answer:
        "Yes! You have complete control over channel priority and fallback logic. Choose which channel to try first (e.g., WhatsApp), set fallback order (RCS → SMS → Email), configure delay between fallback attempts, and even exclude certain channels based on audience segments or campaign goals.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "What triggers can I use to start drip campaigns?",
      answer:
        "You can trigger drip campaigns based on dozens of customer actions: new signup, purchase completion, cart abandonment, link clicks, form submissions, milestone dates (birthdays, anniversaries), inactivity periods, product views, subscription renewals, and custom events from your CRM or website via webhooks.",
    },
    {
      question: "How do I set time delays between messages?",
      answer:
        "Our visual workflow builder lets you set precise delays between each message: minutes (send second message 15 minutes after first), hours (send follow-up 6 hours later), or days (send reminder 3 days after signup). You can mix different delay types in one sequence for sophisticated nurture campaigns.",
    },
    {
      question: "Can I track which channel each contact received messages on?",
      answer:
        "Our analytics dashboard shows exactly which channel each message was delivered on, including fallback paths taken. See delivery rates, open rates, and click rates for each channel, so you can optimize your sequences and understand customer channel preferences.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50/30">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[320px] md:w-[420px] h-[320px] md:h-[420px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[260px] md:w-[340px] h-[260px] md:h-[340px] bg-gradient-to-tr from-pink-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-8 md:py-10 lg:py-12 z-10"
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
                className="mb-3 bg-purple-100 text-purple-700 hover:bg-purple-200 w-fit shadow-sm"
              >
                <Repeat className="w-3.5 h-3.5 mr-1.5" />
                Automated Drip Campaigns
              </Badge>

              {/* Heading */}
              <h1 className="mb-3 text-balance leading-tight tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-1">
                  Drip Marketing with
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Multi-Channel Fallback
                </span>
              </h1>

              {/* Description */}
              <p className="mb-4 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Create automated sequence campaigns that switch between
                WhatsApp, RCS, SMS, and email automatically. Ensure 99%
                delivery, boost engagement, and never lose a customer to failed
                messages.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all group"
                >
                  Create Drip Campaign
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
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">99%</div>
                  <div className="text-xs text-muted-foreground">
                    Delivery Rate
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">3x</div>
                  <div className="text-xs text-muted-foreground">
                    More Engagement
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">4x</div>
                  <div className="text-xs text-muted-foreground">
                    Better ROI
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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/15 to-orange-400/20 blur-3xl rounded-full scale-105" />

                <Image
                  src="/drip-marketing-workflow-showing-automated-sequen.jpg"
                  alt="Drip marketing workflow showing automated multi-channel fallback"
                  width={460}
                  height={540}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BrandSlider */}
      <BrandSlider />

      {/* Multi-Channel Fallback Visual */}
      <section
        ref={fallbackRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/20 to-blue-50/30 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              fallbackInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-purple-100 text-purple-700 border-purple-200"
              variant="outline"
            >
              Intelligent Routing
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              How Multi-Channel{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Fallback Works
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Automatically switch channels to ensure your message always
              reaches customers
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* MOBILE = 2x2 | TABLET+DESKTOP = 1x4 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {channels.map((channel, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    fallbackInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300 relative">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${channel.color} rounded-xl flex items-center justify-center mb-4 shadow-md mx-auto`}
                    >
                      <channel.icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="text-center">
                      <Badge className="mb-2 text-xs" variant="secondary">
                        {channel.priority}
                      </Badge>

                      <h3 className="text-lg font-bold mb-1 text-foreground">
                        {channel.name}
                      </h3>

                      <p className="text-2xl font-bold text-purple-600 mb-1">
                        {channel.openRate}
                      </p>

                      <p className="text-xs text-muted-foreground">Open Rate</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section
        ref={featuresRef}
        className="relative overflow-hidden bg-gradient-to-br from-pink-50/30 via-white to-purple-50/20 py-16 md:py-20"
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
              className="mb-4 shadow-sm bg-pink-100 text-pink-700 border-pink-200"
              variant="outline"
            >
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Everything for Successful{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Drip Campaigns
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Build, automate, and optimize multi-channel sequence campaigns
              that deliver results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-500 border-2 hover:border-pink-300 ${
                  featuresInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
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

      {/* How It Works Section */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-green-50/20 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              howItWorksInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200"
              variant="outline"
            >
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              4 Steps to Automated Drip Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Set up multi-channel drip campaigns in minutes with our visual
              workflow builder
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {howItWorksSteps.map((step, index) => (
              <Card
                key={index}
                className={`p-6 border-2 hover:border-blue-300 hover:shadow-lg transition-all duration-500 ${
                  howItWorksInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-5 h-5 text-blue-600" />
                      <h3 className="text-xl font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/20 to-emerald-50/30 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-green-100 text-green-700 border-green-200"
              variant="outline"
            >
              Business Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Measurable Results from Day One
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See dramatic improvements in delivery, engagement, efficiency, and
              ROI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-500 border-2 hover:border-green-300 text-center ${
                  benefitsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-md mx-auto">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <Badge
                  className="mb-3 bg-green-100 text-green-700 border-green-200"
                  variant="outline"
                >
                  {benefit.metric}
                </Badge>
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
        className="relative overflow-hidden bg-gradient-to-br from-orange-50/20 via-white to-yellow-50/30 py-16 md:py-20"
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
              className="mb-4 shadow-sm bg-orange-100 text-orange-700 border-orange-200"
              variant="outline"
            >
              Industry Applications
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Drip Campaigns for Every Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See how businesses use multi-channel drip marketing to drive
              growth and engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-500 border hover:border-orange-300 group ${
                  useCasesInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {useCase.description}
                </p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-orange-600 font-medium flex items-start gap-2">
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
      <section
        ref={faqRef}
        className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              faqInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm" variant="outline">
              Common Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about drip marketing and multi-channel
              fallback
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div
                className={`transition-all duration-1000 ${
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Never Lose a Customer to Failed Messages
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create intelligent drip campaigns with multi-channel fallback.
            Ensure 99% delivery, boost engagement 3x, and drive 4x better ROI
            with automated sequence marketing that always reaches your
            customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            >
              Start Your First Drip Campaign
              <Repeat className="ml-2 h-5 w-5" />
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
