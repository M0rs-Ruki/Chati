import type { Metadata } from "next"
import WhatsAppAPIDocsPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Business API Documentation | Complete Integration Guide - Chati",
  description:
    "Comprehensive WhatsApp Business API documentation with integration guides, message templates, automation workflows, security best practices, and code examples for developers.",
  keywords:
    "WhatsApp Business API, WhatsApp API documentation, WhatsApp integration guide, message templates, WhatsApp automation, API security, developer documentation, WhatsApp Business Platform",
  openGraph: {
    title: "WhatsApp Business API Documentation | Complete Integration Guide",
    description:
      "Complete developer documentation for WhatsApp Business API integration with step-by-step guides, templates, and best practices.",
    type: "website",
    url: "https://chati.chat/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Business API Documentation | Complete Integration Guide",
    description:
      "Complete developer documentation for WhatsApp Business API integration with step-by-step guides, templates, and best practices.",
  },
  alternates: {
    canonical: "https://chati.chat/docs",
  },
}

export default function Page() {
  return <WhatsAppAPIDocsPage />
}
