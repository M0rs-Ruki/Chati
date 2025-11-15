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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, loading } = useTheme();

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
            {!loading && theme?.logoUrl ? (
              <Image
                src={theme.logoUrl}
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto transition-transform group-hover:scale-105 duration-300"
                priority
              />
            ) : (
              <Image
                src="/chati-logo-full.png"
                alt="Chati - Create, Connect, Converse"
                width={120}
                height={40}
                className="h-10 w-auto transition-transform group-hover:scale-105 duration-300"
                priority
              />
            )}
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
              className="w-[300px] sm:w-[400px] overflow-y-auto"
            >
              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5 shrink-0" />
                  <span>Home</span>
                </Link>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="features" className="border-none">
                    <AccordionTrigger className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:text-green-600 hover:bg-green-50 rounded-lg hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 shrink-0" />
                        <span>Features</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 space-y-1 pt-2">
                      {features.map((feature) => {
                        const Icon = iconMap[feature.icon];
                        return (
                          <Link
                            key={feature.name}
                            href={feature.href}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{feature.name}</span>
                          </Link>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="industry" className="border-none">
                    <AccordionTrigger className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:text-green-600 hover:bg-green-50 rounded-lg hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 shrink-0" />
                        <span>Industry</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 space-y-1 pt-2">
                      {industries.map((industry) => {
                        const Icon = iconMap[industry.icon];
                        return (
                          <Link
                            key={industry.name}
                            href={industry.href}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{industry.name}</span>
                          </Link>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="resources" className="border-none">
                    <AccordionTrigger className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:text-green-600 hover:bg-green-50 rounded-lg hover:no-underline">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 shrink-0" />
                        <span>Resources</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 space-y-1 pt-2">
                      {resources.map((resource) => {
                        const Icon = iconMap[resource.icon];
                        return (
                          <Link
                            key={resource.name}
                            href={resource.href}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{resource.name}</span>
                          </Link>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link
                  href="/pricing"
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <DollarSign className="h-5 w-5 shrink-0" />
                  <span>Pricing</span>
                </Link>

                <Link
                  href="/solutions"
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Lightbulb className="h-5 w-5 shrink-0" />
                  <span>Solutions</span>
                </Link>

                <div className="pt-4 mt-4 border-t space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-2 bg-transparent transition-all duration-200"
                    asChild
                  >
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
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
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
