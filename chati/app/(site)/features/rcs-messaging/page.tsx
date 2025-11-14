import type { Metadata } from "next"
import RCSMessagingPage from "./client-page"

export const metadata: Metadata = {
  title: "RCS Business Messaging | Rich Interactive Messages with WhatsApp Fallback | Chati",
  description:
    "Send branded RCS messages with rich media, interactive buttons, and carousels at scale. Automatic fallback to WhatsApp ensures 99% delivery. Boost engagement by 60% with verified business messaging.",
  keywords: [
    "RCS messaging",
    "Rich Communication Services",
    "RCS business messaging",
    "interactive messaging",
    "RCS broadcast",
    "verified business messaging",
    "RCS WhatsApp fallback",
    "branded messaging",
    "rich media messaging",
    "RCS chatbot",
    "Google RCS",
    "RCS marketing",
    "RCS campaigns",
  ],
  openGraph: {
    title: "RCS Business Messaging with WhatsApp Fallback - Chati",
    description:
      "Create engaging RCS campaigns with rich media, interactive buttons, and verified branding. Automatic WhatsApp fallback ensures message delivery.",
    type: "website",
  },
}

export default function Page() {
  return <RCSMessagingPage />
}
