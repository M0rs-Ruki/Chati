const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.statusText}`)
  }

  return response.json()
}

export const api = {
  // Navigation - PUBLIC endpoints
  getNavigation: (key: 'header' | 'footer') => 
    fetchAPI(`/api/public/navigation?key=${key}`),
  
  // Blog - PUBLIC endpoints
  getBlogPosts: () => fetchAPI('/api/public/blog'),
  getBlogPost: (id: string) => fetchAPI(`/api/public/blog/${id}`),
  
  // Pages - PUBLIC endpoints
  getPages: () => fetchAPI('/api/public/pages'),
  getPage: (id: string) => fetchAPI(`/api/public/pages/${id}`),
  getPageSections: (pageId: string) => 
    fetchAPI(`/api/public/sections?pageId=${pageId}`),
  
  // Categories - PUBLIC endpoints
  getCategories: () => fetchAPI('/api/public/categories'),
  
  // Tags - PUBLIC endpoints
  getTags: () => fetchAPI('/api/public/tags'),
}
