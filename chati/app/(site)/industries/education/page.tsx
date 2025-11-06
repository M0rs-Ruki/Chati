import type { Metadata } from "next"
import EducationPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Business API for Education & E-learning | Chati",
  description:
    "Engage students and parents with automated class reminders, assignment notifications, and instant support via WhatsApp. Improve attendance by 35% and streamline educational communication.",
  keywords:
    "WhatsApp for education, e-learning WhatsApp, student engagement, class reminders, educational communication, school messaging, online learning platform",
  openGraph: {
    title: "WhatsApp Business API for Education & E-learning | Chati",
    description:
      "Engage students and parents with automated class reminders, assignment notifications, and instant support via WhatsApp.",
    type: "website",
    url: "https://chati.com/industries/education",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Business API for Education & E-learning",
    description:
      "Engage students and parents with automated class reminders, assignment notifications, and instant support via WhatsApp.",
  },
}

export default function Page() {
  return <EducationPage />
}
