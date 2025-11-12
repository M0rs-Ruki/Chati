"use client";

import type React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import PageBuilder from "@/components/page-builder";
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-900">Loading page...</p>
          <p className="text-sm text-gray-500">
            Please wait while we fetch your content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
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
            <h2 className="text-2xl font-bold text-gray-900">Edit Page</h2>
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
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
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

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {viewMode === "edit"
                ? "Page Content - Edit Mode"
                : "Page Preview"}
            </CardTitle>
            {/* Toggle Button Inside Card Header */}
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
      </form>
    </div>
  );
}
