"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Users,
  FileText,
  PenTool,
  ImageIcon,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  userName?: string;
  userEmail?: string;
}

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    label: "Pages",
    href: "/dashboard/pages",
    icon: FileText,
  },
  {
    label: "Blog",
    href: "/dashboard/blog",
    icon: PenTool,
  },
  {
    label: "Media",
    href: "/dashboard/media",
    icon: ImageIcon,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function DashboardHeader({
  pageTitle = "Dashboard",
  userName = "Admin User",
  userEmail = "admin@example.com",
}: {
  pageTitle?: string;
  userName?: string;
  userEmail?: string;
}) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Sidebar Trigger and Page Title */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
        </div>

        {/* Right: User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-3 py-2 h-auto"
            >
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {userName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {userEmail}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2 px-2 py-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-white">C</span>
          </div>
          <span className="text-lg font-bold text-sidebar-foreground">
            Chati
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild tooltip={item.label}>
                  <Link href={item.href}>
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/60 px-2">
          © 2025 Chati.ai. All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function DashboardLayout({
  children,
  pageTitle = "Dashboard",
  userName = "Admin User",
  userEmail = "admin@example.com",
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <DashboardHeader
            pageTitle={pageTitle}
            userName={userName}
            userEmail={userEmail}
          />
          <main className="flex-1 overflow-auto bg-background">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
