import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chati AI - WhatsApp Marketing Platform | Official WhatsApp Business API",
  description:
    "Power up your marketing momentum with Chati AI, the ultimate WhatsApp Business API platform for customer engagement and automation. 97% open rates, 10-65% ROI increase.",
  keywords: [
    "WhatsApp marketing",
    "WhatsApp Business API",
    "bulk WhatsApp",
    "WhatsApp automation",
    "customer engagement",
    "marketing automation",
    "WhatsApp chatbot",
  ],
  generator: "v0.app",
  applicationName: "Chati AI",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Chati AI" }],
  creator: "Chati AI",
  publisher: "Chati AI",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: "Chati AI - WhatsApp Marketing Platform",
    description:
      "The ultimate WhatsApp Business API platform for customer engagement and marketing automation. Start your free trial today.",
    type: "website",
    url: "https://chatiAI.com",
    siteName: "Chati AI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chati AI - WhatsApp Marketing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chati AI - WhatsApp Marketing Platform",
    description: "The ultimate WhatsApp Business API platform for customer engagement.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://chatiAI.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#35a84a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Chati AI",
              url: "https://chatiAI.com",
              logo: "https://chatiAI.com/logo.png",
              description: "WhatsApp Business API platform for customer engagement and marketing automation",
              sameAs: [
                "https://twitter.com/chatiAI",
                "https://linkedin.com/company/chatiAI",
                "https://facebook.com/chatiAI",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                telephone: "+91-9583-000-772",
                email: "support@chatiAI.com",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
