import { BookOpen, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BlogListingLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-12 md:py-14">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-purple-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-700 shadow-sm">
              <BookOpen className="w-3 h-3 mr-1.5" />
              Blog & Resources
            </Badge>

            <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
              <span className="block text-foreground mb-1">Insights & Best Practices</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                for WhatsApp Business
              </span>
            </h1>

            <p className="mb-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Expert tips, guides, and strategies to help you master WhatsApp Business API, automation, and customer
              engagement.
            </p>

            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <div className="h-12 pl-10 pr-4 border-2 rounded-xl shadow-sm bg-gray-50 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Skeleton */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {[100, 120, 90, 110, 95].map((width, i) => (
              <div
                key={i}
                className="h-8 rounded-md bg-gray-200 animate-pulse"
                style={{ width: `${width}px` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid Skeleton */}
      <section className="py-12 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-[1400px] mx-auto">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* Image Skeleton */}
                <div className="aspect-[16/9] bg-gray-200 animate-pulse" />

                {/* Content Skeleton */}
                <div className="p-4 space-y-3">
                  {/* Meta Info */}
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
                  </div>

                  {/* Button */}
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Loading Text */}
          <div className="mt-8 text-center">
            <div className="inline-block h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Customer Communication?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start using WhatsApp Business API to engage customers and grow your business
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
