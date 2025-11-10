"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Newspaper,
  ImageIcon,
  TrendingUp,
  Calendar,
  User,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Rocket,
  Eye,
} from "lucide-react";
import { format } from "date-fns";

interface Page {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  author: {
    id: string;
    name: string;
  };
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  author: {
    id: string;
    name: string;
  };
}

interface DashboardData {
  totalPages: number;
  totalUsers: number;
  totalBlogs: number;
  totalMedias: number;
  recentPages: Page[];
  recentBlogs: BlogPost[];
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch current user
      const userResponse = await fetch("/api/auth/me");
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setCurrentUser(userData.user);
      }

      // Fetch dashboard data
      const response = await fetch("/api/public/dashboard");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      // CHANGE THIS:
      setDashboardData(data.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Safely access data with defaults
  const pages = dashboardData?.recentPages || [];
  const posts = dashboardData?.recentBlogs || [];
  const homePages = pages.filter(
    (p) => p.slug === "home" || p.title.toLowerCase() === "home"
  );
  const hasHomepageIssue = homePages.length !== 1;

  const stats = [
    {
      title: "Total Pages",
      value: dashboardData?.totalPages || 0,
      icon: FileText,
      color: "blue",
      link: "/dashboard/pages",
    },
    {
      title: "Blog Posts",
      value: dashboardData?.totalBlogs || 0,
      icon: Newspaper,
      color: "purple",
      link: "/dashboard/blogs",
    },
    {
      title: "Media Files",
      value: dashboardData?.totalMedias || 0,
      icon: ImageIcon,
      color: "green",
      link: "/dashboard/media",
    },
    {
      title: "Published",
      value: [...pages, ...posts].filter((item) => item.status === "PUBLISHED")
        .length,
      icon: TrendingUp,
      color: "orange",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "secondary" | "outline" | "default" | "destructive"
    > = {
      DRAFT: "secondary",
      REVIEW: "outline",
      PUBLISHED: "default",
      ARCHIVED: "destructive",
    };
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status.toLowerCase()}
      </Badge>
    );
  };

  return (
    <div className="pt-8 px-6 space-y-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Welcome back{currentUser ? `, ${currentUser.name}` : ""}
        </h1>
        <p className="text-lg text-gray-600">
          Here's what's happening with your content
        </p>
      </div>

      {/* Featured: Create Demo Page Card */}
      <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 border-0 text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-left duration-500">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-8 h-8 animate-pulse" />
                <h3 className="text-2xl font-bold">
                  Create Ultimate Demo Page
                </h3>
              </div>
              <p className="text-white/90 mb-6 text-lg">
                Showcase all 20+ premium sections in one beautiful demo page
                with real sample data
              </p>
              <Link href="/dashboard/pages/create">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-xl"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Create Demo Now
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block text-8xl opacity-20">🚀</div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Setup Cards */}
      <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500 delay-150">
        {/* Setup Homepage */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  🏠 Setup Homepage
                </h3>
                <p className="text-gray-600 mb-4">
                  Clean and rebuild your homepage with professional Chati.ai
                  design
                </p>
                <Link href="/dashboard/pages/create">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Setup Homepage
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Industry Page */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  🤖 Quick Chatbot Development
                </h3>
                <p className="text-gray-600 mb-4">
                  Create industry page with chatbot features and sections
                </p>
                <Link href="/dashboard/pages/create">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Create Industry Page
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Homepage Issue Alert */}
      {hasHomepageIssue && (
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ⚠️ Homepage Issue Detected
                </h3>
                <p className="text-gray-600 mb-4">
                  {homePages.length === 0
                    ? "No homepage found. Your site needs a homepage to work properly."
                    : `Found ${homePages.length} duplicate home pages. This will cause issues.`}
                </p>
                <Link href="/dashboard/pages">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Fix Homepage Now
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      {!hasHomepageIssue && pages.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">
                ✓ Homepage is properly configured
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-500 delay-300">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
                {stat.link && (
                  <Link href={stat.link}>
                    <Button variant="ghost" size="sm" className="mt-4 w-full">
                      View All
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Pages */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Pages
              </CardTitle>
              <Link href="/dashboard/pages">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {pages.length > 0 ? (
              <div className="divide-y">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {page.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          /{page.slug}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {page.publishedAt
                              ? format(
                                  new Date(page.publishedAt),
                                  "MMM d, yyyy"
                                )
                              : "Not published"}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {page.author.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(page.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 mb-4">No pages yet</p>
                <Link href="/dashboard/pages/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Page
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="w-5 h-5" />
                Recent Blog Posts
              </CardTitle>
              <Link href="/dashboard/blogs">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {posts.length > 0 ? (
              <div className="divide-y">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                          /{post.slug}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.publishedAt
                              ? format(
                                  new Date(post.publishedAt),
                                  "MMM d, yyyy"
                                )
                              : "Not published"}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(post.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Newspaper className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 mb-4">No blog posts yet</p>
                <Link href="/dashboard/blogs/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/dashboard/pages/create" className="block">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-transparent"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">New Page</p>
                    <p className="text-xs text-gray-500">
                      Create a landing page
                    </p>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/dashboard/blogs/create" className="block">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-transparent"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Newspaper className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">New Post</p>
                    <p className="text-xs text-gray-500">
                      Write a blog article
                    </p>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/" target="_blank" className="block">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-transparent"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Eye className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">View Site</p>
                    <p className="text-xs text-gray-500">
                      See your public site
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
