"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Newspaper, BookOpen, Users, Palette, LogOut, ImageIcon, Eye } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "@/lib/theme-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme } = useTheme()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/admin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/admin")
  }

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/pages", icon: FileText, label: "Pages" },
    { href: "/dashboard/blogs", icon: Newspaper, label: "Blog" },
    { href: "/dashboard/docs", icon: BookOpen, label: "Documentation" },
    { href: "/dashboard/media", icon: ImageIcon, label: "Media Library" },
    { href: "/dashboard/themes", icon: Palette, label: "Theme" },
    { href: "/dashboard/users", icon: Users, label: "Users" },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-100">
            {theme?.logoUrl ? (
              <img src={theme.logoUrl || "/placeholder.svg"} alt="Logo" className="h-10 w-auto" />
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
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Content</p>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                )
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
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 bg-gradient-to-br from-purple-600 to-purple-700">
                <AvatarFallback className="bg-transparent text-white font-semibold text-sm">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">jeet</p>
                <p className="text-xs text-gray-500 truncate">admin</p>
              </div>
            </div>
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
  )
}
