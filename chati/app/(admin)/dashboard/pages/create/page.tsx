"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye, Edit2, Loader2 } from "lucide-react";
import PageBuilder from "@/components/page-builder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePagePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "DRAFT",
  });
  const [metadata, setMetadata] = useState({
    description: "",
    tags: [] as string[],
  });
  const [content, setContent] = useState<any[]>([]);
  const [debouncedContent, setDebouncedContent] = useState<any[]>([]);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
      const slug = generateSlug(formData.title);
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

  // Debounce content updates for preview (1 second delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedContent(content);
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a page title",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/page/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          content: { blocks: content },
          metadata: {
            description: metadata.description || "",
            keywords: [],
            tags: metadata.tags || [],
          },
          status: formData.status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast({
            title: "Duplicate Slug",
            description:
              result.message || "A page with a similar title already exists.",
            variant: "destructive",
          });
        } else if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in to create pages",
            variant: "destructive",
          });
          router.push("/admin");
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to create page",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Success",
        description: "Page created successfully",
      });

      router.push(`/dashboard/pages/${result.data.id}/edit`);
    } catch (error) {
      console.error("Error creating page:", error);
      toast({
        title: "Error",
        description: "Failed to create page. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const renderPreview = () => {
    return (
      <div className="bg-white min-h-[600px]">
        {debouncedContent.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 text-lg">
              No content added yet. Add components to see the preview.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {debouncedContent.map((block: any, index: number) => (
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
        )}
      </div>
    );
  };

  return (
    <div className="pt-8 px-6 space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/pages")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Page
            </h2>
            <p className="text-gray-600 mt-1">
              Build your page with drag-and-drop components
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Page
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Page Settings */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Page Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData({
                    ...formData,
                    title,
                    slug: generateSlug(title),
                  });
                }}
                placeholder="Enter page title"
                className="bg-white border-gray-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug (auto-generated)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="page-url-slug"
                className="bg-white border-gray-200 font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="REVIEW">Review</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Input
                id="description"
                value={metadata.description}
                onChange={(e) =>
                  setMetadata({ ...metadata, description: e.target.value })
                }
                placeholder="SEO meta description"
                className="bg-white border-gray-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Content with Toggle Button Inside Header */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">
            {viewMode === "edit" ? "Page Content - Edit Mode" : "Page Preview"}
          </CardTitle>
          <Button
            type="button"
            variant={viewMode === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setViewMode(viewMode === "edit" ? "preview" : "edit")
            }
            className={
              viewMode === "preview"
                ? "bg-blue-600 hover:bg-blue-700"
                : "border-gray-200"
            }
          >
            {viewMode === "edit" ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          {viewMode === "edit" ? (
            <PageBuilder content={content} onChange={setContent} />
          ) : (
            renderPreview()
          )}
        </CardContent>
      </Card>
    </div>
  );
}
