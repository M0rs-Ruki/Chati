import type { Metadata } from "next"
import DripMarketingPage from "./client-page"

export const metadata: Metadata = {
  title: "Drip Marketing & Sequence Campaigns | Automated Multi-Channel Marketing | Chati",
  description:
    "Create intelligent drip marketing campaigns with multi-channel fallback across WhatsApp, RCS, SMS, and email. Automate customer journeys, boost engagement rates by 3x, and ensure 99% message delivery with smart channel switching.",
  keywords:
    "drip marketing, sequence marketing, automated campaigns, multi-channel marketing, WhatsApp drip campaigns, RCS messaging, SMS fallback, email automation, customer journey automation, marketing automation, behavior-triggered campaigns, personalized marketing sequences",
  openGraph: {
    title: "Drip Marketing & Sequence Campaigns with Multi-Channel Fallback",
    description:
      "Build automated drip campaigns that switch between WhatsApp, RCS, SMS, and email for guaranteed delivery. Create personalized customer journeys that boost engagement by 3x.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drip Marketing & Sequence Campaigns | Chati",
    description:
      "Automate multi-channel drip campaigns with intelligent fallback. Switch from WhatsApp to RCS to SMS automatically for 99% delivery rates.",
  },
}

export default function Page() {
  return <DripMarketingPage />
}
