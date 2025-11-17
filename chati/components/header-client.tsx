"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider-global";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Home,
  Car,
  Sparkles,
  Building2,
  ShoppingCart,
  Heart,
  GraduationCap,
  Plane,
  Utensils,
  DollarSign,
  Menu,
  Bell,
  BookOpen,
  FileText,
  Lightbulb,
  Video,
  MessageSquare,
  Bot,
  Database,
  Calendar,
  HelpCircle,
  Radio,
  Workflow,
  Users,
  Palette,
  Repeat,
  Smartphone,
  ShieldCheck,
  Globe,
  MousePointerClick,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping
const iconMap = {
  Radio,
  MessageSquare,
  Bot,
  Workflow,
  Users,
  Database,
  Palette,
  ShoppingCart,
  Heart,
  GraduationCap,
  Plane,
  Utensils,
  Building2,
  DollarSign,
  Sparkles,
  BookOpen,
  FileText,
  Lightbulb,
  Video,
  Calendar,
  HelpCircle,
  Repeat,
  Smartphone,
  ShieldCheck,
  Globe,
  MousePointerClick,
  Car,
} as const;

type IconName = keyof typeof iconMap;

interface MenuItem {
  name: string;
  icon: IconName;
  href: string;
  description?: string;
}

interface HeaderClientProps {
  features: MenuItem[];
  industries: MenuItem[];
  resources: MenuItem[];
}

export function HeaderClient({
  features,
  industries,
  resources,
}: HeaderClientProps) {
  const { theme, loading } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20 supports-[backdrop-filter]:bg-white/60"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100/50"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src={
                mounted && !loading && theme?.logoUrl
                  ? theme.logoUrl
                  : "/chati-logo-full.png"
              }
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto transition-transform group-hover:scale-105 duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex flex-row items-center gap-2 flex-nowrap">
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 focus:outline-none"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 inline-flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:!bg-green-50 hover:!text-green-600 data-[state=open]:!bg-green-50 data-[state=open]:!text-green-600">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] gap-3 p-6 md:w-[600px] grid md:grid-cols-2">
                    {features.map((feature) => {
                      const Icon = iconMap[feature.icon];
                      return (
                        <Link
                          key={feature.name}
                          href={feature.href}
                          className="group flex items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-green-50 hover:shadow-md border border-transparent hover:border-green-200"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-200">
                            <Icon className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground group-hover:text-green-600 transition-colors duration-200">
                              {feature.name}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {feature.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 inline-flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:!bg-green-50 hover:!text-green-600 data-[state=open]:!bg-green-50 data-[state=open]:!text-green-600">
                  <Building2 className="mr-2 h-4 w-4" />
                  Industry
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] gap-3 p-6 md:w-[600px] grid md:grid-cols-2">
                    {industries.map((industry) => {
                      const Icon = iconMap[industry.icon];
                      return (
                        <Link
                          key={industry.name}
                          href={industry.href}
                          className="group flex items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-green-50 hover:shadow-md border border-transparent hover:border-green-200"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-200">
                            <Icon className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground group-hover:text-green-600 transition-colors duration-200">
                              {industry.name}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              Tailored solutions for{" "}
                              {industry.name.toLowerCase()}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 inline-flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:!bg-green-50 hover:!text-green-600 data-[state=open]:!bg-green-50 data-[state=open]:!text-green-600">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] gap-3 p-6 md:w-[600px] grid md:grid-cols-2">
                    {resources.map((resource) => {
                      const Icon = iconMap[resource.icon];
                      return (
                        <Link
                          key={resource.name}
                          href={resource.href}
                          className="group flex items-center gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-green-50 hover:shadow-md border border-transparent hover:border-green-200"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-200">
                            <Icon className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground group-hover:text-green-600 transition-colors duration-200">
                              {resource.name}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {resource.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/pricing"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 focus:outline-none"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Pricing
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/solutions"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 focus:outline-none"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Solutions
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              className="
              border-2 
              bg-white 
              text-gray-800 
              hover:bg-green-50 
              hover:border-green-500 
              hover:text-green-600 
              font-medium 
              shadow-sm 
              transition-all
            "
              asChild
            >
              <Link
                href={
                  process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat"
                }
              >
                Sign In
              </Link>
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
              asChild
            >
              <Link
                href={`https://wa.me/${
                  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
                }`}
              >
                <Bell className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Book a Demo
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[400px] max-w-full overflow-y-auto px-4 py-6"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <div className="flex flex-col gap-5">
                {/* HOME */}
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:bg-green-50 hover:text-green-600 rounded-lg transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>

                {/* ACCORDION */}
                <Accordion
                  type="single"
                  collapsible
                  className="w-full text-left"
                >
                  {/* FEATURES */}
                  <AccordionItem value="features" className="border-none">
                    <AccordionTrigger className="px-3 py-2 rounded-lg text-base font-medium flex gap-3 items-center hover:bg-green-50 hover:text-green-600 text-left">
                      <Sparkles className="h-5 w-5 shrink-0" />
                      <span className="text-left w-full">Features</span>
                    </AccordionTrigger>

                    <AccordionContent className="pl-10 space-y-2 pt-2 text-left">
                      {features.map((feature) => {
                        const Icon = iconMap[feature.icon];
                        return (
                          <Link
                            key={feature.name}
                            href={feature.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-green-50 hover:text-green-600 transition text-left"
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            {feature.name}
                          </Link>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>

                  {/* INDUSTRY */}
                  <AccordionItem value="industry" className="border-none">
                    <AccordionTrigger className="px-3 py-2 rounded-lg text-base font-medium flex gap-3 items-center hover:bg-green-50 hover:text-green-600 text-left">
                      <Building2 className="h-5 w-5 shrink-0" />
                      <span className="text-left w-full">Industry</span>
                    </AccordionTrigger>

                    <AccordionContent className="pl-10 space-y-2 pt-2 text-left">
                      {industries.map((industry) => {
                        const Icon = iconMap[industry.icon];
                        return (
                          <Link
                            key={industry.name}
                            href={industry.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-green-50 hover:text-green-600 transition text-left"
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            {industry.name}
                          </Link>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>

                  {/* RESOURCES */}
                  <AccordionItem value="resources" className="border-none">
                    <AccordionTrigger className="px-3 py-2 rounded-lg text-base font-medium flex gap-3 items-center hover:bg-green-50 hover:text-green-600 text-left">
                      <BookOpen className="h-5 w-5 shrink-0" />
                      <span className="text-left w-full">Resources</span>
                    </AccordionTrigger>

                    <AccordionContent className="pl-10 space-y-2 pt-2 text-left">
                      {resources.map((resource) => {
                        const Icon = iconMap[resource.icon];
                        return (
                          <Link
                            key={resource.name}
                            href={resource.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-green-50 hover:text-green-600 transition text-left"
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            {resource.name}
                          </Link>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* PRICING */}
                <Link
                  href="/pricing"
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:bg-green-50 hover:text-green-600 rounded-lg transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <DollarSign className="h-5 w-5" />
                  Pricing
                </Link>

                {/* SOLUTIONS */}
                <Link
                  href="/solutions"
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:bg-green-50 hover:text-green-600 rounded-lg transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Lightbulb className="h-5 w-5" />
                  Solutions
                </Link>

                {/* CTA BUTTONS */}
                <div className="pt-6 mt-4 border-t space-y-3">
                  <Button variant="outline" className="w-full border-2" asChild>
                    <Link
                      href={
                        process.env.NEXT_PUBLIC_APP_URL ||
                        "https://app.chati.chat"
                      }
                    >
                      Sign In
                    </Link>
                  </Button>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    asChild
                  >
                    <Link
                      href={`https://wa.me/${
                        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
                      }`}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Book a Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
