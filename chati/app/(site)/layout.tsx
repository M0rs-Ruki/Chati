import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider-global"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("@/components/footer").then((mod) => ({ default: mod.Footer })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
})

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true, variable: "--font-inter" })

export const metadata: Metadata = {
  metadataBase: new URL("https://chati.ai"),
  title: {
    default: "Chati - Verified WhatsApp Business API Provider | Automate Customer Communication",
    template: "%s | Chati - WhatsApp Business API",
  },
  description:
    "Automate sales, service, and CRM on WhatsApp. Verified WhatsApp Business API provider with bulk messaging, AI chatbots, team inbox, and omnichannel messaging. Start free trial today.",
  keywords: [
    "WhatsApp Business API",
    "WhatsApp automation",
    "bulk WhatsApp messaging",
    "WhatsApp chatbot",
    "team inbox",
    "WhatsApp CRM",
    "customer data platform",
    "omnichannel messaging",
    "RCS messaging",
    "Instagram messaging",
    "Facebook Messenger API",
    "conversational AI",
    "customer engagement platform",
  ],
  authors: [{ name: "Chati", url: "https://chati.ai" }],
  creator: "Chati",
  publisher: "Chati",
  alternates: {
    canonical: "https://chati.ai",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chati.ai",
    siteName: "Chati",
    title: "Chati - Verified WhatsApp Business API Provider | Automate Customer Communication",
    description:
      "Automate sales, service, and CRM on WhatsApp. Verified WhatsApp Business API provider with bulk messaging, AI chatbots, and team inbox.",
    images: [
      {
        url: "https://chati.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chati - WhatsApp Business API Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chati - Verified WhatsApp Business API Provider",
    description: "Automate sales, service, and CRM on WhatsApp with AI chatbots and omnichannel messaging",
    images: ["https://chati.ai/twitter-image.jpg"],
    creator: "@chati",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/hero-woman-thinking.webp" />
        <link rel="preload" as="image" href="/images/design-mode/Frame%2028493.webp" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
