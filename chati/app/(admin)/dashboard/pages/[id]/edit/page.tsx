"use client";

import type React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingEdit from "./loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Save,
  Eye,
  Edit2,
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileText,
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
import { Alert, AlertDescription } from "@/components/ui/alert";

type SaveStatus = "saved" | "saving" | "unsaved" | "error";

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
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
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounce content updates for preview (1 second delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedContent(content);
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  // Warn user about unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    fetchPage();
  }, [params.id]);

  const fetchPage = async () => {
    try {
      const token = localStorage.getItem("token");

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
            title: "Error",
            description: "Page not found. Redirecting to pages list...",
            variant: "destructive",
          });
        } else if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in to view pages",
            variant: "destructive",
          });
          router.push("/admin");
          return;
        } else {
          throw new Error("Failed to fetch page");
        }
        router.push("/dashboard/pages");
        return;
      }

      const result = await response.json();
      const page = result.data;

      const pageData = {
        title: page.title || "",
        slug: page.slug || "",
        status: page.status || "DRAFT",
      };
      const pageMetadata = {
        description: page.metadata?.description || "",
        tags: page.metadata?.tags || [],
      };
      const pageContent = page.content?.blocks || [];

      setFormData(pageData);
      setMetadata(pageMetadata);
      setContent(pageContent);
      setDebouncedContent(pageContent);
      setInitialData({
        formData: pageData,
        metadata: pageMetadata,
        content: pageContent,
      });
      setSaveStatus("saved");
      setLastSaved(new Date(page.updatedAt));
      setHasUnsavedChanges(false);
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

  // Auto-save function
  const autoSave = useCallback(async () => {
    if (!hasUnsavedChanges || saving) return;

    setSaveStatus("saving");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/page/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
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
        setSaveStatus("error");
        console.error("Auto-save failed:", result.message);
        return;
      }

      setSaveStatus("saved");
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Auto-save error:", error);
      setSaveStatus("error");
    }
  }, [hasUnsavedChanges, saving, params.id, formData, content, metadata]);

  // Set up auto-save timer
  useEffect(() => {
    if (hasUnsavedChanges && !loading) {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }

      autoSaveTimerRef.current = setTimeout(() => {
        autoSave();
      }, 30000); // 30 seconds
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [hasUnsavedChanges, loading, autoSave]);

  // Track changes
  useEffect(() => {
    if (initialData && !loading) {
      const hasChanges =
        JSON.stringify(formData) !== JSON.stringify(initialData.formData) ||
        JSON.stringify(metadata) !== JSON.stringify(initialData.metadata) ||
        JSON.stringify(content) !== JSON.stringify(initialData.content);

      if (hasChanges) {
        setHasUnsavedChanges(true);
        setSaveStatus("unsaved");
      }
    }
  }, [formData, metadata, content, initialData, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus("saving");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/page/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
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
        setSaveStatus("error");
        if (response.status === 409) {
          toast({
            title: "Duplicate Slug",
            description:
              result.message || "A page with this slug already exists.",
            variant: "destructive",
          });
        } else if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in to update pages",
            variant: "destructive",
          });
          router.push("/admin");
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to update page",
            variant: "destructive",
          });
        }
        return;
      }

      toast({ title: "Success", description: "Page saved successfully" });
      setSaveStatus("saved");
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setInitialData({ formData, metadata, content });
    } catch (error) {
      console.error("Error updating page:", error);
      setSaveStatus("error");
      toast({
        title: "Error",
        description: "Failed to update page. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getSaveStatusDisplay = () => {
    switch (saveStatus) {
      case "saved":
        return (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Saved {lastSaved && `• ${formatTimeSince(lastSaved)}`}</span>
          </div>
        );
      case "saving":
        return (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </div>
        );
      case "unsaved":
        return (
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <AlertCircle className="h-4 w-4" />
            <span>Unsaved changes • Auto-save in progress</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>Failed to save • Try manual save</span>
          </div>
        );
    }
  };

  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const renderPreview = () => {
    return (
      <div className="bg-white min-h-[600px]">
        {debouncedContent.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No content added yet.</p>
            <p className="text-gray-400 text-sm">
              Add components from the editor to see your page preview
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
        )}
      </div>
    );
  };

  if (loading) {
    return <LoadingEdit />;
  }

  return (
    <div className={`space-y-8 p-6 max-w-7xl mx-auto transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (hasUnsavedChanges) {
                if (
                  confirm(
                    "You have unsaved changes. Are you sure you want to leave?"
                  )
                ) {
                  router.push("/dashboard/pages");
                }
              } else {
                router.push("/dashboard/pages");
              }
            }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Edit Page
            </h2>
            <p className="text-gray-600 mt-1">
              Update your page content and settings
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getSaveStatusDisplay()}
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:scale-105"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Now
              </>
            )}
          </Button>
        </div>
      </div>

      {saveStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Auto-save failed. Please save manually to prevent data loss.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="border-b bg-gradient-to-r">
            <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Page Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter page title"
                  className="bg-white border-gray-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
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

        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-gray-50 to-white">
            <CardTitle className="text-lg text-gray-900">
              {viewMode === "edit"
                ? "Page Content - Edit Mode"
                : "Page Preview"}
            </CardTitle>
            {/* Toggle Button */}
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
          <CardContent>
            {viewMode === "edit" ? (
              <PageBuilder content={content} onChange={setContent} />
            ) : (
              renderPreview()
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
