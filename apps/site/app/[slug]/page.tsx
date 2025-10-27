import { api } from '@/lib/api'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  
  let page = null

  try {
    const data = await api.getPage(slug)
    page = data.page
  } catch (error) {
    console.error('Failed to load page:', error)
  }

  if (!page) {
    notFound()
  }

  return (
    <article>
      {page.sections && page.sections.length > 0 ? (
        <SectionRenderer sections={page.sections} />
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-xl text-gray-600">{page.description}</p>
          )}
        </div>
      )}
    </article>
  )
}
