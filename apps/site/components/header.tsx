"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link
              href="/product"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Product
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/industries"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Industries
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
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
            <Link
              href="/product"
              className="block px-4 py-2 text-sm hover:bg-muted rounded"
            >
              Product
            </Link>
            <Link
              href="/features"
              className="block px-4 py-2 text-sm hover:bg-muted rounded"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block px-4 py-2 text-sm hover:bg-muted rounded"
            >
              Pricing
            </Link>
            <Link
              href="/industries"
              className="block px-4 py-2 text-sm hover:bg-muted rounded"
            >
              Industries
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm hover:bg-muted rounded"
            >
              Blog
            </Link>
            <Link
              href="/resources"
              className="block px-4 py-2 text-sm hover:bg-muted rounded"
            >
              Resources
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm hover:bg-muted rounded"
            >
              About
            </Link>
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
