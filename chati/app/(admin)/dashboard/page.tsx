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
  ArrowRight,
  Loader2,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch current user
      const userResponse = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setCurrentUser(userData.user);
      }

      // Fetch dashboard data
      const response = await fetch("/api/public/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      setDashboardData(data.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

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
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50",
      link: "/dashboard/pages",
    },
    {
      title: "Blog Posts",
      value: dashboardData?.totalBlogs || 0,
      icon: Newspaper,
      color: "purple",
      bgColor: "bg-purple-500",
      lightBg: "bg-purple-50",
      link: "/dashboard/blogs",
    },
    {
      title: "Media Files",
      value: dashboardData?.totalMedias || 0,
      icon: ImageIcon,
      color: "green",
      bgColor: "bg-green-500",
      lightBg: "bg-green-50",
      link: "/dashboard/media",
    },
    {
      title: "Total Users",
      value: dashboardData?.totalUsers || 0,
      icon: TrendingUp,
      color: "orange",
      bgColor: "bg-orange-500",
      lightBg: "bg-orange-50",
    },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<
      string,
      {
        variant: "secondary" | "outline" | "default" | "destructive";
        className: string;
      }
    > = {
      DRAFT: { variant: "secondary", className: "bg-gray-100 text-gray-700" },
      REVIEW: {
        variant: "outline",
        className: "border-blue-300 text-blue-700",
      },
      PUBLISHED: {
        variant: "default",
        className: "bg-green-100 text-green-700",
      },
      ARCHIVED: {
        variant: "destructive",
        className: "bg-red-100 text-red-700",
      },
    };
    const { variant, className } = config[status] || config.DRAFT;
    return (
      <Badge variant={variant} className={className}>
        {status.toLowerCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pt-8 px-6 pb-12 space-y-8 max-w-7xl transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Welcome Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          Welcome back{currentUser ? `, ${currentUser.name}` : ""}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Here's what's happening with your content today
        </p>
      </div>

      {/* Featured: Create Demo Page Card */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-600 to-green-600 border-0 text-white hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-8 h-8 animate-pulse" />
                <h3 className="text-2xl font-bold">
                  Create Ultimate Demo Page
                </h3>
              </div>
              <p className="text-white/90 mb-6 text-lg max-w-2xl">
                Showcase all 7+ premium sections in one beautiful demo page with
                real sample data
              </p>
              <Link href="/dashboard/pages/create">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Create Demo Now
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block text-8xl opacity-20 animate-bounce">
              🚀
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Setup Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Setup Homepage */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 border-green-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-2xl">🏠</span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Setup Homepage
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Create a professional homepage with Chati CMS builder
                </p>
                <Link href="/dashboard/pages/create">
                  <Button className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-600/25 transition-all">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Setup Homepage
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Industry Page */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-2xl">🤖</span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Chatbot Page
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Create industry page with chatbot features and sections
                </p>
                <Link href="/dashboard/pages/create">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-600/25 transition-all">
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
        <Card className="relative overflow-hidden bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 animate-pulse-slow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
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
                  <Button className="bg-orange-600 hover:bg-orange-700 shadow-lg">
                    <CheckCircle2 className="w-4 w-4 mr-2" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="relative overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${stat.lightBg} rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-150 transition-transform duration-700`}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${stat.lightBg} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
                {stat.link && (
                  <Link href={stat.link}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full group-hover:bg-gray-100"
                    >
                      View All
                      <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
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
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Recent Pages
              </CardTitle>
              <Link href="/dashboard/pages">
                <Button variant="ghost" size="sm" className="hover:bg-white">
                  View All
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {pages.length > 0 ? (
              <div className="divide-y">
                {pages.map((page, index) => (
                  <Link key={page.id} href={`/dashboard/pages/${page.id}`}>
                    <div
                      className="p-4 hover:bg-gray-50 transition-all cursor-pointer group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
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
                        {getStatusBadge(page.status)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">No pages yet</p>
                <Link href="/dashboard/pages/create">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Page
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-purple-600" />
                Recent Blog Posts
              </CardTitle>
              <Link href="/dashboard/blogs">
                <Button variant="ghost" size="sm" className="hover:bg-white">
                  View All
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {posts.length > 0 ? (
              <div className="divide-y">
                {posts.map((post, index) => (
                  <Link key={post.id} href={`/dashboard/blogs/${post.id}`}>
                    <div
                      className="p-4 hover:bg-gray-50 transition-all cursor-pointer group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
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
                        {getStatusBadge(post.status)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Newspaper className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">No blog posts yet</p>
                <Link href="/dashboard/blogs/create">
                  <Button className="bg-purple-600 hover:bg-purple-700">
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
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/dashboard/pages/create">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-6 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">New Page</p>
                    <p className="text-xs text-gray-500">
                      Create a landing page
                    </p>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/dashboard/blogs/create">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-6 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors">
                    <Newspaper className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">New Post</p>
                    <p className="text-xs text-gray-500">
                      Write a blog article
                    </p>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/" target="_blank">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-6 hover:bg-green-50 hover:border-green-300 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">View Site</p>
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
