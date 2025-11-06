import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Business API for E-commerce & Retail | Boost Sales & Customer Engagement | Chati",
  description:
    "Transform your e-commerce business with WhatsApp Business API. Automate order updates, recover abandoned carts, send personalized promotions, and provide instant customer support. Increase conversions by 40% with conversational commerce.",
  keywords: [
    "whatsapp ecommerce",
    "whatsapp retail",
    "whatsapp shopping",
    "abandoned cart recovery",
    "order notifications whatsapp",
    "conversational commerce",
    "whatsapp product catalog",
    "retail customer engagement",
    "ecommerce automation",
    "whatsapp payment",
    "shopping assistant chatbot",
    "retail messaging platform",
    "customer support ecommerce",
    "whatsapp marketing retail",
  ],
  openGraph: {
    title: "WhatsApp Business API for E-commerce & Retail - Boost Sales & Engagement",
    description:
      "Automate order updates, recover abandoned carts, and provide instant support. Increase e-commerce conversions by 40% with WhatsApp Business API.",
    type: "website",
    url: "https://chati.ai/industries/ecommerce",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WhatsApp Business API for E-commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Business API for E-commerce & Retail",
    description: "Automate order updates, recover abandoned carts, and boost sales with conversational commerce.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://chati.ai/industries/ecommerce",
  },
}

export default function EcommercePage() {
  return <ClientPage />
}
