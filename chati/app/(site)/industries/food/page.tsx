import type { Metadata } from "next"
import FoodClientPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Business for Food & Beverage | Restaurant Messaging Solutions | Chati",
  description:
    "Transform your restaurant or food business with WhatsApp. Take orders, manage reservations, send menu updates, and provide instant customer support. Boost sales and customer satisfaction.",
  keywords: [
    "restaurant whatsapp",
    "food delivery messaging",
    "restaurant reservations",
    "menu updates whatsapp",
    "food business automation",
    "restaurant customer service",
    "online ordering whatsapp",
    "cafe messaging",
    "food & beverage crm",
  ],
  openGraph: {
    title: "WhatsApp Business Solutions for Food & Beverage Industry",
    description:
      "Streamline orders, reservations, and customer service for your restaurant or food business with WhatsApp automation.",
    type: "website",
    url: "https://chati.chat/industries/food",
    images: [
      {
        url: "/og-food-industry.jpg",
        width: 1200,
        height: 630,
        alt: "Chati WhatsApp Solutions for Food & Beverage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Business for Food & Beverage | Chati",
    description: "Take orders, manage reservations, and delight customers with WhatsApp automation for restaurants.",
    images: ["/og-food-industry.jpg"],
  },
  alternates: {
    canonical: "https://chati.chat/industries/food",
  },
}

export default function FoodIndustryPage() {
  return <FoodClientPage />
}
