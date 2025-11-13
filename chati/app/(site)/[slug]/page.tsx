import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PageClient from "./client-page"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  
  // Try to fetch from database
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/public/page/slug/${slug}`,
      { next: { revalidate: 60 } }
    )
    
    if (response.ok) {
      const result = await response.json()
      const page = result.data

      return {
        title: page.title,
        description: page.metadata?.description || `${page.title} - WhatsApp Business API`,
        keywords: page.metadata?.keywords?.join(", ") || "",
        openGraph: {
          title: page.title,
          description: page.metadata?.description || `${page.title} - WhatsApp Business API`,
          type: "website",
        },
      }
    }
  } catch (error) {
    console.error('Error fetching page metadata:', error)
  }

  return {
    title: "Page Not Found",
  }
}

export default async function PageRoute({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  
  // Fetch page from database
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/public/page/slug/${slug}`,
      { next: { revalidate: 60 } }
    )
    
    if (response.ok) {
      const result = await response.json()
      return <PageClient page={result.data} />
    }
  } catch (error) {
    console.error('Error fetching page:', error)
  }

  notFound()
}
