"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  Eye,
  FileText,
  Edit,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { JSX } from "react/jsx-runtime";

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchPage();
  }, [params.id]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/page/${params.id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in to view pages",
            variant: "destructive",
          });
          router.push("/auth/login");
          return;
        }
        throw new Error("Failed to fetch page");
      }

      const data = await response.json();
      setPage(data.data);
    } catch (error) {
      console.error("Error fetching page:", error);
      toast({
        title: "Error",
        description: "Failed to load page preview",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderComponent = (component: any) => {
    switch (component.type) {
      case "hero":
        return (
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 py-20 px-6 text-center rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
              {component.data.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {component.data.subtitle}
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              {component.data.buttonText}
            </Button>
          </div>
        );
      case "heading":
        const HeadingTag = component.data.level as keyof JSX.IntrinsicElements;
        const headingSizes: Record<string, string> = {
          h1: "text-4xl",
          h2: "text-3xl",
          h3: "text-2xl",
          h4: "text-xl",
        };
        return (
          <HeadingTag
            className={`font-bold text-gray-900 ${
              headingSizes[component.data.level] || "text-2xl"
            }`}
          >
            {component.data.text}
          </HeadingTag>
        );
      case "paragraph":
        return (
          <p className="text-gray-700 leading-relaxed">{component.data.text}</p>
        );
      case "button":
        return (
          <Button
            className={
              component.data.variant === "primary"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            }
          >
            {component.data.text}
          </Button>
        );
      case "image":
        return (
          <img
            src={component.data.src || "/placeholder.svg"}
            alt={component.data.alt || "Image"}
            className="w-full rounded-lg shadow-md"
          />
        );
      case "text-image":
        return (
          <div
            className={`grid md:grid-cols-2 gap-8 items-center ${
              component.data.imagePosition === "left"
                ? "md:flex-row-reverse"
                : ""
            }`}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {component.data.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {component.data.text}
              </p>
            </div>
            <div>
              <img
                src={component.data.imageSrc || "/placeholder.svg"}
                alt={component.data.title}
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        );
      case "feature-cards":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              {component.data.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {component.data.cards?.map((card: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "faq":
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              {component.data.title}
            </h2>
            <div className="space-y-4">
              {component.data.items?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-gray-200 rounded-lg"
                >
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "divider":
        return <hr className="border-gray-300 my-8" />;
      default:
        return (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800">
              Unknown component type: {component.type}
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <FileText className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Page not found
          </h3>
          <p className="text-gray-600">
            The page you're looking for doesn't exist
          </p>
          <Button
            onClick={() => router.push("/dashboard/pages")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`space-y-8 p-6 max-w-7xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="border-gray-200 hover:bg-white transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Eye className="h-5 w-5 text-indigo-600" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                {page.title}
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              Preview Mode -{" "}
              <span className="text-indigo-600 font-mono">/{page.slug}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/pages/${params.id}/edit`)}
            className="border-green-200 hover:bg-green-50 transition-all"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Page
          </Button>
          <Button
            variant="outline"
            className="border-blue-200 hover:bg-blue-50 transition-all"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in New Tab
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div className="max-w-6xl mx-auto p-8 md:p-12">
          {page.content?.blocks && page.content.blocks.length > 0 ? (
            <div className="space-y-12">
              {page.content.blocks.map((component: any) => (
                <div key={component.id}>{renderComponent(component)}</div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No content added yet</p>
              <p className="text-gray-400 text-sm mb-6">
                Add components in the editor to see them here
              </p>
              <Button
                onClick={() =>
                  router.push(`/dashboard/pages/${params.id}/edit`)
                }
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Start Editing
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Page Metadata */}
      {page.metadata?.description && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SEO Meta Description
          </h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            {page.metadata.description}
          </p>
        </div>
      )}
    </div>
  );
}
