"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FileText,
  Package,
  MessageSquare,
  Monitor,
  TrendingUp,
  Shield,
  Lock,
  ShieldCheck,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

import type { ComponentType, SVGProps } from "react";

import { useTheme } from "@/components/theme-provider-global";

export function FooterClient() {
  const { theme, loading } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-t border-slate-800">
      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-slate-950/20 pointer-events-none" />

      {/* MOBILE FOOTER - Shows below md breakpoint */}
      <div className="md:hidden container mx-auto px-4 py-8 relative z-10">
        {/* Logo and Description */}
        <div className="mb-8">
          <Link href="/" className="flex items-center space-x-2 group mb-3">
            <Image
              src={mounted && !loading && theme?.logoUrl ? theme.logoUrl : "/chati-logo-full.png"}
              alt="Logo"
              width={120}
              height={40}
              className="h-8 w-auto transition-transform group-hover:scale-105 duration-300"
              priority
            />
          </Link>

          <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in
            India
          </p>

          <p className="text-sm text-slate-400 leading-relaxed mb-5">
            Transform your business communication with AI-powered WhatsApp
            Business API, multi-channel messaging, and intelligent automation.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
            >
              <Facebook className="h-4 w-4 text-white" />
            </Link>

            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="h-9 w-9 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
            >
              <Twitter className="h-4 w-4 text-white" />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="h-9 w-9 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
            >
              <Linkedin className="h-4 w-4 text-white" />
            </Link>
          </div>
        </div>

        {/* 2x3 Grid for Links */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* COMPANY */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/about" icon={FileText} label="About" />
              <FooterLink href="/product" icon={Package} label="Product" />
              <FooterLink
                href="/contact"
                icon={MessageSquare}
                label="Contact"
              />
            </ul>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="/features" icon={Monitor} label="Features" />
              <FooterLink href="/pricing" icon={TrendingUp} label="Pricing" />
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Legal</h3>
            <ul className="space-y-3">
              <FooterLink href="/terms" icon={Shield} label="Terms of Use" />
              <FooterLink href="/privacy" icon={Lock} label="Privacy Policy" />
              <FooterLink
                href="/refund"
                icon={ShieldCheck}
                label="Refund Policy"
              />
            </ul>
          </div>

          {/* FOLLOW US */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">
              Follow Us
            </h3>
            <ul className="space-y-3">
              <FooterLink
                href="https://facebook.com"
                icon={Facebook}
                label="Facebook"
                external
              />
              <FooterLink
                href="https://twitter.com"
                icon={Twitter}
                label="Twitter"
                external
              />
              <FooterLink
                href="https://linkedin.com"
                icon={Linkedin}
                label="LinkedIn"
                external
              />
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} ·{" "}
            <span className="text-white font-medium">Chati</span> ·{" "}
            <span className="text-green-400">WhatsApp Chat-Bot Solution</span>
          </p>
        </div>
      </div>

      {/* DESKTOP FOOTER - Shows from md breakpoint and up */}
      <div className="hidden md:block container mx-auto px-6 py-12 lg:py-16 relative z-10">
        {/* GRID */}
        <div
          className="
            grid gap-10 lg:gap-12
            md:grid-cols-2
            lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]
          "
        >
          {/* COMPANY INFO */}
          <div className="lg:pr-8">
            <div className="mb-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <Image
                  src={mounted && !loading && theme?.logoUrl ? theme.logoUrl : "/chati-logo-full.png"}
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto transition-transform group-hover:scale-105 duration-300"
                  priority
                />
              </Link>

              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                Made with{" "}
                <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in India
              </p>
            </div>

            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
              Transform your business communication with AI-powered WhatsApp
              Business API, multi-channel messaging, and intelligent automation.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <Facebook className="h-4 w-4 text-white" />
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="h-9 w-9 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <Twitter className="h-4 w-4 text-white" />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <Linkedin className="h-4 w-4 text-white" />
              </Link>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/about" icon={FileText} label="About" />
              <FooterLink href="/product" icon={Package} label="Product" />
              <FooterLink
                href="/contact"
                icon={MessageSquare}
                label="Contact"
              />
            </ul>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="/features" icon={Monitor} label="Features" />
              <FooterLink href="/pricing" icon={TrendingUp} label="Pricing" />
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Legal</h3>
            <ul className="space-y-3">
              <FooterLink href="/terms" icon={Shield} label="Terms of Use" />
              <FooterLink href="/privacy" icon={Lock} label="Privacy Policy" />
              <FooterLink
                href="/refund"
                icon={ShieldCheck}
                label="Refund Policy"
              />
            </ul>
          </div>

          {/* FOLLOW US */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">
              Follow Us
            </h3>
            <ul className="space-y-3">
              <FooterLink
                href="https://facebook.com"
                icon={Facebook}
                label="Facebook"
                external
              />
              <FooterLink
                href="https://twitter.com"
                icon={Twitter}
                label="Twitter"
                external
              />
              <FooterLink
                href="https://linkedin.com"
                icon={Linkedin}
                label="LinkedIn"
                external
              />
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} ·{" "}
            <span className="text-white font-medium">Chati</span> ·{" "}
            <span className="text-green-400">WhatsApp Chat-Bot Solution</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------- */
/* REUSABLE FOOTER LINK COMPONENT         */
/* -------------------------------------- */

type FooterLinkProps = {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  external?: boolean;
};

function FooterLink({
  href,
  icon: Icon,
  label,
  external = false,
}: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
      >
        <Icon className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors flex-shrink-0" />
        <span>{label}</span>
      </Link>
    </li>
  );
}
