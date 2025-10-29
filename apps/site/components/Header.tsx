"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  url: string;
}

interface Theme {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  logoUrl?: string;
  name?: string;
}

interface HeaderProps {
  navigation?: NavItem[];
  theme?: Theme | null;
}

export default function Header({ navigation = [], theme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const validNavigation = navigation.filter(
    (item) => item && item.id && item.label && item.url
  );

  const bgColor = theme?.primaryColor || "#ffffff";
  const textColor = "#111827";
  const hoverColor = theme?.accentColor || "#3B82F6";

  return (
    <header
      className="shadow-sm sticky top-0 z-50"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold flex items-center gap-3"
              style={{ color: textColor }}
            >
              {theme?.logoUrl ? (
                <Image
                  src={theme.logoUrl}
                  alt={theme.name || "Logo"}
                  width={120}
                  height={40}
                  style={{ height: "40px", width: "auto" }}
                  priority
                />
              ) : (
                <span>MyWebsite</span>
              )}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {validNavigation.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="font-medium transition-colors"
                style={{ color: textColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: textColor }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && validNavigation.length > 0 && (
          <div className="md:hidden pb-4">
            {validNavigation.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="block py-2 font-medium"
                style={{ color: textColor }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
