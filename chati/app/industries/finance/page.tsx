import type { Metadata } from "next"
import { FinanceClientPage } from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Business for Financial Services | Banking & Finance Messaging | Chati",
  description:
    "Secure WhatsApp solutions for banks, insurance, and financial services. Send account alerts, process inquiries, provide support, and engage customers with compliant, encrypted messaging.",
  keywords: [
    "financial services whatsapp",
    "banking whatsapp",
    "insurance messaging",
    "secure financial communication",
    "bank customer service",
    "financial alerts whatsapp",
    "fintech messaging",
    "investment advisory whatsapp",
    "loan application whatsapp",
  ],
  openGraph: {
    title: "WhatsApp Business Solutions for Financial Services Industry",
    description:
      "Secure, compliant WhatsApp messaging for banks, insurance companies, and financial institutions. Enhance customer service and engagement.",
    type: "website",
    url: "https://chati.chat/industries/finance",
    images: [
      {
        url: "/og-finance-industry.jpg",
        width: 1200,
        height: 630,
        alt: "Chati WhatsApp Solutions for Financial Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Business for Financial Services | Chati",
    description: "Secure, compliant WhatsApp messaging for banks and financial institutions.",
    images: ["/og-finance-industry.jpg"],
  },
  alternates: {
    canonical: "https://chati.chat/industries/finance",
  },
}

export default function FinanceIndustryPage() {
  return <FinanceClientPage />
}
