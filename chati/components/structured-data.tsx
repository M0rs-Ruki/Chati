import Script from "next/script"

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chati",
    url: "https://chati.ai",
    logo: "https://chati.ai/logo.png",
    description:
      "Verified WhatsApp Business API provider with bulk messaging, chatbots, and team inbox for automated sales, service, and CRM.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
      contactType: "Customer Service",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://www.facebook.com/chati",
      "https://www.twitter.com/chati",
      "https://www.linkedin.com/company/chati",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chati",
    url: "https://chati.ai",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://chati.ai/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Chati WhatsApp Business API Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial available",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "10000",
    },
    description:
      "Automate sales, service, and CRM on WhatsApp. Verified WhatsApp Business API provider with bulk messaging, chatbots, and team inbox.",
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  )
}
