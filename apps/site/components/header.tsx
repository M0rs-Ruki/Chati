"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItem {
  title: string;
  href: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/navigation`)
      .then((res) => res.json())
      .then((data) => {
        setNavItems(data.items || []);
      })
      .catch((error) => {
        console.error("Failed to fetch navigation:", error);
        setNavItems([
          { title: "Product", href: "/product" },
          { title: "Features", href: "/features" },
          { title: "Pricing", href: "/pricing" },
          { title: "Industries", href: "/industries" },
          { title: "Blog", href: "/blog" },
          { title: "Resources", href: "/resources" },
          { title: "About", href: "/about" },
        ]);
      });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image
              src="https://chati.ai/wp-content/uploads/2023/10/smal-cht.png"
              alt="Chati logo"
              width={32}
              height={32}
              className="h-10 w-10 rounded object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.length > 0 ? (
              navItems.map((item, index) => (
                <Link
                  key={`${item.href}-${index}`}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              ))
            ) : (
              // ✅ Loading state
              <span className="text-sm text-muted-foreground">Loading...</span>
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <a href="tel:+919583000772">+91-9583-000-772</a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={`mobile-${item.href}-${index}`}
                href={item.href}
                className="block px-4 py-2 text-sm hover:bg-muted rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="px-4 pt-2 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                asChild
              >
                <a href="tel:+919583000772">Call Us</a>
              </Button>
              <Button size="sm" className="w-full" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
