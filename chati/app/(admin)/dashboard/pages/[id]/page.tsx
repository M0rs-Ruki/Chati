"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PageData {
  id: string;
  title: string;
  slug: string;
  content: any;
  status: string;
  metadata?: any;
  author?: {
    id: string;
    name: string;
    email: string;
  };
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ViewPagePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPage();
    }
  }, [params.id]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/page/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: "Page Not Found",
            description: "This page does not exist. Redirecting...",
            variant: "destructive",
          });
        } else {
          throw new Error("Failed to fetch page");
        }
        router.push("/dashboard/pages");
        return;
      }

      const result = await response.json();
      setPage(result.data);
    } catch (error) {
      console.error("Error fetching page:", error);
      toast({
        title: "Error",
        description: "Failed to load page",
        variant: "destructive",
      });
      router.push("/dashboard/pages");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-900">Loading page...</p>
          <p className="text-sm text-gray-500">
            Please wait while we fetch the page details
          </p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <p className="text-lg text-gray-500">Page not found</p>
        <Button
          onClick={() => router.push("/dashboard/pages")}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pages
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/pages")}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{page.title}</h2>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-gray-600 font-mono text-sm">/{page.slug}</p>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  page.status === "PUBLISHED"
                    ? "bg-green-100 text-green-700"
                    : page.status === "REVIEW"
                    ? "bg-blue-100 text-blue-700"
                    : page.status === "ARCHIVED"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {page.status}
              </span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/dashboard/pages/${page.id}/edit`)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Page
        </Button>
      </div>

      {/* Page Metadata */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500 font-medium">Created</p>
            <p className="text-gray-900">
              {new Date(page.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Updated</p>
            <p className="text-gray-900">
              {new Date(page.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Published</p>
            <p className="text-gray-900">
              {page.publishedAt
                ? new Date(page.publishedAt).toLocaleDateString()
                : "Not published"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Author</p>
            <p className="text-gray-900">{page.author?.name || "Unknown"}</p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white min-h-[500px]">
        {page.content?.blocks &&
        Array.isArray(page.content.blocks) &&
        page.content.blocks.length > 0 ? (
          <div className="space-y-0">
            {page.content.blocks.map((block: any, index: number) => (
              <div key={block.id || index}>
                {/* Text + Image Hero */}
                {block.type === "text-image" && (
                  <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
                    <div className="container mx-auto px-4">
                      <div className="grid gap-8 lg:grid-cols-2 items-center">
                        <div
                          className={
                            block.data?.imagePosition === "right"
                              ? "order-1"
                              : "order-2"
                          }
                        >
                          <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm mb-4">
                            {block.data?.badgeText || "Badge"}
                          </div>
                          <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="block">
                              {block.data?.titlePart1 || "Title Part 1"}
                            </span>
                            <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                              {block.data?.titlePart2 || "Title Part 2"}
                            </span>
                          </h1>
                          <p className="text-gray-600 mb-6">
                            {block.data?.description || "Description"}
                          </p>
                          <div className="flex gap-3">
                            <Button className="bg-green-600 hover:bg-green-700">
                              {block.data?.button1Text || "Button 1"}
                            </Button>
                            <Button variant="outline">
                              {block.data?.button2Text || "Button 2"}
                            </Button>
                          </div>
                        </div>
                        <div
                          className={
                            block.data?.imagePosition === "right"
                              ? "order-2"
                              : "order-1"
                          }
                        >
                          <img
                            src={block.data?.imageSrc || "/placeholder.svg"}
                            alt={block.data?.imageAlt || "Image"}
                            className="w-full rounded-lg shadow-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Feature Block */}
                {block.type === "feature-block" && (
                  <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                    <div className="container mx-auto px-4">
                      <div className="grid gap-8 lg:grid-cols-2 items-center">
                        <div
                          className={
                            block.data?.imagePosition === "right"
                              ? "order-1"
                              : "order-2"
                          }
                        >
                          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm mb-4">
                            {block.data?.badgeText || "Badge"}
                          </div>
                          <h2 className="text-3xl font-bold mb-4">
                            {block.data?.title || "Title"}
                          </h2>
                          <p className="text-gray-600 mb-6">
                            {block.data?.description || "Description"}
                          </p>
                          <div className="space-y-4">
                            {block.data?.features?.map(
                              (feature: any, idx: number) => (
                                <div key={idx} className="flex gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-green-600">✓</span>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">
                                      {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {feature.description}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div
                          className={
                            block.data?.imagePosition === "right"
                              ? "order-2"
                              : "order-1"
                          }
                        >
                          <img
                            src={block.data?.imageSrc || "/placeholder.svg"}
                            alt={block.data?.imageAlt || "Image"}
                            className="w-full rounded-lg shadow-xl"
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
                        {block.data?.features?.map(
                          (feature: any, idx: number) => (
                            <div
                              key={idx}
                              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
                            >
                              <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
                                <span className="text-cyan-600">★</span>
                              </div>
                              <h3 className="font-semibold mb-2">
                                {feature.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {feature.description}
                              </p>
                            </div>
                          )
                        )}
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
                        {block.data?.useCases?.map(
                          (useCase: any, idx: number) => (
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
                          )
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {/* Brand Slider */}
                {block.type === "brand-slider" && (
                  <section className="py-12 md:py-16 bg-white border-b">
                    <div className="container mx-auto px-4">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">
                          {block.data?.title || "Trusted by"}{" "}
                          <span className="text-green-600">
                            {block.data?.titleHighlight || "Leading Brands"}
                          </span>
                        </h2>
                      </div>
                      <div className="flex flex-wrap justify-center gap-8 mb-8">
                        {block.data?.brands?.map((brand: any, idx: number) => (
                          <div key={idx} className="flex flex-col items-center">
                            <img
                              src={brand.logo || "/placeholder.svg"}
                              alt={brand.name}
                              className="h-16 w-auto grayscale"
                            />
                            {brand.tagline && (
                              <p className="text-xs text-gray-500 mt-1">
                                {brand.tagline}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap justify-center gap-8">
                        {block.data?.trustBadges?.map(
                          (badge: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-green-600">✓</span>
                              <span className="text-sm text-gray-600">
                                {badge.text}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {/* FAQ */}
                {block.type === "faq" && (
                  <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container mx-auto px-4">
                      <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-3">
                          {block.data?.title || "FAQ"}
                        </h2>
                        <p className="text-gray-600">
                          {block.data?.description || "Description"}
                        </p>
                      </div>
                      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
                        {block.data?.faqs?.map((faq: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-6 bg-white border rounded-lg"
                          >
                            <h3 className="font-semibold mb-2">
                              {faq.question}
                            </h3>
                            <p className="text-sm text-gray-600">
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
                          className="border-white text-white"
                        >
                          {block.data?.button2Text || "Button 2"}
                        </Button>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-gray-200 rounded-lg">
            <p className="text-gray-500 text-lg">
              No content added to this page yet.
            </p>
            <Button
              onClick={() => router.push(`/dashboard/pages/${page.id}/edit`)}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              <Edit className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
