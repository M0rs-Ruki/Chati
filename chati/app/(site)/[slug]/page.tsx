import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PageClient from "./client-page"
import { prisma } from "@/lib/prisma"

// Force dynamic rendering
export const dynamic = "force-dynamic"
export const revalidate = 0

// Fetch page directly from database
async function getPage(slug: string) {
  try {
    console.log("🔍 Fetching page from database for slug:", slug)

    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (page) {
      console.log("✅ Successfully fetched page:", page.title)
      return page
    } else {
      console.log("⚠️ Page not found in database for slug:", slug)
    }
  } catch (error) {
    console.error("❌ Error fetching page from database:", error)
  }

  return null
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  
  if (!page) {
    return {
      title: "Page Not Found",
    }
  }

  const pageData = page as any

  return {
    title: page.title,
    description: pageData.metadata?.description || `${page.title} - WhatsApp Business API`,
    keywords: pageData.metadata?.keywords?.join(", ") || "",
    openGraph: {
      title: page.title,
      description: pageData.metadata?.description || `${page.title} - WhatsApp Business API`,
      type: "website",
    },
  }
}

export default async function PageRoute({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  return <PageClient page={page} />
}
