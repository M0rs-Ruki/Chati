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
  MousePointerClick,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle2,
  Zap,
  Users,
  BarChart3,
  Clock,
  Filter,
  Send,
  Eye,
  RefreshCw,
  Sparkles,
  ShoppingCart,
  Heart,
  GraduationCap,
  Plane,
  Building2,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function ClickTrackingPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({
    threshold: 0.1,
  });
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

  const keyFeatures = [
    {
      icon: Eye,
      title: "Real-Time Click Monitoring",
      description:
        "See exactly who clicked your WhatsApp message CTA buttons the moment they engage. Track individual user clicks with precise timestamps and engagement patterns.",
    },
    {
      icon: BarChart3,
      title: "Detailed Click Analytics",
      description:
        "View comprehensive engagement metrics including total clicks, unique clicks, click-through rates, and user-level click frequency to measure campaign effectiveness.",
    },
    {
      icon: Target,
      title: "One-Click Retargeting",
      description:
        "Instantly identify high-intent users who clicked your CTAs and send targeted follow-up campaigns with a single tap. No complex segmentation needed.",
    },
    {
      icon: Filter,
      title: "Smart Audience Segmentation",
      description:
        "Automatically segment your audience based on click behavior. Separate engaged users from non-clickers for laser-focused retargeting campaigns.",
    },
    {
      icon: Clock,
      title: "Engagement Time Tracking",
      description:
        "Monitor when users click and how quickly they respond to your messages. Optimize send times based on real engagement data for better results.",
    },
    {
      icon: RefreshCw,
      title: "Multi-Click Tracking",
      description:
        "Track users who click multiple times, indicating strong interest. Prioritize these high-intent leads for immediate sales follow-up and conversions.",
    },
  ];

  const howItWorksSteps = [
    {
      step: "1",
      title: "Create WhatsApp Broadcast",
      description:
        "Send a WhatsApp broadcast message with a URL-based CTA button. Click tracking works exclusively with URL buttons, not Call Now buttons.",
      icon: Send,
    },
    {
      step: "2",
      title: "Monitor Click Activity",
      description:
        'Visit the Campaigns page and click "Clicked" to see real-time data on who engaged with your CTA button and how many times they clicked.',
      icon: Eye,
    },
    {
      step: "3",
      title: "Segment Clicked Users",
      description:
        "Automatically identify high-intent users who clicked your message. View detailed click counts and engagement patterns for each contact.",
      icon: Filter,
    },
    {
      step: "4",
      title: "Retarget Instantly",
      description:
        "Select clicked users and send personalized follow-up campaigns. Focus your efforts on engaged leads to drive 3x more conversions while saving costs.",
      icon: Target,
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "3x Higher Conversions",
      description:
        "Retarget only users who showed interest by clicking. Focus on high-intent leads and watch conversion rates triple compared to broad campaigns.",
      metric: "3x Conversions",
    },
    {
      icon: DollarSign,
      title: "50% Lower Campaign Costs",
      description:
        "Stop wasting money on unengaged contacts. Send retargeting messages only to clicked users, reducing campaign expenses by up to 50% instantly.",
      metric: "50% Cost Savings",
    },
    {
      icon: Zap,
      title: "Instant Engagement Insights",
      description:
        "Know exactly which messages resonate with your audience. Track click patterns in real-time and optimize future campaigns for maximum impact.",
      metric: "Real-Time Data",
    },
    {
      icon: Users,
      title: "Better Audience Understanding",
      description:
        "Discover who your most engaged customers are and what content drives action. Build stronger relationships with data-driven personalization.",
      metric: "Deeper Insights",
    },
  ];

  const useCases = [
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description:
        "Track product catalog clicks and retarget interested shoppers with personalized offers, limited-time discounts, and abandoned cart reminders.",
      example:
        "Send discount to users who clicked product links but didn't purchase",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description:
        "Monitor course registration link clicks and follow up with clicked users offering enrollment bonuses, free trials, or early-bird discounts.",
      example:
        "Retarget users who clicked course info with registration deadline reminders",
    },
    {
      icon: Plane,
      title: "Travel & Tourism",
      description:
        "Track booking link engagement and retarget interested travelers with exclusive deals, destination guides, or limited availability alerts.",
      example:
        "Send special offers to users who clicked hotel or flight booking CTAs",
    },
    {
      icon: Building2,
      title: "Real Estate",
      description:
        "Identify leads who clicked property listing links and follow up with virtual tour invitations, pricing details, or viewing appointments.",
      example: "Retarget property link clickers with viewing slot availability",
    },
    {
      icon: Heart,
      title: "Healthcare",
      description:
        "Track appointment booking clicks and send reminders, health tips, or exclusive consultation offers to engaged patients instantly.",
      example:
        "Follow up with users who clicked appointment links but didn't book",
    },
    {
      icon: DollarSign,
      title: "Financial Services",
      description:
        "Monitor loan or investment inquiry clicks and retarget interested prospects with personalized financial plans and expert consultations.",
      example:
        "Send loan approval updates to users who clicked application forms",
    },
  ];

  const faqsColumn1 = [
    {
      question: "What is WhatsApp Click Tracking?",
      answer:
        "WhatsApp Click Tracking lets you monitor which contacts clicked the CTA buttons in your broadcast messages. You can see exactly who clicked, how many times they clicked, and when they engaged—giving you powerful insights to retarget high-intent users and boost conversions.",
    },
    {
      question: "Can I track all types of CTA buttons?",
      answer:
        "No, you can only track URL-based CTA buttons that redirect users to websites or web pages. Call Now buttons with phone numbers cannot be tracked through this feature. Make sure to use URL buttons in your templates to enable click tracking.",
    },
    {
      question: "How do I retarget users who clicked my message?",
      answer:
        'Simply go to your Campaigns page, click on the specific campaign, and navigate to the "Clicked" tab. You\'ll see all users who engaged with your CTA. Select these users and send a follow-up broadcast with personalized offers or reminders—all in just a few clicks.',
    },
  ];

  const faqsColumn2 = [
    {
      question: "How does Click Tracking improve conversions?",
      answer:
        "By focusing your retargeting efforts exclusively on users who already showed interest (by clicking), you eliminate wasted outreach to unengaged contacts. This laser-focused approach drives 3x higher conversion rates while cutting campaign costs by up to 50%, delivering better ROI.",
    },
    {
      question: "Can I see how many times a user clicked?",
      answer:
        "Yes! Click Tracking provides detailed engagement metrics for each user, including the total number of times they clicked your CTA button. Multiple clicks indicate high intent, allowing you to prioritize these leads for immediate follow-up and personalized offers.",
    },
    {
      question: "Is Click Tracking available for all plans?",
      answer:
        "Click Tracking is typically available on our Pro and Enterprise plans. Check your current plan features or contact our sales team to upgrade and unlock this powerful retargeting capability to maximize your WhatsApp marketing ROI.",
    },
  ];

  const faqsColumnFAQSection1 = [
    {
      question: "What is WhatsApp Click Tracking?",
      answer:
        "WhatsApp Click Tracking monitors when recipients tap links in your WhatsApp messages, providing visibility into content engagement and conversion paths. It captures metrics like click-through rates, unique clicks, time-to-click, and user behavior—helping you understand which messages, offers, and CTAs drive the most customer action.",
    },
    {
      question: "How does click tracking work technically?",
      answer:
        "Click tracking uses shortened trackable URLs (like Bitly or custom domains) with unique identifiers for each recipient. When users click, the system logs the event, then redirects to the destination URL. You can also use UTM parameters with Google Analytics or leverage WhatsApp Business API's native analytics to track delivery, read status, and link clicks.",
    },
    {
      question: "Which platforms can I use for tracking WhatsApp clicks?",
      answer:
        "You can track clicks through multiple platforms: WhatsApp Business API's native analytics dashboard, Google Analytics 4 (GA4) with UTM parameters and custom events, Google Tag Manager (GTM) for automated event tracking, URL shorteners like Bitly with built-in analytics, Meta Pixel for conversion tracking, and dedicated WhatsApp marketing platforms like Braze or Dotdigital.",
    },
    {
      question: "Can I track individual user behavior?",
      answer:
        "Yes! With WhatsApp Business API, each link can include a unique identifier per recipient, enabling precise attribution. You can see which specific customers clicked links, when they clicked, how many times, and which device they used. This individual-level tracking helps personalize follow-ups and identify your most engaged customers.",
    },
  ];

  const faqsColumnFAQSection2 = [
    {
      question: "How do I set up click tracking in Google Analytics?",
      answer:
        "Install Google Tag Manager on your website, create a Click URL variable, set up a custom trigger for WhatsApp links (checking if URL contains 'wa.me' or 'api.whatsapp.com'), create a GA4 Event tag named 'whatsapp_click', and publish. In GA4, navigate to Reports > Events to view WhatsApp click data. You can also mark it as a conversion for ROI tracking.",
    },
    {
      question: "What metrics should I track for WhatsApp campaigns?",
      answer:
        "Track click-through rate (CTR), unique vs. total clicks, time between message delivery and click, conversion rate from click to purchase, bounce rate after clicking, source pages driving WhatsApp engagement, campaign-specific performance with UTM parameters, and A/B test results comparing different messages, CTAs, or send times to continuously optimize performance.",
    },
    {
      question: "Can I track clicks from Click-to-WhatsApp ads?",
      answer:
        "Absolutely! Click-to-WhatsApp ads on Facebook and Instagram automatically include tracking parameters. You can monitor which ads drive conversations, measure cost-per-click and cost-per-conversation, track user journey from ad click to purchase, and integrate with Meta Pixel for retargeting. This closed-loop tracking proves social media advertising ROI and optimizes ad spend.",
    },
    {
      question: "Is click tracking compliant with privacy regulations?",
      answer:
        "Yes, when implemented correctly. Use first-party tracking domains, obtain proper consent before collecting data, anonymize personally identifiable information (PII) where required, comply with GDPR and regional privacy laws, provide clear privacy policies explaining data collection, and allow users to opt out. WhatsApp's end-to-end encryption remains intact—tracking only measures link clicks, not message content.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-10 md:py-12 lg:py-14">
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[260px] h-[260px] bg-gradient-to-tr from-purple-400/15 to-transparent rounded-full blur-3xl" />

        <div ref={heroRef} className="container relative mx-auto px-4 z-10">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            {/* LEFT CONTENT */}
            <div
              className={`flex flex-col justify-center transition-all duration-700 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 bg-blue-100 text-blue-700 border-blue-200 w-fit shadow-sm"
              >
                <MousePointerClick className="w-3.5 h-3.5 mr-1.5" />
                Real-Time Click Analytics
              </Badge>

              <h1 className="mb-3 leading-tight text-balance text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block mb-1">Track Every Click.</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Retarget Instantly.
                </span>
              </h1>

              <p className="mb-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Monitor real-time WhatsApp click activity and instantly retarget
                high-intent users. Boost conversions while reducing ad spend.
              </p>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                >
                  Start Tracking Clicks
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* SECONDARY BUTTON — HOVER GREEN FIXED */}
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
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>

              {/* METRICS */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">
                    3x
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    More Conversions
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-purple-600">
                    50%
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Lower Costs
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-pink-600">
                    Live
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Real-Time Data
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className={`relative transition-all duration-700 delay-150 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative max-w-md lg:max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/20 blur-3xl rounded-2xl scale-105" />

                <Image
                  src="/whatsapp-click-tracking-analytics-dashboard-showi.jpg"
                  alt="WhatsApp Click Tracking dashboard showing real-time analytics"
                  width={420}
                  height={500}
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl object-contain"
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
        ref={featuresRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 py-16 md:py-20"
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
              className="mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200"
              variant="outline"
            >
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Track & Retarget
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive click analytics and instant retargeting tools to
              maximize your WhatsApp campaign ROI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-500 border-2 hover:border-blue-300 ${
                  featuresInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
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
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/30 via-white to-pink-50/20 py-12 md:py-14"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              howItWorksInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <Badge
              className="mb-3 shadow-sm bg-purple-100 text-purple-700 border-purple-200"
              variant="outline"
            >
              Simple Process
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
              4 Steps to Higher Conversions
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Track clicks and retarget engaged users in minutes—no complex
              setup required
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-5">
            {howItWorksSteps.map((step, index) => (
              <Card
                key={index}
                className={`p-5 border-2 hover:border-purple-300 hover:shadow-lg transition-all duration-500 ${
                  howItWorksInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-6"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-bold">{step.title}</h3>
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
        className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/20 to-blue-50/30 py-12 md:py-14"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <Badge
              className="mb-3 shadow-sm bg-green-100 text-green-700 border-green-200"
              variant="outline"
            >
              Business Impact
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
              Transform Your WhatsApp Marketing ROI
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              See measurable improvements in conversions, costs, and customer
              engagement
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`p-5 text-center border-2 hover:border-green-300 hover:shadow-lg transition-all duration-500 ${
                  benefitsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex justify-center">
                  <Badge
                    className="mb-2 bg-green-100 text-green-700 border-green-200"
                    variant="outline"
                  >
                    {benefit.metric}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>

                <p className="text-sm text-muted-foreground">
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
        className="relative overflow-hidden bg-gradient-to-br from-pink-50/20 via-white to-orange-50/30 py-16 md:py-20"
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
              className="mb-4 shadow-sm bg-pink-100 text-pink-700 border-pink-200"
              variant="outline"
            >
              Industry Applications
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Click Tracking for Every Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover how businesses across industries use click tracking to
              boost engagement and sales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-500 border hover:border-pink-300 group ${
                  useCasesInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {useCase.description}
                </p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-blue-600 font-medium flex items-start gap-2">
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
        description="Everything you need to know about WhatsApp Click Tracking"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Stop Guessing. Start Tracking.
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Know exactly who's interested in your offers and retarget them
            instantly. Drive 3x more conversions while cutting costs by 50% with
            smart click tracking and automated retargeting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              Start Tracking Clicks Now
              <MousePointerClick className="ml-2 h-5 w-5" />
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
