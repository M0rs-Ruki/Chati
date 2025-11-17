"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingCreate from "./loading";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Save,
  Eye,
  Edit2,
  Loader2,
  FileText,
  Plus,
} from "lucide-react";
import PageBuilder from "@/components/page-builder";
import { CDPSection } from "@/components/page_components/cdp-block";
import { WorkflowSection } from "@/components/page_components/workflow-block";
import { EnterpriseHeroSection } from "@/components/page_components/enterprise-hero-block";
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
  const [mounted, setMounted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "DRAFT",
  });
  const [metadata, setMetadata] = useState({
    description: "",
    keywords: [] as string[],
    tags: [] as string[],
  });
  const [keywordsInput, setKeywordsInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [content, setContent] = useState<any[]>([]);
  const [debouncedContent, setDebouncedContent] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // Simulate initial page load
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
            keywords: metadata.keywords || [],
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
      .replace(/[^a-z0-9\/]+/g, "-") // Preserve forward slashes
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
      .replace(/\/+/g, "/") // Replace multiple slashes with single slash
      .replace(/^\/+|\/+$/g, ""); // Remove leading/trailing slashes
  };

  const renderPreview = () => {
    return (
      <div className="bg-white min-h-[600px] rounded-lg">
        {debouncedContent.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No content added yet.</p>
            <p className="text-gray-400 text-sm mb-6">
              Add components from the editor to see your page preview
            </p>
            <Button
              onClick={() => setViewMode("edit")}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Start Building
            </Button>
          </div>
        ) : (
          <div className="space-y-0">
            {debouncedContent.map((block: any, index: number) => (
              <div key={block.id || index}>
                {/* Text + Image Hero */}
                {block.type === "text-image" && (
                  <section className="relative overflow-hidden py-10 md:py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-lg">
                    <div className="container mx-auto px-4">
                      <div
                        className={`
          grid gap-10 
          lg:grid-cols-2 items-center
        `}
                      >
                        {/* TEXT SIDE */}
                        <div
                          className={`
            flex flex-col
            ${
              block.data?.imagePosition === "right"
                ? "order-2 lg:order-1"
                : "order-2 lg:order-2"
            }
          `}
                        >
                          {/* Badge */}
                          <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm mb-4">
                            {block.data?.badgeText || "Badge"}
                          </div>

                          {/* Title */}
                          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
                            <span className="block">
                              {block.data?.titlePart1 || "Title Part 1"}
                            </span>
                            <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                              {block.data?.titlePart2 || "Title Part 2"}
                            </span>
                          </h1>

                          {/* Description */}
                          <p className="text-gray-600 mb-6 text-base sm:text-lg">
                            {block.data?.description || "Description"}
                          </p>

                          {/* Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                              {block.data?.button1Text || "Button 1"}
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full sm:w-auto"
                            >
                              {block.data?.button2Text || "Button 2"}
                            </Button>
                          </div>
                        </div>

                        {/* IMAGE SIDE */}
                        <div
                          className={`
            ${
              block.data?.imagePosition === "right"
                ? "order-1 lg:order-2"
                : "order-1 lg:order-1"
            }
            flex justify-center
          `}
                        >
                          <img
                            src={block.data?.imageSrc || "/placeholder.svg"}
                            alt={block.data?.imageAlt || "Image"}
                            className="w-full max-w-md lg:max-w-full rounded-lg shadow-xl object-cover"
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
                      <div className="grid gap-10 lg:grid-cols-2 items-center">
                        {/* TEXT SIDE */}
                        <div
                          className={`
            ${
              block.data?.imagePosition === "right"
                ? "order-2 lg:order-1"
                : "order-2 lg:order-2"
            }
          `}
                        >
                          {/* Badge */}
                          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm mb-4">
                            {block.data?.badgeText || "Badge"}
                          </div>

                          {/* Title */}
                          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {block.data?.title || "Title"}
                          </h2>

                          {/* Description */}
                          <p className="text-gray-600 mb-6 text-base sm:text-lg">
                            {block.data?.description || "Description"}
                          </p>

                          {/* Feature List */}
                          <div className="space-y-4">
                            {block.data?.features?.map(
                              (feature: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-4"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <span className="text-green-600">✓</span>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-base">
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

                        {/* IMAGE SIDE */}
                        <div
                          className={`
            ${
              block.data?.imagePosition === "right"
                ? "order-1 lg:order-2"
                : "order-1 lg:order-1"
            }
            flex justify-center
          `}
                        >
                          <img
                            src={block.data?.imageSrc || "/placeholder.svg"}
                            alt={block.data?.imageAlt || "Image"}
                            className="w-full max-w-md lg:max-w-full rounded-lg shadow-xl object-cover"
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
                      {/* Header */}
                      <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                          {block.data?.title || "Features"}
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg">
                          {block.data?.description || "Description"}
                        </p>
                      </div>

                      {/* GRID */}
                      <div
                        className={`
          grid gap-6 
          grid-cols-1  /* mobile */
          ${
            block.data?.columns === "4"
              ? "md:grid-cols-4"
              : block.data?.columns === "2"
              ? "md:grid-cols-2"
              : "md:grid-cols-3"
          }
        `}
                      >
                        {block.data?.features?.map(
                          (feature: any, idx: number) => (
                            <div
                              key={idx}
                              className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white"
                            >
                              {/* ICON */}
                              <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
                                <span className="text-cyan-600 text-lg">★</span>
                              </div>

                              {/* TITLE */}
                              <h3 className="font-semibold mb-2 text-base sm:text-lg">
                                {feature.title}
                              </h3>

                              {/* DESCRIPTION */}
                              <p className="text-sm text-gray-600 leading-relaxed">
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
                  <section className="py-10 md:py-16 bg-white border-b rounded-lg">
                    <div className="container mx-auto px-4">
                      {/* Title */}
                      <div className="text-center mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
                          {block.data?.title || "Trusted by"}{" "}
                          <span className="text-green-600">
                            {block.data?.titleHighlight || "Leading Brands"}
                          </span>
                        </h2>
                      </div>

                      {/* BRAND LOGOS */}
                      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10">
                        {block.data?.brands?.map((brand: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex flex-col items-center text-center"
                          >
                            <img
                              src={brand.logo || "/placeholder.svg"}
                              alt={brand.name}
                              className="h-14 sm:h-16 w-auto grayscale"
                            />
                            {brand.tagline && (
                              <p className="text-xs text-gray-500 mt-1 max-w-[140px]">
                                {brand.tagline}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* TRUST BADGES */}
                      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        {block.data?.trustBadges?.map(
                          (badge: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full"
                            >
                              <span className="text-green-600 text-lg leading-none">
                                ✓
                              </span>
                              <span className="text-sm text-gray-600 whitespace-nowrap">
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
                      {/* Header */}
                      <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                          {block.data?.title || "FAQ"}
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg">
                          {block.data?.description || "Description"}
                        </p>
                      </div>

                      {/* FAQ GRID */}
                      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
                        {block.data?.title || "CTA Title"}
                      </h2>

                      {/* Description */}
                      <p className="text-base sm:text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                        {block.data?.description || "CTA Description"}
                      </p>

                      {/* Buttons */}
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
                          className="border-white text-black bg-white/20 backdrop-blur-sm"
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
        )}
      </div>
    );
  };

  if (pageLoading) {
    return <LoadingCreate />;
  }

  return (
    <div
      className={`pt-8 px-6 space-y-8 pb-12 max-w-7xl mx-auto transition-all duration-700 ${
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
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:scale-105"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Create Page
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Page Settings */}
      <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="border-b bg-gradient-to-r">
          <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Page Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700 font-medium">
                Page Title <span className="text-red-500">*</span>
              </Label>
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
              <Label htmlFor="slug" className="text-gray-700 font-medium">
                URL Slug (auto-generated)
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="page-slug or nested/page-slug"
                className="bg-white border-gray-200 font-mono text-sm text-indigo-600"
              />
              <p className="text-xs text-gray-500">
                Use lowercase letters, numbers, hyphens, and forward slashes
                (e.g., resources/test-12)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-700 font-medium">
                Status
              </Label>
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
              <Label
                htmlFor="description"
                className="text-gray-700 font-medium"
              >
                Meta Description
              </Label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="keywords" className="text-gray-700 font-medium">
                Keywords
              </Label>
              <Input
                id="keywords"
                value={keywordsInput}
                onChange={(e) => setKeywordsInput(e.target.value)}
                onBlur={(e) => {
                  const keywordsArray = e.target.value
                    .split(",")
                    .map((k) => k.trim())
                    .filter((k) => k.length > 0);
                  setMetadata({ ...metadata, keywords: keywordsArray });
                }}
                placeholder="keyword1, keyword2, keyword3"
                className="bg-white border-gray-200"
              />
              <p className="text-xs text-gray-500">
                Separate keywords with commas
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-gray-700 font-medium">
                Tags
              </Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                onBlur={(e) => {
                  const tagsArray = e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t.length > 0);
                  setMetadata({ ...metadata, tags: tagsArray });
                }}
                placeholder="tag1, tag2, tag3"
                className="bg-white border-gray-200"
              />
              <p className="text-xs text-gray-500">Separate tags with commas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Content with Toggle */}
      <Card className="bg-white border-gray-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r to-white">
          <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
            {viewMode === "edit" ? (
              <>
                <Edit2 className="h-5 w-5 text-indigo-600" />
                Page Content - Edit Mode
              </>
            ) : (
              <>
                <Eye className="h-5 w-5 text-blue-600" />
                Page Preview
              </>
            )}
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
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
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
        <CardContent className="p-6">
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
