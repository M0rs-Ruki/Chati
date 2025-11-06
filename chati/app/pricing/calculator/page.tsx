import type { Metadata } from "next"
import CalculatorClientPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Pricing Calculator - Estimate Your Messaging Costs | Chati",
  description:
    "Calculate your WhatsApp Business API costs with our interactive pricing calculator. Estimate costs based on message volume, country, and subscription plan. Get instant pricing for Marketing, Utility, Authentication, and International messaging.",
  keywords: [
    "WhatsApp pricing calculator",
    "messaging cost calculator",
    "WhatsApp Business API calculator",
    "RCS pricing calculator",
    "message volume calculator",
    "WhatsApp cost estimator",
    "bulk messaging pricing",
    "WhatsApp API cost calculator",
    "international messaging pricing",
    "WhatsApp message pricing India",
  ],
  alternates: {
    canonical: "https://chati.ai/pricing/calculator",
  },
  openGraph: {
    title: "WhatsApp Pricing Calculator - Estimate Your Messaging Costs | Chati",
    description:
      "Calculate your WhatsApp Business API costs with our interactive pricing calculator. Get instant estimates based on your message volume and country.",
    type: "website",
    url: "https://chati.ai/pricing/calculator",
    siteName: "Chati",
    images: [
      {
        url: "https://chati.ai/calculator-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chati WhatsApp Pricing Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Pricing Calculator - Estimate Your Messaging Costs | Chati",
    description: "Calculate your WhatsApp Business API costs with our interactive pricing calculator.",
    images: ["https://chati.ai/calculator-twitter-image.jpg"],
    creator: "@chati",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CalculatorPage() {
  return <CalculatorClientPage />
}
