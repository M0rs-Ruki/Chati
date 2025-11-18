"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FAQSection from "@/components/section/FAQSection";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrandSlider } from "@/components/brand-slider";
import {
  Building2,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  MessageSquare,
  Bell,
  CheckCircle2,
  ArrowRight,
  Zap,
  Home,
  FileText,
  Key,
  Search,
  Video,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function RealEstateClientPage() {
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
      icon: Home,
      title: "Property Listings",
      description:
        "Share detailed property listings with photos, videos, and virtual tours instantly",
    },
    {
      icon: Calendar,
      title: "Viewing Scheduler",
      description:
        "Automate property viewing bookings with calendar integration and reminders",
    },
    {
      icon: Bell,
      title: "Lead Notifications",
      description:
        "Get instant alerts for new inquiries and follow up automatically",
    },
    {
      icon: MapPin,
      title: "Location Sharing",
      description:
        "Send property locations and directions with one-tap navigation",
    },
    {
      icon: FileText,
      title: "Document Sharing",
      description:
        "Securely share contracts, floor plans, and property documents",
    },
    {
      icon: MessageSquare,
      title: "Lead Nurturing",
      description:
        "Automated follow-ups and personalized property recommendations",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "35% More Closings",
      description: "Increase in successful property sales and rentals",
    },
    {
      icon: Users,
      title: "4x Better Engagement",
      description: "Higher lead response and engagement rates",
    },
    {
      icon: Calendar,
      title: "50% Faster Viewings",
      description: "Reduction in time to schedule property viewings",
    },
    {
      icon: Zap,
      title: "98% Open Rate",
      description: "Instant delivery ensures leads see your messages",
    },
  ];

  const useCases = [
    {
      title: "Lead Qualification",
      description: "Automatically qualify and segment property inquiries",
      icon: Search,
    },
    {
      title: "Virtual Tours",
      description: "Share 360° property tours and video walkthroughs",
      icon: Video,
    },
    {
      title: "Viewing Reminders",
      description: "Send automated reminders before scheduled viewings",
      icon: Bell,
    },
    {
      title: "Property Alerts",
      description: "Notify buyers when matching properties become available",
      icon: Home,
    },
    {
      title: "Offer Management",
      description: "Handle negotiations and offers through secure messaging",
      icon: FileText,
    },
    {
      title: "Client Updates",
      description:
        "Keep clients informed throughout the buying/selling process",
      icon: MessageSquare,
    },
  ];

  const faqsColumn1 = [
    {
      question: "How does automated viewing scheduling work?",
      answer:
        "Clients can request viewings directly through WhatsApp. Our system checks your availability, confirms the appointment, and sends reminders to both parties. You can sync with your calendar for seamless scheduling.",
    },
    {
      question: "Can I share property listings with photos and videos?",
      answer:
        "Share comprehensive property listings including high-quality photos, videos, virtual tours, floor plans, and detailed descriptions. You can also create property catalogs for easy browsing.",
    },
    {
      question: "How do you handle lead qualification?",
      answer:
        "Our chatbot asks qualifying questions about budget, location preferences, property type, and timeline. Leads are automatically scored and routed to the right agent based on criteria you define.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "Is it secure for sharing sensitive documents?",
      answer:
        "Yes, all communications are encrypted end-to-end through WhatsApp. You can securely share contracts, agreements, and financial documents while maintaining full compliance with data protection regulations.",
    },
    {
      question: "Can I manage multiple properties and clients?",
      answer:
        "Yes! Our platform helps you organize conversations by property, client stage, and agent. Use tags, notes, and automated workflows to manage your entire portfolio efficiently.",
    },
    {
      question: "Does it integrate with real estate CRMs?",
      answer:
        "Yes, Chati integrates with popular real estate CRMs and property management systems, ensuring all your client data and property information stays synchronized across platforms.",
    },
  ];

  const faqsColumnFAQSection1 = [
    {
      question: "How can real estate agents use WhatsApp for lead generation?",
      answer:
        "Real estate agents can use Click-to-WhatsApp ads on Facebook and Instagram to capture leads directly in chat, add WhatsApp buttons on websites for instant inquiries, integrate with property portals, qualify leads automatically through chatbot questions about budget and preferences, send instant property recommendations, and nurture prospects with automated follow-ups—increasing conversion rates by 27% compared to traditional landing pages.",
    },
    {
      question: "Can I share property listings through WhatsApp?",
      answer:
        "Absolutely! Share high-resolution images, virtual tour videos, 3D walkthroughs, floor plans, location maps, and detailed brochures directly in chat. Use WhatsApp Business catalog to showcase your entire property portfolio with prices, specifications, and amenities. Send personalized property recommendations based on buyer preferences, enabling clients to browse listings conveniently on their mobile devices—making property discovery engaging and immediate.",
    },
    {
      question: "How does WhatsApp help schedule property viewings?",
      answer:
        "Automate the entire booking process—clients can check available time slots, select preferred dates, confirm site visits, and receive instant booking confirmations. Send automated reminders 24 hours before viewings with property address, agent contact, and directions. Allow easy rescheduling through quick reply buttons. WhatsApp scheduling reduces no-shows by 35%, eliminates back-and-forth calls, and ensures your sales team's calendar stays organized.",
    },
    {
      question: "Can I automate follow-ups with potential buyers?",
      answer:
        "Yes! Set up automated drip campaigns that send property updates, market insights, price changes, and new listings based on buyer preferences. Follow up after site visits with feedback requests, additional property options, and financing information. Send periodic check-ins to warm leads who aren't ready to buy yet. Automated follow-ups keep you top-of-mind, nurture relationships over time, and increase conversion rates by 40% without manual effort.",
    },
  ];

  const faqsColumnFAQSection2 = [
    {
      question: "How do chatbots help real estate businesses?",
      answer:
        "AI chatbots qualify leads 24/7 by asking about budget, location preferences, property type, and timeline. They answer FAQs about amenities, documentation, home loan processes, registration procedures, and property tax. Chatbots provide instant responses outside business hours, schedule viewings automatically, collect KYC documents, and escalate serious buyers to agents—handling 70-80% of initial inquiries while your team focuses on closing deals.",
    },
    {
      question: "Can WhatsApp integrate with my real estate CRM?",
      answer:
        "Yes! WhatsApp Business API integrates seamlessly with popular real estate CRMs like Salesforce, Zoho, HubSpot, and property management systems. Automatically sync leads from WhatsApp to CRM, track conversation history, assign leads to agents, update deal stages, trigger automated workflows, and maintain unified client profiles—creating a centralized system where every inquiry is captured, tracked, and converted efficiently without manual data entry.",
    },
    {
      question: "Can clients submit documents through WhatsApp?",
      answer:
        "Absolutely! Clients can securely submit KYC documents, identity proofs, income certificates, property papers, and bank statements directly through WhatsApp's encrypted platform. Create document checklists, send upload reminders, verify submissions, and store files in your CRM automatically. This eliminates physical document collection, speeds up verification processes by 50%, and provides a convenient digital experience that modern buyers expect.",
    },
    {
      question: "What kind of property updates can I send?",
      answer:
        "Send new property launch announcements with photos and pricing, price reduction alerts for interested properties, construction progress updates with site photos, possession date reminders, payment due notifications with links, open house invitations, market trend reports, exclusive pre-launch offers, and neighborhood development updates. Rich media messages with videos and floor plans achieve 60-80% engagement rates, keeping buyers informed and accelerating purchase decisions.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 py-10 sm:py-12 md:py-16">
        {/* Background orb (scaled for mobile) */}
        <div
          className="absolute top-0 right-0 w-40 h-40 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px] 
  bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl"
        />

        <div ref={heroRef} className="container relative mx-auto px-4 z-10">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* LEFT CONTENT */}
            <div
              className={`transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 bg-blue-100 text-blue-700 w-fit shadow-sm"
              >
                <Building2 className="w-3.5 h-3.5 mr-1.5" />
                Real Estate Solutions
              </Badge>

              <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">
                  Close More Deals with
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  WhatsApp for Real Estate
                </span>
              </h1>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Increase closings by 35% with automated viewings, instant
                listings, and 24/7 lead nurturing via WhatsApp.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto"
                >
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

              {/* Metrics section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">
                    35% More Closings
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">
                    98% Open Rate
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/real-estate-agent-showing-property-listing-on-tabl.jpg"
                  alt="Real estate agent showing listings on WhatsApp"
                  width={600}
                  height={500}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandSlider />

      {/* Block 1: Image Left, Content Right - Property Listings */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 py-10 sm:py-12 md:py-14"
      >
        {/* Background blobs (scaled for mobile) */}
        <div
          className="absolute top-10 right-10 w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 
      bg-gradient-to-br from-indigo-400/15 to-transparent rounded-full blur-3xl"
        />
        <div
          className="absolute bottom-10 left-10 w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 
      bg-gradient-to-tr from-purple-400/15 to-transparent rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[55%_45%] items-center">
            {/* Image */}
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block1InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-xl">
                <div
                  className="absolute inset-0 bg-gradient-to-br 
              from-indigo-400/20 via-purple-400/15 to-blue-400/20 
              blur-2xl rounded-3xl scale-105"
                />
                <Image
                  src="/smartphone-showing-property-listing-with-photos-an.jpg"
                  alt="WhatsApp property listing with photos and virtual tour"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl 
              hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                block1InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 shadow-sm bg-indigo-100 text-indigo-700 border-indigo-200"
                variant="outline"
              >
                Property Showcase
              </Badge>

              <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Share Stunning Property Listings
              </h2>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Send complete property listings with high-quality photos,
                virtual tours, floor plans, and detailed descriptions—all on
                WhatsApp.
              </p>

              <div className="space-y-5">
                {[
                  {
                    iconBg: "from-indigo-100 to-indigo-50",
                    iconColor: "text-indigo-600",
                    title: "Rich Media Listings",
                    desc: "Share photos, videos, 360° virtual tours, and floor plans in one WhatsApp message.",
                    Icon: Home,
                  },
                  {
                    iconBg: "from-purple-100 to-purple-50",
                    iconColor: "text-purple-600",
                    title: "Location & Directions",
                    desc: "Send map locations with one-tap navigation and nearby amenities.",
                    Icon: MapPin,
                  },
                  {
                    iconBg: "from-blue-100 to-blue-50",
                    iconColor: "text-blue-600",
                    title: "Virtual Walkthroughs",
                    desc: "Offer live or recorded property walkthroughs for remote buyers.",
                    Icon: Video,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <div
                      className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${item.iconBg} 
                group-hover:from-indigo-200 group-hover:to-indigo-100 flex items-center justify-center transition-all`}
                    >
                      <item.Icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Viewing Automation */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30 py-10 sm:py-12 md:py-14"
      >
        {/* Background blobs */}
        <div
          className="absolute top-10 left-10 w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 
      bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl"
        />
        <div
          className="absolute bottom-10 right-10 w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 
      bg-gradient-to-tr from-emerald-400/15 to-transparent rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[45%_55%] items-center">
            {/* Text Content */}
            <div
              className={`transition-all duration-1000 ${
                block2InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 bg-green-100 text-green-700 border-green-200 shadow-sm"
                variant="outline"
              >
                Viewing Automation
              </Badge>

              <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Schedule Viewings Instantly
              </h2>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Automate viewing bookings with calendar sync, instant
                confirmations, and reminders that reduce no-shows by up to 50%.
              </p>

              <div className="space-y-5">
                {[
                  {
                    iconBg: "from-green-100 to-green-50",
                    iconColor: "text-green-600",
                    title: "Smart Scheduling",
                    desc: "Clients choose from real-time availability and get instant confirmations.",
                    Icon: Calendar,
                  },
                  {
                    iconBg: "from-emerald-100 to-emerald-50",
                    iconColor: "text-emerald-600",
                    title: "Automated Reminders",
                    desc: "Send reminders to both agents and clients to reduce no-shows drastically.",
                    Icon: Bell,
                  },
                  {
                    iconBg: "from-blue-100 to-blue-50",
                    iconColor: "text-blue-600",
                    title: "Follow-Up Automation",
                    desc: "Automatically follow up after viewings to collect feedback and close leads.",
                    Icon: Key,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <div
                      className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${item.iconBg} 
                group-hover:from-green-200 group-hover:to-green-100 flex items-center justify-center transition-all`}
                    >
                      <item.Icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div
              className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                block2InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-xl">
                <div
                  className="absolute inset-0 bg-gradient-to-br 
              from-green-400/20 via-emerald-400/15 to-blue-400/20 
              blur-2xl rounded-3xl scale-105"
                />
                <Image
                  src="/calendar-interface-showing-property-viewing-appoin.jpg"
                  alt="Property viewing schedule automation interface"
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
              Complete Real Estate Solution
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage leads, viewings, and property sales
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
                <div className="w-11 h-11 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-blue-600" />
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
        className="py-12 md:py-14 bg-gradient-to-br from-blue-50/40 to-indigo-50/30"
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
              Why Real Estate Pros Choose Chati
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join top agents and agencies growing their business with WhatsApp
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
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
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
              Real Estate Use Cases
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Discover how real estate professionals use WhatsApp to close more
              deals
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
        description="Everything you need to know about WhatsApp for Real Estate"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

      {/* CTA Section - Compact */}
      <section className="py-12 md:py-14 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-base md:text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join leading agents and agencies closing more deals with WhatsApp
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
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

export default RealEstateClientPage;
