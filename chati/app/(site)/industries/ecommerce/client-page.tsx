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
  ShoppingCart,
  Package,
  Bell,
  Star,
  TrendingUp,
  MessageSquare,
  Zap,
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
  BarChart,
  Truck,
  Gift,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function EcommerceClientPage() {
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
      icon: ShoppingCart,
      title: "Cart Recovery",
      description:
        "Automatically remind customers about abandoned carts with personalized messages",
    },
    {
      icon: Package,
      title: "Order Tracking",
      description:
        "Send real-time shipping updates and delivery notifications instantly",
    },
    {
      icon: Bell,
      title: "Product Alerts",
      description:
        "Notify customers when out-of-stock items are back or new products launch",
    },
    {
      icon: Star,
      title: "Review Collection",
      description:
        "Gather customer feedback and reviews automatically after purchase",
    },
    {
      icon: Users,
      title: "Customer Support",
      description:
        "Provide instant support for orders, returns, and product inquiries",
    },
    {
      icon: MessageSquare,
      title: "Personalized Offers",
      description:
        "Send targeted promotions based on browsing and purchase history",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Boost Sales",
      description:
        "Average 30% increase in conversion rates with WhatsApp engagement",
    },
    {
      icon: Clock,
      title: "Faster Support",
      description: "5x quicker response times compared to email support",
    },
    {
      icon: BarChart,
      title: "Higher ROI",
      description: "25% improvement in customer lifetime value",
    },
    {
      icon: Star,
      title: "Better Retention",
      description: "40% increase in repeat purchase rates",
    },
  ];

  const useCases = [
    {
      title: "Abandoned Cart Recovery",
      description: "Win back lost sales with timely reminders",
      icon: ShoppingCart,
    },
    {
      title: "Order Confirmations",
      description: "Instant purchase confirmations and receipts",
      icon: CheckCircle2,
    },
    {
      title: "Shipping Updates",
      description: "Real-time tracking from warehouse to doorstep",
      icon: Truck,
    },
    {
      title: "Product Recommendations",
      description: "AI-powered suggestions based on preferences",
      icon: Target,
    },
    {
      title: "Flash Sale Alerts",
      description: "Notify customers about limited-time offers",
      icon: Bell,
    },
    {
      title: "Loyalty Programs",
      description: "Reward repeat customers with exclusive deals",
      icon: Gift,
    },
  ];

  const faqsColumn1 = [
    {
      question: "How does abandoned cart recovery work?",
      answer:
        "When a customer adds items to their cart but doesn't complete the purchase, our system automatically sends a personalized WhatsApp message after a set time period. These messages can include product images, cart details, and even discount codes to encourage completion.",
    },
    {
      question: "Can I send order tracking updates automatically?",
      answer:
        "Yes! Once integrated with your e-commerce platform, Chati automatically sends shipping updates at every stage—from order confirmation to out for delivery. Customers can also check their order status anytime by messaging your WhatsApp number.",
    },
    {
      question: "How do I collect customer reviews?",
      answer:
        "After a successful delivery, our system automatically sends a friendly message asking for feedback. You can customize the timing and message content. Reviews can be collected via quick reply buttons or rating scales.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "Can I integrate with my existing e-commerce platform?",
      answer:
        "Chati integrates seamlessly with popular platforms like Shopify, WooCommerce, Magento, and custom solutions via API. Setup is quick and our team provides full support during integration.",
    },
    {
      question: "Is it compliant with WhatsApp's business policies?",
      answer:
        "Yes, all our features are fully compliant with WhatsApp Business API policies. We ensure proper opt-ins, respect customer preferences, and follow all messaging guidelines to keep your account in good standing.",
    },
    {
      question: "How do I handle customer support inquiries?",
      answer:
        "Our platform includes a unified inbox where your team can manage all customer conversations. You can also set up AI chatbots to handle common questions automatically, escalating complex issues to human agents.",
    },
  ];

  const faqsColumnFAQSection1 = [
    {
      question: "How does WhatsApp work for e-commerce?",
      answer: "WhatsApp transforms into a complete sales channel where you can showcase products through catalogs, take orders directly in chat, process payments via WhatsApp Pay or integrated gateways, send automated order confirmations and tracking updates, provide instant customer support, and recover abandoned carts—all within a single conversation thread that feels personal and convenient for shoppers."
    },
    {
      question: "What is the WhatsApp product catalog feature?",
      answer: "The catalog feature lets you display your entire product inventory within WhatsApp with images, descriptions, prices, and product codes. Customers can browse items directly from the chat screen using the shopping button, add products to cart, adjust quantities, and send order inquiries—all without leaving the app. It's like having a mini e-commerce store inside WhatsApp."
    },
    {
      question: "Can customers complete purchases on WhatsApp?",
      answer: "Yes! Customers can browse catalogs, add items to cart, send order requests, and complete payments through WhatsApp Pay (available in select countries) or integrated payment links from Razorpay, Stripe, or PayPal. The entire purchase journey—from product discovery to payment confirmation—happens seamlessly within the WhatsApp conversation, reducing friction and boosting conversion rates by 25-40%."
    },
    {
      question: "How can I recover abandoned carts on WhatsApp?",
      answer: "Set up automated reminders that trigger when customers add items to cart but don't complete checkout. Send personalized messages within 1-3 hours with cart contents, product images, and exclusive discounts to incentivize completion. WhatsApp abandoned cart recovery achieves 40-60% recovery rates—significantly higher than email—because messages are read instantly and feel more personal."
    }
  ];
  
  const faqsColumnFAQSection2 = [
    {
      question: "What kind of automated messages can I send?",
      answer: "Automate order confirmations immediately after purchase, shipping notifications with tracking links, delivery updates when orders are out for delivery, payment receipts, reorder reminders for repeat customers, personalized product recommendations based on browsing history, promotional campaigns for new launches or sales, and post-purchase feedback requests—keeping customers informed and engaged throughout their shopping journey."
    },
    {
      question: "Can I integrate WhatsApp with my Shopify or WooCommerce store?",
      answer: "Absolutely! WhatsApp Business API integrates seamlessly with Shopify, WooCommerce, Magento, BigCommerce, and other e-commerce platforms. Sync your product catalog automatically, receive order notifications in real-time, update inventory levels, trigger order status messages, and centralize customer conversations—ensuring your WhatsApp commerce operations stay synchronized with your main online store without manual effort."
    },
    {
      question: "How do chatbots help with e-commerce on WhatsApp?",
      answer: "AI chatbots answer product questions 24/7, provide size and color recommendations, check inventory availability, suggest related or complementary products, help customers track orders, process returns and exchanges, collect reviews, and escalate complex queries to human agents—handling up to 80% of routine inquiries automatically while delivering instant responses that improve customer satisfaction and reduce support costs."
    },
    {
      question: "Is WhatsApp commerce suitable for small businesses?",
      answer: "Yes! The free WhatsApp Business App is perfect for small businesses with under 1,000 monthly customers. Upload up to 500 products in your catalog, use quick replies for common questions, set automated greeting and away messages, and accept payments through simple links. As you grow, upgrade to WhatsApp Business API for unlimited contacts, advanced automation, and multi-agent support—scalable for businesses of any size."
    }
  ];
  

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50/30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-10 md:py-12 z-10"
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 bg-green-100 text-green-700 hover:bg-green-200 w-fit shadow-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                E-commerce & Retail Solutions
              </Badge>

              <h1 className="mb-3 text-balance leading-tight tracking-tight">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  Boost Sales with WhatsApp
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  For E-commerce
                </span>
              </h1>

              <p className="mb-5 text-base text-muted-foreground md:text-lg max-w-xl leading-relaxed">
                Recover abandoned carts, send order updates, and provide instant
                customer support with automated WhatsApp messaging. Perfect for
                online stores, retail businesses, and marketplaces.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                  asChild
                >
                  <Link
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="
              border-2 
              bg-white 
              text-gray-800 
              hover:bg-green-50 
              hover:border-green-500 
              hover:text-green-600 
              font-medium 
              shadow-sm 
              transition-all
            "
                  asChild
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-green-600">30%</div>
                  <div className="text-xs text-muted-foreground text-center">
                    Higher Conversions
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-green-600">25%</div>
                  <div className="text-xs text-muted-foreground text-center">
                    Cart Recovery
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-green-600">5x</div>
                  <div className="text-xs text-muted-foreground text-center">
                    Faster Support
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-xs text-muted-foreground text-center">
                    Open Rate
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-400/15 to-teal-400/20 blur-3xl rounded-full transform scale-110" />
                <Image
                  src="/whatsapp-product-catalog-shopping-experience.jpg"
                  alt="E-commerce shopping experience on WhatsApp showing product catalog and checkout"
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

      {/* Block 1: Image Left, Content Right - Abandoned Cart Recovery */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-orange-50/40 via-white to-red-50/30 py-10 sm:py-12 md:py-16"
      >
        {/* Background Blobs (smaller on mobile) */}
        <div className="absolute top-10 right-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-orange-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-tr from-red-400/15 to-transparent rounded-full blur-3xl" />

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
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-red-400/15 to-pink-400/20 blur-2xl rounded-3xl scale-105" />

                <Image
                  src="/abandoned-cart-recovery-whatsapp-message-with-prod.jpg"
                  alt="Abandoned cart recovery WhatsApp message"
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
                className="mb-3 shadow-sm bg-orange-100 text-orange-700 border-orange-200"
                variant="outline"
              >
                Cart Recovery
              </Badge>

              <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Recover Lost Sales Automatically
              </h2>

              <p className="mb-6 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Turn abandoned carts into completed purchases with personalized
                WhatsApp messages. Send timely reminders with product images and
                direct checkout links.
              </p>

              <div className="space-y-4">
                {/* Feature 1 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 transition-all group-hover:from-orange-200 group-hover:to-orange-100 shadow-sm">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Smart Timing
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Auto-send cart reminders at the exact time customers are
                      most likely to purchase.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-red-50 transition-all group-hover:from-red-200 group-hover:to-red-100 shadow-sm">
                    <Gift className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Personalized Incentives
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add discount codes, free shipping, or limited-time deals.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 transition-all group-hover:from-green-200 group-hover:to-green-100 shadow-sm">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      One-Click Checkout
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Customers finish their purchase instantly from WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Order Tracking */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/30 py-10 sm:py-12 md:py-16"
      >
        {/* Background blobs */}
        <div className="absolute top-10 left-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-tr from-indigo-400/15 to-transparent rounded-full blur-3xl" />

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
                className="mb-3 shadow-sm bg-blue-100 text-blue-700 border-blue-200"
                variant="outline"
              >
                Order Management
              </Badge>

              <h2 className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Keep Customers Informed Every Step
              </h2>

              <p className="mb-6 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                Automated order confirmations, shipping updates, and delivery
                alerts directly via WhatsApp.
              </p>

              <div className="space-y-4">
                {/* Feature 1 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-all shadow-sm">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Automated Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Send order confirmations, shipping updates, and payment
                      receipts automatically.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 group-hover:bg-indigo-200 transition-all shadow-sm">
                    <Truck className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Real-Time Tracking
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Share tracking links so customers always know where their
                      package is.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-all shadow-sm">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Two-Way Communication
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Customers can reply directly to messages for support.
                    </p>
                  </div>
                </div>
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-purple-400/20 blur-2xl rounded-3xl scale-105" />

                <Image
                  src="/order-tracking-whatsapp-notifications-with-shippin.jpg"
                  alt="Order tracking WhatsApp notifications"
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
      <section
        ref={featuresRef}
        className="py-12 md:py-14 bg-gradient-to-b from-white via-green-50/20 to-white"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              featuresInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              E-commerce Features
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need to sell more and support customers better
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-lg transition-all duration-300 border-gray-200 ${
                  featuresInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        ref={benefitsRef}
        className="py-12 md:py-14 bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Why E-commerce Businesses Choose Us
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Drive more sales and create better shopping experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
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
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
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
      <section
        ref={useCasesRef}
        className="py-12 md:py-14 bg-gradient-to-br from-white via-green-50/20 to-emerald-50/10"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              useCasesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              E-commerce Use Cases
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              See how online stores use WhatsApp to grow their business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-5 hover:shadow-lg transition-all duration-300 border-gray-200 group ${
                  useCasesInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <useCase.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - 3/3 Layout */}
      <FAQSection
        badgeText="Common Questions"
        title="Frequently Asked Questions"
        description="Everything you need to know about WhatsApp for E-commerce"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

      {/* CTA Section */}
      <section className="py-12 md:py-14 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Boost Your E-commerce Sales?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Start selling more with WhatsApp commerce and conversational
            shopping experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-green-600 hover:bg-gray-100"
            >
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
  );
}
