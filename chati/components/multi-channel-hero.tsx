"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function MultiChannelHero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-green-50/30"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 py-8 md:py-10 z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Side - Image */}
          <div
            className={`relative flex items-center justify-center order-2 lg:order-1 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative w-full max-w-[450px] lg:max-w-full">
              {/* Decorative gradient blob behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/15 to-pink-400/20 blur-3xl rounded-full transform scale-110" />

              <Image
                src="/omnichannel-unified-messaging.webp"
                alt="Omnichannel messaging platform showing unified communication across WhatsApp, Instagram, Facebook Messenger, Telegram, Email, and SMS with real-time customer conversations"
                className="relative z-10 w-full h-auto max-h-[380px] sm:max-h-[400px] lg:max-h-[450px] object-contain drop-shadow-2xl"
                width={600}
                height={600}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div
            className={`order-1 lg:order-2 flex flex-col justify-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 w-fit shadow-sm">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Unified Messaging Platform</span>
            </div>

            {/* Heading */}
            <h2 className="mb-3 text-balance leading-tight tracking-tight">
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1">
                Manage Every Conversation in
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                One Powerful Hub
              </span>
            </h2>

            {/* Description */}
            <p className="mb-4 text-sm text-muted-foreground md:text-base max-w-xl leading-relaxed">
              Connect WhatsApp, Instagram, Facebook Messenger, RCS, and Line
              into a single unified inbox. Streamline customer conversations,
              automate responses, and deliver exceptional experiences across all
              channels.
            </p>

            {/* Features List */}
            <div className="space-y-2.5 mb-4">
              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">
                    Unified Team Inbox
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Manage all customer conversations from WhatsApp, Instagram,
                    Messenger, RCS, and Line in one place
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">
                    Smart Automation
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    AI-powered chatbots and automated workflows to handle common
                    queries instantly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-pink-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">
                    Real-Time Analytics
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Track performance metrics, response times, and customer
                    satisfaction across all channels
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Button
                size="default"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                asChild
              >
                <Link
                  href={
                    process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"
                  }
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="default"
                variant="outline"
                className="border-2 border-gray-300 hover:border-green-500 hover:text-green-600 bg-white hover:bg-gray-50 font-medium shadow-sm transition-all"
                asChild
              >
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
