import type { Metadata } from "next"
import { RealEstateClientPage } from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Business for Real Estate | Property Messaging Solutions | Chati",
  description:
    "Transform your real estate business with WhatsApp. Schedule property viewings, send listings, nurture leads, and close deals faster with automated messaging and instant communication.",
  keywords: [
    "real estate whatsapp",
    "property listings whatsapp",
    "real estate lead generation",
    "property viewing scheduling",
    "real estate crm",
    "property agent automation",
    "real estate messaging",
    "property sales automation",
    "real estate customer service",
  ],
  openGraph: {
    title: "WhatsApp Business Solutions for Real Estate Industry",
    description:
      "Schedule viewings, share listings, and close deals faster with WhatsApp automation for real estate agents and agencies.",
    type: "website",
    url: "https://chati.chat/industries/real-estate",
    images: [
      {
        url: "/og-real-estate-industry.jpg",
        width: 1200,
        height: 630,
        alt: "Chati WhatsApp Solutions for Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Business for Real Estate | Chati",
    description: "Schedule viewings, share listings, and close deals faster with WhatsApp automation.",
    images: ["/og-real-estate-industry.jpg"],
  },
  alternates: {
    canonical: "https://chati.chat/industries/real-estate",
  },
}

export default function RealEstateIndustryPage() {
  return <RealEstateClientPage />
}
