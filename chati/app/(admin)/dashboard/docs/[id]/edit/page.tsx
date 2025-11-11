"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { ArrowLeft, Upload } from "lucide-react";
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

      // Debug: Log the content structure
      console.log("Documentation content:", doc.content);
      console.log("Full doc:", doc);

      // Try multiple ways to extract content
      let contentText = "";
      if (doc.content) {
        if (typeof doc.content === "string") {
          contentText = doc.content;
        } else if (doc.content.html) {
          // HTML content from WYSIWYGEditor (most common)
          contentText = doc.content.html;
        } else if (doc.content.markdown) {
          contentText = doc.content.markdown;
        } else if (doc.content.content) {
          contentText = doc.content.content;
        } else {
          // If content is an object but none of the expected keys, stringify it
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

      // Prepare the request body
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
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary-green)] border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
          <div>
            #
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              Edit Documentation
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Update your documentation
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

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="meta">Meta</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-6">
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
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Create New
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
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

                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">
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
                    onValueChange={(value: Documentation["status"]) =>
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
            </Tabs>

            <div className="flex gap-4 pt-4 border-t border-[var(--border)]">
              <Button
                type="submit"
                className="bg-[var(--primary-green)] hover:bg-[var(--primary-green-dark)] text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent mr-2" />
                    Updating...
                  </>
                ) : (
                  "Update Documentation"
                )}
              </Button>
              <Link href="/dashboard/docs">
                <Button
                  type="button"
                  variant="outline"
                  className="border-[var(--border)] bg-transparent"
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
