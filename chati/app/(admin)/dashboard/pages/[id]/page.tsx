"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-900">Loading page...</p>
          <p className="text-sm text-gray-500">
            Please wait while we fetch the page details
          </p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <p className="text-lg text-gray-500">Page not found</p>
        <Button
          onClick={() => router.push("/dashboard/pages")}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pages
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/pages")}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{page.title}</h2>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-gray-600 font-mono text-sm">/{page.slug}</p>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  page.status === "PUBLISHED"
                    ? "bg-green-100 text-green-700"
                    : page.status === "REVIEW"
                    ? "bg-blue-100 text-blue-700"
                    : page.status === "ARCHIVED"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {page.status}
              </span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/dashboard/pages/${page.id}/edit`)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Page
        </Button>
      </div>

      {/* Page Metadata */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500 font-medium">Created</p>
            <p className="text-gray-900">
              {new Date(page.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Updated</p>
            <p className="text-gray-900">
              {new Date(page.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Published</p>
            <p className="text-gray-900">
              {page.publishedAt
                ? new Date(page.publishedAt).toLocaleDateString()
                : "Not published"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Author</p>
            <p className="text-gray-900">{page.author?.name || "Unknown"}</p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[500px]">
        {page.content?.blocks &&
        Array.isArray(page.content.blocks) &&
        page.content.blocks.length > 0 ? (
          <div className="space-y-8">
            {page.content.blocks.map((block: any, index: number) => (
              <div key={block.id || index} className="space-y-4">
                {block.type === "hero" && (
                  <div className="text-center py-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <h1 className="text-5xl font-bold mb-4 text-gray-900">
                      {block.data?.title || "Hero Title"}
                    </h1>
                    <p className="text-xl text-gray-600">
                      {block.data?.subtitle || "Hero Subtitle"}
                    </p>
                    {block.data?.buttonText && (
                      <Button className="mt-6 bg-green-600 hover:bg-green-700">
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
                      alt={block.data.alt || "Page image"}
                      className="w-full h-auto object-cover"
                    />
                    {block.data.caption && (
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        {block.data.caption}
                      </p>
                    )}
                  </div>
                )}
                {block.type === "features" && (
                  <div className="grid md:grid-cols-3 gap-6">
                    {block.data?.items?.map((item: any, i: number) => (
                      <div key={i} className="p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No content added to this page yet.
            </p>
            <Button
              onClick={() => router.push(`/dashboard/pages/${page.id}/edit`)}
              className="mt-4 bg-green-600 hover:bg-green-700"
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
