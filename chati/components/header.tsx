import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Home,
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
  Users,
  Database,
  Palette,
  Calendar,
  HelpCircle,
  Radio,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HeaderClient } from "./header-client";

const features = [
  {
    name: "WhatsApp Broadcast",
    icon: "Radio" as const,
    href: "/features/whatsapp-broadcast",
    description: "Send bulk messages to multiple contacts",
  },
  {
    name: "Live Chat",
    icon: "MessageSquare" as const,
    href: "/features/live-chat",
    description: "Real-time customer conversations",
  },
  {
    name: "Chatbots & AI",
    icon: "Bot" as const,
    href: "/features/chatbots",
    description: "Intelligent automated responses",
  },
  {
    name: "Automation Workflows",
    icon: "Workflow" as const,
    href: "/features/automation",
    description: "Automate repetitive tasks and processes",
  },
  {
    name: "Team Collaboration",
    icon: "Users" as const,
    href: "/features/collaboration",
    description: "Work together seamlessly",
  },
  {
    name: "Customer Data Platform",
    icon: "Database" as const,
    href: "/features/cdp",
    description: "Unified customer data, analytics & integrations",
  },
  {
    name: "Customization",
    icon: "Palette" as const,
    href: "/features/customization",
    description: "Tailor to your brand",
  },
];

const industries = [
  {
    name: "E-commerce & Retail",
    icon: "ShoppingCart" as const,
    href: "/industries/ecommerce",
  },
  {
    name: "Healthcare & Wellness",
    icon: "Heart" as const,
    href: "/industries/healthcare",
  },
  {
    name: "Education & E-learning",
    icon: "GraduationCap" as const,
    href: "/industries/education",
  },
  { name: "Travel & Hospitality", icon: "Plane" as const, href: "/industries/travel" },
  { name: "Food & Beverage", icon: "Utensils" as const, href: "/industries/food" },
  { name: "Real Estate", icon: "Building2" as const, href: "/industries/real-estate" },
  { name: "Financial Services", icon: "DollarSign" as const, href: "/industries/finance" },
  { name: "Technology & SaaS", icon: "Sparkles" as const, href: "/industries/technology" },
];

const resources = [
  {
    name: "Blog",
    icon: "BookOpen" as const,
    href: "/blog",
    description: "Latest insights and updates",
  },
  {
    name: "Documentation",
    icon: "FileText" as const,
    href: "/docs",
    description: "Comprehensive guides and API docs",
  },
  {
    name: "Case Studies",
    icon: "Lightbulb" as const,
    href: "/case-studies",
    description: "Success stories from our customers",
  },
  {
    name: "Video Tutorials",
    icon: "Video" as const,
    href: "/tutorials",
    description: "Step-by-step video guides",
  },
  {
    name: "Webinars",
    icon: "Calendar" as const,
    href: "/webinars",
    description: "Live training and Q&A sessions",
  },
  {
    name: "Help Center",
    icon: "HelpCircle" as const,
    href: "/help",
    description: "Get answers to common questions",
  },
];

export function Header() {
  return <HeaderClient features={features} industries={industries} resources={resources} />;
}
