import type { Metadata } from "next"
import RCSCalculatorClientPage from "./client-page"

export const metadata: Metadata = {
  title: "RCS Messaging Cost Calculator - Estimate Your RCS Expenses in India | Chati",
  description:
    "Calculate your RCS messaging costs with our interactive calculator. Get instant estimates for sending RCS messages in India at ₹0.17 per message. Plan your budget effectively with volume-based pricing for 1K to 1M+ messages.",
  keywords: [
    "RCS calculator",
    "RCS messaging cost",
    "RCS pricing India",
    "RCS message calculator",
    "Rich Communication Services pricing",
    "RCS cost estimator",
    "RCS message pricing",
    "RCS bulk messaging cost",
    "RCS India pricing",
    "RCS message volume calculator",
  ],
  alternates: {
    canonical: "https://chati.ai/pricing/rcs-calculator",
  },
  openGraph: {
    title: "RCS Messaging Cost Calculator - Estimate Your RCS Expenses in India | Chati",
    description:
      "Calculate your RCS messaging costs with our interactive calculator. Get instant estimates for sending RCS messages in India at ₹0.17 per message.",
    type: "website",
    url: "https://chati.ai/pricing/rcs-calculator",
    siteName: "Chati",
    images: [
      {
        url: "https://chati.ai/rcs-calculator-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chati RCS Messaging Cost Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RCS Messaging Cost Calculator - Estimate Your RCS Expenses | Chati",
    description: "Calculate your RCS messaging costs with our interactive calculator for India.",
    images: ["https://chati.ai/rcs-calculator-twitter-image.jpg"],
    creator: "@chati",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RCSCalculatorPage() {
  return <RCSCalculatorClientPage />
}
