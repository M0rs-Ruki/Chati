const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null // Return null for 404s
      }
      throw new Error(`API request failed with status ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('API Error:', error)
    return null
  }
}

export const api = {
  getNavigation: (key: 'header' | 'footer') => 
    fetchAPI(`/api/public/navigation?key=${key}`),
  
  getBlogPosts: () => fetchAPI('/api/public/blog'),
  getBlogPost: (id: string) => fetchAPI(`/api/public/blog/${id}`),
  
  getPages: () => fetchAPI('/api/public/pages'),
  getPage: (slug: string) => fetchAPI(`/api/public/pages/${slug}`),
  getPageSections: (pageId: string) => 
    fetchAPI(`/api/public/sections?pageId=${pageId}`),
  
  getCategories: () => fetchAPI('/api/public/categories'),
  getTags: () => fetchAPI('/api/public/tags'),
}
