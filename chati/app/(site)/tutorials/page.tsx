import type { Metadata } from "next"
import TutorialsClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Video Tutorials - WhatsApp Business API Step-by-Step Guides | Chati",
  description:
    "Learn how to use WhatsApp Business API with our comprehensive video tutorials. Step-by-step guides covering setup, integration, automation, message templates, and best practices for customer engagement.",
  keywords: [
    "WhatsApp Business API tutorials",
    "WhatsApp API video guides",
    "WhatsApp Business setup",
    "API integration tutorials",
    "WhatsApp automation guides",
    "message template tutorials",
    "customer engagement videos",
    "WhatsApp Business training",
  ],
  openGraph: {
    title: "Video Tutorials - WhatsApp Business API Guides",
    description: "Step-by-step video tutorials for mastering WhatsApp Business API",
    type: "website",
  },
}

export default function TutorialsPage() {
  return <TutorialsClientPage />
}
