"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { JSX } from "react/jsx-runtime";

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPage();
  }, [params.id]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/page/${params.id}`, {
        method: "GET",
        credentials: "include", // Include cookies for authentication
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-900">
            Loading preview...
          </p>
          <p className="text-sm text-gray-500">Rendering your page content</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-900">Page not found</p>
          <Button onClick={() => router.push("/dashboard/pages")}>
            Back to Pages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{page.title}</h2>
            <p className="text-sm text-gray-500">Preview Mode • /{page.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/pages/${params.id}/edit`)}
          >
            Edit Page
          </Button>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in New Tab
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="max-w-6xl mx-auto p-8 md:p-12">
          {page.content?.blocks && page.content.blocks.length > 0 ? (
            <div className="space-y-12">
              {page.content.blocks.map((component: any) => (
                <div key={component.id}>{renderComponent(component)}</div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No content added yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Add components in the editor to see them here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Page Metadata */}
      {page.metadata?.description && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            SEO Meta Description
          </h3>
          <p className="text-blue-700 text-sm">{page.metadata.description}</p>
        </div>
      )}
    </div>
  );
}
