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
      <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[600px]">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          {formData.title || "Untitled Page"}
        </h1>
        {debouncedContent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No content added yet. Add components to see the preview.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {debouncedContent.map((block: any, index: number) => (
              <div key={block.id || index} className="space-y-4">
                {block.type === "hero" && (
                  <div className="text-center py-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <h1 className="text-5xl font-bold mb-4 text-gray-900">
                      {block.data?.title || "Hero Title"}
                    </h1>
                    <p className="text-xl text-gray-600 mb-6">
                      {block.data?.subtitle || "Hero subtitle"}
                    </p>
                    {block.data?.buttonText && (
                      <Button className="bg-green-600 hover:bg-green-700">
                        {block.data.buttonText}
                      </Button>
                    )}
                  </div>
                )}
                {block.type === "heading" && (
                  <div
                    className={`font-bold ${
                      block.data?.level === "h1"
                        ? "text-4xl"
                        : block.data?.level === "h2"
                        ? "text-3xl"
                        : block.data?.level === "h3"
                        ? "text-2xl"
                        : "text-xl"
                    }`}
                  >
                    {block.data?.text || "Heading"}
                  </div>
                )}
                {block.type === "paragraph" && (
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {block.data?.text || "Paragraph text"}
                  </p>
                )}
                {block.type === "button" && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    {block.data?.text || "Button"}
                  </Button>
                )}
                {block.type === "image" && block.data?.src && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={block.data.src}
                      alt={block.data.alt || "Image"}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                {block.type === "text-image" && (
                  <div
                    className={`grid md:grid-cols-2 gap-8 items-center ${
                      block.data?.imagePosition === "left"
                        ? "md:flex-row-reverse"
                        : ""
                    }`}
                  >
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">
                        {block.data?.title || "Title"}
                      </h3>
                      <p className="text-gray-700">
                        {block.data?.text || "Description"}
                      </p>
                    </div>
                    <div>
                      <img
                        src={block.data?.imageSrc || "/placeholder.svg"}
                        alt={block.data?.title || "Image"}
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                )}
                {block.type === "feature-cards" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-center">
                      {block.data?.title || "Features"}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {block.data?.cards?.map((card: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-6 border border-gray-200 rounded-lg"
                        >
                          <h3 className="text-xl font-bold mb-2">
                            {card.title}
                          </h3>
                          <p className="text-gray-600">{card.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {block.type === "faq" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-center">
                      {block.data?.title || "FAQ"}
                    </h2>
                    <div className="space-y-4">
                      {block.data?.items?.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-6 border border-gray-200 rounded-lg"
                        >
                          <h3 className="text-lg font-bold mb-2">
                            {item.question}
                          </h3>
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {block.type === "divider" && (
                  <hr className="border-gray-300 my-8" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
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
          {/* Toggle Button */}
          <Button
            type="button"
            variant={viewMode === "preview" ? "default" : "outline"}
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

      {/* Page Settings (Always Visible) */}
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

      {/* Toggle between Edit and Preview */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">
            {viewMode === "edit" ? "Page Content - Edit Mode" : "Page Preview"}
          </CardTitle>
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
