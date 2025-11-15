import type { Metadata } from "next"
import AutomotivePage from "./client-page"

export const metadata: Metadata = {
  title: "Automotive WhatsApp & RCS Chatbots | AI Customer Service for Auto Dealers & Service Centers",
  description:
    "Transform automotive customer service with intelligent WhatsApp chatbots and RCS messaging. Automate vehicle troubleshooting, service appointments, test drive bookings, and personalized marketing campaigns. Multi-channel fallback ensures 99% delivery across WhatsApp, RCS, and SMS for maximum customer engagement.",
  keywords: [
    "automotive chatbots",
    "car dealership WhatsApp automation",
    "vehicle service appointment scheduling",
    "automotive RCS messaging",
    "AI customer support for auto industry",
    "car sales automation",
    "vehicle troubleshooting chatbot",
    "automotive service reminders",
    "test drive booking automation",
    "auto dealer messaging platform",
  ],
  openGraph: {
    title: "Automotive WhatsApp & RCS Chatbots - AI Customer Service for Auto Industry",
    description:
      "Revolutionize automotive customer engagement with WhatsApp chatbots, RCS messaging, and intelligent automation for service appointments, vehicle support, and personalized marketing.",
    type: "website",
    url: "/industries/automotive",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automotive WhatsApp & RCS Chatbots - AI Customer Service",
    description:
      "Transform auto dealer customer service with WhatsApp chatbots, RCS messaging, and multi-channel automation for appointments, vehicle support, and marketing.",
  },
}

export default function Page() {
  return <AutomotivePage />
}
