import type { Metadata } from "next"
import BlogListingPage from "./client-page"

export const metadata: Metadata = {
  title: "Blog - WhatsApp Business Tips, Guides & Best Practices | Chati",
  description:
    "Discover expert insights on WhatsApp Business API, customer engagement strategies, automation tips, and e-commerce best practices. Stay updated with the latest trends in conversational commerce.",
  keywords:
    "WhatsApp Business blog, customer engagement tips, chatbot automation, e-commerce strategies, WhatsApp marketing, business messaging",
  openGraph: {
    title: "Blog - WhatsApp Business Tips & Guides | Chati",
    description: "Expert insights on WhatsApp Business API, automation, and customer engagement strategies.",
    type: "website",
    url: "https://chati.chat/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - WhatsApp Business Tips & Guides | Chati",
    description: "Expert insights on WhatsApp Business API, automation, and customer engagement strategies.",
  },
}

export default function BlogPage() {
  return <BlogListingPage />
}
