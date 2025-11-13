"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingEditDoc from "./loading"
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
import {
  ArrowLeft,
  Upload,
  Loader2,
  BookOpen,
  Save,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { WYSIWYGEditor } from "@/components/wysiwyg-editor";
import { useToast } from "@/hooks/use-toast";

interface Documentation {
  id: string;
  title: string;
  content: Record<string, any>;
  imageUrl?: string | null;
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
  metadata: {
    tags?: string[];
    description?: string;
  };
}

export default function EditDocPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    status: "DRAFT" as Documentation["status"],
    metadata: {
      description: "",
      tags: "",
    },
  });

  useEffect(() => {
    setMounted(true);
    fetchDoc();
  }, [params.id]);

  const fetchDoc = async () => {
    try {
      setFetching(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/documentation/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch documentation");
      }

      const result = await response.json();
      const doc = result.data;

      console.log("Documentation content:", doc.content);
      console.log("Full doc:", doc);

      let contentText = "";
      if (doc.content) {
        if (typeof doc.content === "string") {
          contentText = doc.content;
        } else if (doc.content.html) {
          contentText = doc.content.html;
        } else if (doc.content.markdown) {
          contentText = doc.content.markdown;
        } else if (doc.content.content) {
          contentText = doc.content.content;
        } else {
          contentText = JSON.stringify(doc.content);
        }
      }

      setFormData({
        title: doc.title,
        content: contentText,
        imageUrl: doc.imageUrl || "",
        status: doc.status,
        metadata: {
          description: doc.metadata?.description || "",
          tags: doc.metadata?.tags?.join(", ") || "",
        },
      });
    } catch (error) {
      console.error("Error fetching documentation:", error);
      toast({
        title: "Error",
        description: "Failed to load documentation",
        variant: "destructive",
      });
      router.push("/dashboard/docs");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const updateData = {
        title: formData.title,
        content: { html: formData.content },
        imageUrl: formData.imageUrl || null,
        status: formData.status,
        metadata: {
          description: formData.metadata.description,
          tags: formData.metadata.tags
            ? formData.metadata.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
            : [],
        },
      };

      const response = await fetch(`/api/documentation/${params.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update documentation");
      }

      toast({
        title: "Success",
        description: "Documentation updated successfully",
      });

      router.push("/dashboard/docs");
    } catch (error) {
      console.error("Error updating documentation:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update documentation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <LoadingEditDoc />;
  }

  return (
    <div
      className={`pt-8 px-6 pb-12 space-y-8 max-w-5xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/docs">
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
              Edit Documentation ✏️
            </h2>
            <p className="text-gray-600">Update your documentation</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Documentation Details
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
                placeholder="Enter documentation title"
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
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload New
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white border-blue-200 hover:bg-blue-50 transition-all"
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
                      <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <WYSIWYGEditor
                    value={formData.content}
                    onChange={(content: string) =>
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
                    placeholder="Brief description of the documentation"
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
                    placeholder="api, guide, tutorial"
                    className="bg-white border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-gray-700 font-medium">
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Documentation["status"]) =>
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
            </Tabs>

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-600/25 transition-all duration-300 hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Documentation
                  </>
                )}
              </Button>
              <Link href="/dashboard/docs">
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
    </div>
  );
}
