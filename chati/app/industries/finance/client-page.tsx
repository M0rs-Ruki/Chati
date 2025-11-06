"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrandSlider } from "@/components/brand-slider"
import {
  DollarSign,
  Shield,
  Bell,
  CreditCard,
  TrendingUp,
  MessageSquare,
  Lock,
  CheckCircle2,
  ArrowRight,
  Zap,
  FileText,
  Users,
  Smartphone,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function FinanceClientPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: block1Ref, isVisible: block1InView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: block2Ref, isVisible: block2InView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: featuresRef, isVisible: featuresInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: benefitsRef, isVisible: benefitsInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: useCasesRef, isVisible: useCasesInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({ threshold: 0.1 })

  const features = [
    {
      icon: Bell,
      title: "Account Alerts",
      description: "Send real-time notifications for transactions, balances, and account activity",
    },
    {
      icon: Shield,
      title: "Secure Messaging",
      description: "End-to-end encrypted communication compliant with financial regulations",
    },
    {
      icon: CreditCard,
      title: "Payment Support",
      description: "Help customers with payments, transfers, and transaction inquiries",
    },
    {
      icon: FileText,
      title: "Document Sharing",
      description: "Securely share statements, reports, and financial documents",
    },
    {
      icon: Users,
      title: "Customer Onboarding",
      description: "Streamline KYC verification and account opening processes",
    },
    {
      icon: MessageSquare,
      title: "Advisory Services",
      description: "Provide personalized financial advice and investment recommendations",
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "65% Higher Engagement",
      description: "Increase in customer interaction and satisfaction",
    },
    {
      icon: Users,
      title: "50% Faster Resolution",
      description: "Reduction in average query resolution time",
    },
    {
      icon: Lock,
      title: "100% Secure",
      description: "Fully encrypted and regulation-compliant messaging",
    },
    {
      icon: Zap,
      title: "98% Open Rate",
      description: "Instant delivery ensures customers see your messages",
    },
  ]

  const useCases = [
    { title: "Transaction Alerts", description: "Real-time notifications for all account activities", icon: Bell },
    { title: "Loan Applications", description: "Guide customers through loan application process", icon: FileText },
    {
      title: "Investment Updates",
      description: "Share portfolio performance and market insights",
      icon: BarChart3,
    },
    {
      title: "Fraud Prevention",
      description: "Instant alerts for suspicious activities and verification",
      icon: Shield,
    },
    {
      title: "Customer Support",
      description: "24/7 automated and live support for banking queries",
      icon: MessageSquare,
    },
    {
      title: "Payment Reminders",
      description: "Automated reminders for bills, EMIs, and due dates",
      icon: CreditCard,
    },
  ]

  const faqsColumn1 = [
    {
      question: "Is WhatsApp messaging secure for financial services?",
      answer:
        "Yes, absolutely. WhatsApp uses end-to-end encryption for all messages. Our platform adds additional security layers and is fully compliant with financial regulations including GDPR, PCI-DSS, and local banking regulations.",
    },
    {
      question: "Can I send transaction alerts and account notifications?",
      answer:
        "Yes! You can send real-time alerts for transactions, balance updates, payment confirmations, and any account activity. These notifications are instant, secure, and have much higher open rates than email or SMS.",
    },
    {
      question: "How does customer onboarding work on WhatsApp?",
      answer:
        "Our platform streamlines KYC verification by guiding customers through document submission, identity verification, and account setup—all within WhatsApp. This reduces onboarding time by up to 70%.",
    },
  ]

  const faqsColumn2 = [
    {
      question: "Can customers make payments through WhatsApp?",
      answer:
        "While direct payments depend on your region and WhatsApp Pay availability, you can send secure payment links, facilitate UPI transfers, and guide customers through payment processes with full transaction support.",
    },
    {
      question: "How do you handle sensitive financial data?",
      answer:
        "All data is encrypted in transit and at rest. We never store sensitive information like card numbers or PINs. Our platform is audited regularly and complies with all major financial security standards.",
    },
    {
      question: "Does it integrate with core banking systems?",
      answer:
        "Yes, Chati integrates seamlessly with major core banking systems, CRMs, and financial software through secure APIs, ensuring real-time data synchronization while maintaining security protocols.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50/30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-emerald-400/15 to-transparent rounded-full blur-3xl" />

        <div ref={heroRef} className="container relative mx-auto px-4 py-12 md:py-16 z-10">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div
              className={`transition-all duration-1000 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Badge variant="secondary" className="mb-3 bg-emerald-100 text-emerald-700 w-fit">
                <DollarSign className="w-3.5 h-3.5 mr-1.5" />
                Financial Services Solutions
              </Badge>

              <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">Secure Banking with</span>
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  WhatsApp for Finance
                </span>
              </h1>

              <p className="mb-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                Increase engagement by 65% with secure transaction alerts, instant customer support, and automated
                financial services via WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 group">
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-muted-foreground">65% Higher Engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-muted-foreground">100% Secure</span>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <Image
                src="/banking-app-showing-transaction-alerts-on-smartpho.jpg"
                alt="Banking app showing secure transaction alerts and account notifications on WhatsApp"
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

      {/* Block 1: Image Left, Content Right - Transaction Alerts */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-teal-50/40 via-white to-cyan-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-teal-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[55%_45%] items-center">
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block1InView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 via-cyan-400/15 to-emerald-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/smartphone-showing-secure-transaction-notification.jpg"
                  alt="Smartphone showing secure transaction notifications and payment alerts on WhatsApp"
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
              <Badge className="mb-3 shadow-sm bg-teal-100 text-teal-700 border-teal-200" variant="outline">
                Transaction Alerts
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Real-Time Account Notifications
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Send instant, secure alerts for transactions, balance updates, payment confirmations, and account
                activities. Keep customers informed with 98% open rates.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 group-hover:from-teal-200 group-hover:to-teal-100 transition-all shadow-sm">
                    <Bell className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Instant Alerts</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Real-time notifications for deposits, withdrawals, transfers, and all account activities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 group-hover:from-cyan-200 group-hover:to-cyan-100 transition-all shadow-sm">
                    <Shield className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Fraud Detection</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Immediate alerts for suspicious activities with instant verification options.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 group-hover:from-emerald-200 group-hover:to-emerald-100 transition-all shadow-sm">
                    <CreditCard className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Payment Confirmations</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automated confirmations for successful payments, bill payments, and transfers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Customer Onboarding */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/40 via-white to-lime-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-tr from-lime-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[45%_55%] items-center">
            <div
              className={`transition-all duration-1000 ${
                block2InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-3 shadow-sm bg-green-100 text-green-700 border-green-200" variant="outline">
                Customer Onboarding
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Streamlined KYC & Account Opening
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Reduce onboarding time by 70% with automated KYC verification, document collection, and account setup
                processes—all through WhatsApp.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Digital KYC</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Guide customers through document submission and identity verification seamlessly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lime-100 to-lime-50 group-hover:from-lime-200 group-hover:to-lime-100 transition-all shadow-sm">
                    <Smartphone className="h-5 w-5 text-lime-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Instant Account Setup</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Open accounts in minutes with automated workflows and real-time status updates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 group-hover:from-emerald-200 group-hover:to-emerald-100 transition-all shadow-sm">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Personalized Guidance</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      AI-powered assistance helps customers complete onboarding without friction.
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
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-lime-400/15 to-emerald-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/customer-completing-kyc-verification-on-smartphone.jpg"
                  alt="Customer completing KYC verification and account opening process on WhatsApp"
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Complete Financial Messaging Platform</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need for secure, compliant customer communication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-lg transition-all duration-300 ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Compact */}
      <section ref={benefitsRef} className="py-12 md:py-14 bg-gradient-to-br from-emerald-50/40 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Why Financial Institutions Choose Chati</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join leading banks and financial services using WhatsApp securely
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Financial Services Use Cases</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Discover how financial institutions use WhatsApp to serve customers better
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
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
              Common questions about WhatsApp Business API for financial services
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
                      key={index + 3}
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
      <section className="py-12 md:py-14 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Financial Services?
          </h2>
          <p className="text-base md:text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join leading financial institutions enhancing customer experience with secure WhatsApp messaging
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
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

export default FinanceClientPage
