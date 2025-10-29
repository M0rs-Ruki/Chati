'use client'

import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"

interface Post {
  id: string
  title: string
  excerpt: string
  slug: string
  coverImage?: string
  createdAt: string
}

interface Theme {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
}

interface FeaturedPostsProps {
  posts: Post[]
  theme?: Theme | null
}

export default function FeaturedPosts({ posts, theme }: FeaturedPostsProps) {
  const primaryColor = theme?.primaryColor || '#3B82F6'
  const secondaryColor = theme?.secondaryColor || '#2563EB'

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-gray-600">
            Check out our most recent articles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  width={500}
                  height={200}
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors"
                    style={{ color: 'inherit' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = primaryColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold mt-4 inline-block transition-colors"
                  style={{ color: secondaryColor }}
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="px-8 py-3 rounded-lg font-semibold transition inline-block text-white"
            style={{ backgroundColor: secondaryColor }}
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}
