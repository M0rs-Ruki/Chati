import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Features - WhatsApp Business API, Chatbots & Automation | Chati.ai",
  description:
    "Explore powerful features including WhatsApp Business API, AI chatbots, multi-channel messaging, team collaboration, analytics, and automation tools. Transform your customer communication with Chati.ai's comprehensive platform.",
  keywords: [
    "WhatsApp Business API features",
    "AI chatbot features",
    "multi-channel messaging",
    "customer engagement tools",
    "team collaboration features",
    "messaging automation",
    "analytics dashboard",
    "CRM integration",
    "live chat features",
    "broadcast messaging",
    "template management",
    "workflow automation",
    "customer data platform",
    "omnichannel communication",
    "business messaging features",
  ],
  openGraph: {
    title: "Features - WhatsApp Business API, Chatbots & Automation | Chati.ai",
    description:
      "Discover comprehensive features for WhatsApp Business API, AI chatbots, multi-channel messaging, and automation. Scale your customer communication with powerful tools.",
    url: "https://chati.ai/features",
    siteName: "Chati.ai",
    images: [
      {
        url: "https://chati.ai/og-features.jpg",
        width: 1200,
        height: 630,
        alt: "Chati.ai Features - WhatsApp Business API & Automation Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Features - WhatsApp Business API, Chatbots & Automation | Chati.ai",
    description:
      "Explore powerful features for WhatsApp Business API, AI chatbots, multi-channel messaging, and automation tools.",
    images: ["https://chati.ai/og-features.jpg"],
  },
  alternates: {
    canonical: "https://chati.ai/features",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function FeaturesPage() {
  return <ClientPage />
}
