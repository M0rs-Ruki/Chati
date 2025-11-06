import type { Metadata } from "next"
import TravelPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Business API for Travel & Hospitality | Chati",
  description:
    "Enhance guest experiences with automated booking confirmations, travel updates, and 24/7 concierge service via WhatsApp. Increase bookings by 45% and improve guest satisfaction.",
  keywords:
    "WhatsApp for travel, hospitality WhatsApp, hotel messaging, booking confirmations, travel notifications, guest communication, tourism WhatsApp",
  openGraph: {
    title: "WhatsApp Business API for Travel & Hospitality | Chati",
    description:
      "Enhance guest experiences with automated booking confirmations, travel updates, and 24/7 concierge service via WhatsApp.",
    type: "website",
    url: "https://chati.com/industries/travel",
  },
}

export default function Page() {
  return <TravelPage />
}
