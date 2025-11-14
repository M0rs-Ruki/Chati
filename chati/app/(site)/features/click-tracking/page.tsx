import type { Metadata } from "next"
import ClickTrackingPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Click Tracking & Campaign Analytics | Chati - Real-Time Insights",
  description:
    "Track WhatsApp broadcast clicks in real-time and retarget high-intent users instantly. Monitor user engagement, analyze CTA button performance, and drive 3x more conversions with smart retargeting campaigns.",
  keywords:
    "WhatsApp click tracking, campaign analytics, CTA button tracking, user engagement tracking, WhatsApp retargeting, broadcast analytics, conversion tracking, real-time analytics, campaign insights, WhatsApp marketing analytics",
  openGraph: {
    title: "WhatsApp Click Tracking - Monitor Engagement & Retarget High-Intent Users",
    description:
      "Track who clicks your WhatsApp messages and retarget them instantly. Real-time click analytics, effortless retargeting, and 3x higher conversions.",
    type: "website",
  },
}

export default function Page() {
  return <ClickTrackingPage />
}
