import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://chati.ai"
  const currentDate = new Date()

  const staticPages = [
    { route: "", priority: 1, changeFrequency: "daily" as const },
    { route: "/features", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/features/chatbots", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/features/live-chat", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/features/automation", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/features/whatsapp-broadcast", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/features/cdp", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/pricing", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/pricing/calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/pricing/rcs-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/industries", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/industries/ecommerce", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/industries/healthcare", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/industries/education", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/industries/travel", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/industries/food", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/industries/real-estate", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/industries/finance", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/industries/technology", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/blog", priority: 0.8, changeFrequency: "daily" as const },
    { route: "/docs", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/tutorials", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/help", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
    { route: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }))

  return [...staticPages]
}
