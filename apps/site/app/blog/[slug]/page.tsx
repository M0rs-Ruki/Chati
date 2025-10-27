import { api } from "@/lib/api";
import Link from "next/link";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post = null;

  try {
    const data = await api.getBlogPosts();
    post = data.posts?.find((p: any) => p.slug === slug);
  } catch (error) {
    console.error("Failed to load post:", error);
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Blog
      </Link>

      {/* Cover Image */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>

      {/* Meta */}
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
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200"
          >
            {post.category.name}
          </Link>
        )}
      </div>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-xl text-gray-700 mb-8 italic">{post.excerpt}</p>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={20} className="text-gray-500" />
            {post.tags.map((tag: any) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <div className="mt-12 pt-8 border-t">
        <p className="text-gray-600 text-center">
          Found this article helpful? Share it with others!
        </p>
      </div>
    </article>
  );
}
