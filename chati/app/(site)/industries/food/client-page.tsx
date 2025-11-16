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
  Utensils,
  ShoppingBag,
  Calendar,
  Star,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
  Bell,
  CheckCircle2,
  ArrowRight,
  Zap,
  ChefHat,
  Truck,
  Gift,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function FoodClientPage() {
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
      icon: ShoppingBag,
      title: "Order Management",
      description:
        "Accept and manage orders directly through WhatsApp with automated confirmations",
    },
    {
      icon: Calendar,
      title: "Table Reservations",
      description:
        "Let customers book tables instantly with automated availability checks",
    },
    {
      icon: Bell,
      title: "Order Updates",
      description:
        "Send real-time notifications for order preparation, delivery, and pickup status",
    },
    {
      icon: Utensils,
      title: "Digital Menu Sharing",
      description:
        "Share interactive menus with photos, prices, and daily specials instantly",
    },
    {
      icon: Star,
      title: "Loyalty Programs",
      description:
        "Reward repeat customers with automated points and exclusive offers",
    },
    {
      icon: MessageSquare,
      title: "Customer Feedback",
      description:
        "Collect reviews and ratings automatically after each order or visit",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "45% More Orders",
      description: "Higher order volume through convenient WhatsApp ordering",
    },
    {
      icon: Clock,
      title: "60% Faster Service",
      description: "Reduction in order processing time with automation",
    },
    {
      icon: Users,
      title: "3x Better Retention",
      description: "More repeat customers with personalized engagement",
    },
    {
      icon: Zap,
      title: "98% Open Rate",
      description: "Instant delivery ensures customers see your messages",
    },
  ];

  const useCases = [
    {
      title: "Online Food Ordering",
      description: "Accept orders with menu browsing and payment links",
      icon: ShoppingBag,
    },
    {
      title: "Reservation Management",
      description: "Automate table bookings with availability sync",
      icon: Calendar,
    },
    {
      title: "Delivery Tracking",
      description: "Send real-time updates from kitchen to doorstep",
      icon: Truck,
    },
    {
      title: "Menu Updates",
      description: "Broadcast daily specials and new items instantly",
      icon: Utensils,
    },
    {
      title: "Catering Inquiries",
      description: "Handle bulk orders and event catering requests",
      icon: ChefHat,
    },
    {
      title: "Customer Loyalty",
      description: "Reward programs and exclusive member offers",
      icon: Gift,
    },
  ];

  const faqsColumn1 = [
    {
      question: "Can customers place orders directly through WhatsApp?",
      answer:
        "Yes! Customers can browse your menu, select items, customize orders, and complete purchases all within WhatsApp. You can integrate payment links or accept cash on delivery.",
    },
    {
      question: "How does table reservation automation work?",
      answer:
        "Our system checks your availability in real-time and confirms bookings instantly. Customers receive automated reminders, and you can manage all reservations from one dashboard.",
    },
    {
      question: "Can I send menu updates to all customers?",
      answer:
        "Use broadcast messaging to share daily specials, new menu items, or promotional offers with your entire customer base or specific segments.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "Does it integrate with delivery platforms?",
      answer:
        "Yes, Chati integrates with major delivery platforms and POS systems, allowing you to manage all orders from one place and send unified tracking updates.",
    },
    {
      question: "How do I collect customer feedback?",
      answer:
        "Automated surveys are sent after each order or visit, making it easy for customers to rate their experience and provide feedback that helps you improve.",
    },
    {
      question: "Can I run promotional campaigns?",
      answer:
        "Yes! Create targeted campaigns for special occasions, happy hours, or seasonal promotions. Track engagement and conversions to optimize your marketing.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50/30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-orange-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-12 md:py-16 z-10"
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
                className="mb-3 bg-orange-100 text-orange-700 w-fit"
              >
                <Utensils className="w-3.5 h-3.5 mr-1.5" />
                Food & Beverage Solutions
              </Badge>

              <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">
                  Serve Customers Better with
                </span>
                <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  WhatsApp for Restaurants
                </span>
              </h1>

              <p className="mb-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                Increase orders by 45% with automated ordering, table
                reservations, and instant customer support via WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 group"
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

              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-muted-foreground">
                    45% More Orders
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
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
                src="/restaurant-staff-taking-orders-on-tablet-with-what.jpg"
                alt="Restaurant staff using WhatsApp for order management and customer service"
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

      {/* Block 1: Image Left, Content Right - Order Management */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-amber-50/40 via-white to-yellow-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-amber-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-yellow-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[55%_45%] items-center">
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block1InView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-400/15 to-orange-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/smartphone-showing-food-ordering-interface-on-what.jpg"
                  alt="Smartphone showing food ordering interface on WhatsApp with menu items and cart"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto max-w-2xl object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                block1InView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                className="mb-3 shadow-sm bg-amber-100 text-amber-700 border-amber-200"
                variant="outline"
              >
                Order Management
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Seamless WhatsApp Ordering
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Let customers browse your menu, customize orders, and complete
                purchases directly through WhatsApp. Automated confirmations and
                real-time order tracking keep everyone informed.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 group-hover:from-amber-200 group-hover:to-amber-100 transition-all shadow-sm">
                    <ShoppingBag className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">
                      Digital Menu Catalog
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Share interactive menus with photos, descriptions, prices,
                      and customization options.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-50 group-hover:from-yellow-200 group-hover:to-yellow-100 transition-all shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">
                      Instant Confirmations
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automated order confirmations with estimated preparation
                      and delivery times.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 group-hover:from-orange-200 group-hover:to-orange-100 transition-all shadow-sm">
                    <Truck className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">
                      Real-Time Tracking
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Keep customers updated from order preparation to delivery
                      with automated status messages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Reservations & Loyalty */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-red-50/40 via-white to-pink-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-red-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-tr from-pink-400/15 to-transparent rounded-full blur-3xl" />

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
                className="mb-3 shadow-sm bg-red-100 text-red-700 border-red-200"
                variant="outline"
              >
                Reservations & Loyalty
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Build Customer Loyalty
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Automate table reservations, reward repeat customers with
                loyalty programs, and collect valuable feedback to continuously
                improve your service.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-red-50 group-hover:from-red-200 group-hover:to-red-100 transition-all shadow-sm">
                    <Calendar className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">
                      Smart Reservations
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automated table booking with real-time availability checks
                      and confirmation reminders.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 group-hover:from-pink-200 group-hover:to-pink-100 transition-all shadow-sm">
                    <Gift className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">
                      Loyalty Rewards
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automatically track points, send exclusive offers, and
                      reward your best customers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 group-hover:from-orange-200 group-hover:to-orange-100 transition-all shadow-sm">
                    <Star className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">
                      Feedback Collection
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Gather reviews and ratings automatically after each visit
                      to improve your service.
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
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-pink-400/15 to-orange-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/restaurant-customer-receiving-loyalty-rewards-noti.jpg"
                  alt="Restaurant customer receiving loyalty rewards and reservation confirmation on WhatsApp"
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
            className={`text-center mb-10 transition-all duration-700 ${
              featuresInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Complete Restaurant Solution
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage orders, reservations, and customer
              relationships
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
                <div className="w-11 h-11 bg-gradient-to-br from-orange-100 to-amber-50 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-orange-600" />
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
        className="py-12 md:py-14 bg-gradient-to-br from-orange-50/40 to-amber-50/30"
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
              Why Restaurants Choose Chati
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join thousands of restaurants growing their business with WhatsApp
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
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
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
              Food & Beverage Use Cases
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Discover how restaurants use WhatsApp to streamline operations
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
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
              Common questions about WhatsApp Business API for food businesses
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
      <section className="py-12 md:py-14 bg-gradient-to-br from-orange-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-base md:text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            Join leading restaurants increasing orders and customer satisfaction
            with WhatsApp
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-100"
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
