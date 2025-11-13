"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingCreate from "./loading";
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
import {
  ArrowLeft,
  Upload,
  X,
  Loader2,
  Newspaper,
  Plus,
  ImageIcon,
} from "lucide-react";
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

export default function CreateBlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
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

  // Media Picker State
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate initial page load
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  const handleUploadFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploadSelectedFile(file);

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

      setFormData((prev) => ({ ...prev, imageUrl: result.data.url }));

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const token = localStorage.getItem("token");

      if (!token) {
        toast({
          title: "Error",
          description: "Authentication required. Please login again.",
          variant: "destructive",
        });
        router.push("/admin");
        return;
      }

      const tags = formData.metadata.tags
        ? formData.metadata.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [];

      let finalContent = formData.content;
      if (formData.customHtml) {
        if (formData.content) {
          finalContent = `${formData.content}\n\n${formData.customHtml}`;
        } else {
          finalContent = formData.customHtml;
        }
      }

      const requestBody = {
        title: formData.title,
        content: { html: finalContent },
        metadata: {
          description: formData.metadata.description || "",
          tags: tags,
        },
        imageUrl: formData.imageUrl || null,
      };

      const response = await fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create blog post");
      }

      toast({
        title: "Success",
        description: "Blog post created successfully",
      });

      router.push("/dashboard/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingCreate />;
  }

  return (
    <div
      className={`pt-8 px-6 pb-12 space-y-8 max-w-5xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/blogs">
            <Button
              variant="outline"
              size="icon"
              className="border-gray-200 hover:bg-gray-100 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Create Blog Post 
            </h2>
            <p className="text-gray-600">Write and publish a new blog post</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="border-b border-gray-200 px-6 py-4">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-orange-600" />
              Blog Post Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700 font-medium">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter blog post title"
                required
                className="bg-white border-gray-200"
              />
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="meta"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Meta
                </TabsTrigger>
                <TabsTrigger
                  value="html"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Custom HTML
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="imageUrl"
                    className="text-gray-700 font-medium"
                  >
                    Hero Image
                  </Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white border-purple-200 hover:bg-purple-50 transition-all"
                        onClick={() => setUploadDialogOpen(true)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload New
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white border-blue-200 hover:bg-blue-50 transition-all"
                        onClick={() => setMediaPickerOpen(true)}
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Choose Existing
                      </Button>
                    </div>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      placeholder="Or enter image URL"
                      className="bg-white border-gray-200"
                    />
                    {formData.imageUrl && (
                      <div className="relative mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Content</Label>
                  <p className="text-xs text-gray-500 mb-2">
                    Use the visual editor for content or switch to Custom HTML
                    tab
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
                    className="text-gray-700 font-medium"
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
                    placeholder="Brief description of the blog post"
                    className="bg-white border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-gray-700 font-medium">
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
                    placeholder="tutorial, guide, tips"
                    className="bg-white border-gray-200"
                  />
                </div>

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
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="html" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="customHtml"
                    className="text-gray-700 font-medium"
                  >
                    Custom HTML Code
                  </Label>
                  <p className="text-sm text-gray-500">
                    Add custom HTML that will be rendered as your content. Use
                    this for special widgets, embeds, or custom styling. You can
                    use this instead of or in addition to the visual editor.
                  </p>
                  <Textarea
                    id="customHtml"
                    value={formData.customHtml}
                    onChange={(e) =>
                      setFormData({ ...formData, customHtml: e.target.value })
                    }
                    placeholder="<div>Your custom HTML here...</div>"
                    className="bg-white border-gray-200 font-mono text-sm min-h-[300px]"
                  />
                  {formData.customHtml && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-xs text-blue-700">
                        ✓ Custom HTML will be{" "}
                        {formData.content
                          ? "combined with your content"
                          : "used as content"}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-orange-600/25 transition-all duration-300 hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Blog Post
                  </>
                )}
              </Button>
              <Link href="/dashboard/blogs">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-200 bg-transparent hover:bg-gray-100"
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
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-600" />
              Upload Image
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Upload a new image to use in your blog post
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="upload-file" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 hover:bg-purple-50/50 transition-all duration-300">
                  {uploadPreviewUrl ? (
                    <div className="relative">
                      <img
                        src={uploadPreviewUrl}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full shadow-lg"
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
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center mb-3">
                        <Upload className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Click to select an image
                      </p>
                      <p className="text-xs text-gray-500">
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
              <Label
                htmlFor="upload-alt-text"
                className="text-gray-700 font-medium"
              >
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
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUploadSubmit}
              disabled={
                uploading || !uploadSelectedFile || !uploadAltText.trim()
              }
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Media Picker Dialog */}
      <Dialog open={mediaPickerOpen} onOpenChange={setMediaPickerOpen}>
        <DialogContent className="bg-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-600" />
              Select Image
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Choose an image from your media library
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 max-h-[400px] overflow-auto">
            {mediaLoading ? (
              <div className="col-span-full flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
              </div>
            ) : mediaFiles.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <ImageIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No media files available</p>
              </div>
            ) : (
              mediaFiles.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  className="flex flex-col items-center p-2 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
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
                    className="w-full h-24 object-cover rounded mb-2 transition-transform group-hover:scale-110"
                  />
                  <span className="text-xs truncate text-center w-full text-gray-700">
                    {file.alt}
                  </span>
                </button>
              ))
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={() => setMediaPickerOpen(false)}
              variant="outline"
              className="border-gray-200"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
