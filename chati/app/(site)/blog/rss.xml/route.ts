import { blogPosts } from '@/lib/blog-data'

// Fetch blog posts for RSS
async function getBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/blog?limit=100`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch blogs')
    }

    const result = await response.json()
    return result.data || []
  } catch (err) {
    console.error('Error fetching blogs for RSS:', err)
    return blogPosts // Fallback to static posts
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chati.chat'
  const posts = await getBlogPosts()

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chati Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Expert insights on WhatsApp Business API, customer engagement strategies, and automation tips</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map((post: any) => {
        const author =
          typeof post.author === 'object' ? post.author?.name : post.author || 'Chati Team'
        const date = post.publishedAt || post.createdAt || new Date().toISOString()
        const description = post.metadata?.description || post.excerpt || ''
        const content = typeof post.content === 'string' 
          ? post.content 
          : post.content?.html || description

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <author>${author}</author>
      ${post.metadata?.tags ? post.metadata.tags.map((tag: string) => `<category>${tag}</category>`).join('\n      ') : ''}
      ${post.imageUrl ? `<enclosure url="${post.imageUrl}" type="image/jpeg" />` : ''}
    </item>`
      })
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}
