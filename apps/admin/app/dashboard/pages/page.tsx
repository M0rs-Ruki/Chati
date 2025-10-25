"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Globe,
  Calendar,
  MoreVertical,
} from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  updatedAt: string;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/pages', {
        credentials: "include",
      });
      const data = await response.json();
      setPages(data.pages || []);
    } catch (error) {
      console.error("Failed to fetch pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    try {
      const response = await fetch(`/api/pages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        fetchPages();
        setDeleteId(null);
      }
    } catch (error) {
      console.error("Failed to delete page:", error);
    }
  };

  const handlePublish = async (id: string, currentStatus: string) => {
    try {
      const endpoint =
        currentStatus === "PUBLISHED"
          ? `/api/pages/${id}/unpublish`
          : `/api/pages/${id}/publish`;

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        fetchPages();
      }
    } catch (error) {
      console.error("Failed to publish/unpublish page:", error);
    }
  };

  const filteredPages = pages.filter(
    (page) =>
      page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === "PUBLISHED" ? (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        Published
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
        Draft
      </span>
    );
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
          <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-600 mt-1">
            Manage your landing pages and content
          </p>
        </div>
        <Link href="/dashboard/pages/create">
          <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            <Plus size={20} className="mr-2" />
            New Page
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search pages by title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Pages List */}
      {filteredPages.length > 0 ? (
        <div className="space-y-4">
          {filteredPages.map((page) => (
            <div
              key={page.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {page.title}
                    </h3>
                    {getStatusBadge(page.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <Globe className="w-4 h-4" />/{page.slug}
                  </p>
                  {page.description && (
                    <p className="text-gray-600 mb-4">{page.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Updated {new Date(page.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={`http://localhost:3000/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                  <Link href={`/dashboard/pages/${page.id}`}>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                      <Edit className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handlePublish(page.id, page.status)}
                    className="px-3 py-1 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                  >
                    {page.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Globe className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No pages found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? "Try a different search term"
              : "Create your first page to get started"}
          </p>
          {!searchQuery && (
            <Link href="/dashboard/pages/create">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                <Plus className="w-4 h-4 inline mr-2" />
                Create Page
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
