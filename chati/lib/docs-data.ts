export interface DocArticle {
  id: string
  title: string
  description: string
  category: string
  slug: string
  content: string
  lastUpdated: string
  readTime: string
  tags: string[]
}

export interface DocCategory {
  id: string
  title: string
  description: string
  icon: string
  articles: DocArticle[]
}

export const docCategories: DocCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Quick start guides and initial setup",
    icon: "Rocket",
    articles: [
      {
        id: "introduction",
        title: "Introduction to WhatsApp Business API",
        description: "Learn the basics of WhatsApp Business API and what you can build",
        category: "Getting Started",
        slug: "introduction",
        content: "Introduction content...",
        lastUpdated: "2024-01-15",
        readTime: "5 min",
        tags: ["basics", "overview", "introduction"],
      },
      {
        id: "quick-start",
        title: "Quick Start Guide",
        description: "Get up and running with WhatsApp Business API in minutes",
        category: "Getting Started",
        slug: "quick-start",
        content: "Quick start content...",
        lastUpdated: "2024-01-15",
        readTime: "10 min",
        tags: ["setup", "quickstart", "tutorial"],
      },
      {
        id: "account-setup",
        title: "Account Setup",
        description: "Set up your WhatsApp Business Account and get API credentials",
        category: "Getting Started",
        slug: "account-setup",
        content: "Account setup content...",
        lastUpdated: "2024-01-14",
        readTime: "8 min",
        tags: ["setup", "account", "credentials"],
      },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    description: "Complete API endpoints and parameters",
    icon: "Code",
    articles: [
      {
        id: "authentication",
        title: "Authentication",
        description: "Learn how to authenticate your API requests",
        category: "API Reference",
        slug: "authentication",
        content: "Authentication content...",
        lastUpdated: "2024-01-15",
        readTime: "6 min",
        tags: ["auth", "security", "tokens"],
      },
      {
        id: "send-messages",
        title: "Send Messages",
        description: "API endpoints for sending different types of messages",
        category: "API Reference",
        slug: "send-messages",
        content: "Send messages content...",
        lastUpdated: "2024-01-15",
        readTime: "12 min",
        tags: ["messages", "api", "endpoints"],
      },
      {
        id: "webhooks",
        title: "Webhooks",
        description: "Configure webhooks to receive real-time events",
        category: "API Reference",
        slug: "webhooks",
        content: "Webhooks content...",
        lastUpdated: "2024-01-14",
        readTime: "10 min",
        tags: ["webhooks", "events", "realtime"],
      },
      {
        id: "media-api",
        title: "Media API",
        description: "Upload and manage media files for messages",
        category: "API Reference",
        slug: "media-api",
        content: "Media API content...",
        lastUpdated: "2024-01-13",
        readTime: "8 min",
        tags: ["media", "files", "upload"],
      },
    ],
  },
  {
    id: "guides",
    title: "Guides",
    description: "Step-by-step tutorials and best practices",
    icon: "BookOpen",
    articles: [
      {
        id: "message-templates",
        title: "Message Templates",
        description: "Create and manage message templates for notifications",
        category: "Guides",
        slug: "message-templates",
        content: "Message templates content...",
        lastUpdated: "2024-01-15",
        readTime: "15 min",
        tags: ["templates", "notifications", "approval"],
      },
      {
        id: "interactive-messages",
        title: "Interactive Messages",
        description: "Build interactive experiences with buttons and lists",
        category: "Guides",
        slug: "interactive-messages",
        content: "Interactive messages content...",
        lastUpdated: "2024-01-14",
        readTime: "12 min",
        tags: ["interactive", "buttons", "lists"],
      },
      {
        id: "automation",
        title: "Automation & Chatbots",
        description: "Automate conversations with AI-powered chatbots",
        category: "Guides",
        slug: "automation",
        content: "Automation content...",
        lastUpdated: "2024-01-13",
        readTime: "18 min",
        tags: ["automation", "chatbots", "ai"],
      },
      {
        id: "analytics",
        title: "Analytics & Reporting",
        description: "Track message performance and user engagement",
        category: "Guides",
        slug: "analytics",
        content: "Analytics content...",
        lastUpdated: "2024-01-12",
        readTime: "10 min",
        tags: ["analytics", "metrics", "reporting"],
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "Security best practices and compliance",
    icon: "Shield",
    articles: [
      {
        id: "security-overview",
        title: "Security Overview",
        description: "Understanding WhatsApp's security architecture",
        category: "Security",
        slug: "security-overview",
        content: "Security overview content...",
        lastUpdated: "2024-01-15",
        readTime: "8 min",
        tags: ["security", "encryption", "privacy"],
      },
      {
        id: "data-privacy",
        title: "Data Privacy & Compliance",
        description: "GDPR, CCPA, and data protection guidelines",
        category: "Security",
        slug: "data-privacy",
        content: "Data privacy content...",
        lastUpdated: "2024-01-14",
        readTime: "12 min",
        tags: ["privacy", "gdpr", "compliance"],
      },
      {
        id: "rate-limits",
        title: "Rate Limits & Throttling",
        description: "Understanding and managing API rate limits",
        category: "Security",
        slug: "rate-limits",
        content: "Rate limits content...",
        lastUpdated: "2024-01-13",
        readTime: "7 min",
        tags: ["rate-limits", "throttling", "limits"],
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect with popular platforms and tools",
    icon: "Plug",
    articles: [
      {
        id: "crm-integration",
        title: "CRM Integration",
        description: "Integrate with Salesforce, HubSpot, and other CRMs",
        category: "Integrations",
        slug: "crm-integration",
        content: "CRM integration content...",
        lastUpdated: "2024-01-15",
        readTime: "14 min",
        tags: ["crm", "salesforce", "hubspot"],
      },
      {
        id: "ecommerce-platforms",
        title: "E-commerce Platforms",
        description: "Connect with Shopify, WooCommerce, and Magento",
        category: "Integrations",
        slug: "ecommerce-platforms",
        content: "E-commerce platforms content...",
        lastUpdated: "2024-01-14",
        readTime: "12 min",
        tags: ["ecommerce", "shopify", "woocommerce"],
      },
      {
        id: "zapier-integration",
        title: "Zapier Integration",
        description: "Automate workflows with Zapier",
        category: "Integrations",
        slug: "zapier-integration",
        content: "Zapier integration content...",
        lastUpdated: "2024-01-12",
        readTime: "8 min",
        tags: ["zapier", "automation", "workflows"],
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Common issues and solutions",
    icon: "AlertCircle",
    articles: [
      {
        id: "common-errors",
        title: "Common Error Codes",
        description: "Understanding and resolving common API errors",
        category: "Troubleshooting",
        slug: "common-errors",
        content: "Common errors content...",
        lastUpdated: "2024-01-15",
        readTime: "10 min",
        tags: ["errors", "debugging", "troubleshooting"],
      },
      {
        id: "message-delivery",
        title: "Message Delivery Issues",
        description: "Troubleshoot message delivery problems",
        category: "Troubleshooting",
        slug: "message-delivery",
        content: "Message delivery content...",
        lastUpdated: "2024-01-14",
        readTime: "8 min",
        tags: ["delivery", "issues", "troubleshooting"],
      },
      {
        id: "webhook-debugging",
        title: "Webhook Debugging",
        description: "Debug webhook configuration and payload issues",
        category: "Troubleshooting",
        slug: "webhook-debugging",
        content: "Webhook debugging content...",
        lastUpdated: "2024-01-13",
        readTime: "9 min",
        tags: ["webhooks", "debugging", "issues"],
      },
    ],
  },
]

export function getAllArticles(): DocArticle[] {
  return docCategories.flatMap((category) => category.articles)
}

export function getArticleBySlug(slug: string): DocArticle | undefined {
  return getAllArticles().find((article) => article.slug === slug)
}

export function searchArticles(query: string): DocArticle[] {
  const lowerQuery = query.toLowerCase()
  return getAllArticles().filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}
