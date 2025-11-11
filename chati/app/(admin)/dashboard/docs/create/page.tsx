"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { WYSIWYGEditor } from "@/components/wysiwyg-editor";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MediaFile {
  id: string;
  url: string;
  alt: string;
  type: string;
  size: number;
  uploadedAt: string;
  createdBy?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function CreateDocsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    customHtml: "",
    imageUrl: "",
    status: "DRAFT",
    metadata: {
      description: "",
      tags: "",
    },
  });

  // Media Upload Dialog state
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadSelectedFile, setUploadSelectedFile] = useState<File | null>(
    null
  );
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);
  const [uploadAltText, setUploadAltText] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUploadFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploadSelectedFile(file);

    // Create preview url
    const reader = new FileReader();
    reader.onloadend = () => setUploadPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async () => {
    if (!uploadSelectedFile || !uploadAltText.trim()) {
      toast({
        title: "Error",
        description: "Please select a file and enter alt text",
        variant: "destructive",
      });
      return;
    }
    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      const formDataUpload = new FormData();
      formDataUpload.append("file", uploadSelectedFile);
      formDataUpload.append("alt", uploadAltText.trim());

      const res = await fetch("/api/media/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        body: formDataUpload,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to upload");

      // Set uploaded image URL in your main form
      setFormData((prev) => ({ ...prev, imageUrl: result.data.url }));

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      // Close modal and reset upload fields
      setUploadDialogOpen(false);
      setUploadSelectedFile(null);
      setUploadPreviewUrl(null);
      setUploadAltText("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Upload failed",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Media Picker State
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);

  // Fetch media files when media picker opens
  useEffect(() => {
    if (!mediaPickerOpen) return;
    const fetchMedia = async () => {
      setMediaLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/media", {
          headers: { Authorization: `Bearer ${token ?? ""}` },
        });
        const result = await res.json();
        setMediaFiles(result.data || []);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load media",
          variant: "destructive",
        });
        setMediaFiles([]);
      } finally {
        setMediaLoading(false);
      }
    };
    fetchMedia();
  }, [mediaPickerOpen, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that at least title and either content or customHtml is provided
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content && !formData.customHtml) {
      toast({
        title: "Error",
        description: "Either content or custom HTML is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Parse tags from comma-separated string to array
      const tags = formData.metadata.tags
        ? formData.metadata.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
        : [];

      // Combine content and customHtml if both are provided
      let finalContent = formData.content;
      if (formData.customHtml) {
        // If both content and customHtml exist, combine them
        if (formData.content) {
          finalContent = `${formData.content}\n\n${formData.customHtml}`;
        } else {
          // If only customHtml exists, use it as content
          finalContent = formData.customHtml;
        }
      }

      // Prepare request body
      const requestBody = {
        title: formData.title,
        content: { html: finalContent }, // Store HTML content in an object
        metadata: {
          description: formData.metadata.description || "",
          tags: tags,
        },
        imageUrl: formData.imageUrl || null,
      };

      const response = await fetch("/api/documentation/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create documentation");
      }

      toast({
        title: "Success",
        description: "Documentation created successfully",
      });

      // Redirect to the documentation list or detail page
      router.push("/dashboard/docs");
    } catch (error) {
      console.error("Error creating documentation:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create documentation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8 px-6 space-y-6 animate-in fade-in duration-500 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/docs">
            <Button
              variant="outline"
              size="icon"
              className="border-[var(--border)] bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              Create Documentation
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Write and publish new documentation
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-white border-[var(--border)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">
              Documentation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[var(--text-secondary)]">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter documentation title"
                required
                className="bg-white border-[var(--border)]"
              />
            </div>

            {/* Tabs for Content, Meta */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="meta">Meta</TabsTrigger>
                <TabsTrigger value="html">Custom HTML</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-6">
                {/* Hero Image */}
                <div className="space-y-2">
                  <Label
                    htmlFor="imageUrl"
                    className="text-[var(--text-secondary)]"
                  >
                    Hero Image
                  </Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setUploadDialogOpen(true)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Create New
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setMediaPickerOpen(true)}
                      >
                        Choose from existing
                      </Button>
                    </div>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      placeholder="Or enter image URL"
                      className="bg-white border-[var(--border)]"
                    />
                  </div>
                </div>

                {/* WYSIWYG Editor */}
                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">
                    Content
                  </Label>
                  <p className="text-xs text-gray-500 mb-2">
                    Use the visual editor for content or switch to Custom HTML tab
                  </p>
                  <WYSIWYGEditor
                    value={formData.content}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="meta" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-[var(--text-secondary)]"
                  >
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={formData.metadata.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metadata: {
                          ...formData.metadata,
                          description: e.target.value,
                        },
                      })
                    }
                    placeholder="Brief description of the documentation"
                    className="bg-white border-[var(--border)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="tags"
                    className="text-[var(--text-secondary)]"
                  >
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="tags"
                    value={formData.metadata.tags}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metadata: {
                          ...formData.metadata,
                          tags: e.target.value,
                        },
                      })
                    }
                    placeholder="api, guide, tutorial"
                    className="bg-white border-[var(--border)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="status"
                    className="text-[var(--text-secondary)]"
                  >
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger className="bg-white border-[var(--border)]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="REVIEW">Review</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              {/* Custom HTML tab */}
              <TabsContent value="html" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="customHtml"
                    className="text-[var(--text-secondary)]"
                  >
                    Custom HTML Code
                  </Label>
                  <p className="text-sm text-gray-500">
                    Add custom HTML that will be rendered as your content. Use this for special widgets, embeds,
                    or custom styling. You can use this instead of or in addition to the visual editor.
                  </p>
                  <Textarea
                    id="customHtml"
                    value={formData.customHtml}
                    onChange={(e) =>
                      setFormData({ ...formData, customHtml: e.target.value })
                    }
                    placeholder="<div>Your custom HTML here...</div>"
                    className="bg-white border-[var(--border)] font-mono text-sm min-h-[300px]"
                  />
                  {formData.customHtml && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-xs text-blue-700">
                        ✓ Custom HTML will be {formData.content ? 'combined with your content' : 'used as content'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4 pt-4 border-t border-[var(--border)]">
              <Button
                type="submit"
                className="bg-[var(--primary-green)] hover:bg-[var(--primary-green-dark)] text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent" />
                    Creating...
                  </>
                ) : (
                  "Create Documentation"
                )}
              </Button>
              <Link href="/dashboard/docs">
                <Button
                  type="button"
                  variant="outline"
                  className="border-[var(--border)] bg-transparent"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Upload Dialog */}

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Upload a new image to use in your documentation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="upload-file" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                  {uploadPreviewUrl ? (
                    <div className="relative">
                      <img
                        src={uploadPreviewUrl}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadSelectedFile(null);
                          setUploadPreviewUrl(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to select an image
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG, GIF, WEBP, SVG (max 5MB)
                      </p>
                    </>
                  )}
                </div>
                <Input
                  id="upload-file"
                  type="file"
                  accept="image/*"
                  onChange={handleUploadFileSelect}
                  className="hidden"
                />
              </Label>
            </div>

            <div>
              <Label htmlFor="upload-alt-text">
                Alt Text <span className="text-red-500">*</span>
              </Label>
              <Input
                id="upload-alt-text"
                value={uploadAltText}
                onChange={(e) => setUploadAltText(e.target.value)}
                placeholder="Describe the image..."
                className="mt-2"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUploadDialogOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUploadSubmit}
              disabled={
                uploading || !uploadSelectedFile || !uploadAltText.trim()
              }
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {uploading ? (
                <>
                  <div className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={mediaPickerOpen} onOpenChange={setMediaPickerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
            <DialogDescription>
              Choose an image from your media library
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 max-h-[400px] overflow-auto">
            {mediaLoading ? (
              <div className="col-span-full flex justify-center items-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-r-transparent" />
              </div>
            ) : mediaFiles.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-8">
                No media files available
              </div>
            ) : (
              mediaFiles.map((file) => (
                <Button
                  key={file.id}
                  variant="ghost"
                  className="flex flex-col items-center p-1 border border-gray-200 rounded-md hover:border-green-500 transition-colors"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, imageUrl: file.url }));
                    setMediaPickerOpen(false);
                    toast({
                      title: "Success",
                      description: "Image selected successfully",
                    });
                  }}
                >
                  <img
                    src={file.url}
                    alt={file.alt}
                    className="w-24 h-24 object-cover rounded mb-1"
                  />
                  <span className="text-xs truncate text-center w-full">
                    {file.alt}
                  </span>
                </Button>
              ))
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setMediaPickerOpen(false)} variant="outline">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
