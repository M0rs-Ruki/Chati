"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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

interface Blog {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
  metadata: {
    description?: string;
    tags?: string[];
  };
}

export default function BlogsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    blogId: string | null;
  }>({
    open: false,
    blogId: null,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      // Fetch with pagination support
      const response = await fetch("/api/blog?page=1&limit=100", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const result = await response.json();
      setBlogs(result.data || []);
      
      // Update pagination info if available
      if (result.pagination) {
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.blogId) return;

    try {
      setDeleting(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      // Fixed: Use the correct delete endpoint path
      const response = await fetch(`/api/blog/${deleteDialog.blogId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete blog");
      }

      // Remove blog from local state
      setBlogs((prev) => prev.filter((b) => b.id !== deleteDialog.blogId));
      setDeleteDialog({ open: false, blogId: null });

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete blog post",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-700";
      case "REVIEW":
        return "bg-blue-100 text-blue-700";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="pt-8 px-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Blog Posts
          </h2>
          <p className="text-lg text-gray-600">
            Manage your blog posts and articles
            {!loading && pagination.total > 0 && (
              <span className="ml-2 text-sm font-medium text-green-600">
                ({pagination.total} total)
              </span>
            )}
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/blogs/create")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Blog Post
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors" />
        <Input
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-gray-200 focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-r-transparent" />
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">
              {searchQuery
                ? "No blog posts found matching your search"
                : "No blog posts yet. Create your first blog post to get started!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <Card
              key={blog.id}
              className="bg-white border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                      blog.status
                    )}`}
                  >
                    {blog.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {blog.metadata?.description || "No description"}
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                  {blog.author?.name || "Unknown"}
                </div>
                {blog.metadata?.tags && blog.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.metadata.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={`${blog.id}-${tag}-${idx}`}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      router.push(`/dashboard/blogs/${blog.id}`)
                    }
                    disabled={deleting}
                    className="flex-1 border-gray-200 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      router.push(`/dashboard/blogs/${blog.id}/edit`)
                    }
                    disabled={deleting}
                    className="flex-1 border-gray-200 hover:bg-green-50 hover:border-green-300 disabled:opacity-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setDeleteDialog({ open: true, blogId: blog.id })
                    }
                    disabled={deleting}
                    className="border-gray-200 hover:bg-red-50 hover:border-red-300 px-2 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, blogId: null })}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? (
                <>
                  <div className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
