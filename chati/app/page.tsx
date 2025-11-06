import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "AI SaaS - Transform Your Business with AI",
  description: "Automate workflows, gain insights, and scale effortlessly with our cutting-edge AI platform.",
}

export default function Page() {
  return <ClientPage />
}
