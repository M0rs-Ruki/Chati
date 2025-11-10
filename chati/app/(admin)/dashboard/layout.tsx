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
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/lib/theme-provider";

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
  const { theme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

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
    router.push("/admin");
  };

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/pages", icon: FileText, label: "Pages" },
    { href: "/dashboard/blogs", icon: Newspaper, label: "Blog" },
    { href: "/dashboard/docs", icon: BookOpen, label: "Documentation" },
    { href: "/dashboard/media", icon: ImageIcon, label: "Media Library" },
    { href: "/dashboard/themes", icon: Palette, label: "Theme" },
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
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-100">
            {theme?.logoUrl ? (
              <Image
                src={theme.logoUrl || "/placeholder.svg"}
                alt="Logo"
                className="h-10 w-auto"
                width={150}
                height={48}
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">ChatiCMS</h1>
                  <p className="text-xs text-gray-500">Content Management</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                Content
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-purple-50 text-purple-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* View Public Site */}
            <div className="pt-4 border-t border-gray-100">
              <Link href="/" target="_blank">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <Eye className="h-5 w-5" />
                  <span className="font-medium text-sm">View Public Site</span>
                </div>
              </Link>
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-100">
            {loadingUser ? (
              <div className="flex items-center justify-center h-10 text-gray-600">
                Loading user...
              </div>
            ) : user ? (
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 mb-3"
              >
                <Avatar className="h-10 w-10 bg-gradient-to-br from-purple-600 to-purple-700">
                  <AvatarFallback className="bg-transparent text-white font-semibold text-sm">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.role.toLowerCase()}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="text-red-600">Failed to load user</div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
