"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  BookOpen,
  Users,
  Palette,
  LogOut,
  ImageIcon,
  Eye,
  Sparkles,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider-global";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, loading } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
      return;
    }

    // Fetch current user data async
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        router.push("/admin");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin");
  };

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/pages", icon: FileText, label: "Pages" },
    { href: "/dashboard/blogs", icon: Newspaper, label: "Blog" },
    { href: "/dashboard/docs", icon: BookOpen, label: "Documentation" },
    { href: "/dashboard/media", icon: ImageIcon, label: "Media Library" },
    { href: "/dashboard/themes", icon: Palette, label: "Theme" },
    { href: "/dashboard/brands", icon: ImageIcon, label: "Brands" },
    { href: "/dashboard/users", icon: Users, label: "Users" },
  ];

  // Get user initials
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`w-72 bg-white border-r border-gray-200 flex flex-col shadow-xl relative transition-all duration-700 ${
          mounted ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col h-full relative z-10">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-100/50 bg-gradient-to-r from-white to-gray-50/30">
            {mounted && !loading && theme?.logoUrl ? (
              <Image
                src={theme.logoUrl}
                alt="Logo"
                className="h-12 w-auto"
                width={150}
                height={48}
              />
            ) : (
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Chati CMS
                  </h1>
                  <p className="text-xs text-gray-500">Content Management</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full" />
                Content
              </p>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
                      )}
                      <Icon
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isActive ? "" : "group-hover:scale-110"
                        }`}
                      />
                      <span className="font-medium text-sm flex-1">
                        {item.label}
                      </span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 animate-pulse" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Settings & View Public Site */}
            <div className="pt-4 border-t border-gray-100 space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                Actions
              </p>
              <Link href="/" target="_blank">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer text-gray-600 hover:bg-blue-50 hover:text-blue-700 group">
                  <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-sm">View Public Site</span>
                </div>
              </Link>
              <Link href="/dashboard/profile">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer text-gray-600 hover:bg-purple-50 hover:text-purple-700 group">
                  <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
                  <span className="font-medium text-sm">Settings</span>
                </div>
              </Link>
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
            {loadingUser ? (
              <div className="flex items-center justify-center h-16">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            ) : user ? (
              <div className="space-y-3">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                    <Avatar className="h-11 w-11 bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-white shadow-lg relative">
                      <AvatarFallback className="bg-transparent text-white font-semibold text-sm">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate capitalize">
                      {user.role.toLowerCase()}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 group"
                >
                  <LogOut className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="text-red-600 text-sm text-center p-2">
                Failed to load user
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-700 ${
          mounted ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`}
      >
        {children}
      </main>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
