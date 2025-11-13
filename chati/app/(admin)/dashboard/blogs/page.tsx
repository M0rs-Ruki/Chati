"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoadingBlog from "./loading";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Loader2,
  Newspaper,
  Tag,
  AlertCircle,
} from "lucide-react";
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
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
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
        description:
          error instanceof Error ? error.message : "Failed to delete blog post",
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
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300";
      case "DRAFT":
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border-yellow-300";
      case "REVIEW":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300";
      case "ARCHIVED":
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300";
    }
  };

  if (loading) {
    return <LoadingBlog />;
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
            <Newspaper className="w-10 h-10 text-orange-600" />
            Blog Posts 
          </h2>
          <p className="text-lg text-gray-600">
            Manage your blog posts and articles
            {!loading && pagination.total > 0 && (
              <span className="ml-2 text-sm font-semibold text-orange-600">
                ({pagination.total} total)
              </span>
            )}
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/blogs/create")}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-orange-600/25 transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Blog Post
        </Button>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
        <Input
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all h-12"
        />
      </div>

      {filteredBlogs.length === 0 ? (
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardContent className="py-16 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-4">
              <Newspaper className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? "No blog posts found" : "No blog posts yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Try adjusting your search query"
                : "Create your first blog post to get started!"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => router.push("/dashboard/blogs/create")}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Blog Post
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <Card
              key={blog.id}
              className="relative overflow-hidden bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <CardContent className="p-6 relative z-10">
                {blog.imageUrl && (
                  <div className="relative mb-4 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold border shadow-sm ${getStatusColor(
                      blog.status
                    )}`}
                  >
                    {blog.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 leading-tight">
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
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded-md"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/dashboard/blogs/${blog.id}`)}
                    disabled={deleting}
                    className="flex-1 border-blue-200 hover:bg-blue-50 transition-all"
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
                    className="flex-1 border-green-200 hover:bg-green-50 transition-all"
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
                    className="border-red-200 hover:bg-red-50 px-2 transition-all"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, blogId: null })}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              Delete Blog Post
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Warning:</strong> This will permanently delete the blog
                post.
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
