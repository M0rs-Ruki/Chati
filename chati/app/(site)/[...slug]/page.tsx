import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageClient from "./client-page";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://chati.ai";
  const pageUrl = `${baseUrl}/${slugString}`;

  // Extract metadata
  const title = page.title;
  const description =
    pageData.metadata?.description ||
    `${page.title} - WhatsApp Business API Platform`;
  const keywords = pageData.metadata?.keywords || [];
  const tags = pageData.metadata?.tags || [];
  const author = pageData.author?.name || "Chati Team";
  const publishedAt = pageData.publishedAt || pageData.createdAt;
  const updatedAt = pageData.updatedAt || pageData.createdAt;
  const status = pageData.status || "DRAFT";

  // Determine if page should be indexed (only PUBLISHED pages)
  const shouldIndex = status === "PUBLISHED";

  // Extract image from content blocks if available
  let ogImage = `${baseUrl}/og-image.jpg`;
  if (pageData.content?.blocks) {
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

  // Combine keywords and tags for better SEO
  const allKeywords = [
    ...keywords,
    ...tags,
    "WhatsApp Business API",
    "WhatsApp automation",
    "customer engagement",
  ].filter((k, i, arr) => arr.indexOf(k) === i); // Remove duplicates

  return {
    title: `${title} | Chati - WhatsApp Business API Platform`,
    description,
    keywords: allKeywords.join(", "),
    authors: [{ name: author }],
    creator: author,
    publisher: "Chati",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      siteName: "Chati - WhatsApp Business API Platform",
      title: `${title} | Chati`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedAt && {
        publishedTime: new Date(publishedAt).toISOString(),
      }),
      ...(updatedAt && { modifiedTime: new Date(updatedAt).toISOString() }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Chati`,
      description,
      images: [ogImage],
      creator: "@chati",
      site: "@chati",
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-video-preview": shouldIndex ? -1 : 0,
        "max-image-preview": shouldIndex ? "large" : "none",
        "max-snippet": shouldIndex ? -1 : 0,
      },
      ...(shouldIndex ? {} : { noarchive: true, nosnippet: true }),
    },
    category: tags[0] || undefined,
    other: {
      ...(tags.length > 0 && { "article:tag": tags.join(", ") }),
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
