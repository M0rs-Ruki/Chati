"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Loading from "./loading";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  FileText,
  AlertCircle,
} from "lucide-react";
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
  const [mounted, setMounted] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    pageId: string | null;
  }>({
    open: false,
    pageId: null,
  });

  useEffect(() => {
    setMounted(true);
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
        description:
          error instanceof Error ? error.message : "Failed to delete page",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300";
      case "REVIEW":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300";
      case "ARCHIVED":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300";
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`pt-8 px-6 pb-12 space-y-8 max-w-7xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent flex items-center gap-3">
            <FileText className="w-10 h-10 text-indigo-600" />
            Pages
          </h2>
          <p className="text-lg text-gray-600">
            Manage your website pages with drag-and-drop builder
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/pages/create")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-600/25 transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Page
        </Button>
      </div>

      {/* Pages List */}
      {pages.length === 0 ? (
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardContent className="py-16 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No pages yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first page to get started!
            </p>
            <Button
              onClick={() => router.push("/dashboard/pages/create")}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
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
              className="relative overflow-hidden bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {page.title}
                    </h3>
                    <p className="text-sm text-indigo-600 font-mono mb-3">
                      /{page.slug}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold border shadow-sm ${getStatusColor(
                          page.status
                        )}`}
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
                      className="border-blue-200 hover:bg-blue-50 transition-all"
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
                      className="border-green-200 hover:bg-green-50 transition-all"
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
                      className="border-red-200 hover:bg-red-50 h-9 w-9 transition-all"
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
      <AlertDialog
        open={deleteModal.open}
        onOpenChange={(open) =>
          !deleting && setDeleteModal({ open, pageId: null })
        }
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              Delete Page
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete this page? This action cannot be
              undone and will permanently remove the page from your website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Warning:</strong> This will permanently delete the page.
              </span>
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} className="border-gray-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Forever"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
