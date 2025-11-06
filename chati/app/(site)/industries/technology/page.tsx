import type { Metadata } from "next"
import { TechnologyClientPage } from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Business for Technology & SaaS | Tech Company Messaging | Chati",
  description:
    "WhatsApp solutions for SaaS and technology companies. Onboard users, provide support, send product updates, and engage customers with automated messaging for tech businesses.",
  keywords: [
    "saas whatsapp",
    "technology company messaging",
    "software customer support",
    "saas onboarding whatsapp",
    "tech support automation",
    "product updates whatsapp",
    "software customer engagement",
    "saas customer success",
    "tech company crm",
  ],
  openGraph: {
    title: "WhatsApp Business Solutions for Technology & SaaS Companies",
    description:
      "Onboard users, provide support, and engage customers with WhatsApp automation for SaaS and technology companies.",
    type: "website",
    url: "https://chati.chat/industries/technology",
    images: [
      {
        url: "/og-technology-industry.jpg",
        width: 1200,
        height: 630,
        alt: "Chati WhatsApp Solutions for Technology & SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Business for Technology & SaaS | Chati",
    description: "Onboard users, provide support, and engage customers with WhatsApp automation for tech companies.",
    images: ["/og-technology-industry.jpg"],
  },
  alternates: {
    canonical: "https://chati.chat/industries/technology",
  },
}

export default function TechnologyIndustryPage() {
  return <TechnologyClientPage />
}
