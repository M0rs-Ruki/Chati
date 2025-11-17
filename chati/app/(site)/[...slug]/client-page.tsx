"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import { CDPSection } from "@/components/page_components/cdp-block";
import { WorkflowSection } from "@/components/page_components/workflow-block";
import { EnterpriseHeroSection } from "@/components/page_components/enterprise-hero-block";
import { useRef, useState, useEffect } from "react";

interface PageClientProps {
  page: any;
}

export default function PageClient({ page }: PageClientProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.5;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Parse components/content blocks
  const components = (() => {
    if (!page.content && !page.components) return [];

    // Check if content.blocks exists (new format)
    if (page.content) {
      if (page.content.blocks && Array.isArray(page.content.blocks)) {
        return page.content.blocks;
      }
      // If content is a string, try to parse it
      if (typeof page.content === "string") {
        try {
          const parsed = JSON.parse(page.content);
          if (parsed.blocks && Array.isArray(parsed.blocks)) {
            return parsed.blocks;
          }
        } catch {
          return [];
        }
      }
    }

    // Legacy: check if components exists
    if (page.components) {
      if (Array.isArray(page.components)) return page.components;
      if (typeof page.components === "string") {
        try {
          return JSON.parse(page.components);
        } catch {
          return [];
        }
      }
    }

    return [];
  })();

  // Render page content
  const renderContent = () => {
    if (!components || components.length === 0) {
      return (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-lg">
            No content available for this page
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-0">
        {components.map((block: any, index: number) => (
          <div key={block.id || index}>
            {/* Text + Image Hero */}
            {block.type === "text-image" && (
              <section className="relative overflow-hidden py-10 md:py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
                <div className="container mx-auto px-4">
                  <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
                    {/* TEXT SECTION */}
                    <div
                      className={
                        block.data?.imagePosition === "right"
                          ? "lg:order-1 order-2"
                          : "lg:order-2 order-2"
                      }
                    >
                      <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm mb-4">
                        {block.data?.badgeText || "Badge"}
                      </div>

                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                        <span className="block">
                          {block.data?.titlePart1 || "Title Part 1"}
                        </span>
                        <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                          {block.data?.titlePart2 || "Title Part 2"}
                        </span>
                      </h1>

                      <p className="text-gray-600 mb-6 text-base sm:text-lg">
                        {block.data?.description || "Description"}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                          {block.data?.button1Text || "Button 1"}
                        </Button>
                        <Button
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
                        >
                          {block.data?.button2Text || "Button 2"}
                        </Button>
                      </div>
                    </div>

                    {/* IMAGE SECTION */}
                    <div
                      className={
                        block.data?.imagePosition === "right"
                          ? "lg:order-2 order-1"
                          : "lg:order-1 order-1"
                      }
                    >
                      <img
                        src={block.data?.imageSrc || "/placeholder.svg"}
                        alt={block.data?.imageAlt || "Image"}
                        className="w-full rounded-xl shadow-2xl max-h-[450px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Feature Block */}
            {block.type === "feature-block" && (
              <section className="py-10 md:py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="container mx-auto px-4">
                  <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
                    {/* TEXT SECTION */}
                    <div
                      className={
                        block.data?.imagePosition === "right"
                          ? "lg:order-1 order-2"
                          : "lg:order-2 order-2"
                      }
                    >
                      <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm mb-4">
                        {block.data?.badgeText || "Badge"}
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {block.data?.title || "Title"}
                      </h2>

                      <p className="text-gray-600 mb-6 text-base sm:text-lg">
                        {block.data?.description || "Description"}
                      </p>

                      {/* FEATURES LIST */}
                      <div className="space-y-5">
                        {block.data?.features?.map(
                          (feature: any, idx: number) => (
                            <div key={idx} className="flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600 text-lg">
                                  ✓
                                </span>
                              </div>

                              <div>
                                <h3 className="font-semibold text-lg">
                                  {feature.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* IMAGE SECTION */}
                    <div
                      className={
                        block.data?.imagePosition === "right"
                          ? "lg:order-2 order-1"
                          : "lg:order-1 order-1"
                      }
                    >
                      <img
                        src={block.data?.imageSrc || "/placeholder.svg"}
                        alt={block.data?.imageAlt || "Image"}
                        className="w-full rounded-2xl shadow-2xl max-h-[420px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Features Grid */}
            {block.type === "features-grid" && (
              <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-3">
                      {block.data?.title || "Features"}
                    </h2>
                    <p className="text-gray-600">
                      {block.data?.description || "Description"}
                    </p>
                  </div>
                  <div
                    className={`grid gap-6 ${
                      block.data?.columns === "4"
                        ? "md:grid-cols-4"
                        : block.data?.columns === "2"
                        ? "md:grid-cols-2"
                        : "md:grid-cols-3"
                    }`}
                  >
                    {block.data?.features?.map((feature: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
                          <span className="text-cyan-600">★</span>
                        </div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Use Cases */}
            {block.type === "use-cases" && (
              <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-3">
                      {block.data?.title || "Use Cases"}
                    </h2>
                    <p className="text-gray-600">
                      {block.data?.description || "Description"}
                    </p>
                  </div>
                  <div
                    className={`grid gap-6 ${
                      block.data?.columns === "4"
                        ? "md:grid-cols-4"
                        : block.data?.columns === "2"
                        ? "md:grid-cols-2"
                        : "md:grid-cols-3"
                    }`}
                  >
                    {block.data?.useCases?.map((useCase: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-5 border rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white">★</span>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">
                              {useCase.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {useCase.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Brand Slider */}
            {block.type === "brand-slider" && (
              <section className="py-12 md:py-16 bg-white border-b">
                <div className="container mx-auto px-4">
                  {/* TITLE */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">
                      {block.data?.title || "Trusted by"}{" "}
                      <span className="text-green-600">
                        {block.data?.titleHighlight || "Leading Brands"}
                      </span>
                    </h2>
                  </div>

                  {/* SCROLLING BRAND LIST */}
                  <div
                    ref={scrollRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="overflow-x-auto scrollbar-hide mb-10 cursor-grab active:cursor-grabbing"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <div className="flex gap-10 md:gap-16 items-center min-w-max px-4">
                      {[
                        ...(block.data?.brands || []),
                        ...(block.data?.brands || []),
                      ].map((brand: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center min-w-[130px] grayscale hover:grayscale-0 transition-all"
                        >
                          <img
                            src={brand.logo || "/placeholder.svg"}
                            alt={brand.name}
                            className="h-12 md:h-16 w-auto object-contain mb-2"
                          />
                          {brand.tagline && (
                            <p className="text-xs text-gray-500">
                              {brand.tagline}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TRUST BADGES */}
                  <div className="flex flex-wrap justify-center gap-8">
                    {block.data?.trustBadges?.map((badge: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm text-gray-600">
                          {badge.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* FAQ */}
            {block.type === "faq" && (
              <section className="py-10 md:py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                  {/* HEADER */}
                  <div className="text-center mb-10 max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
                      {block.data?.title || "FAQ"}
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg">
                      {block.data?.description || "Description"}
                    </p>
                  </div>

                  {/* FAQ GRID */}
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {block.data?.faqs?.map((faq: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-6 md:p-7 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all"
                      >
                        <h3 className="font-semibold text-lg mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* CTA */}
            {block.type === "cta" && (
              <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    {block.data?.title || "CTA Title"}
                  </h2>
                  <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                    {block.data?.description || "CTA Description"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-blue-600"
                    >
                      {block.data?.button1Text || "Button 1"}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-black"
                    >
                      {block.data?.button2Text || "Button 2"}
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {/* CDP Block */}
            {block.type === "cdp-block" && <CDPSection data={block.data} />}

            {/* Workflow Block */}
            {block.type === "workflow" && <WorkflowSection data={block.data} />}

            {/* Enterprise Hero Block */}
            {block.type === "enterprise-hero" && (
              <EnterpriseHeroSection data={block.data} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      {/* <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant={page.status === "PUBLISHED" ? "default" : "secondary"}
                className="bg-green-600"
              >
                {page.status}
              </Badge>
              {page.metadata?.category && (
                <Badge variant="outline">{page.metadata.category}</Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {page.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {page.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{page.author.name || page.author.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(page.createdAt).toLocaleDateString()}</span>
              </div>
              {page.updatedAt && page.updatedAt !== page.createdAt && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    Updated {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header> */}

      {/* Page Content */}
      <main>{renderContent()}</main>
    </div>
  );
}
