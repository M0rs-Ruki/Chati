import type { Metadata } from "next"
import WhatsAppWebViewsPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp WebViews - Open Web Pages Inside WhatsApp Chat | Chati",
  description:
    "Keep customers engaged with WhatsApp WebViews. Load web pages directly within WhatsApp conversations to reduce drop-offs, increase conversions, and provide seamless booking, shopping, and form experiences without external redirects.",
  keywords: [
    "WhatsApp WebViews",
    "in-app browser WhatsApp",
    "WhatsApp web pages",
    "reduce cart abandonment",
    "WhatsApp conversions",
    "seamless booking WhatsApp",
    "WhatsApp shopping experience",
    "embedded web pages",
    "WhatsApp engagement",
    "no browser redirect",
  ],
  openGraph: {
    title: "WhatsApp WebViews - Keep Customers Engaged Inside Chat",
    description:
      "Stop losing customers to external browsers. Load complete web pages directly within WhatsApp to boost conversions, simplify bookings, and enhance user experience with seamless in-chat interactions.",
    type: "website",
    images: [
      {
        url: "/og-whatsapp-webviews.jpg",
        width: 1200,
        height: 630,
        alt: "WhatsApp WebViews feature showing embedded web pages inside chat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp WebViews - Embedded Web Pages Inside Chat",
    description:
      "Keep users engaged inside WhatsApp. Load booking systems, product catalogs, forms, and checkout pages directly within chat to maximize conversions.",
  },
}

export default function Page() {
  return <WhatsAppWebViewsPage />
}
