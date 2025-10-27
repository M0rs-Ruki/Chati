import { api } from '@/lib/api'
import Link from 'next/link'
import { Calendar, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

interface Category {
  id: string
  slug: string
  title: string
  description?: string
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: string
  categoryId: string
  createdAt: string
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  
  let category: Category | null = null
  let posts: Post[] = []

  try {
    const [categoriesData, postsData] = await Promise.all([
      api.getCategories(),
      api.getBlogPosts(),
    ])
    
    category = categoriesData?.categories?.find((c: Category) => c.slug === slug) || null
    
    if (category) {
      posts = postsData?.posts?.filter(
        (p: Post) => p.categoryId === category!.id
      ) || []
    }
  } catch (error) {
    console.error('Failed to load category:', error)
  }

  if (!category) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Blog
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          {category.title}
        </h1>
        {category.description && (
          <p className="text-xl text-gray-600">{category.description}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
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
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
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
          <p className="text-gray-600 text-lg">
            No posts in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}
