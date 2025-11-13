import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

export default function DocsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              WhatsApp Business API Documentation
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive guides, API references, and tutorials to help you integrate WhatsApp Business API into your
              applications
            </p>

            {/* Search Bar Skeleton */}
            <div className="max-w-2xl mx-auto">
              <div className="h-14 bg-white rounded-xl shadow-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar Skeleton */}
            <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] w-72 overflow-y-auto p-6">
              <div className="space-y-6">
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="space-y-2">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area Skeleton */}
            <main className="flex-1 max-w-5xl">
              {/* Category Overview Skeleton */}
              <div className="mb-12">
                <div className="h-9 w-64 bg-gray-200 rounded animate-pulse mb-6" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="p-6 border border-gray-200 rounded-lg bg-white">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse mb-4" />
                      <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
                      </div>
                      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* All Articles Skeleton */}
              <div>
                <div className="h-9 w-48 bg-gray-200 rounded animate-pulse mb-6" />
                <div className="space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="p-6 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Badges */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-5 w-16 bg-gray-100 rounded animate-pulse" />
                          </div>
                          
                          {/* Title */}
                          <div className="space-y-2 mb-3">
                            <div className="h-6 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-4/5 bg-gray-200 rounded animate-pulse" />
                          </div>
                          
                          {/* Description */}
                          <div className="space-y-2 mb-3">
                            <div className="h-4 bg-gray-100 rounded animate-pulse" />
                            <div className="h-4 bg-gray-100 rounded animate-pulse" />
                            <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                          </div>
                          
                          {/* Tags */}
                          <div className="flex gap-2">
                            {[...Array(3)].map((_, j) => (
                              <div key={j} className="h-6 w-16 bg-gray-100 rounded animate-pulse" />
                            ))}
                          </div>
                        </div>
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 w-40 bg-white/20 rounded-lg animate-pulse mx-auto sm:mx-0" />
            <div className="h-12 w-40 bg-white/20 rounded-lg animate-pulse mx-auto sm:mx-0" />
          </div>
        </div>
      </section>
    </div>
  )
}
