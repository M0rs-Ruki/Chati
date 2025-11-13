"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

interface PageClientProps {
  page: any
}

export default function PageClient({ page }: PageClientProps) {
  // Render page content
  const renderContent = () => {
    if (!page.components || !Array.isArray(page.components)) {
      return (
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">No content available</p>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        {page.components.map((component: any, index: number) => {
          switch (component.type) {
            case 'hero':
              return (
                <section key={index} className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16 md:py-20 rounded-2xl overflow-hidden">
                  <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                      {component.content?.title || 'Hero Title'}
                    </h1>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                      {component.content?.subtitle || 'Hero subtitle'}
                    </p>
                    {component.content?.buttonText && (
                      <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                        {component.content.buttonText}
                      </button>
                    )}
                  </div>
                </section>
              )

            case 'heading':
              const HeadingLevel = component.content?.level || 'h2'
              return (
                <div key={index}>
                  {HeadingLevel === 'h1' && <h1 className="text-4xl font-bold mb-4">{component.content?.text}</h1>}
                  {HeadingLevel === 'h2' && <h2 className="text-3xl font-bold mb-4">{component.content?.text}</h2>}
                  {HeadingLevel === 'h3' && <h3 className="text-2xl font-bold mb-3">{component.content?.text}</h3>}
                </div>
              )

            case 'paragraph':
              return (
                <p key={index} className="text-lg text-gray-700 leading-relaxed">
                  {component.content?.text}
                </p>
              )

            case 'button':
              return (
                <div key={index}>
                  <a
                    href={component.content?.url || '#'}
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    {component.content?.text || 'Button'}
                  </a>
                </div>
              )

            case 'image':
              return (
                <div key={index} className="my-6">
                  <img
                    src={component.content?.url || '/placeholder.png'}
                    alt={component.content?.alt || 'Image'}
                    className="w-full rounded-lg shadow-lg"
                  />
                  {component.content?.caption && (
                    <p className="text-sm text-gray-600 mt-2 text-center">{component.content.caption}</p>
                  )}
                </div>
              )

            case 'text-image':
              return (
                <section key={index} className="grid md:grid-cols-2 gap-8 items-center my-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{component.content?.title}</h2>
                    <p className="text-lg text-gray-700">{component.content?.description}</p>
                  </div>
                  <div>
                    <img
                      src={component.content?.imageUrl || '/placeholder.png'}
                      alt={component.content?.title || 'Image'}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                </section>
              )

            case 'feature-cards':
              return (
                <section key={index} className="my-12">
                  {component.content?.title && (
                    <h2 className="text-3xl font-bold mb-8 text-center">{component.content.title}</h2>
                  )}
                  <div className="grid md:grid-cols-3 gap-6">
                    {component.content?.features?.map((feature: any, i: number) => (
                      <div key={i} className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition">
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )

            case 'faq':
              return (
                <section key={index} className="my-12">
                  {component.content?.title && (
                    <h2 className="text-3xl font-bold mb-8">{component.content.title}</h2>
                  )}
                  <div className="space-y-4">
                    {component.content?.items?.map((item: any, i: number) => (
                      <details key={i} className="p-4 bg-white border rounded-lg">
                        <summary className="font-semibold cursor-pointer">{item.question}</summary>
                        <p className="mt-3 text-gray-700">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )

            case 'divider':
              return <hr key={index} className="my-8 border-gray-300" />

            default:
              return (
                <div key={index} className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">Unknown component type: {component.type}</p>
                </div>
              )
          }
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Page Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary">{page.status}</Badge>
              {page.metadata?.category && (
                <Badge variant="outline">{page.metadata.category}</Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{page.title}</h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {page.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{page.author.name || page.author.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(page.createdAt).toLocaleDateString()}</span>
              </div>
              {page.updatedAt && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Updated {new Date(page.updatedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  )
}
