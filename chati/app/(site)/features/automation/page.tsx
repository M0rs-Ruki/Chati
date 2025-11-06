import type { Metadata } from "next"
import AutomationWorkflowPage from "./client-page"

export const metadata: Metadata = {
  title: "Automation Workflows - Multi-Channel Marketing Automation | Chati.ai",
  description:
    "Create powerful automation workflows that trigger WhatsApp, RCS, SMS, and email campaigns from Facebook Leads, Shopify, Razorpay, and 20+ integrations. Build sophisticated drip campaigns with delays, conditions, and multi-step sequences.",
  keywords:
    "automation workflows, marketing automation, WhatsApp automation, RCS automation, SMS automation, email automation, Facebook Leads automation, Shopify automation, Razorpay automation, drip campaigns, workflow builder, multi-channel automation, triggered campaigns, automated messaging, workflow automation, business process automation, India Mart automation, Justdial automation, webhook automation, PetPooja automation, 99Acres automation, Housing.com automation, lead automation, sales automation, customer journey automation",
  openGraph: {
    title: "Automation Workflows - Multi-Channel Marketing Automation | Chati.ai",
    description:
      "Build sophisticated automation workflows with triggers, delays, and multi-channel actions. Automate WhatsApp, RCS, SMS, and email campaigns from 20+ platform integrations.",
    type: "website",
    url: "https://chati.ai/features/automation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation Workflows - Multi-Channel Marketing Automation",
    description:
      "Create powerful automation workflows that trigger WhatsApp, RCS, SMS, and email campaigns from Facebook Leads, Shopify, Razorpay, and 20+ integrations.",
  },
}

export default function Page() {
  return <AutomationWorkflowPage />
}
