import type { Metadata } from "next"
import PricingClientPage from "./client-page"

export const metadata: Metadata = {
  title: "WhatsApp Business API Pricing Plans - Starter ₹999, Professional ₹1999, Enterprise ₹2999 | Chati",
  description:
    "Transparent WhatsApp Business API pricing for startups and enterprises. Choose from Starter (₹999), Professional (₹1999), or Enterprise (₹2999) plans. Get chatbot automation, team inbox, advanced workflows, and CRM integrations. Calculate your exact costs with our smart pricing calculator.",
  keywords: [
    "WhatsApp Business API pricing India",
    "WhatsApp chatbot pricing",
    "WhatsApp automation cost",
    "affordable WhatsApp Business API",
    "WhatsApp API plans India",
    "WhatsApp messaging pricing calculator",
    "bulk WhatsApp pricing",
    "WhatsApp Business API for startups",
    "enterprise WhatsApp pricing",
    "WhatsApp team inbox pricing",
    "WhatsApp broadcast pricing",
    "WhatsApp automation plans",
    "WhatsApp CRM integration pricing",
    "WhatsApp workflow automation cost",
    "WhatsApp API ₹999",
    "WhatsApp Business Professional plan",
    "WhatsApp Enterprise automation",
  ],
  alternates: {
    canonical: "https://chati.ai/pricing",
  },
  openGraph: {
    title: "WhatsApp Business API Pricing - Starter ₹999, Professional ₹1999, Enterprise ₹2999 | Chati",
    description:
      "Transparent pricing for WhatsApp Business API and chatbot automation. Clear upgrade path from startup to enterprise with smart volume-based discounts.",
    type: "website",
    url: "https://chati.ai/pricing",
    siteName: "Chati - WhatsApp Business API Platform",
    images: [
      {
        url: "https://chati.ai/pricing-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chati Pricing Plans - WhatsApp Business API for Startups and Enterprises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Business API Pricing - Starter ₹999, Professional ₹1999, Enterprise ₹2999",
    description:
      "Transparent pricing for WhatsApp Business API. Choose the perfect plan for your business with clear upgrade path.",
    images: ["https://chati.ai/pricing-twitter-image.jpg"],
    creator: "@chati",
    site: "@chati",
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
  other: {
    "price:currency": "INR",
    "price:amount": "999",
  },
}

export default function PricingPage() {
  return (
    <>
      <PricingClientPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Chati WhatsApp Business API Platform",
            description:
              "WhatsApp Business API platform with chatbot automation, team inbox, and advanced workflows for businesses of all sizes.",
            brand: {
              "@type": "Brand",
              name: "Chati",
            },
            offers: [
              {
                "@type": "Offer",
                name: "Starter Plan",
                price: "999",
                priceCurrency: "INR",
                priceValidUntil: "2025-12-31",
                availability: "https://schema.org/InStock",
                url: "https://chati.ai/pricing",
                description: "Perfect for startups with broadcast, API access, and basic inbox features",
              },
              {
                "@type": "Offer",
                name: "Professional Plan",
                price: "1999",
                priceCurrency: "INR",
                priceValidUntil: "2025-12-31",
                availability: "https://schema.org/InStock",
                url: "https://chati.ai/pricing",
                description: "Built for growing teams with chatbot builder, team inbox, and workflow automation",
              },
              {
                "@type": "Offer",
                name: "Enterprise Plan",
                price: "2999",
                priceCurrency: "INR",
                priceValidUntil: "2025-12-31",
                availability: "https://schema.org/InStock",
                url: "https://chati.ai/pricing",
                description:
                  "Business automation tier with advanced chatbot flows, CRM integrations, and unlimited users",
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "500",
            },
          }),
        }}
      />
    </>
  )
}
