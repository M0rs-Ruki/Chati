"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrandSlider } from "@/components/brand-slider"
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
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function TravelPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: block1Ref, isVisible: block1InView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: block2Ref, isVisible: block2InView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: featuresRef, isVisible: featuresInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: benefitsRef, isVisible: benefitsInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: useCasesRef, isVisible: useCasesInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({ threshold: 0.1 })

  const features = [
    {
      icon: Ticket,
      title: "Booking Confirmations",
      description: "Instant booking confirmations with itinerary details, payment receipts, and check-in information.",
    },
    {
      icon: Bell,
      title: "Travel Updates",
      description: "Real-time flight delays, gate changes, and travel alerts sent directly to travelers' WhatsApp.",
    },
    {
      icon: Hotel,
      title: "Hotel Concierge",
      description: "24/7 virtual concierge service for room service, local recommendations, and guest requests.",
    },
    {
      icon: MapPin,
      title: "Location Services",
      description: "Share directions, local attractions, and personalized travel recommendations via WhatsApp.",
    },
    {
      icon: Calendar,
      title: "Itinerary Management",
      description: "Send detailed itineraries, activity schedules, and booking modifications instantly.",
    },
    {
      icon: Star,
      title: "Guest Feedback",
      description: "Collect reviews and feedback through conversational surveys to improve service quality.",
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "45% More Bookings",
      description: "Conversational booking via WhatsApp drives significantly higher conversion rates.",
    },
    {
      icon: Zap,
      title: "Instant Communication",
      description: "98% open rate ensures travelers receive important updates and confirmations immediately.",
    },
    {
      icon: Star,
      title: "Better Guest Experience",
      description: "Personalized service and instant support improve guest satisfaction scores by 40%.",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "End-to-end encrypted booking confirmations and payment processing for traveler security.",
    },
  ]

  const useCases = [
    {
      title: "Booking Management",
      description: "Handle reservations, confirmations, modifications, and cancellations seamlessly via WhatsApp.",
      icon: Ticket,
    },
    {
      title: "Flight Notifications",
      description: "Send real-time flight status updates, gate changes, and boarding reminders to travelers.",
      icon: Plane,
    },
    {
      title: "Hotel Services",
      description: "Provide virtual concierge, room service orders, and housekeeping requests through chat.",
      icon: Hotel,
    },
    {
      title: "Travel Assistance",
      description: "Offer 24/7 travel support, emergency assistance, and local recommendations.",
      icon: Compass,
    },
    {
      title: "Tour Bookings",
      description: "Promote and book tours, activities, and experiences with instant confirmations.",
      icon: Globe,
    },
    {
      title: "Post-Trip Engagement",
      description: "Collect feedback, share photos, and promote future travel opportunities.",
      icon: MessageSquare,
    },
  ]

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
  ]

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
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50/30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-cyan-400/15 to-transparent rounded-full blur-3xl" />

        <div ref={heroRef} className="container relative mx-auto px-4 py-12 md:py-16 z-10">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div
              className={`transition-all duration-1000 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Badge variant="secondary" className="mb-3 bg-cyan-100 text-cyan-700 w-fit">
                <Plane className="w-3.5 h-3.5 mr-1.5" />
                Travel & Hospitality
              </Badge>

              <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">Enhance Guest Experiences with</span>
                <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  WhatsApp for Travel
                </span>
              </h1>

              <p className="mb-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                Increase bookings by 45% with automated confirmations, real-time travel updates, and 24/7 concierge
                service via WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}>
                    <Bell className="mr-2 h-4 w-4" />
                    Book Demo
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm text-muted-foreground">45% More Bookings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm text-muted-foreground">98% Open Rate</span>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <Image
                src="/travelers-using-smartphones-for-hotel-booking-and-.jpg"
                alt="Travelers using WhatsApp for booking confirmations and travel updates"
                width={600}
                height={500}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <BrandSlider />

      {/* Block 1: Image Left, Content Right - Booking Management */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-indigo-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[55%_45%] items-center">
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block1InView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-purple-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/travelers-using-smartphones-for-hotel-booking-and-.jpg"
                  alt="Travelers using smartphones for hotel booking and travel management via WhatsApp"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto max-w-2xl object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                block1InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-3 shadow-sm bg-blue-100 text-blue-700 border-blue-200" variant="outline">
                Booking Management
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Instant Booking Confirmations
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Send automated booking confirmations, itineraries, and payment receipts instantly via WhatsApp.
                Travelers receive all details in one convenient message with easy access to modify or cancel bookings.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <Ticket className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Automated Confirmations</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Instant booking confirmations with complete itinerary details, payment receipts, and check-in
                      info.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 group-hover:from-indigo-200 group-hover:to-indigo-100 transition-all shadow-sm">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Easy Modifications</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Travelers can request changes, reschedule, or cancel bookings directly through WhatsApp chat.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <Map className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Digital Itineraries</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Share detailed travel itineraries with maps, directions, and activity schedules in one message.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Virtual Concierge */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-orange-50/40 via-white to-amber-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-orange-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-tr from-amber-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[45%_55%] items-center">
            <div
              className={`transition-all duration-1000 ${
                block2InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-3 shadow-sm bg-orange-100 text-orange-700 border-orange-200" variant="outline">
                Virtual Concierge
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                24/7 Guest Support & Services
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Provide round-the-clock concierge services via WhatsApp. Guests can request room service, book
                activities, get local recommendations, and report issues—all through convenient chat messaging.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 group-hover:from-orange-200 group-hover:to-orange-100 transition-all shadow-sm">
                    <Hotel className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Room Service & Amenities</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Guests can order room service, request housekeeping, or book spa appointments via WhatsApp.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 group-hover:from-amber-200 group-hover:to-amber-100 transition-all shadow-sm">
                    <MapPin className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Local Recommendations</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Share personalized suggestions for restaurants, attractions, and activities based on guest
                      preferences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-red-50 group-hover:from-red-200 group-hover:to-red-100 transition-all shadow-sm">
                    <Zap className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Instant Issue Resolution</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Guests can report problems and get immediate assistance from your support team via chat.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                block2InView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-amber-400/15 to-red-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/travelers-using-smartphones-for-hotel-booking-and-.jpg"
                  alt="Hotel guest using WhatsApp virtual concierge for room service and local recommendations"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto max-w-2xl object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
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
            className={`text-center mb-10 transition-all duration-700 ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Complete Travel Solution</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to enhance guest experiences and streamline travel communication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-lg transition-all duration-300 ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-11 h-11 bg-gradient-to-br from-cyan-100 to-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Compact */}
      <section ref={benefitsRef} className="py-12 md:py-14 bg-gradient-to-br from-cyan-50/40 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Why Travel Brands Choose Chati</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join leading travel companies enhancing guest experiences with WhatsApp
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Compact */}
      <section ref={useCasesRef} className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${useCasesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Travel & Hospitality Use Cases</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Discover how travel companies use WhatsApp to improve guest satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-lg transition-all duration-300 group ${useCasesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <useCase.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1.5">{useCase.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{useCase.description}</p>
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
              faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Common questions about WhatsApp Business API for travel and hospitality
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div
                className={`transition-all duration-700 ${
                  faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                  faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {faqsColumn2.map((faq, index) => (
                    <AccordionItem
                      key={index}
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
      <section className="py-12 md:py-14 bg-gradient-to-br from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready to Transform Guest Experiences?</h2>
          <p className="text-base md:text-lg text-cyan-100 mb-8 max-w-2xl mx-auto">
            Join travel companies increasing bookings and satisfaction with WhatsApp
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-cyan-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}>
                <Bell className="mr-2 h-4 w-4" />
                Schedule Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
