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
    name: "Drip Marketing",
    icon: "Repeat" as const,
    href: "/features/drip-marketing",
    description: "Automated multi-channel sequence campaigns",
  },
  {
    name: "RCS Messaging",
    icon: "Smartphone" as const,
    href: "/features/rcs-messaging",
    description: "Rich interactive messages with WhatsApp fallback",
  },
  {
    name: "Customer Data Platform",
    icon: "Database" as const,
    href: "/features/cdp",
    description: "Unified customer data, analytics & integrations",
  },
  {
    name: "WhatsApp Blue Tick",
    icon: "ShieldCheck" as const,
    href: "/features/whatsapp-blue-tick",
    description: "Get verified business badge",
  },
  {
    name: "WhatsApp WebViews",
    icon: "Globe" as const,
    href: "/features/whatsapp-webviews",
    description: "Open web pages inside WhatsApp chat",
  },
  {
    name: "Click Tracking",
    icon: "MousePointerClick" as const,
    href: "/features/click-tracking",
    description: "Track clicks & retarget engaged users",
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
  {
    name: "Travel & Hospitality",
    icon: "Plane" as const,
    href: "/industries/travel",
  },
  {
    name: "Food & Beverage",
    icon: "Utensils" as const,
    href: "/industries/food",
  },
  {
    name: "Real Estate",
    icon: "Building2" as const,
    href: "/industries/real-estate",
  },
  {
    name: "Financial Services",
    icon: "DollarSign" as const,
    href: "/industries/finance",
  },
  {
    name: "Technology & SaaS",
    icon: "Car" as const,
    href: "/industries/technology",
  },
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
  return (
    <HeaderClient
      features={features}
      industries={industries}
      resources={resources}
    />
  );
}
