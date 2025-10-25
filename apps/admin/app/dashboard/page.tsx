"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  Image as ImageIcon,
  TrendingUp,
  Clock,
  User,
  Plus,
  Users,
  FolderOpen,
  Tags,
  Menu as MenuIcon,
  Palette,
  Navigation as NavigationIcon,
} from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: string;
  createdAt: string;
  publishedAt: string | null;
}

interface Stats {
  users: number;
  pages: number;
  posts: number;
  media: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    pages: 0,
    posts: 0,
    media: 0,
  });
  const [recentPages, setRecentPages] = useState<Page[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel
      const [usersRes, pagesRes, postsRes, mediaRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, { credentials: "include" }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`, { credentials: "include" }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, { credentials: "include" }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media`, { credentials: "include" }),
      ]);

      const [usersData, pagesData, postsData, mediaData] = await Promise.all([
        usersRes.json(),
        pagesRes.json(),
        postsRes.json(),
        mediaRes.json(),
      ]);

      // Set stats
      setStats({
        users: usersData.users?.length || 0,
        pages: pagesData.pages?.length || 0,
        posts: postsData.posts?.length || 0,
        media: mediaData.pagination?.total || 0,
      });

      // Set recent items (last 5)
      setRecentPages((pagesData.pages || []).slice(0, 5));
      setRecentPosts((postsData.posts || []).slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "blue",
      link: "/dashboard/users",
    },
    {
      title: "Total Pages",
      value: stats.pages,
      icon: FileText,
      color: "green",
      link: "/dashboard/pages",
    },
    {
      title: "Blog Posts",
      value: stats.posts,
      icon: BookOpen,
      color: "purple",
      link: "/dashboard/blog",
    },
    {
      title: "Media Files",
      value: stats.media,
      icon: ImageIcon,
      color: "orange",
      link: "/dashboard/media",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      desc: "Add or edit users",
      icon: Users,
      link: "/dashboard/users",
      color: "blue",
    },
    {
      title: "Create Page",
      desc: "Build a new page",
      icon: FileText,
      link: "/dashboard/pages",
      color: "green",
    },
    {
      title: "Write Post",
      desc: "Publish blog content",
      icon: BookOpen,
      link: "/dashboard/blog",
      color: "purple",
    },
    {
      title: "Upload Media",
      desc: "Add images & files",
      icon: ImageIcon,
      link: "/dashboard/media",
      color: "orange",
    },
    {
      title: "Navigation",
      desc: "Edit menus",
      icon: NavigationIcon,
      link: "/dashboard/navigation",
      color: "indigo",
    },
    {
      title: "Theme",
      desc: "Customize design",
      icon: Palette,
      link: "/dashboard/theme",
      color: "pink",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header - glassy */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-7 border border-emerald-200/40 bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(16,185,129,0.25)]">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-200/30 blur-2xl" />
        <div className="absolute right-6 top-6 h-10 w-10 rounded-full bg-emerald-300/30 blur-xl" />
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900">
          Welcome to Chati CMS
        </h1>
        <p className="text-emerald-800/70 mt-2">
          Here’s what’s happening with your content
        </p>
      </div>

      {/* Stats Grid - frosted stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-emerald-200/40 bg-white/40 backdrop-blur-xl p-6 shadow-[0_10px_30px_-12px_rgba(16,185,129,0.25)] transition-all hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.35)] hover:-translate-y-0.5">
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-emerald-300/30 blur-3xl transition-opacity group-hover:opacity-90" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-900/70 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-emerald-900">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-100/70 ring-1 ring-emerald-300/40 shadow-inner">
                  <stat.icon className="w-6 h-6 text-emerald-700" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full rounded bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 opacity-60 group-hover:opacity-90" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Pages - glass card */}
        <div className="relative rounded-2xl border border-emerald-200/40 bg-white/40 backdrop-blur-xl shadow-[0_10px_30px_-12px_rgba(16,185,129,0.25)]">
          <div className="border-b border-emerald-200/40 p-4 flex items-center justify-between bg-gradient-to-r from-emerald-100/40 to-transparent">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-900">
              <FileText className="w-5 h-5 text-emerald-700" />
              Recent Pages
            </h2>
            <Link href="/dashboard/pages">
              <button className="text-sm text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-4">
                View All
              </button>
            </Link>
          </div>
          <div>
            {recentPages.length > 0 ? (
              <div className="divide-y divide-emerald-200/40">
                {recentPages.map((page) => (
                  <div
                    key={page.id}
                    className="p-4 hover:bg-emerald-50/40 transition"
                  >
                    <h3 className="font-medium text-emerald-950">
                      {page.title}
                    </h3>
                    <p className="text-sm text-emerald-800/70">/{page.slug}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-emerald-800/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-700" />
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ring-1 ${
                          page.status === "PUBLISHED"
                            ? "bg-emerald-100/80 text-emerald-800 ring-emerald-300/60"
                            : "bg-emerald-50/70 text-emerald-900 ring-emerald-200/60"
                        }`}
                      >
                        {page.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 mx-auto text-emerald-300 mb-3" />
                <p className="text-emerald-800/70 mb-4">No pages yet</p>
                <Link href="/dashboard/pages">
                  <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.6)] hover:bg-emerald-700 transition">
                    Create First Page
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Blog Posts - glass card */}
        <div className="relative rounded-2xl border border-emerald-200/40 bg-white/40 backdrop-blur-xl shadow-[0_10px_30px_-12px_rgba(16,185,129,0.25)]">
          <div className="border-b border-emerald-200/40 p-4 flex items-center justify-between bg-gradient-to-r from-emerald-100/40 to-transparent">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-900">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              Recent Blog Posts
            </h2>
            <Link href="/dashboard/blog">
              <button className="text-sm text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-4">
                View All
              </button>
            </Link>
          </div>
          <div>
            {recentPosts.length > 0 ? (
              <div className="divide-y divide-emerald-200/40">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 hover:bg-emerald-50/40 transition"
                  >
                    <h3 className="font-medium text-emerald-950">
                      {post.title}
                    </h3>
                    <p className="text-sm text-emerald-800/70 mt-1 line-clamp-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-emerald-800/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-700" />
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString()
                          : "Not published"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ring-1 ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-100/80 text-emerald-800 ring-emerald-300/60"
                            : "bg-emerald-50/70 text-emerald-900 ring-emerald-200/60"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <BookOpen className="w-12 h-12 mx-auto text-emerald-300 mb-3" />
                <p className="text-emerald-800/70 mb-4">No blog posts yet</p>
                <Link href="/dashboard/blog">
                  <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.6)] hover:bg-emerald-700 transition">
                    Create First Post
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions - glass tiles */}
      <div className="relative rounded-2xl border border-emerald-200/40 bg-white/40 backdrop-blur-xl p-6 shadow-[0_10px_30px_-12px_rgba(16,185,129,0.25)]">
        <h2 className="text-xl font-semibold text-emerald-950 mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.link}>
              <div className="border border-emerald-200/40 rounded-xl p-4 bg-white/40 backdrop-blur-xl hover:bg-emerald-50/40 cursor-pointer transition shadow-[0_8px_20px_-12px_rgba(16,185,129,0.25)] hover:shadow-[0_16px_30px_-12px_rgba(16,185,129,0.35)]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100/70 ring-1 ring-emerald-300/40 shadow-inner">
                    <action.icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-950">
                      {action.title}
                    </p>
                    <p className="text-xs text-emerald-800/70">{action.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
