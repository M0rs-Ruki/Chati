import type { Metadata } from "next"
import ContactClientPage from "./contactClient"

export const metadata: Metadata = {
  title: "Contact - Chati AI | Get in Touch",
  description: "Contact Chati AI for support, demos, or inquiries. Phone: +91-9583-000-772, Email: support@chatiAI.com",
  openGraph: {
    title: "Contact - Chati AI",
    description: "Get in touch with Chati AI.",
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactClientPage />
}
