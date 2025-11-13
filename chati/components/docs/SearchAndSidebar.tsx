"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { docCategories } from "@/lib/docs-data";
import Link from "next/link";
import {
  BookOpen,
  Code,
  Shield,
  Plug,
  AlertCircle,
  Rocket,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Rocket,
  Code,
  BookOpen,
  Shield,
  Plug,
  AlertCircle,
};

interface SearchAndSidebarProps {
  initialSearch: string;
  filteredCount: number;
}

export default function SearchAndSidebar({
  initialSearch,
  filteredCount,
}: SearchAndSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const selectedCategory = searchParams.get("category");

  const handleSearch = (value: string) => {
    setSearchQuery(value);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
        params.delete("category"); // Clear category when searching
      } else {
        params.delete("search");
      }
      router.push(`/docs?${params.toString()}`);
    });
  };

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-6 text-lg bg-white text-gray-900 border-0 shadow-xl rounded-xl focus-visible:ring-2 focus-visible:ring-white"
          />
          {isPending && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        {searchQuery && (
          <p className="text-sm text-blue-100 mt-3">
            Found {filteredCount} {filteredCount === 1 ? "article" : "articles"}
          </p>
        )}
      </div>

      {/* Mobile Sidebar Toggle */}
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden fixed bottom-6 right-6 z-50 shadow-lg rounded-full w-14 h-14 bg-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 overflow-y-auto z-50 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/docs"
                    onClick={() => setSidebarOpen(false)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      !selectedCategory
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Documentation
                  </Link>
                  {docCategories.map((category) => {
                    const Icon = iconMap[category.icon];
                    return (
                      <Link
                        key={category.id}
                        href={`/docs?category=${category.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{category.title}</span>
                          <span className="ml-auto text-xs text-gray-500">
                            {category.articles.length}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Quick Links
                </h3>
                <div className="space-y-2 text-sm">
                  <Link
                    href="/docs/quick-start"
                    className="block text-gray-700 hover:text-blue-600"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Quick Start Guide
                  </Link>
                  <Link
                    href="/docs/api-reference"
                    className="block text-gray-700 hover:text-blue-600"
                    onClick={() => setSidebarOpen(false)}
                  >
                    API Reference
                  </Link>
                  <Link
                    href="/docs/examples"
                    className="block text-gray-700 hover:text-blue-600"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Code Examples
                  </Link>
                  <Link
                    href="/docs/changelog"
                    className="block text-gray-700 hover:text-blue-600"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Changelog
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
