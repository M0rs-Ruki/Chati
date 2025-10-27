import { api } from '@/lib/api'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'

export default async function HomePage() {
  let posts = []

  try {
    const data = await api.getBlogPosts()
    posts = data.posts || []
  } catch (error) {
    console.error('Failed to load posts:', error)
  }

  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  )
}
