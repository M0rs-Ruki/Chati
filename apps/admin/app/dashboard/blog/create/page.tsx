"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Eye } from "lucide-react";
import dynamic from "next/dynamic";

// Use react-simple-wysiwyg instead of ReactQuill
const Editor = dynamic(
  () => import("react-simple-wysiwyg").then((mod) => mod.default),
  { ssr: false }
);

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  categoryId?: string;
  tagIds?: string[];
  status: "DRAFT" | "PUBLISHED";
  seoTitle?: string;
  seoDescription?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function BlogCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams?.get("id");

  const [postData, setPostData] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categoryId: "",
    tagIds: [],
    status: "DRAFT",
    seoTitle: "",
    seoDescription: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/categories", {
        credentials: "include",
      });
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/blog/${postId}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.post) {
        setPostData(data.post);
        if (data.post.tagIds) {
          setTags(data.post.tagIds);
        }
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  };

  const savePost = async () => {
    setIsSaving(true);
    try {
      const url = postId
        ? `http://localhost:3001/api/blog/${postId}`
        : "http://localhost:3001/api/blog";

      const response = await fetch(url, {
        method: postId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...postData, tagIds: tags }),
      });

      if (response.ok) {
        router.push("/dashboard/blog");
      }
    } catch (error) {
      console.error("Failed to save post:", error);
      alert("Error saving post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard/blog")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {postId ? "Edit Post" : "New Post"}
            </h1>
            <p className="text-gray-600 mt-1">
              Write and publish your blog content
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {postId && postData.slug && (
            <a
              href={`http://localhost:3000/blog/${postData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Eye size={18} />
              Preview
            </a>
          )}
          <button
            onClick={savePost}
            disabled={isSaving}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 font-semibold"
          >
            <Save size={20} />
            {isSaving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={postData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setPostData({
                    ...postData,
                    title,
                    slug: postId
                      ? postData.slug
                      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                  });
                }}
                placeholder="Your amazing blog post title"
                className="w-full px-4 py-2 text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">/blog/</span>
                <input
                  type="text"
                  value={postData.slug}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, ""),
                    })
                  }
                  placeholder="your-post-slug"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={postData.excerpt}
                onChange={(e) =>
                  setPostData({ ...postData, excerpt: e.target.value })
                }
                placeholder="Brief summary of your post..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Content *</h2>
            </div>
            <div className="p-4">
              <Editor
                value={postData.content}
                onChange={(e: any) =>
                  setPostData({ ...postData, content: e.target.value })
                }
                containerProps={{
                  style: {
                    minHeight: "400px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "16px",
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold">Publish Settings</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={postData.status}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    status: e.target.value as "DRAFT" | "PUBLISHED",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={postData.categoryId || ""}
                onChange={(e) =>
                  setPostData({ ...postData, categoryId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL
              </label>
              <input
                type="text"
                value={postData.coverImage || ""}
                onChange={(e) =>
                  setPostData({ ...postData, coverImage: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              {postData.coverImage && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <img
                    src={postData.coverImage}
                    alt="Cover"
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    onClick={() => removeTag(tag)}
                    className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full cursor-pointer hover:bg-gray-200"
                  >
                    {tag} ×
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold">SEO</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={postData.seoTitle || ""}
                onChange={(e) =>
                  setPostData({ ...postData, seoTitle: e.target.value })
                }
                placeholder={postData.title || "SEO title for search engines"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                {(postData.seoTitle || postData.title || "").length}/60
                characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={postData.seoDescription || ""}
                onChange={(e) =>
                  setPostData({ ...postData, seoDescription: e.target.value })
                }
                placeholder={
                  postData.excerpt || "SEO description for search engines"
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {(postData.seoDescription || "").length}/160 characters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
