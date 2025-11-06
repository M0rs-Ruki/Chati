import type { Metadata } from "next"
import HelpCenterPage from "./client-page"

export const metadata: Metadata = {
  title: "Help Center - Get Support & Answers | Chati",
  description:
    "Find answers to common questions, troubleshooting guides, and support resources for WhatsApp Business API integration. Get help with account setup, billing, technical issues, and more.",
  keywords: [
    "help center",
    "customer support",
    "FAQ",
    "troubleshooting",
    "WhatsApp Business support",
    "technical support",
    "account help",
    "billing support",
    "integration help",
  ],
  openGraph: {
    title: "Help Center - Get Support & Answers | Chati",
    description: "Find answers to common questions and get support for WhatsApp Business API integration",
    type: "website",
  },
}

export default function Page() {
  return <HelpCenterPage />
}
