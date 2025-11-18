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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function FinanceClientPage() {
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
      icon: Bell,
      title: "Account Alerts",
      description:
        "Send real-time notifications for transactions, balances, and account activity",
    },
    {
      icon: Shield,
      title: "Secure Messaging",
      description:
        "End-to-end encrypted communication compliant with financial regulations",
    },
    {
      icon: CreditCard,
      title: "Payment Support",
      description:
        "Help customers with payments, transfers, and transaction inquiries",
    },
    {
      icon: FileText,
      title: "Document Sharing",
      description:
        "Securely share statements, reports, and financial documents",
    },
    {
      icon: Users,
      title: "Customer Onboarding",
      description: "Streamline KYC verification and account opening processes",
    },
    {
      icon: MessageSquare,
      title: "Advisory Services",
      description:
        "Provide personalized financial advice and investment recommendations",
    },
  ];

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
  ];

  const useCases = [
    {
      title: "Transaction Alerts",
      description: "Real-time notifications for all account activities",
      icon: Bell,
    },
    {
      title: "Loan Applications",
      description: "Guide customers through loan application process",
      icon: FileText,
    },
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
  ];

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
  ];

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
  ];

  const faqsColumnFAQSection1 = [
    {
      question: "How can financial institutions use WhatsApp Business API?",
      answer: "Financial institutions can send instant transaction alerts, payment confirmations, fund transfer notifications, OTPs for secure authentication, loan and EMI reminders, credit card payment alerts, policy renewal notices, investment updates, and fraud alerts—all through WhatsApp's secure, end-to-end encrypted platform that customers already use daily, achieving 98% open rates compared to 20% for email."
    },
    {
      question: "Is WhatsApp secure enough for banking and financial data?",
      answer: "Absolutely! WhatsApp uses military-grade end-to-end encryption for all messages, making it highly secure for financial communications. WhatsApp Business API is compliant with GDPR, PCI-DSS, and ISO 27001 standards. Leading banks, insurance companies, and fintech firms worldwide trust WhatsApp for sending OTPs, account statements, transaction alerts, and sensitive customer information securely."
    },
    {
      question: "What banking services can customers access via WhatsApp?",
      answer: "Customers can check account balances, view transaction history, receive instant OTPs for authentication, apply for loans or credit cards, get personalized investment advice, make bill payments through integrated payment links, track loan applications, report lost cards, access customer support 24/7, and complete KYC verification—all through conversational chat without visiting branches or downloading separate banking apps."
    },
    {
      question: "Can WhatsApp help reduce customer service costs?",
      answer: "Yes! Banks report up to 25% reduction in customer service costs by handling queries through WhatsApp. AI-powered chatbots answer 80% of routine questions automatically—balance inquiries, transaction status, branch locations, interest rates—freeing agents to handle complex issues. Automated notifications reduce call center volume, while self-service features empower customers to complete tasks independently, slashing operational expenses."
    }
  ];
  
  const faqsColumnFAQSection2 = [
    {
      question: "How does WhatsApp help with loan and insurance processes?",
      answer: "WhatsApp streamlines the entire loan journey—from application to disbursement. Send pre-approved offers, collect documents via chat, provide instant eligibility checks, automate EMI reminders, and share repayment links. For insurance, enable policy comparisons, instant quotes, premium payment links, claim tracking, document submission, renewal reminders, and 24/7 policy assistance—reducing processing time by 60% and improving conversion rates by 35%."
    },
    {
      question: "Can we send promotional offers through WhatsApp?",
      answer: "Yes, but with customer consent! WhatsApp allows promotional messages for opted-in customers. Send personalized loan offers, credit card promotions, investment opportunities, insurance plans, special interest rates, cashback deals, and seasonal campaigns. Use rich media like product brochures, comparison charts, and video explainers. Promotional messages on WhatsApp achieve 45-60% engagement rates—10x higher than traditional email marketing."
    },
    {
      question: "How does WhatsApp integrate with banking systems?",
      answer: "WhatsApp Business API integrates seamlessly with core banking systems, CRM platforms, payment gateways, and fraud detection tools through RESTful APIs. Sync customer data in real-time, trigger automated notifications based on transactions, pull account information for chatbot responses, process payments through UPI/cards, and maintain unified customer profiles—creating a connected ecosystem that delivers contextual, personalized banking experiences at scale."
    },
    {
      question: "What compliance requirements apply to financial WhatsApp messaging?",
      answer: "Financial institutions must obtain explicit opt-in consent before messaging, clearly identify themselves as the sender, provide opt-out mechanisms, protect customer data per GDPR/local laws, use verified business profiles with green checkmarks, maintain message audit trails, implement contact masking for privacy, and follow WhatsApp's Commerce and Business Policy. Working with certified Business Solution Providers ensures compliance with all regulatory requirements and industry standards."
    }
  ];
  

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50/30 py-10 sm:py-12 md:py-16">
        {/* Background orb (responsive sizing) */}
        <div
          className="absolute top-0 right-0 w-40 h-40 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px] 
      bg-gradient-to-br from-emerald-400/15 to-transparent rounded-full blur-3xl"
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
                className="mb-3 bg-emerald-100 text-emerald-700 w-fit shadow-sm"
              >
                <DollarSign className="w-3.5 h-3.5 mr-1.5" />
                Financial Services Solutions
              </Badge>

              <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">
                  Secure Banking with
                </span>
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  WhatsApp for Finance
                </span>
              </h1>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Increase engagement by 65% with secure transaction alerts,
                instant support, and automated financial workflows on WhatsApp.
              </p>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold w-full sm:w-auto"
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

              {/* METRICS */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-muted-foreground">
                    65% Higher Engagement
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-muted-foreground">
                    100% Secure
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
                  src="/banking-app-showing-transaction-alerts-on-smartpho.jpg"
                  alt="Banking app showing secure transaction alerts on WhatsApp"
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

      {/* Block 1: Image Left, Content Right - Transaction Alerts */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-teal-50/40 via-white to-cyan-50/30 py-10 sm:py-12 md:py-14"
      >
        {/* Background blobs (responsive sizes) */}
        <div
          className="absolute top-10 right-10 w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 
      bg-gradient-to-br from-teal-400/15 to-transparent rounded-full blur-3xl"
        />
        <div
          className="absolute bottom-10 left-10 w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 
      bg-gradient-to-tr from-cyan-400/15 to-transparent rounded-full blur-3xl"
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
              from-teal-400/20 via-cyan-400/15 to-emerald-400/20 
              blur-2xl rounded-3xl scale-105"
                />

                <Image
                  src="/smartphone-showing-secure-transaction-notification.jpg"
                  alt="Secure transaction notifications on WhatsApp"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl 
              hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                block1InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 bg-teal-100 text-teal-700 border-teal-200 shadow-sm"
                variant="outline"
              >
                Transaction Alerts
              </Badge>

              <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
                Real-Time Account Notifications
              </h2>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Send instant, secure alerts for transactions, balance updates,
                payments, and account activities — with 98% open rates.
              </p>

              {/* Features */}
              <div className="space-y-5">
                {[
                  {
                    Icon: Bell,
                    title: "Instant Alerts",
                    desc: "Real-time notifications for deposits, withdrawals, transfers, and more.",
                    bg: "from-teal-100 to-teal-50",
                    color: "text-teal-600",
                  },
                  {
                    Icon: Shield,
                    title: "Fraud Detection",
                    desc: "Instant suspicious activity alerts with verification options.",
                    bg: "from-cyan-100 to-cyan-50",
                    color: "text-cyan-600",
                  },
                  {
                    Icon: CreditCard,
                    title: "Payment Confirmations",
                    desc: "Automated confirmations for payments, bills, and transfers.",
                    bg: "from-emerald-100 to-emerald-50",
                    color: "text-emerald-600",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div
                      className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${feature.bg} 
                  group-hover:opacity-90 flex items-center justify-center shadow-sm transition-all`}
                    >
                      <feature.Icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Customer Onboarding */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/40 via-white to-lime-50/30 py-10 sm:py-12 md:py-14"
      >
        {/* Background blobs */}
        <div
          className="absolute top-10 left-10 w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 
      bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl"
        />
        <div
          className="absolute bottom-10 right-10 w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 
      bg-gradient-to-tr from-lime-400/15 to-transparent rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[45%_55%] items-center">
            {/* Content */}
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
                Customer Onboarding
              </Badge>

              <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
                Streamlined KYC & Account Opening
              </h2>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Reduce onboarding time by 70% with automated KYC verification,
                document collection, and instant account creation workflows.
              </p>

              {/* Features */}
              <div className="space-y-5">
                {[
                  {
                    Icon: FileText,
                    title: "Digital KYC",
                    desc: "Guide customers through secure document submission & identity checks.",
                    bg: "from-green-100 to-green-50",
                    color: "text-green-600",
                  },
                  {
                    Icon: Smartphone,
                    title: "Instant Account Setup",
                    desc: "Open accounts in minutes with automated workflows and status updates.",
                    bg: "from-lime-100 to-lime-50",
                    color: "text-lime-600",
                  },
                  {
                    Icon: Users,
                    title: "Personalized Guidance",
                    desc: "AI-powered assistance helps customers complete onboarding smoothly.",
                    bg: "from-emerald-100 to-emerald-50",
                    color: "text-emerald-600",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div
                      className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${feature.bg} 
                  flex items-center justify-center shadow-sm group-hover:opacity-90 transition-all`}
                    >
                      <feature.Icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.desc}
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
              from-green-400/20 via-lime-400/15 to-emerald-400/20 
              blur-2xl rounded-3xl scale-105"
                />

                <Image
                  src="/customer-completing-kyc-verification-on-smartphone.jpg"
                  alt="Customer completing KYC verification"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl 
              hover:scale-[1.02] transition-transform duration-500"
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
              Complete Financial Messaging Platform
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need for secure, compliant customer communication
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
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-emerald-600" />
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
        className="py-12 md:py-14 bg-gradient-to-br from-emerald-50/40 to-teal-50/30"
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
              Why Financial Institutions Choose Chati
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join leading banks and financial services using WhatsApp securely
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
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
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
              Financial Services Use Cases
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Discover how financial institutions use WhatsApp to serve
              customers better
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
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
        description="Everything you need to know about WhatsApp for Finance"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

      {/* CTA Section - Compact */}
      <section className="py-12 md:py-14 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Financial Services?
          </h2>
          <p className="text-base md:text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join leading financial institutions enhancing customer experience
            with secure WhatsApp messaging
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-emerald-600 hover:bg-gray-100"
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

export default FinanceClientPage;
