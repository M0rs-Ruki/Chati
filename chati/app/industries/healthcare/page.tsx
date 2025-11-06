import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "HIPAA-Compliant WhatsApp for Healthcare | Secure Patient Communication | Chati",
  description:
    "Transform healthcare communication with HIPAA-compliant WhatsApp Business API. Send appointment reminders, lab results, prescription updates, and provide 24/7 patient support. Reduce no-shows by 40% and improve patient satisfaction.",
  keywords: [
    "whatsapp healthcare",
    "hipaa compliant whatsapp",
    "patient communication platform",
    "appointment reminders whatsapp",
    "telemedicine whatsapp",
    "healthcare chatbot",
    "patient engagement",
    "medical appointment scheduling",
    "prescription reminders",
    "lab results notification",
    "healthcare automation",
    "patient support whatsapp",
    "medical practice management",
    "healthcare messaging",
  ],
  openGraph: {
    title: "HIPAA-Compliant WhatsApp for Healthcare - Secure Patient Communication",
    description:
      "Reduce no-shows by 40% with automated appointment reminders. HIPAA-compliant patient communication via WhatsApp.",
    type: "website",
    url: "https://chati.ai/industries/healthcare",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WhatsApp Business API for Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIPAA-Compliant WhatsApp for Healthcare",
    description: "Secure patient communication with automated appointment reminders and 24/7 support.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://chati.ai/industries/healthcare",
  },
}

export default function HealthcarePage() {
  return <ClientPage />
}
