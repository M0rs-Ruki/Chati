import { MetadataRoute } from 'next'

// Fetch blog posts for sitemap
async function getBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/blog?limit=100`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error('Failed to fetch blogs')
    }

    const result = await response.json()
    return result.data || []
  } catch (err) {
    console.error('Error fetching blogs for sitemap:', err)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chati.chat'
  const posts = await getBlogPosts()

  // Blog listing page
  const blogMainPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }

  // Individual blog posts
  const blogPosts = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [blogMainPage, ...blogPosts]
}
