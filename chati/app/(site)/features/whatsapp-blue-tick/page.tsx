import { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Blue Tick Verification | Get Verified Business Badge",
  description:
    "Get your official WhatsApp Blue Tick verification badge. Boost customer trust, increase message open rates by 70%, and stand out with verified business status. Apply for WhatsApp verification today.",
  keywords: [
    "WhatsApp Blue Tick",
    "WhatsApp verification",
    "business verification",
    "verified WhatsApp account",
    "WhatsApp Business API verification",
    "trust and credibility",
    "customer engagement",
    "official business badge",
    "WhatsApp green tick",
    "verified business status",
  ],
  openGraph: {
    title: "WhatsApp Blue Tick Verification | Get Your Business Verified",
    description:
      "Build instant trust with customers. Get your official WhatsApp Blue Tick and increase engagement by 70%. Apply for verification today.",
    type: "website",
  },
}

export default function WhatsAppBlueTickPage() {
  return <ClientPage />
}
