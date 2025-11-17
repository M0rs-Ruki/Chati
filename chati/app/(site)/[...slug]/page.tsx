import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageClient from "./client-page";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Demo/Default SEO data - can be overridden by real page data
const DEFAULT_SEO_DATA = {
  siteName: "Chati - WhatsApp Business API Platform",
  publisher: "Chati",
  defaultAuthor: "Chati Team",
  defaultKeywords: [
    "WhatsApp Business API",
    "WhatsApp automation",
    "bulk messaging",
    "chatbot",
    "customer engagement",
    "multi-channel messaging",
    "unified inbox",
  ],
  defaultImage: "/og-image.jpg",
  twitterHandle: "@chati",
  locale: "en_US",
};

// Helper function to merge real data with demo defaults
function getSEOData(pageData: any, slugString: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://chati.ai";
  const pageUrl = `${baseUrl}/${slugString}`;

  // Real data from API (priority)
  const realTitle = pageData.title || "";
  const realDescription = pageData.metadata?.description;
  const realKeywords = pageData.metadata?.keywords || [];
  const realTags = pageData.metadata?.tags || [];
  const realAuthor = pageData.author?.name || pageData.metadata?.author;
  const realPublishedAt = pageData.publishedAt || pageData.createdAt;
  const realUpdatedAt = pageData.updatedAt || pageData.createdAt;
  const realStatus = pageData.status || "DRAFT";
  const realOgImage = pageData.metadata?.ogImage || pageData.metadata?.image;
  const realTwitterCard = pageData.metadata?.twitterCard;
  const realCanonicalUrl = pageData.metadata?.canonicalUrl;

  // Use real data first, fallback to demo/default data
  const title = realTitle || "Chati - WhatsApp Business API Platform";
  const description =
    realDescription ||
    `${title} - Connect with customers on WhatsApp Business API. Send bulk messages, automate conversations, and manage all channels in one unified inbox.`;
  const author = realAuthor || DEFAULT_SEO_DATA.defaultAuthor;
  const status = realStatus;
  const shouldIndex = status === "PUBLISHED";

  // Extract image from content blocks if no metadata image
  let ogImage = realOgImage || DEFAULT_SEO_DATA.defaultImage;
  if (!realOgImage && pageData.content?.blocks) {
    const imageBlock = pageData.content.blocks.find(
      (block: any) => block.data?.imageSrc || block.data?.image
    );
    if (imageBlock?.data?.imageSrc) {
      ogImage = imageBlock.data.imageSrc.startsWith("http")
        ? imageBlock.data.imageSrc
        : `${baseUrl}${imageBlock.data.imageSrc}`;
    } else if (imageBlock?.data?.image) {
      ogImage = imageBlock.data.image.startsWith("http")
        ? imageBlock.data.image
        : `${baseUrl}${imageBlock.data.image}`;
    }
  }

  // Ensure ogImage is a full URL
  if (ogImage && !ogImage.startsWith("http")) {
    ogImage = `${baseUrl}${ogImage}`;
  }

  // Combine real keywords/tags with default keywords (remove duplicates)
  const allKeywords = [
    ...realKeywords,
    ...realTags,
    ...DEFAULT_SEO_DATA.defaultKeywords,
  ].filter((k, i, arr) => arr.indexOf(k) === i && k); // Remove duplicates and empty values

  // Use canonical URL from metadata if provided, otherwise use page URL
  const canonicalUrl = realCanonicalUrl || pageUrl;

  return {
    title,
    description,
    author,
    keywords: allKeywords,
    tags: realTags,
    ogImage,
    canonicalUrl,
    pageUrl,
    baseUrl,
    publishedAt: realPublishedAt,
    updatedAt: realUpdatedAt,
    status,
    shouldIndex,
    twitterCard: realTwitterCard || "summary_large_image",
  };
}

// Fetch page directly from database
async function getPage(slug: string) {
  try {
    console.log("🔍 Fetching page from database for slug:", slug);

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
    });

    if (page) {
      console.log("✅ Successfully fetched page:", page.title);
      return page;
    } else {
      console.log("⚠️ Page not found in database for slug:", slug);
    }
  } catch (error) {
    console.error("❌ Error fetching page from database:", error);
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const page = await getPage(slugString);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const pageData = page as any;
  
  // Get SEO data (real data + demo defaults)
  const seoData = getSEOData(pageData, slugString);

  return {
    title: `${seoData.title} | ${DEFAULT_SEO_DATA.siteName}`,
    description: seoData.description,
    keywords: seoData.keywords.join(", "),
    authors: [{ name: seoData.author }],
    creator: seoData.author,
    publisher: DEFAULT_SEO_DATA.publisher,
    metadataBase: new URL(seoData.baseUrl),
    alternates: {
      canonical: seoData.canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: DEFAULT_SEO_DATA.locale,
      url: seoData.pageUrl,
      siteName: DEFAULT_SEO_DATA.siteName,
      title: `${seoData.title} | Chati`,
      description: seoData.description,
      images: [
        {
          url: seoData.ogImage,
          width: 1200,
          height: 630,
          alt: seoData.title,
        },
      ],
      ...(seoData.publishedAt && {
        publishedTime: new Date(seoData.publishedAt).toISOString(),
      }),
      ...(seoData.updatedAt && {
        modifiedTime: new Date(seoData.updatedAt).toISOString(),
      }),
    },
    twitter: {
      card: seoData.twitterCard as "summary_large_image" | "summary",
      title: `${seoData.title} | Chati`,
      description: seoData.description,
      images: [seoData.ogImage],
      creator: DEFAULT_SEO_DATA.twitterHandle,
      site: DEFAULT_SEO_DATA.twitterHandle,
    },
    robots: {
      index: seoData.shouldIndex,
      follow: seoData.shouldIndex,
      googleBot: {
        index: seoData.shouldIndex,
        follow: seoData.shouldIndex,
        "max-video-preview": seoData.shouldIndex ? -1 : 0,
        "max-image-preview": seoData.shouldIndex ? "large" : "none",
        "max-snippet": seoData.shouldIndex ? -1 : 0,
      },
      ...(seoData.shouldIndex ? {} : { noarchive: true, nosnippet: true }),
    },
    category: seoData.tags[0] || undefined,
    other: {
      ...(seoData.tags.length > 0 && { "article:tag": seoData.tags.join(", ") }),
    },
  };
}

export default async function PageRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const page = await getPage(slugString);

  if (!page) {
    notFound();
  }

  return <PageClient page={page} />;
}
