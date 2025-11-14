import type { Metadata } from "next"
import ChatbotsAIPage from "./client-page"

export const metadata: Metadata = {
  title: "AI Chatbots & Conversational AI | Automated Customer Support - Chati",
  description:
    "Deploy intelligent AI chatbots powered by conversational AI and machine learning. Automate customer support, provide instant responses, and enhance engagement across WhatsApp, RCS, Instagram, and Facebook Messenger with natural language processing.",
  keywords: [
    "AI chatbots",
    "conversational AI",
    "automated customer support",
    "intelligent chatbots",
    "business automation",
    "AI-powered customer service",
    "natural language processing",
    "machine learning chatbots",
    "WhatsApp chatbot",
    "automated responses",
    "customer engagement AI",
    "multi-platform chatbot",
  ],
  openGraph: {
    title: "AI Chatbots & Conversational AI | Automated Customer Support",
    description:
      "Deploy intelligent AI chatbots that automate customer interactions, provide instant support, and enhance engagement across multiple platforms with advanced NLP and machine learning.",
    type: "website",
  },
}

export default function Page() {
  return <ChatbotsAIPage />
}
