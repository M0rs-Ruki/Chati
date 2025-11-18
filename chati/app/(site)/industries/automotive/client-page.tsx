"use client";

import { Button } from "@/components/ui/button";
import FAQSection from "@/components/section/FAQSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrandSlider } from "@/components/brand-slider";
import CTASection from "@/components/section/CTASection";
import {
  Send,
  ArrowRight,
  CheckCircle2,
  Car,
  Wrench,
  Calendar,
  MessageSquare,
  Smartphone,
  Zap,
  BarChart3,
  Globe,
  Star,
  Users,
  Clock,
  ArrowRightLeft,
  ShieldCheck,
  TrendingUp,
  Bell,
  Video,
  MapPin,
  CreditCard,
  FileText,
  Bot,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function AutomotivePage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: useCasesRef, isVisible: useCasesInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: fallbackRef, isVisible: fallbackInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: featuresRef, isVisible: featuresInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: benefitsRef, isVisible: benefitsInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({
    threshold: 0.1,
  });

  const automotiveUseCases = [
    {
      icon: Wrench,
      title: "Vehicle Troubleshooting & Diagnostics",
      description:
        "AI-powered chatbot guides customers through common vehicle issues with step-by-step diagnostic questions. From checking engine lights to tire pressure warnings, provide instant troubleshooting support 24/7. Automatically schedule service appointments when issues require professional attention, reducing call center volume by 60%.",
      stats: "60% fewer support calls",
    },
    {
      icon: Calendar,
      title: "Service Appointment Scheduling",
      description:
        "Automated WhatsApp booking system lets customers schedule oil changes, tire rotations, inspections, and repairs with one-tap interactive buttons. Send appointment reminders with 'Confirm', 'Reschedule', or 'Cancel' options. Include service center location maps, technician details, and estimated service duration with rich media support.",
      stats: "45% reduction in no-shows",
    },
    {
      icon: Car,
      title: "Test Drive Booking & Sales Follow-up",
      description:
        "Enable instant test drive scheduling through WhatsApp chatbot with available time slots, vehicle selection carousels, and location preferences. Automate sales follow-ups with personalized vehicle recommendations, financing options, and special offers based on customer browsing behavior and preferences.",
      stats: "3x more test drives booked",
    },
    {
      icon: Bell,
      title: "Service Reminders & Maintenance Alerts",
      description:
        "Proactive RCS messages remind customers about scheduled maintenance based on mileage or time intervals. Send rich media reminders with service package details, pricing, special offers, and one-tap booking buttons. Include video tutorials on basic maintenance tasks customers can do themselves, building trust and engagement.",
      stats: "40% higher service retention",
    },
    {
      icon: Video,
      title: "Virtual Vehicle Walkthroughs",
      description:
        "Share high-quality video tours of new and used vehicles via RCS messaging with interactive carousels showcasing multiple angles, interior features, and key specifications. Enable customers to explore inventory from home with 360° views, feature highlights, and instant inquiry options through chatbot.",
      stats: "50% faster sales cycle",
    },
    {
      icon: CreditCard,
      title: "Financing & Insurance Quotes",
      description:
        "Interactive chatbot collects customer information and provides instant financing pre-approval estimates, EMI calculations, and insurance quotes. Share detailed financing plans, terms, and conditions with rich media PDFs. Enable seamless document upload and verification through WhatsApp for faster loan processing.",
      stats: "65% faster approvals",
    },
    {
      icon: MapPin,
      title: "Roadside Assistance & Emergency Support",
      description:
        "24/7 automated roadside assistance through WhatsApp chatbot captures location, vehicle details, and issue description. Dispatch nearest service provider with real-time tracking updates. Send ETA notifications, technician details with photo, and service completion confirmations with payment links.",
      stats: "30-min average response time",
    },
    {
      icon: Star,
      title: "Customer Feedback & Reviews",
      description:
        "Automated post-service WhatsApp surveys with rating stars, quick reply options, and open feedback fields. Collect valuable insights on service quality, technician performance, and facility cleanliness. Trigger immediate management alerts for low ratings, enabling rapid issue resolution and customer retention.",
      stats: "4.5★ average rating boost",
    },
  ];

  const keyFeatures = [
    {
      icon: Bot,
      title: "AI-Powered Vehicle Support",
      description:
        "Intelligent chatbot trained on automotive knowledge base provides instant answers to common vehicle questions, troubleshooting guidance, and maintenance tips. Natural language processing understands customer queries about specific vehicle models, features, and issues, delivering accurate responses 24/7 without human intervention.",
    },
    {
      icon: Globe,
      title: "RCS Rich Media Messaging",
      description:
        "Send high-quality vehicle photos, walkthrough videos, virtual tours, and interactive 360° views directly in messaging apps. Verified business badges build trust with customers. Scrollable carousels showcase inventory with pricing, specifications, and instant inquiry buttons—all without leaving the conversation.",
    },
    {
      icon: ArrowRightLeft,
      title: "Multi-Channel Fallback",
      description:
        "Start with feature-rich RCS messages for newer devices. Automatically fall back to WhatsApp for customers without RCS support. Final SMS backup ensures every message reaches every customer regardless of device capabilities. Achieve 99% delivery rates with intelligent routing across all channels.",
    },
    {
      icon: Calendar,
      title: "Automated Appointment System",
      description:
        "Integrated scheduling calendar syncs with service center availability in real-time. Customers book appointments through interactive buttons with available time slots. Automated reminders reduce no-shows. Two-way sync with CRM and service management systems ensures seamless operations without manual data entry.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics Dashboard",
      description:
        "Track chatbot conversations, appointment bookings, service reminders, and campaign engagement metrics. Monitor response times, resolution rates, customer satisfaction scores, and conversion funnels. Identify trends in common vehicle issues, popular services, and peak booking times to optimize operations.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Customer Data Management",
      description:
        "End-to-end encryption protects sensitive customer information including VIN numbers, payment details, and personal data. GDPR and automotive industry compliance built-in. Secure document sharing for insurance papers, registration, and financing documents through encrypted WhatsApp channels.",
    },
  ];

  const fallbackFeatures = [
    {
      icon: Smartphone,
      title: "RCS → WhatsApp → SMS Cascade",
      description:
        "Try RCS first for rich interactive experiences. If unavailable, instantly switch to WhatsApp maintaining full conversation context. Final SMS fallback guarantees delivery to every device. Customers experience seamless messaging regardless of technical limitations.",
    },
    {
      icon: CheckCircle2,
      title: "99% Delivery Guarantee",
      description:
        "Multi-channel fallback ensures service reminders, appointment confirmations, and promotional campaigns reach every customer. Never lose engagement due to technical incompatibility. Real-time monitoring detects delivery failures and triggers instant channel switching.",
    },
    {
      icon: Zap,
      title: "Instant Channel Detection",
      description:
        "Automatic device capability detection happens in milliseconds. System intelligently routes messages to the best available channel for each recipient without manual configuration. Maintains message formatting and interactivity across all supported channels.",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "3x More Test Drives & Bookings",
      description:
        "Interactive WhatsApp chatbot makes scheduling instant and effortless. Customers book test drives, service appointments, and consultations with one-tap buttons directly from conversations. Reduced friction increases conversion rates dramatically compared to traditional phone or email booking.",
      metric: "3x Conversion Rate",
    },
    {
      icon: Clock,
      title: "60% Reduction in Support Calls",
      description:
        "AI chatbot handles common troubleshooting, FAQs, service inquiries, and basic vehicle guidance automatically. Customers get instant answers 24/7 without waiting on hold. Human agents focus on complex issues and high-value sales interactions, dramatically improving efficiency.",
      metric: "60% Fewer Calls",
    },
    {
      icon: Users,
      title: "45% Lower No-Show Rates",
      description:
        "Automated RCS/WhatsApp reminders with interactive confirmation buttons keep appointments top-of-mind. Customers confirm, reschedule, or cancel with one tap. Real-time updates to service center calendars maximize utilization and revenue while reducing wasted time from no-shows.",
      metric: "45% Better Attendance",
    },
    {
      icon: Star,
      title: "40% Higher Customer Retention",
      description:
        "Proactive service reminders, personalized maintenance tips, and timely follow-ups keep customers engaged with your brand. Consistent touchpoints via their preferred messaging channel build stronger relationships. Higher satisfaction scores translate to increased lifetime customer value.",
      metric: "40% More Retention",
    },
  ];

  const faqsColumn1 = [
    {
      question: "How does the vehicle troubleshooting chatbot work?",
      answer:
        "Our AI chatbot is trained on common automotive issues and diagnostic workflows. Customers describe their vehicle problem (e.g., 'check engine light is on'), and the chatbot asks targeted questions to narrow down the issue. It provides troubleshooting steps, explains possible causes, and automatically schedules a service appointment if professional repair is needed. The system learns from thousands of resolved cases to improve accuracy over time.",
    },
    {
      question: "Can customers book service appointments through WhatsApp?",
      answer:
        "Yes! The WhatsApp chatbot integrates with your service center's scheduling system in real-time. Customers see available time slots as interactive buttons, select their preferred service type (oil change, inspection, tire rotation, etc.), choose a date/time, and receive instant confirmation. Automated reminders are sent 24 hours before with easy 'Confirm', 'Reschedule', or 'Cancel' options.",
    },
    {
      question:
        "What happens if RCS messaging isn't supported on a customer's device?",
      answer:
        "Our platform automatically detects device capabilities and uses intelligent fallback routing. If RCS isn't available, the message is instantly sent via WhatsApp maintaining the conversation flow. For customers without WhatsApp, the system falls back to SMS. This multi-channel approach ensures 99% delivery while maintaining engagement without any manual intervention required.",
    },
  ];

  const faqsColumn2 = [
    {
      question:
        "Can we send personalized vehicle maintenance reminders based on mileage or time?",
      answer:
        "The system tracks each customer's vehicle service history, mileage data, and recommended maintenance schedules. It automatically sends personalized reminders via RCS or WhatsApp when services are due (e.g., '10,000-mile service due soon'). Include rich media with service package details, pricing, special offers, and one-tap booking buttons to maximize appointment conversion.",
    },
    {
      question: "How do we showcase vehicle inventory through RCS messaging?",
      answer:
        "RCS enables rich media carousels with high-quality images, videos, and 360° virtual tours of vehicles in your inventory. Each carousel card includes vehicle details (make, model, year, price), key features, and action buttons like 'Schedule Test Drive', 'View Financing', or 'Get More Info'. Customers can browse multiple vehicles without leaving the messaging app, creating an app-like shopping experience.",
    },
    {
      question: "Is customer data secure when shared through WhatsApp and RCS?",
      answer:
        "Yes, all messages are end-to-end encrypted when using WhatsApp, and RCS provides encryption between sender and Google's servers. Our platform is fully compliant with GDPR and automotive industry data protection standards. Sensitive information like VIN numbers, payment details, and personal documents are transmitted through secure, encrypted channels. We never store payment information and integrate directly with PCI-compliant payment gateways.",
    },
  ];

  const faqsColumnFAQSection1 = [
    {
      question: "How can WhatsApp chatbots help my automotive business?",
      answer:
        "WhatsApp chatbots automate lead capture, qualify prospects 24/7, schedule test drives instantly, book service appointments, answer vehicle queries about pricing and features, send service reminders, provide roadside assistance, handle trade-in inquiries, and deliver real-time updates on vehicle availability—all while reducing response times by 60-80% and increasing lead conversion rates by up to 300%.",
    },
    {
      question: "What can customers do with an automotive chatbot?",
      answer:
        "Customers can browse your vehicle inventory with images and specs, check real-time pricing and offers, schedule test drives at their convenience, book service appointments and track repairs, get instant answers about financing options, receive personalized vehicle recommendations based on preferences, inquire about trade-in values, access 24/7 roadside assistance, and complete purchases—all through conversational chat without leaving WhatsApp.",
    },
    {
      question: "How does RCS messaging enhance the automotive experience?",
      answer:
        "RCS (Rich Communication Services) enables immersive virtual showrooms with high-resolution vehicle galleries and 360° views, interactive brochures with feature comparisons, one-tap test drive booking with calendar integration, real-time service appointment scheduling, instant financing applications with embedded forms, maintenance alerts with rich media, and verified business branding—creating app-like experiences within native Android messaging that boost engagement by 45%.",
    },
    {
      question:
        "Can chatbots integrate with my dealership management system (DMS)?",
      answer:
        "Absolutely! Our chatbots integrate seamlessly with popular DMS platforms like CDK, Reynolds & Reynolds, Dealertrack, and VinSolutions, plus CRM systems like Salesforce Automotive Cloud. This enables real-time inventory sync, automatic lead creation, service history access, appointment scheduling integration, finance application routing, and unified customer profiles—ensuring all customer interactions are tracked and actionable across your entire tech stack.",
    },
  ];

  const faqsColumnFAQSection2 = [
    {
      question: "How do chatbots qualify leads automatically?",
      answer:
        "AI-powered chatbots ask qualifying questions about budget, preferred vehicle type, timeline, trade-in needs, and financing requirements. They score leads based on intent signals, prioritize hot prospects ready to buy, automatically route qualified leads to sales reps via SMS or CRM, and nurture lower-intent leads with drip campaigns—ensuring your sales team focuses only on high-quality opportunities while no lead goes unattended.",
    },
    {
      question: "What types of service reminders can be automated?",
      answer:
        "Automate oil change reminders based on mileage or time intervals, scheduled maintenance notifications for inspections and tire rotations, recall alerts with booking links, warranty expiration warnings, seasonal service promotions (winter tire changes, AC checks), post-service follow-ups requesting feedback, and insurance renewal reminders—all personalized with vehicle details, service history, and preferred service center, driving 65% higher appointment bookings.",
    },
    {
      question: "Can chatbots handle complex automotive queries?",
      answer:
        "Yes! Advanced NLP enables chatbots to understand questions about vehicle specifications, compare models side-by-side, explain financing and lease options, provide insurance estimates, answer technical questions using your knowledge base, and even analyze uploaded photos for trade-in appraisals. For complex scenarios beyond the bot's capability, seamless human handoff transfers conversations to live sales or service advisors with full context.",
    },
    {
      question: "How quickly can we implement an automotive chatbot?",
      answer:
        "Basic chatbot deployment takes 3-5 business days using pre-built automotive templates for common use cases. Full customization with DMS integration, inventory sync, custom workflows, and advanced AI training typically requires 1-2 weeks. You'll receive industry-specific conversation flows, vehicle database integration, test drive scheduling logic, and service booking automation out-of-the-box—allowing you to start capturing leads and automating customer service immediately.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50/30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-red-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-12 md:py-16 lg:py-20 z-10"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left Content */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200 w-fit shadow-sm"
              >
                <Car className="w-3.5 h-3.5 mr-1.5" />
                Automotive Industry
              </Badge>

              <h1 className="mb-4 text-balance leading-tight tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                  WhatsApp & RCS Chatbots
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  for Automotive Business
                </span>
              </h1>

              <p className="mb-6 text-lg text-muted-foreground md:text-xl max-w-xl leading-relaxed">
                Transform automotive customer service with intelligent AI
                chatbots for vehicle troubleshooting, automated service
                appointment scheduling, test drive bookings, and personalized
                marketing campaigns across WhatsApp, RCS, and SMS.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                >
                  Start Automating Service Bookings
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                  asChild
                >
                  <Link href="#use-cases">Explore Automotive Solutions</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-orange-600">3x</div>
                  <div className="text-sm text-muted-foreground">
                    More Bookings
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600">60%</div>
                  <div className="text-sm text-muted-foreground">
                    Fewer Support Calls
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600">99%</div>
                  <div className="text-sm text-muted-foreground">
                    Message Delivery
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-red-400/15 to-pink-400/20 blur-3xl rounded-full transform scale-110" />
                <Image
                  src="/automotive-whatsapp-chatbot-showing-vehicle-serv.jpg"
                  alt="Automotive WhatsApp chatbot interface showing vehicle service appointment scheduling, diagnostic troubleshooting, test drive booking, and automated maintenance reminders with RCS rich media"
                  width={500}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BrandSlider */}
      <BrandSlider />

      {/* Automotive Use Cases Section */}
      <section
        id="use-cases"
        ref={useCasesRef}
        className="relative overflow-hidden bg-gradient-to-br from-orange-50/30 via-white to-red-50/20 py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-1000 ${
              useCasesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-orange-100 text-orange-700 border-orange-200"
              variant="outline"
            >
              Automotive Solutions
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Transform Every Touchpoint with{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Intelligent Automation
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From troubleshooting to sales, revolutionize automotive customer
              experience with AI-powered WhatsApp & RCS chatbots
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {automotiveUseCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-xl transition-all duration-500 border-2 hover:border-orange-300 group ${
                  useCasesInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {useCase.description}
                </p>
                <div className="pt-3 border-t border-gray-200">
                  <Badge
                    className="bg-orange-100 text-orange-700 border-orange-200"
                    variant="outline"
                  >
                    {useCase.stats}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Channel Fallback Section */}
      <section
        ref={fallbackRef}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/30 via-white to-emerald-50/20 py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-1000 ${
              fallbackInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-green-100 text-green-700 border-green-200"
              variant="outline"
            >
              Smart Delivery
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Never Miss a Customer with{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                RCS → WhatsApp Fallback
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Intelligent multi-channel routing ensures service reminders,
              appointment confirmations, and campaigns reach every customer
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {fallbackFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className={`p-5 hover:shadow-lg transition-all duration-500 border-2 hover:border-green-300 ${
                    fallbackInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
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

            {/* Visual Fallback Flow */}
            <div
              className={`p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 transition-all duration-1000 delay-500 ${
                fallbackInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground">
                      Try RCS First
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Rich media & buttons
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground">
                      Fallback to WhatsApp
                    </div>
                    <div className="text-sm text-muted-foreground">
                      If RCS unavailable
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground">
                      Final SMS Backup
                    </div>
                    <div className="text-sm text-muted-foreground">
                      100% delivery guaranteed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section
        ref={featuresRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50/20 via-white to-cyan-50/30 py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-1000 ${
              featuresInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-blue-100 text-blue-700 border-blue-200"
              variant="outline"
            >
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Complete Automotive Messaging Suite
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to automate customer service, boost sales, and
              increase retention
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-xl transition-all duration-500 border-2 hover:border-blue-300 ${
                  featuresInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
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

      {/* Benefits Section */}
      <section
        ref={benefitsRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/20 to-red-50/30 py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-1000 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 shadow-sm bg-orange-100 text-orange-700 border-orange-200"
              variant="outline"
            >
              Business Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Measurable Results for Auto Dealers
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real metrics from automotive businesses using WhatsApp & RCS
              chatbot automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-xl transition-all duration-500 border-2 hover:border-orange-300 text-center ${
                  benefitsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 shadow-md mx-auto">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <Badge
                  className="mb-3 bg-orange-100 text-orange-700 border-orange-200"
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

      {/* FAQ Section */}
      <FAQSection
        badgeText="Common Questions"
        title="Frequently Asked Questions"
        description="Everything you need to know about WhatsApp & RCS Chatbots for Automotive Business"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

      {/* Final CTA */}
      <CTASection
        gradientFrom="from-orange-600"
        gradientVia="via-orange-600"
        gradientTo="to-red-600"
        title="Ready to Transform Automotive Customer Service?"
        description="Start automating vehicle troubleshooting, service appointments, test drive bookings, and customer engagement with WhatsApp & RCS chatbots. Boost bookings by 3x, reduce support calls by 60%, and achieve 99% message delivery with intelligent multi-channel fallback."
        primaryButtonText="Launch Automotive Chatbot"
        primaryButtonLink={
          process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"
        }
        primaryButtonBgColor="bg-white"
        primaryButtonTextColor="text-orange-600"
        primaryButtonHoverBg="hover:bg-gray-100"
        primaryButtonIcon={
          <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        }
        secondaryButtonText="Explore AI Features"
        secondaryButtonLink="/features/chatbots"
        showSecondaryButton={true}
        footerText=""
      />
    </div>
  );
}
