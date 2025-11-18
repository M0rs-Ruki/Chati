"use client";
import React from "react";
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
import CTASection from "@/components/section/CTASection";
import {
  Plane,
  Hotel,
  Bell,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  MessageSquare,
  Ticket,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Compass,
  Map,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function TravelPage() {
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
      icon: Ticket,
      title: "Booking Confirmations",
      description:
        "Instant booking confirmations with itinerary details, payment receipts, and check-in information.",
    },
    {
      icon: Bell,
      title: "Travel Updates",
      description:
        "Real-time flight delays, gate changes, and travel alerts sent directly to travelers' WhatsApp.",
    },
    {
      icon: Hotel,
      title: "Hotel Concierge",
      description:
        "24/7 virtual concierge service for room service, local recommendations, and guest requests.",
    },
    {
      icon: MapPin,
      title: "Location Services",
      description:
        "Share directions, local attractions, and personalized travel recommendations via WhatsApp.",
    },
    {
      icon: Calendar,
      title: "Itinerary Management",
      description:
        "Send detailed itineraries, activity schedules, and booking modifications instantly.",
    },
    {
      icon: Star,
      title: "Guest Feedback",
      description:
        "Collect reviews and feedback through conversational surveys to improve service quality.",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "45% More Bookings",
      description:
        "Conversational booking via WhatsApp drives significantly higher conversion rates.",
    },
    {
      icon: Zap,
      title: "Instant Communication",
      description:
        "98% open rate ensures travelers receive important updates and confirmations immediately.",
    },
    {
      icon: Star,
      title: "Better Guest Experience",
      description:
        "Personalized service and instant support improve guest satisfaction scores by 40%.",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description:
        "End-to-end encrypted booking confirmations and payment processing for traveler security.",
    },
  ];

  const useCases = [
    {
      title: "Booking Management",
      description:
        "Handle reservations, confirmations, modifications, and cancellations seamlessly via WhatsApp.",
      icon: Ticket,
    },
    {
      title: "Flight Notifications",
      description:
        "Send real-time flight status updates, gate changes, and boarding reminders to travelers.",
      icon: Plane,
    },
    {
      title: "Hotel Services",
      description:
        "Provide virtual concierge, room service orders, and housekeeping requests through chat.",
      icon: Hotel,
    },
    {
      title: "Travel Assistance",
      description:
        "Offer 24/7 travel support, emergency assistance, and local recommendations.",
      icon: Compass,
    },
    {
      title: "Tour Bookings",
      description:
        "Promote and book tours, activities, and experiences with instant confirmations.",
      icon: Globe,
    },
    {
      title: "Post-Trip Engagement",
      description:
        "Collect feedback, share photos, and promote future travel opportunities.",
      icon: MessageSquare,
    },
  ];

  const faqsColumn1 = [
    {
      question: "How do booking confirmations work via WhatsApp?",
      answer:
        "When a customer completes a booking, they instantly receive a confirmation message on WhatsApp with all details including itinerary, payment receipt, check-in information, and any special instructions. This can be automated through integration with your booking system.",
    },
    {
      question: "Can travelers modify bookings through WhatsApp?",
      answer:
        "Yes, travelers can request booking modifications, date changes, or cancellations directly through WhatsApp. Our AI chatbot can handle simple changes automatically, while complex requests are routed to your team with full context.",
    },
    {
      question: "How are flight delays and updates communicated?",
      answer:
        "By integrating with flight tracking APIs, we automatically send real-time notifications about flight delays, gate changes, cancellations, and boarding times. Travelers receive updates instantly on WhatsApp without needing to check multiple apps.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "What is a virtual concierge service?",
      answer:
        "A virtual concierge on WhatsApp allows hotel guests to request room service, book spa appointments, ask for local recommendations, report issues, or request amenities 24/7. AI handles common requests while routing complex ones to staff.",
    },
    {
      question: "Can we send personalized travel recommendations?",
      answer:
        "Absolutely. Based on traveler preferences, booking history, and location, you can send personalized recommendations for restaurants, attractions, activities, and experiences. Include rich media like photos, maps, and booking links.",
    },
    {
      question: "How do we collect guest feedback?",
      answer:
        "Send automated post-stay surveys via WhatsApp with conversational questions. The 98% open rate ensures higher response rates than email surveys. Collect ratings, reviews, and detailed feedback to improve your services.",
    },
  ];

  const faqsColumnFAQSection1 = [
    {
      question: "How can travel businesses use WhatsApp for bookings?",
      answer:
        "Travel companies can automate the entire booking process via WhatsApp—customers browse packages, check availability, customize itineraries, make reservations for flights/hotels/tours, complete payments through integrated links, and receive instant confirmations with e-tickets and vouchers. WhatsApp booking systems handle inquiries 24/7, reduce booking friction, and increase conversions by 112% compared to traditional email-based processes.",
    },
    {
      question: "What travel notifications can be sent through WhatsApp?",
      answer:
        "Send booking confirmations with PNR and itinerary details, flight status alerts for delays or gate changes, check-in reminders 24 hours before departure, boarding pass delivery, hotel reservation confirmations, weather updates at destination, travel insurance information, visa status updates, real-time baggage tracking, and trip completion surveys—all through WhatsApp's 98% open rate channel ensuring travelers stay informed throughout their journey.",
    },
    {
      question: "Can hotels manage guest communication via WhatsApp?",
      answer:
        "Absolutely! Hotels send pre-arrival messages with check-in details and special requests confirmation, share Google Maps location and parking info, provide digital room keys, offer personalized upselling opportunities (spa treatments, room upgrades), send restaurant menus and room service options, enable instant guest support during stay, collect real-time feedback, and maintain post-stay engagement—improving guest satisfaction scores by 45% and driving 35% more direct bookings.",
    },
    {
      question: "How does WhatsApp help with customer support in travel?",
      answer:
        "Provide 24/7 instant support through AI chatbots answering FAQs about visas, baggage policies, cancellations, and destinations. Handle booking modifications, process refunds, share alternative flight options during disruptions, provide emergency assistance, and escalate complex issues to live agents with full context. WhatsApp support reduces response time by 70%, handles 80% of routine queries automatically, and achieves 4.5+ CSAT scores consistently.",
    },
  ];

  const faqsColumnFAQSection2 = [
    {
      question: "Can we send promotional offers through WhatsApp?",
      answer:
        "Yes! Send personalized travel deals based on browsing history and preferences, early bird discounts for seasonal packages, flash sales for last-minute bookings, exclusive loyalty rewards for repeat customers, destination recommendations with rich media content, group travel offers, and festival/holiday specials. WhatsApp promotional messages achieve 60-80% open rates and 25-40% conversion rates—12x higher than email marketing—driving significant revenue growth.",
    },
    {
      question: "How does WhatsApp integrate with booking systems?",
      answer:
        "WhatsApp Business API integrates seamlessly with travel booking engines, property management systems (PMS), global distribution systems (GDS), and CRM platforms through REST APIs. Sync booking data in real-time, automate confirmation messages, trigger status updates, pull inventory availability, process payments, and maintain unified customer profiles—creating an end-to-end connected ecosystem that eliminates manual work and delivers seamless traveler experiences.",
    },
    {
      question: "Can we share itineraries and travel documents via WhatsApp?",
      answer:
        "Absolutely! Share complete travel itineraries with day-by-day schedules, flight tickets and boarding passes as PDFs, hotel vouchers with confirmation codes, visa documents and travel insurance, activity bookings and entry tickets, Google Maps locations for hotels and attractions, emergency contact information, and multi-language travel guides—all securely via WhatsApp's end-to-end encrypted platform that travelers already use daily.",
    },
    {
      question: "Is WhatsApp suitable for both B2C and B2B travel businesses?",
      answer:
        "Yes! B2C travel agencies use WhatsApp for individual traveler bookings, personalized recommendations, and customer support. B2B tour operators leverage it for corporate travel coordination, group booking management, agent-to-agent communication, bulk reservation confirmations, and partner collaboration. WhatsApp's scalability, automation capabilities, and multi-agent support make it ideal for travel businesses of all sizes—from solo agents to multinational hospitality chains managing millions of guests.",
    },
  ];

  type FeatureProps = {
    iconBg: string;
    iconColor: string;
    title: string;
    desc: string;
    Icon: React.ComponentType<any>;
  };

  function Feature({ iconBg, iconColor, title, desc, Icon }: FeatureProps) {
    return (
      <div className="flex gap-3 items-start group">
        <div
          className={`
          flex h-10 w-10 shrink-0 items-center justify-center rounded-xl 
          bg-gradient-to-br ${iconBg} 
          group-hover:from-white/80 group-hover:to-white/60 
          transition-all shadow-sm
        `}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50/30 py-10 sm:py-12 md:py-16">
        {/* background orb (smaller on mobile) */}
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px] bg-gradient-to-br from-cyan-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-6 sm:py-8 md:py-12 z-10"
        >
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* LEFT: content */}
            <div
              className={`transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 bg-cyan-100 text-cyan-700 w-fit"
              >
                <Plane className="w-3.5 h-3.5 mr-1.5" />
                Travel & Hospitality
              </Badge>

              <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">
                  Enhance Guest Experiences with
                </span>
                <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  WhatsApp for Travel
                </span>
              </h1>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Increase bookings by 45% with automated confirmations, real-time
                travel updates, and 24/7 concierge service via WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold w-full sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                    <span className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      Book Demo
                    </span>
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm text-muted-foreground">
                    45% More Bookings
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm text-muted-foreground">
                    98% Open Rate
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: image */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/travelers-using-smartphones-for-hotel-booking-and-.jpg"
                  alt="Travelers using WhatsApp for booking confirmations and travel updates"
                  width={600}
                  height={500}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandSlider />

      {/* Block 1: Image Left, Content Right - Booking Management */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/30 
  py-10 sm:py-12 md:py-16"
      >
        {/* Background blobs (smaller for mobile) */}
        <div className="absolute top-10 right-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-tr from-indigo-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[55%_45%] items-center">
            {/* IMAGE LEFT */}
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block1InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-purple-400/20 blur-2xl rounded-3xl scale-105" />

                <Image
                  src="/travelers-using-smartphones-for-hotel-booking-and-.jpg"
                  alt="Travelers using smartphones for hotel booking"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* CONTENT RIGHT */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                block1InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 shadow-sm bg-blue-100 text-blue-700 border-blue-200"
                variant="outline"
              >
                Booking Management
              </Badge>

              <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Instant Booking Confirmations
              </h2>

              <p className="mb-6 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Send automated booking confirmations, itineraries, and payment
                receipts instantly via WhatsApp — all details in one message.
              </p>

              <div className="space-y-4">
                {/* Feature 1 */}
                <Feature
                  iconBg="from-blue-100 to-blue-50"
                  iconColor="text-blue-600"
                  title="Automated Confirmations"
                  desc="Instant confirmations with itinerary, receipts, and check-in info."
                  Icon={Ticket}
                />

                {/* Feature 2 */}
                <Feature
                  iconBg="from-indigo-100 to-indigo-50"
                  iconColor="text-indigo-600"
                  title="Easy Modifications"
                  desc="Travelers can request changes or cancellations directly via chat."
                  Icon={Calendar}
                />

                {/* Feature 3 */}
                <Feature
                  iconBg="from-purple-100 to-purple-50"
                  iconColor="text-purple-600"
                  title="Digital Itineraries"
                  desc="Send maps, directions, and activity schedules in a single message."
                  Icon={Map}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Virtual Concierge */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-orange-50/40 via-white to-amber-50/30
  py-10 sm:py-12 md:py-16"
      >
        {/* Glow blobs (responsive) */}
        <div className="absolute top-10 left-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-orange-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-tr from-amber-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[45%_55%] items-center">
            {/* CONTENT LEFT */}
            <div
              className={`transition-all duration-1000 ${
                block2InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 shadow-sm bg-orange-100 text-orange-700 border-orange-200"
                variant="outline"
              >
                Virtual Concierge
              </Badge>

              <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                24/7 Guest Support & Services
              </h2>

              <p className="mb-6 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Guests can request room service, book spa sessions, ask for
                local recommendations, and report issues — all through WhatsApp.
              </p>

              <div className="space-y-4">
                <Feature
                  iconBg="from-orange-100 to-orange-50"
                  iconColor="text-orange-600"
                  title="Room Service & Amenities"
                  desc="Guests can request housekeeping or order food instantly."
                  Icon={Hotel}
                />

                <Feature
                  iconBg="from-amber-100 to-amber-50"
                  iconColor="text-amber-600"
                  title="Local Recommendations"
                  desc="Provide restaurant, attraction, and activity suggestions."
                  Icon={MapPin}
                />

                <Feature
                  iconBg="from-red-100 to-red-50"
                  iconColor="text-red-600"
                  title="Instant Issue Resolution"
                  desc="Guests can report problems and receive immediate help."
                  Icon={Zap}
                />
              </div>
            </div>

            {/* IMAGE RIGHT */}
            <div
              className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                block2InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-amber-400/15 to-red-400/20 blur-2xl rounded-3xl scale-105" />

                <Image
                  src="/travelers-using-smartphones-for-hotel-booking-and-.jpg"
                  alt="Hotel guest using WhatsApp virtual concierge"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
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
              Complete Travel Solution
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to enhance guest experiences and streamline
              travel communication
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
                <div className="w-11 h-11 bg-gradient-to-br from-cyan-100 to-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-cyan-600" />
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
        className="py-12 md:py-14 bg-gradient-to-br from-cyan-50/40 to-blue-50/30"
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
              Why Travel Brands Choose Chati
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join leading travel companies enhancing guest experiences with
              WhatsApp
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
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
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
              Travel & Hospitality Use Cases
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Discover how travel companies use WhatsApp to improve guest
              satisfaction
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
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
        description="Everything you need to know about WhatsApp for Travel & Hospitality"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

      {/* CTA Section */}
      <CTASection
        gradientFrom="from-cyan-600"
        gradientVia="via-cyan-600"
        gradientTo="to-blue-700"
        title="Ready to Transform Guest Experiences?"
        description="Join travel companies increasing bookings and satisfaction with WhatsApp"
        primaryButtonText="Start Free Trial"
        primaryButtonLink={
          process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"
        }
        primaryButtonBgColor="bg-white"
        primaryButtonTextColor="text-cyan-600"
        primaryButtonHoverBg="hover:bg-gray-100"
        secondaryButtonText="Schedule Demo"
        secondaryButtonLink={`https://wa.me/${
          process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
        }`}
        showSecondaryButton={true}
        footerText=""
      />
    </div>
  );
}
