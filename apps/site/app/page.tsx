import { api } from '@/lib/api'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'

async function getTheme() {
  try {
    const theme = await api.getTheme()
    return theme || null
  } catch {
    return null
  }
}

export default async function HomePage() {
  let posts = []
  let theme = null

  try {
    const [postsData, themeData] = await Promise.all([
      api.getBlogPosts(),
      getTheme(),
    ])
    posts = postsData?.posts || []
    theme = themeData
  } catch (error) {
    console.error('Failed to load data:', error)
  }

  return (
    <>
      <Hero theme={theme} />
      <FeaturedPosts posts={posts} theme={theme} />
    </>
  )
}
