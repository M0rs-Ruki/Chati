import { api } from "@/lib/api";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

export default async function BlogPage() {
  let posts = [];
  let categories = [];

  try {
    const [postsData, categoriesData] = await Promise.all([
      api.getBlogPosts(),
      api.getCategories(),
    ]);
    posts = postsData.posts || [];
    categories = categoriesData.categories || [];
  } catch (error) {
    console.error("Failed to load blog data:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Explore our latest articles and insights
        </p>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <Link
            href="/blog"
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
          >
            All Posts
          </Link>
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {post.coverImage && (
              <Link href={`/blog/${post.slug}`}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No blog posts yet.</p>
        </div>
      )}
    </div>
  );
}
