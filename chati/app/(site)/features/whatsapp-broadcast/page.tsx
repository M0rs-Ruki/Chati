import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Broadcast - Send Bulk Messages to Thousands | Chati.ai",
  description:
    "Send personalized WhatsApp broadcast messages to thousands of customers instantly. Schedule campaigns, segment audiences, and track engagement with our powerful broadcast messaging platform.",
  keywords: [
    "whatsapp broadcast",
    "bulk whatsapp messages",
    "whatsapp marketing",
    "broadcast messaging",
    "whatsapp campaigns",
    "mass messaging",
    "whatsapp business broadcast",
    "scheduled broadcasts",
    "audience segmentation",
    "broadcast analytics",
    "personalized broadcasts",
    "whatsapp automation",
  ],
  openGraph: {
    title: "WhatsApp Broadcast - Send Bulk Messages to Thousands",
    description:
      "Send personalized WhatsApp broadcast messages to thousands of customers instantly with advanced scheduling and segmentation.",
    type: "website",
    url: "https://chati.ai/features/whatsapp-broadcast",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WhatsApp Broadcast Messaging Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Broadcast - Send Bulk Messages to Thousands",
    description: "Send personalized WhatsApp broadcast messages to thousands of customers instantly.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://chati.ai/features/whatsapp-broadcast",
  },
}

export default function WhatsAppBroadcastPage() {
  return <ClientPage />
}
