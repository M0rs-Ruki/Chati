"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrandSlider } from "@/components/brand-slider"
import { CheckCircle2, ShieldCheck, TrendingUp, Users, Award, ArrowRight, ShoppingCart, DollarSign, GraduationCap, Heart, Plane, Target, Film, Calendar, Building2, FileText, Key, MessageSquare, Star, Zap, Globe, Lock, Clock } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function WhatsAppBlueTickPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: benefitsRef, isVisible: benefitsInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: whoShouldApplyRef, isVisible: whoShouldApplyInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: requirementsRef, isVisible: requirementsInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: processRef, isVisible: processInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({ threshold: 0.1 })

  const benefits = [
    {
      icon: CheckCircle2,
      title: "Official Business Name Display",
      description:
        "Your verified business name appears in customer chats—even if they haven't saved your contact. Build instant recognition and trust with every message you send.",
    },
    {
      icon: ShieldCheck,
      title: "Reduce Risk of Being Blocked",
      description:
        "Unverified accounts risk being flagged as spam. The blue tick badge reassures customers that your messages are legitimate, reducing blocks and improving deliverability.",
    },
    {
      icon: TrendingUp,
      title: "Increase Message Open Rates by 70%",
      description:
        "Verified businesses see significantly higher engagement. The blue tick signals authenticity, leading to better visibility, higher open rates, and stronger customer relationships.",
    },
    {
      icon: Award,
      title: "Stand Out in Competitive Markets",
      description:
        "In crowded industries, credibility is everything. A verified badge differentiates your brand from competitors, builds immediate trust, and enhances your professional reputation.",
    },
  ]

  const industries = [
    {
      icon: ShoppingCart,
      title: "E-commerce Businesses",
      description:
        "Boost customer trust instantly and increase conversions by showcasing your authenticity with every product update and order notification.",
    },
    {
      icon: DollarSign,
      title: "Financial Services",
      description:
        "Clearly differentiate your legitimate financial brand from fraudulent accounts and boost client confidence in sensitive transactions.",
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      description:
        "Gain trust faster with students and parents, boosting engagement in admissions, course enrollment, and educational communications.",
    },
    {
      icon: Heart,
      title: "Healthcare Providers",
      description:
        "Instantly assure patients about your authenticity and improve communication efficiency for appointments, prescriptions, and health updates.",
    },
    {
      icon: Plane,
      title: "Travel & Hospitality",
      description:
        "Build credibility instantly for bookings, itinerary updates, and customer service, driving higher engagement and repeat business.",
    },
    {
      icon: Target,
      title: "Marketing Agencies",
      description:
        "Highlight your professionalism clearly to attract more clients and improve campaign interactions with verified business status.",
    },
    {
      icon: Film,
      title: "Entertainment Services",
      description:
        "Enhance audience engagement and ensure your content reaches fans securely and authentically with official verification.",
    },
    {
      icon: Calendar,
      title: "Event Planning",
      description:
        "Build trust with clients by showcasing your verified status, leading to increased bookings, better attendance, and higher satisfaction.",
    },
  ]

  const requirements = [
    {
      icon: MessageSquare,
      title: "WhatsApp Business API Account",
      description:
        "Your business must be live and active on the official WhatsApp Business API platform. Standard WhatsApp Business app accounts are not eligible for verification.",
    },
    {
      icon: FileText,
      title: "Complete Meta Business Verification",
      description:
        "You must complete the Meta (Facebook) business verification process on your Meta Business Manager account before applying for the blue tick.",
    },
    {
      icon: Star,
      title: "5+ Organic PR/News Articles",
      description:
        "Your brand must have at least 5 organic press releases or news articles published online. Paid promotional content does not count toward this requirement.",
    },
    {
      icon: TrendingUp,
      title: "Tier 2 or Above Messaging Level",
      description:
        "Your WhatsApp account must be in Tier 2 or higher messaging level. Tier 1 accounts may apply after exchanging 10-15 messages with customers first.",
    },
    {
      icon: Lock,
      title: "Two-Factor Authentication (2FA)",
      description:
        "Enable 2-step verification on your WhatsApp Business API account for enhanced security before submitting your verification application.",
    },
    {
      icon: Award,
      title: "Notable & Reputable Business",
      description:
        "Your business must be well-established, notable, and have a strong reputation in your industry to qualify for official WhatsApp verification.",
    },
  ]

  const applicationSteps = [
    {
      step: 1,
      title: "Set Up WhatsApp Business API",
      description:
        "First, ensure your business is live on the official WhatsApp Business API platform. An approved API account is mandatory for blue tick verification.",
      icon: MessageSquare,
    },
    {
      step: 2,
      title: "Meet All Prerequisites",
      description:
        "Complete Meta business verification, publish 5+ organic PR articles, enable 2FA, and reach Tier 2 messaging level before applying.",
      icon: CheckCircle2,
    },
    {
      step: 3,
      title: "Apply for Verification",
      description:
        "Navigate to your WhatsApp dashboard and click the 'Apply for Blue Tick' button. Fill out the verification form carefully with accurate business details.",
      icon: FileText,
    },
    {
      step: 4,
      title: "Wait for Meta Review",
      description:
        "Meta will review your application within 7-10 business days. You'll receive a response directly from WhatsApp via email about your verification status.",
      icon: Clock,
    },
  ]

  const faqsColumn1 = [
    {
      question: "What is the WhatsApp Blue Tick?",
      answer:
        "The WhatsApp Blue Tick (previously called Green Tick) is an official verification badge that appears next to your business name in WhatsApp. It confirms your account is authentic and authorized by Meta, helping customers trust your business instantly.",
    },
    {
      question: "How long does verification take?",
      answer:
        "WhatsApp Blue Tick approval typically takes 7-10 business days after you submit your application. Meta will review your business details, PR coverage, and account activity before making a decision. You'll receive the response directly via email.",
    },
    {
      question: "What if my verification is denied?",
      answer:
        "If your verification request is denied, you can reapply after 1 month. Use the waiting period to strengthen your application by publishing more PR articles, increasing customer engagement, and ensuring all prerequisites are fully met.",
    },
    {
      question: "Do I need to pay for verification?",
      answer:
        "No, applying for the WhatsApp Blue Tick is completely FREE. There are no charges from WhatsApp or Meta for the verification process itself. However, you need an active WhatsApp Business API account to apply.",
    },
  ]

  const faqsColumn2 = [
    {
      question: "Can I use WhatsApp Business app instead of API?",
      answer:
        "No, the blue tick verification is only available for WhatsApp Business API accounts. The standard WhatsApp Business app does not support verification badges. You must upgrade to the API platform first.",
    },
    {
      question: "Will I lose the blue tick if I change providers?",
      answer:
        "If you downgrade from WhatsApp Business API to a standard account at any time, your blue tick will disappear immediately. The verification is tied to maintaining an active API account.",
    },
    {
      question: "Is blue tick verification guaranteed?",
      answer:
        "No, verification approval is entirely at WhatsApp/Meta's discretion. Meeting all prerequisites improves your chances significantly, but there's no guarantee. Focus on building a strong, reputable business with solid PR coverage.",
    },
    {
      question: "Can I still use API features without the blue tick?",
      answer:
        "Yes, absolutely! All WhatsApp Business API features—broadcasts, automation, chatbots, analytics—work perfectly without the blue tick. Verification simply adds the trust badge to enhance your brand credibility.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50/30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-green-400/15 to-transparent rounded-full blur-3xl" />

        <div ref={heroRef} className="container relative mx-auto px-4 py-16 md:py-20 lg:py-24 z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left Content */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 w-fit shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                Official WhatsApp Verification
              </Badge>

              <h1 className="mb-4 text-balance leading-tight tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                  Get Your WhatsApp
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 bg-clip-text text-transparent">
                  Blue Tick Verification
                </span>
              </h1>

              <p className="mb-6 text-lg text-muted-foreground md:text-xl max-w-xl leading-relaxed">
                Build instant trust with customers. Get the official WhatsApp Blue Tick badge and increase your message
                open rates by up to 70%. Stand out from competitors with verified business status.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                >
                  Apply for Verification
                  <CheckCircle2 className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                  asChild
                >
                  <Link href="#requirements">Check Requirements</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-blue-600">FREE</div>
                  <div className="text-sm text-muted-foreground">Verification</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">7-10</div>
                  <div className="text-sm text-muted-foreground">Days Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">70%</div>
                  <div className="text-sm text-muted-foreground">Higher Opens</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-green-400/15 to-purple-400/20 blur-3xl rounded-full transform scale-110" />
                <Image
                  src="/whatsapp-blue-tick-verified-business-account-sho.jpg"
                  alt="WhatsApp Blue Tick verified business account showing official verification badge next to company name in customer chat with enhanced trust and credibility"
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

      {/* BrandSlider */}
      <BrandSlider />

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-green-50/20 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200" variant="outline">
              Verification Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Why Your Business Needs the{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Blue Tick
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The WhatsApp Blue Tick is more than just a badge—it's a powerful trust signal that transforms how
              customers perceive and engage with your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-500 border-2 hover:border-blue-300 ${
                  benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Apply Section */}
      <section
        ref={whoShouldApplyRef}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/30 via-white to-blue-50/20 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              whoShouldApplyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm bg-green-100 text-green-700 border-green-200" variant="outline">
              Industry Applications
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Who Should Apply for WhatsApp Verification?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Businesses across all industries benefit from verified status. See how the blue tick can transform
              customer trust in your sector
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-500 border hover:border-green-300 group ${
                  whoShouldApplyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <industry.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{industry.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{industry.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Don't see your industry listed? No worries! Verification is available for all business types.
            </p>
            <Button variant="outline" className="border-2" size="lg">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section
        id="requirements"
        ref={requirementsRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              requirementsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm bg-purple-100 text-purple-700 border-purple-200" variant="outline">
              Prerequisites
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Verification Requirements
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ensure your business meets all these criteria before applying for the WhatsApp Blue Tick
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {requirements.map((requirement, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-500 ${
                  requirementsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <requirement.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{requirement.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{requirement.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-foreground mb-2">Important Note</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Paid PR or promotional articles do NOT count toward the 5 organic news requirement. Only genuine
                    press coverage from reputable media outlets qualifies for verification eligibility.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section
        ref={processRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/20 to-blue-50/30 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm bg-green-100 text-green-700 border-green-200" variant="outline">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              How to Apply for WhatsApp Blue Tick
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Follow these four simple steps to submit your verification application
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {applicationSteps.map((step, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-500 border-2 hover:border-green-300 ${
                  processInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-green-50 border-2 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Verified?</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Start building trust with your customers today. Apply for your official WhatsApp Blue Tick verification
                and join thousands of verified businesses worldwide.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg">
                Start Application Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 shadow-sm" variant="outline">
              Common Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about WhatsApp Blue Tick verification
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div
                className={`transition-all duration-1000 ${
                  faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                  faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {faqsColumn2.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 4}`}
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Build Trust. Boost Engagement. Get Verified.
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of verified businesses using WhatsApp Blue Tick to increase customer trust and drive 70%
            higher engagement rates. Apply for free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
              Apply for Blue Tick Now
              <CheckCircle2 className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent font-medium"
              asChild
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
