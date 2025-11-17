"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loading from "./loading";
import {
  ArrowLeft,
  Edit,
  Loader2,
  FileText,
  Calendar,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CDPSection } from "@/components/page_components/cdp-block";
import { WorkflowSection } from "@/components/page_components/workflow-block";
import { EnterpriseHeroSection } from "@/components/page_components/enterprise-hero-block";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300";
      case "REVIEW":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300";
      case "ARCHIVED":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300";
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <FileText className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Page not found
          </h3>
          <p className="text-gray-600">
            The page you're looking for doesn't exist
          </p>
          <Button
            onClick={() => router.push("/dashboard/pages")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`space-y-8 p-6 max-w-7xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/pages")}
            className="border-gray-200 hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              {page.title}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-indigo-600 font-mono text-sm">/{page.slug}</p>
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold border shadow-sm ${getStatusColor(
                  page.status
                )}`}
              >
                {page.status}
              </span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/dashboard/pages/${page.id}/edit`)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:scale-105"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Page
        </Button>
      </div>

      {/* Page Metadata */}
      <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Calendar className="h-4 w-4" />
              <p>Created</p>
            </div>
            <p className="text-gray-900 font-semibold">
              {new Date(page.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Calendar className="h-4 w-4" />
              <p>Updated</p>
            </div>
            <p className="text-gray-900 font-semibold">
              {new Date(page.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Calendar className="h-4 w-4" />
              <p>Published</p>
            </div>
            <p className="text-gray-900 font-semibold">
              {page.publishedAt
                ? new Date(page.publishedAt).toLocaleDateString()
                : "Not published"}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <User className="h-4 w-4" />
              <p>Author</p>
            </div>
            <p className="text-gray-900 font-semibold">
              {page.author?.name || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white min-h-[500px] rounded-lg">
        {page.content?.blocks &&
        Array.isArray(page.content.blocks) &&
        page.content.blocks.length > 0 ? (
          <div className="space-y-0">
            {page.content.blocks.map((block: any, index: number) => (
              <div key={block.id || index}>
                {/* Text + Image Hero */}
                {block.type === "text-image" && (
                  <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-lg">
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
                  <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg">
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
                  <section className="py-12 md:py-16 bg-white rounded-lg">
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
                  <section className="py-12 md:py-16 bg-white rounded-lg">
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
                  <section className="py-12 md:py-16 bg-white border-b rounded-lg">
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
                  <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white rounded-lg">
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
                  <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-lg">
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

                {/* CDP Block */}
                {block.type === "cdp-block" && (
                  <CDPSection data={block.data} />
                )}

                {/* Workflow Block */}
                {block.type === "workflow" && (
                  <WorkflowSection data={block.data} />
                )}

                {/* Enterprise Hero Block */}
                {block.type === "enterprise-hero" && (
                  <EnterpriseHeroSection data={block.data} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              No content added to this page yet.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Start building your page with drag-and-drop blocks
            </p>
            <Button
              onClick={() => router.push(`/dashboard/pages/${page.id}/edit`)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
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
