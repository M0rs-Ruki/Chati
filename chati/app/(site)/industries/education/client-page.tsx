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
  GraduationCap,
  Bell,
  ArrowRight,
  CheckCircle2,
  Calendar,
  FileText,
  Users,
  Video,
  MessageSquare,
  Award,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Target,
  BookOpen,
  Laptop,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function EducationPage() {
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
      icon: Calendar,
      title: "Class Reminders",
      description:
        "Automated reminders for classes, exams, and important deadlines to improve attendance by 35%.",
    },
    {
      icon: FileText,
      title: "Assignment Notifications",
      description:
        "Send assignment updates, submission reminders, and grade notifications instantly to students.",
    },
    {
      icon: Video,
      title: "Virtual Class Links",
      description:
        "Share online class links, meeting IDs, and session materials directly via WhatsApp.",
    },
    {
      icon: MessageSquare,
      title: "Parent Communication",
      description:
        "Keep parents informed with progress reports, attendance updates, and school announcements.",
    },
    {
      icon: Users,
      title: "Student Support",
      description:
        "Provide instant academic support and answer student queries 24/7 with AI chatbots.",
    },
    {
      icon: Award,
      title: "Course Enrollment",
      description:
        "Streamline course registration, enrollment confirmations, and payment processing via WhatsApp.",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "35% Better Attendance",
      description:
        "Automated class reminders via WhatsApp significantly improve student attendance rates.",
    },
    {
      icon: Zap,
      title: "Instant Engagement",
      description:
        "98% open rate ensures students and parents receive important educational communications.",
    },
    {
      icon: Shield,
      title: "Secure Communication",
      description:
        "End-to-end encrypted messaging protects student data and maintains privacy compliance.",
    },
    {
      icon: Clock,
      title: "24/7 Support Access",
      description:
        "AI-powered chatbots provide round-the-clock support for common student inquiries.",
    },
  ];

  const useCases = [
    {
      title: "Class & Exam Reminders",
      description:
        "Send automated reminders for upcoming classes, exams, and submission deadlines.",
      icon: Bell,
    },
    {
      title: "Assignment Distribution",
      description:
        "Share assignments, study materials, and resources directly with students via WhatsApp.",
      icon: FileText,
    },
    {
      title: "Parent Updates",
      description:
        "Keep parents informed about student progress, attendance, and school events.",
      icon: Users,
    },
    {
      title: "Virtual Learning",
      description:
        "Distribute online class links, recorded lectures, and digital learning materials.",
      icon: Video,
    },
    {
      title: "Enrollment Management",
      description:
        "Handle course registrations, fee payments, and enrollment confirmations seamlessly.",
      icon: Target,
    },
    {
      title: "Student Counseling",
      description:
        "Provide academic counseling, career guidance, and mental health support via chat.",
      icon: MessageSquare,
    },
  ];

  const faqsColumn1 = [
    {
      question: "How does WhatsApp improve student attendance?",
      answer:
        "Automated class reminders sent via WhatsApp have a 98% open rate compared to 20% for emails. Students receive timely notifications about upcoming classes, exams, and deadlines, resulting in 35% better attendance rates.",
    },
    {
      question: "Can parents receive updates about their children?",
      answer:
        "Yes, parents can receive automated updates about attendance, grades, assignments, school events, and important announcements. You can segment communications to send relevant information to students, parents, or both.",
    },
    {
      question: "How do virtual class links work?",
      answer:
        "You can automatically send Zoom, Google Meet, or Microsoft Teams links before each online class. Students receive reminders with one-click access to join virtual sessions, along with any required materials or pre-class instructions.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "Is student data secure and compliant?",
      answer:
        "Yes, our platform uses end-to-end encryption and complies with FERPA, COPPA, and GDPR regulations. All student data is securely stored and transmitted, with role-based access controls and comprehensive audit logs.",
    },
    {
      question: "Can we automate assignment notifications?",
      answer:
        "Absolutely. Integrate with your Learning Management System (LMS) to automatically notify students when new assignments are posted, deadlines are approaching, or grades are available. Include direct links to assignment details.",
    },
    {
      question: "What about course enrollment and payments?",
      answer:
        "Students can browse courses, register, and complete payments directly through WhatsApp. Send enrollment confirmations, payment receipts, and course access details automatically, streamlining the entire enrollment process.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-10 md:py-12 z-10"
        >
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div
              className={`transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 bg-blue-100 text-blue-700 w-fit"
              >
                <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                Education & E-learning
              </Badge>

              <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">
                  Engage Students & Parents with
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  WhatsApp for Education
                </span>
              </h1>

              <p className="mb-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                Improve attendance by 35% with automated class reminders,
                assignment notifications, and instant student support via
                WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" asChild>
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

              <div className="flex items-center gap-4 pt-3 border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">
                    35% Better Attendance
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

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <Image
                src="/students-using-smartphones-for-online-learning-wit.jpg"
                alt="Students using WhatsApp for educational communication and online learning"
                width={600}
                height={500}
                className="w-full h-auto max-h-[380px] md:max-h-[400px] object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <BrandSlider />

      {/* Block 1: Image Left, Content Right - Virtual Learning */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/40 via-white to-pink-50/30 
  py-10 sm:py-12 md:py-16"
      >
        {/* Background Blobs – mobile scaled */}
        <div
          className="absolute top-10 right-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 
  bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-3xl"
        />

        <div
          className="absolute bottom-10 left-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 
  bg-gradient-to-tr from-pink-400/15 to-transparent rounded-full blur-3xl"
        />

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
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/15 to-blue-400/20 
          blur-2xl rounded-3xl scale-105"
                />

                <Image
                  src="/students-using-smartphones-for-online-learning-wit.jpg"
                  alt="Students using smartphones for online learning with WhatsApp notifications"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl 
            drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
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
                className="mb-3 shadow-sm bg-purple-100 text-purple-700 border-purple-200"
                variant="outline"
              >
                Virtual Learning
              </Badge>

              <h2
                className="mb-4 text-balance 
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
              >
                Seamless Online Education
              </h2>

              <p
                className="mb-6 text-muted-foreground 
        text-sm sm:text-base md:text-lg leading-relaxed"
              >
                Share virtual class links, distribute study materials, and keep
                students engaged with automated WhatsApp notifications — ideal
                for hybrid and remote learning.
              </p>

              <div className="space-y-4">
                {/* Feature 1 */}
                <div className="flex gap-3 items-start group">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center 
            rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 
            group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm"
                  >
                    <Video className="h-5 w-5 text-purple-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Instant Class Links
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Auto-send Zoom, Google Meet, or Teams links before each
                      class.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-3 items-start group">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center 
            rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 
            group-hover:from-pink-200 group-hover:to-pink-100 transition-all shadow-sm"
                  >
                    <BookOpen className="h-5 w-5 text-pink-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Study Material Distribution
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Share PDFs, videos, and resources directly on WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-3 items-start group">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center 
            rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 
            group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm"
                  >
                    <Laptop className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Recorded Lectures
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Share recorded sessions for flexible self-paced revision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Parent Communication */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-tr from-emerald-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[45%_55%] items-center">
            <div
              className={`transition-all duration-1000 ${
                block2InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 shadow-sm bg-green-100 text-green-700 border-green-200"
                variant="outline"
              >
                Parent Engagement
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Keep Parents Informed & Involved
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Send automated updates to parents about attendance, grades,
                assignments, and school events. Build stronger parent-teacher
                relationships with transparent, real-time communication.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">
                      Progress Reports
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automatically send grade updates, attendance reports, and
                      academic progress to parents.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 group-hover:from-emerald-200 group-hover:to-emerald-100 transition-all shadow-sm">
                    <Bell className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">
                      Event Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Notify parents about school events, parent-teacher
                      meetings, and important announcements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">
                      Two-Way Communication
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Parents can reply to messages, ask questions, and stay
                      connected with teachers easily.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                block2InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-400/15 to-blue-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/students-using-smartphones-for-online-learning-wit.jpg"
                  alt="Parent receiving student progress updates via WhatsApp"
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[380px] md:max-h-[400px] object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
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
              Complete Education Solution
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to engage students and streamline educational
              communication
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
                <div className="w-11 h-11 bg-gradient-to-br from-blue-100 to-purple-50 rounded-lg flex items-center justify-center mb-3">
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
        className="py-12 md:py-14 bg-gradient-to-br from-blue-50/40 to-purple-50/30"
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
              Why Educational Institutions Choose Chati
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join thousands of schools and universities improving student
              engagement with WhatsApp
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
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
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
              Education Use Cases
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Discover how educational institutions use WhatsApp to improve
              engagement
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
      <section ref={faqRef} className="py-12 md:py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              faqInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Common questions about WhatsApp Business API for education
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div
                className={`transition-all duration-700 ${
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
                  faqInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
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
      <section className="py-12 md:py-14 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Student Engagement?
          </h2>
          <p className="text-base md:text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join educational institutions improving attendance and communication
            with WhatsApp
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
