import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Live Chat - Multi-Channel Customer Support | WhatsApp, RCS, Instagram, Facebook | Chati.ai",
  description:
    "Unified live chat platform supporting WhatsApp, RCS, Instagram DM, and Facebook Messenger. Manage all customer conversations in one Omnion channel inbox with team collaboration, tags, and automation.",
  keywords: [
    "live chat",
    "multi-channel chat",
    "whatsapp live chat",
    "rcs messaging",
    "instagram direct message",
    "facebook messenger",
    "unified inbox",
    "omnion channel inbox",
    "customer support chat",
    "team collaboration",
    "chat management",
    "conversation tags",
    "chat attributes",
    "real-time messaging",
    "customer service platform",
    "multi-platform messaging",
  ],
  openGraph: {
    title: "Live Chat - Multi-Channel Customer Support Platform",
    description:
      "Manage WhatsApp, RCS, Instagram, and Facebook Messenger conversations in one unified inbox with powerful team collaboration tools.",
    type: "website",
    url: "https://chati.ai/features/live-chat",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Multi-Channel Live Chat Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Chat - Multi-Channel Customer Support Platform",
    description:
      "Manage all customer conversations across WhatsApp, RCS, Instagram, and Facebook in one unified inbox.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://chati.ai/features/live-chat",
  },
}

export default function LiveChatPage() {
  return <ClientPage />
}
