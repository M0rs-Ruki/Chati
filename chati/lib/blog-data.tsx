export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  thumbnail: string
  readTime: string
  tags: string[]
}

export const blogPosts: BlogPost[] = []

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  const currentPost = blogPosts.find((post) => post.slug === currentSlug)
  if (!currentPost) return blogPosts.slice(0, count)

  // Find posts with matching tags or category
  const related = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      let score = 0
      if (post.category === currentPost.category) score += 3
      post.tags.forEach((tag) => {
        if (currentPost.tags.includes(tag)) score += 1
      })
      return { post, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((item) => item.post)

  return related
}
