import { api } from "@/lib/api";
import Link from "next/link";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
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
  // ... rest of the component stays the same
  const { slug } = await params;

  let post = null;

  try {
    const data = await api.getBlogPosts();
    post = data?.posts?.find((p: any) => p.slug === slug);
  } catch (error) {
    console.error("Failed to load post:", error);
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Rest of your blog post UI */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Blog
      </Link>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      <h1 className="text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>

      <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
        <span className="flex items-center gap-2">
          <Calendar size={18} />
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {post.excerpt && (
        <p className="text-xl text-gray-700 mb-8 italic">{post.excerpt}</p>
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
