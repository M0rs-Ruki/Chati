const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}/${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.statusText}`);
  }

  return response.json();
}

// Specific API functions
export const api = {
  // Navigation
  getNavigation: (key: "header" | "footer") =>
    fetchAPI(`/api/navigation?key=${key}`),

  // Blog
  getBlogPosts: () => fetchAPI("/api/blog"),
  getBlogPost: (id: string) => fetchAPI(`/api/blog/${id}`),

  // Pages
  getPages: () => fetchAPI("/api/pages"),
  getPage: (id: string) => fetchAPI(`/api/pages/${id}`),
  getPageSections: (pageId: string) =>
    fetchAPI(`/api/sections?pageId=${pageId}`),

  // Categories
  getCategories: () => fetchAPI("/api/categories"),

  // Tags
  getTags: () => fetchAPI("/api/tags"),
};
