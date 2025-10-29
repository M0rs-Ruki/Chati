import { api } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getTheme() {
  try {
    const theme = await api.getTheme();
    return theme || null;
  } catch {
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const data = await api.getBlogPosts();
  const post = data?.posts?.find((p: any) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post = null;
  let theme = null;

  try {
    const [data, themeData] = await Promise.all([
      api.getBlogPosts(),
      getTheme(),
    ]);
    post = data?.posts?.find((p: any) => p.slug === slug);
    theme = themeData;
  } catch (error) {
    console.error("Failed to load post:", error);
  }

  if (!post) {
    notFound();
  }

  const primaryColor = "#000000ff";
  const accentColor = theme?.accentColor || "#10B981";
  const secondaryColor = theme?.secondaryColor || "#35eb25ff";

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 mb-8 transition-colors"
        style={{ color: primaryColor }}
      >
        <ArrowLeft size={20} />
        Back to Blog
      </Link>

      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-96 object-cover rounded-lg mb-8"
          priority
        />
      )}

      <h1
        className="text-5xl font-bold mb-4 text-black"
        style={{ color: secondaryColor }}
      >
        {post.title}
      </h1>

      <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
        <span className="flex items-center gap-2">
          <Calendar size={18} />
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="px-3 py-1 rounded-full text-sm font-medium text-white transition"
            style={{ backgroundColor: accentColor }}
          >
            {post.category.title}
          </Link>
        )}
      </div>

      {post.excerpt && (
        <p className="text-xl text-gray-700 mb-8 italic">{post.excerpt}</p>
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-600 font-semibold">Tags:</span>
            {post.tags.map((tag: any) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
