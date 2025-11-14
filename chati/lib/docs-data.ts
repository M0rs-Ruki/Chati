export interface DocArticle {
  id: string
  title: string
  description: string
  category: string
  slug: string
  content: string
  lastUpdated: string
  readTime: string
  tags: string[]
}

export interface DocCategory {
  id: string
  title: string
  description: string
  icon: string
  articles: DocArticle[]
}

export const docCategories: DocCategory[] = []

export function getAllArticles(): DocArticle[] {
  return docCategories.flatMap((category) => category.articles)
}

export function getArticleBySlug(slug: string): DocArticle | undefined {
  return getAllArticles().find((article) => article.slug === slug)
}

export function searchArticles(query: string): DocArticle[] {
  const lowerQuery = query.toLowerCase()
  return getAllArticles().filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}
