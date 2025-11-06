import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Customer Data Platform (CDP) - Unified Customer Insights & Analytics | Chati",
  description:
    "Transform customer data into actionable insights with Chati's Customer Data Platform. Consolidate data from multiple sources, create advanced segments, and launch targeted multi-channel campaigns across WhatsApp, RCS, SMS, and email. Real-time analytics, seamless integrations with Razorpay, Shopify, Facebook Leads, and 20+ platforms.",
  keywords: [
    "customer data platform",
    "CDP",
    "customer segmentation",
    "multi-channel campaigns",
    "real-time analytics",
    "customer insights",
    "data consolidation",
    "omnichannel marketing",
    "business automation",
    "customer analytics",
    "marketing automation",
    "customer journey analytics",
    "behavioral targeting",
    "personalized marketing",
    "CRM integration",
  ],
  openGraph: {
    title: "Customer Data Platform (CDP) - Unified Customer Insights | Chati",
    description:
      "Consolidate customer data, create advanced segments, and launch targeted campaigns across WhatsApp, RCS, SMS, and email with real-time analytics.",
    type: "website",
    images: [
      {
        url: "/cdp-woman-customer-data.webp",
        width: 1200,
        height: 630,
        alt: "Customer Data Platform showing unified customer insights and analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Data Platform (CDP) - Unified Customer Insights | Chati",
    description:
      "Transform customer data into actionable insights. Advanced segmentation, multi-channel campaigns, and real-time analytics.",
    images: ["/cdp-woman-customer-data.webp"],
  },
}

export default function CDPPage() {
  return <ClientPage />
}
