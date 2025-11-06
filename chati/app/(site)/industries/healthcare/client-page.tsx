"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrandSlider } from "@/components/brand-slider"
import {
  Heart,
  Calendar,
  Bell,
  Shield,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  FileText,
  Video,
  Stethoscope,
  Pill,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const HealthcareClientPage = () => {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: block1Ref, isVisible: block1InView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: block2Ref, isVisible: block2InView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: featuresRef, isVisible: featuresInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: benefitsRef, isVisible: benefitsInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: useCasesRef, isVisible: useCasesInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({ threshold: 0.1 })

  const features = [
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Let patients book, reschedule, and manage appointments through WhatsApp",
    },
    {
      icon: Bell,
      title: "Automated Reminders",
      description: "Send appointment reminders and medication alerts to reduce no-shows",
    },
    {
      icon: Shield,
      title: "Secure Messaging",
      description: "HIPAA-compliant communication for sensitive health information",
    },
    {
      icon: FileText,
      title: "Report Sharing",
      description: "Securely share test results, prescriptions, and medical documents",
    },
    {
      icon: Users,
      title: "Patient Support",
      description: "Provide instant answers to health queries and appointment questions",
    },
    {
      icon: MessageSquare,
      title: "Follow-up Care",
      description: "Automated post-visit check-ins and treatment adherence monitoring",
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Reduce No-Shows",
      description: "40% decrease in missed appointments with automated reminders",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "60% reduction in administrative workload and phone calls",
    },
    {
      icon: Users,
      title: "Better Engagement",
      description: "3x higher patient engagement and satisfaction scores",
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "End-to-end encrypted, secure patient communication",
    },
  ]

  const useCases = [
    { title: "Appointment Booking", description: "24/7 self-service scheduling for patients", icon: Calendar },
    { title: "Prescription Refills", description: "Automated prescription renewal requests", icon: Pill },
    { title: "Health Reminders", description: "Medication schedules and wellness tips", icon: Bell },
    { title: "Telemedicine Support", description: "Virtual consultation scheduling and links", icon: Video },
    { title: "Emergency Alerts", description: "Urgent health notifications and updates", icon: Stethoscope },
    { title: "Patient Feedback", description: "Collect reviews and satisfaction surveys", icon: MessageSquare },
  ]

  const faqsColumn1 = [
    {
      question: "Is WhatsApp messaging HIPAA compliant for healthcare?",
      answer:
        "Yes, when used with proper safeguards. Our platform implements end-to-end encryption, secure data storage, access controls, and audit logs to ensure HIPAA compliance. We also provide Business Associate Agreements (BAA) for healthcare providers.",
    },
    {
      question: "How does appointment scheduling work?",
      answer:
        "Patients can view available time slots, book appointments, and receive instant confirmations—all through WhatsApp. The system integrates with your existing scheduling software and sends automated reminders before appointments.",
    },
    {
      question: "Can I share medical reports and prescriptions securely?",
      answer:
        "You can securely share lab results, prescriptions, and medical documents directly through WhatsApp. All files are encrypted and only accessible to authorized recipients.",
    },
  ]

  const faqsColumn2 = [
    {
      question: "How do automated reminders reduce no-shows?",
      answer:
        "Our system sends customizable reminders at optimal times before appointments. Patients can confirm, reschedule, or cancel with a simple reply, giving you time to fill open slots and significantly reducing no-show rates.",
    },
    {
      question: "Can patients ask health-related questions?",
      answer:
        "Yes! Our AI chatbot can answer common health questions, provide information about services, and direct patients to appropriate resources. Complex queries are seamlessly escalated to your medical staff.",
    },
    {
      question: "Does it integrate with Electronic Health Records (EHR)?",
      answer:
        "Yes, Chati integrates with major EHR systems, allowing seamless data flow between your patient management system and WhatsApp communications while maintaining full security and compliance.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50/30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-400/15 to-transparent rounded-full blur-3xl" />

        <div ref={heroRef} className="container relative mx-auto px-4 py-10 md:py-12 z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-200 w-fit shadow-sm">
                <Heart className="w-3.5 h-3.5 mr-1.5" />
                Healthcare & Wellness Solutions
              </Badge>

              <h1 className="mb-3 text-balance leading-tight tracking-tight">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  Better Patient Care with
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  WhatsApp for Healthcare
                </span>
              </h1>

              <p className="mb-5 text-base text-muted-foreground md:text-lg max-w-xl leading-relaxed">
                Schedule appointments, send reminders, and provide secure patient communication with HIPAA-compliant
                WhatsApp messaging. Perfect for hospitals, clinics, and healthcare providers.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                  asChild
                >
                  <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}>
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                  asChild
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-blue-600">40%</div>
                  <div className="text-xs text-muted-foreground text-center">Fewer No-Shows</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-blue-600">60%</div>
                  <div className="text-xs text-muted-foreground text-center">Time Saved</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-blue-600">3x</div>
                  <div className="text-xs text-muted-foreground text-center">Engagement</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-xs text-muted-foreground text-center">Open Rate</div>
                </div>
              </div>
            </div>

            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-400/15 to-teal-400/20 blur-3xl rounded-full transform scale-110" />
                <Image
                  src="/healthcare-professional-using-tablet-with-patient-.jpg"
                  alt="Healthcare professional using WhatsApp for patient communication and appointment scheduling"
                  width={600}
                  height={700}
                  className="relative z-10 w-full h-auto max-h-[380px] md:max-h-[400px] object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BrandSlider component */}
      <BrandSlider />

      {/* Block 1: Image Left, Content Right - Appointment Scheduling */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-emerald-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[55%_45%] items-center">
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block1InView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-400/15 to-teal-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/appointment-reminder-whatsapp-message-on-smartphon.jpg"
                  alt="Appointment reminder WhatsApp message on smartphone with booking confirmation"
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
              <Badge className="mb-3 shadow-sm bg-green-100 text-green-700 border-green-200" variant="outline">
                Appointment Management
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Reduce No-Shows by 40%</h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Send automated appointment reminders via WhatsApp to significantly reduce no-shows. Patients can
                confirm, reschedule, or cancel with a simple reply, helping you optimize your schedule and improve
                patient care.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">24/7 Self-Service Booking</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Patients can view available slots and book appointments anytime through WhatsApp without calling.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Smart Reminders</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automated reminders sent at optimal times with options to confirm, reschedule, or cancel.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Instant Confirmations</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Patients receive immediate booking confirmations with all appointment details and instructions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Secure Communication */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/40 via-white to-pink-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-tr from-pink-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[45%_55%] items-center">
            <div
              className={`transition-all duration-1000 ${
                block2InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-3 shadow-sm bg-purple-100 text-purple-700 border-purple-200" variant="outline">
                HIPAA Compliant
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Secure Patient Communication
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Share medical reports, prescriptions, and sensitive health information securely through HIPAA-compliant
                WhatsApp messaging. All communications are end-to-end encrypted with comprehensive audit logs.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">End-to-End Encryption</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      All patient communications and medical documents are fully encrypted and HIPAA compliant.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 group-hover:from-pink-200 group-hover:to-pink-100 transition-all shadow-sm">
                    <FileText className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Secure Document Sharing</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Share lab results, prescriptions, and medical records securely with authorized patients only.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Access Controls & Audit Logs</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Role-based access controls and comprehensive audit trails ensure compliance and accountability.
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
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/15 to-blue-400/20 blur-3xl rounded-full transform scale-110" />
                <Image
                  src="/secure-healthcare-messaging-dashboard-with-encrypt.jpg"
                  alt="Secure healthcare messaging dashboard with encrypted patient communication"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto max-h-[380px] md:max-h-[400px] object-contain rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Compact */}
      <section ref={featuresRef} className="py-12 md:py-14 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Healthcare Features</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need for secure, compliant patient communication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-lg transition-all duration-300 border-gray-200 ${
                  featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-12 md:py-14 bg-gradient-to-br from-blue-50/40 via-white to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Healthcare Providers Choose Us</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">Improve patient care and operational efficiency</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section ref={useCasesRef} className="py-12 md:py-14 bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/10">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              useCasesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Healthcare Use Cases</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              See how healthcare providers use WhatsApp to improve patient care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-lg transition-all duration-300 border-gray-200 group ${
                  useCasesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <useCase.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">{useCase.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - 3/3 Layout */}
      <section ref={faqRef} className="py-12 md:py-14 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about WhatsApp for healthcare
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
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed text-sm">
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
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed text-sm">
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
      <section className="py-12 md:py-14 bg-gradient-to-br from-blue-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Patient Care?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join leading healthcare providers using secure WhatsApp messaging to improve patient satisfaction
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
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
  )
}

export default HealthcareClientPage
