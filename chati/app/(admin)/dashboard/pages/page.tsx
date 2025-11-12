"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Page {
  id: string;
  title: string;
  slug: string;
  content?: any;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function PagesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    pageId: string | null;
  }>({
    open: false,
    pageId: null,
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch("/api/page", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pages");
      }

      const result = await response.json();
      setPages(result.data || []);
    } catch (error) {
      console.error("Error fetching pages:", error);
      toast({
        title: "Error",
        description: "Failed to load pages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.pageId) return;

    setDeleting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/page/${deleteModal.pageId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to delete page");
      }

      // Remove page from local state
      setPages((prev) => prev.filter((p) => p.id !== deleteModal.pageId));
      setDeleteModal({ open: false, pageId: null });

      toast({
        title: "Success",
        description: "Page deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting page:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete page",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="pt-8 px-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Pages
          </h2>
          <p className="text-lg text-gray-600">
            Manage your website pages with drag-and-drop builder
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/pages/create")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Page
        </Button>
      </div>

      {/* Pages List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-green-600" />
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-gray-900">Loading pages...</p>
            <p className="text-sm text-gray-500">Please wait while we fetch your pages</p>
          </div>
        </div>
      ) : pages.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">
              No pages found. Create your first page to get started!
            </p>
            <Button
              onClick={() => router.push("/dashboard/pages/create")}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Page
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pages.map((page, index) => (
            <Card
              key={page.id}
              className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] animate-in slide-in-from-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {page.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 font-mono">
                      /{page.slug}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
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
                      <span className="text-xs text-gray-500">
                        Created {new Date(page.createdAt).toLocaleDateString()}
                      </span>
                      {page.publishedAt && (
                        <span className="text-xs text-gray-500">
                          Published{" "}
                          {new Date(page.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                      {page.author && (
                        <span className="text-xs text-gray-500">
                          by {page.author.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/pages/${page.id}`)}
                      className="border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Eye className="h-4 w-4 mr-1 text-blue-600" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/dashboard/pages/${page.id}/edit`)
                      }
                      className="border-gray-200 hover:bg-green-50 hover:border-green-300"
                    >
                      <Pencil className="h-4 w-4 mr-1 text-green-600" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setDeleteModal({ open: true, pageId: page.id })
                      }
                      className="border-gray-200 hover:bg-red-50 hover:border-red-300 h-9 w-9"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteModal.open} onOpenChange={(open) => !deleting && setDeleteModal({ open, pageId: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this page? This action cannot be undone and will permanently remove the page from your website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Page"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
