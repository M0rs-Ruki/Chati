"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag,
  BookOpen,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  status: "DRAFT" | "PUBLISHED";
  categoryId?: string;
  tagIds?: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "DRAFT" | "PUBLISHED"
  >("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsRes, categoriesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, { credentials: "include" }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
          credentials: "include",
        }),
      ]);
      const [postsData, categoriesData] = await Promise.all([
        postsRes.json(),
        categoriesRes.json(),
      ]);
      setPosts(postsData.posts || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handlePublish = async (id: string, currentStatus: string) => {
    try {
      const endpoint =
        currentStatus === "PUBLISHED"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}/unpublish`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}/publish`;

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to publish/unpublish post:", error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCategoryName = (categoryId?: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Uncategorized";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">
            Create and manage your blog content
          </p>
        </div>
        <Link href="/dashboard/blog/create">
          <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            <Plus size={20} className="mr-2" />
            New Post
          </button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg transition ${
                statusFilter === "all"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("DRAFT")}
              className={`px-4 py-2 rounded-lg transition ${
                statusFilter === "DRAFT"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Draft
            </button>
            <button
              onClick={() => setStatusFilter("PUBLISHED")}
              className={`px-4 py-2 rounded-lg transition ${
                statusFilter === "PUBLISHED"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Published
            </button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
            >
              <div className="flex gap-6">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {post.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            post.status === "PUBLISHED"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>
                      {post.excerpt && (
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </span>
                        {post.categoryId && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs">
                            <Tag className="w-3 h-3" />
                            {getCategoryName(post.categoryId)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <a
                        href={`http://localhost:3000/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <Link href={`/dashboard/blog/${post.id}`}>
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handlePublish(post.id, post.status)}
                        className="px-3 py-1 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                      >
                        {post.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? "Try a different search term"
              : "Start writing your first blog post"}
          </p>
          {!searchQuery && (
            <Link href="/dashboard/blog/create">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                <Plus className="w-4 h-4 inline mr-2" />
                Create Post
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
