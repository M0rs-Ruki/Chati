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
import CTASection from "@/components/section/CTASection";
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

  const faqsColumnFAQSection1 = [
    {
      question: "How can restaurants use WhatsApp for taking orders?",
      answer:
        "Restaurants can display digital menus with photos and prices through WhatsApp catalogs, allowing customers to browse items, customize orders, add to cart, and place orders directly in chat. Integrate payment links for instant checkout, send automated order confirmations, provide real-time delivery tracking, and enable one-tap reordering for regulars—all without third-party delivery apps that charge 20-30% commission.",
    },
    {
      question: "Can I send my menu through WhatsApp?",
      answer:
        "Absolutely! Use WhatsApp Business catalog to showcase up to 500 items with images, descriptions, prices, and variants (sizes, toppings, spice levels). Send daily specials, seasonal menus, and combo offers as rich media messages. Customers can browse your full menu directly in chat, ask questions about ingredients or allergens, and place orders instantly—creating a seamless mobile-first ordering experience.",
    },
    {
      question: "How does WhatsApp help with delivery tracking?",
      answer:
        "Send automated notifications at every stage—order confirmed, food preparation started, order out for delivery with live tracking link, estimated arrival time, and delivery completion confirmation. Include delivery person's contact for direct coordination. Real-time updates reduce 'Where's my order?' calls by 70%, improve customer satisfaction, and build trust through transparency in the entire delivery journey.",
    },
    {
      question: "Can I take table reservations via WhatsApp?",
      answer:
        "Yes! Enable customers to check table availability, book reservations, specify party size and timing, request special seating, and receive instant confirmations—all through chat. Send automated reminders 2 hours before reservation, allow easy modifications or cancellations, manage waitlists, and notify guests when tables are ready. WhatsApp reservations reduce no-shows by 40% and eliminate phone tag.",
    },
  ];

  const faqsColumnFAQSection2 = [
    {
      question: "How can I promote offers and increase repeat orders?",
      answer:
        "Send personalized promotions based on order history—'Try our new pasta!' for Italian food lovers, birthday discounts, exclusive weekend deals, happy hour specials, and loyalty rewards. Broadcast flash sales, combo offers, and seasonal menus to opted-in customers. WhatsApp promotions achieve 60-80% open rates and 25-40% conversion rates—10x better than email—driving repeat orders and increasing average order value by 35%.",
    },
    {
      question: "Can chatbots handle customer queries automatically?",
      answer:
        "AI chatbots answer FAQs 24/7—menu inquiries, dietary options (vegan, gluten-free), operating hours, delivery areas, minimum order values, ingredient questions, and allergen information. Provide instant recommendations based on preferences, upsell complementary items, collect delivery addresses, and seamlessly transfer complex requests to staff. Chatbots handle 75% of routine queries, freeing your team to focus on food preparation and service.",
    },
    {
      question: "How do I integrate WhatsApp with my POS system?",
      answer:
        "WhatsApp Business API integrates with popular restaurant POS systems like Clover, Square, Toast, and Lightspeed through APIs. Orders placed via WhatsApp automatically sync to your kitchen display system, update inventory in real-time, trigger billing, and maintain unified customer profiles with order history. This integration eliminates manual entry, reduces errors by 95%, and creates a seamless operation from chat to kitchen.",
    },
    {
      question: "Is WhatsApp better than food delivery apps for my restaurant?",
      answer:
        "WhatsApp complements delivery apps while building direct customer relationships. Unlike apps charging 20-30% commission per order, WhatsApp messaging costs pennies. You own customer data, control pricing, run personalized marketing, and keep 100% of profits. For regulars and nearby customers, direct WhatsApp ordering increases margins by 25-35%, builds brand loyalty, and reduces dependency on expensive third-party platforms.",
    },
  ];

  function Feature({
    Icon,
    iconBg,
    iconColor,
    title,
    desc,
  }: {
    Icon: React.ComponentType<{ className?: string }>;
    iconBg: string;
    iconColor: string;
    title: string;
    desc: string;
  }) {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50/30 py-10 sm:py-12 md:py-16">
        {/* Background glow (scaled for mobile) */}
        <div
          className="absolute top-0 right-0 w-40 h-40 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px] 
  bg-gradient-to-br from-orange-400/15 to-transparent rounded-full blur-3xl"
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
                className="mb-3 bg-orange-100 text-orange-700 w-fit shadow-sm"
              >
                <Utensils className="w-3.5 h-3.5 mr-1.5" />
                Food & Beverage Solutions
              </Badge>

              <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">
                  Serve Customers Better with
                </span>
                <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  WhatsApp for Restaurants
                </span>
              </h1>

              <p className="mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Increase orders by 45% with automated ordering, table
                reservations, and instant customer support via WhatsApp.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold w-full sm:w-auto"
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

              {/* Metrics */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t">
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
                  src="/restaurant-staff-taking-orders-on-tablet-with-what.jpg"
                  alt="Restaurant staff using WhatsApp for order management"
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

      {/* Block 1: Image Left, Content Right - Order Management */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-amber-50/40 via-white to-yellow-50/30 
  py-10 sm:py-12 md:py-16"
      >
        {/* Background Blobs (responsive) */}
        <div
          className="absolute top-10 right-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 
  bg-gradient-to-br from-amber-400/15 to-transparent rounded-full blur-3xl"
        />

        <div
          className="absolute bottom-10 left-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 
  bg-gradient-to-tr from-yellow-400/15 to-transparent rounded-full blur-3xl"
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
                  className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-400/15 to-orange-400/20 
          blur-2xl rounded-3xl scale-105"
                />

                <Image
                  src="/smartphone-showing-food-ordering-interface-on-what.jpg"
                  alt="WhatsApp food ordering menu"
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
                className="mb-3 shadow-sm bg-amber-100 text-amber-700 border-amber-200"
                variant="outline"
              >
                Order Management
              </Badge>

              <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Seamless WhatsApp Ordering
              </h2>

              <p className="mb-6 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Let customers browse menus, customize orders, and pay — all
                inside WhatsApp with automated confirmations & real-time
                updates.
              </p>

              <div className="space-y-4">
                {/* Feature 1 */}
                <Feature
                  Icon={ShoppingBag}
                  iconBg="from-amber-100 to-amber-50"
                  iconColor="text-amber-600"
                  title="Digital Menu Catalog"
                  desc="Share interactive menus with photos, customization, and pricing."
                />

                {/* Feature 2 */}
                <Feature
                  Icon={CheckCircle2}
                  iconBg="from-yellow-100 to-yellow-50"
                  iconColor="text-yellow-600"
                  title="Instant Confirmations"
                  desc="Send order summaries with estimated preparation & delivery time."
                />

                {/* Feature 3 */}
                <Feature
                  Icon={Truck}
                  iconBg="from-orange-100 to-orange-50"
                  iconColor="text-orange-600"
                  title="Real-Time Tracking"
                  desc="Update customers automatically from preparation to delivery."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Reservations & Loyalty */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-red-50/40 via-white to-pink-50/30 
  py-10 sm:py-12 md:py-16"
      >
        {/* Background blobs */}
        <div
          className="absolute top-10 left-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 
  bg-gradient-to-br from-red-400/15 to-transparent rounded-full blur-3xl"
        />

        <div
          className="absolute bottom-10 right-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 
  bg-gradient-to-tr from-pink-400/15 to-transparent rounded-full blur-3xl"
        />

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
                className="mb-3 shadow-sm bg-red-100 text-red-700 border-red-200"
                variant="outline"
              >
                Reservations & Loyalty
              </Badge>

              <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Build Customer Loyalty
              </h2>

              <p className="mb-6 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Automate reservations, reward repeat buyers, and collect
                customer feedback to improve your service continuously.
              </p>

              <div className="space-y-4">
                <Feature
                  Icon={Calendar}
                  iconBg="from-red-100 to-red-50"
                  iconColor="text-red-600"
                  title="Smart Reservations"
                  desc="Auto-booking with real-time availability checks and reminders."
                />

                <Feature
                  Icon={Gift}
                  iconBg="from-pink-100 to-pink-50"
                  iconColor="text-pink-600"
                  title="Loyalty Rewards"
                  desc="Reward customers automatically with points, deals & perks."
                />

                <Feature
                  Icon={Star}
                  iconBg="from-orange-100 to-orange-50"
                  iconColor="text-orange-600"
                  title="Feedback Collection"
                  desc="Gather reviews after each visit to improve service quality."
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
                <div
                  className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-pink-400/15 to-orange-400/20 
          blur-2xl rounded-3xl scale-105"
                />

                <Image
                  src="/restaurant-customer-receiving-loyalty-rewards-noti.jpg"
                  alt="WhatsApp reservation & loyalty rewards"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl 
            drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
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
      <FAQSection
        badgeText="Common Questions"
        title="Frequently Asked Questions"
        description="Everything you need to know about WhatsApp for Food & Beverage"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

      {/* CTA Section */}
      <CTASection
        gradientFrom="from-orange-600"
        gradientVia="via-orange-600"
        gradientTo="to-amber-700"
        title="Ready to Transform Your Restaurant?"
        description="Join leading restaurants increasing orders and customer satisfaction with WhatsApp"
        primaryButtonText="Start Free Trial"
        primaryButtonLink={
          process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"
        }
        primaryButtonBgColor="bg-white"
        primaryButtonTextColor="text-orange-600"
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
