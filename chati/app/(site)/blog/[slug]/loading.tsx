export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>

        {/* Back Button Skeleton */}
        <div className="absolute top-6 left-6 z-20">
          <div className="h-10 w-32 bg-white/10 backdrop-blur-md rounded-md animate-pulse" />
        </div>

        {/* Hero Image Placeholder */}
        <div className="relative h-[450px] md:h-[550px] overflow-hidden">
          <div className="absolute inset-0 bg-gray-700 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        </div>

        {/* Hero Content Skeleton */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 md:pb-20">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Category Badge */}
              <div className="h-7 w-28 bg-white/20 rounded-full animate-pulse" />

              {/* Title Skeleton */}
              <div className="space-y-3">
                <div className="h-10 md:h-14 bg-white/20 rounded-lg animate-pulse" />
                <div className="h-10 md:h-14 w-5/6 bg-white/20 rounded-lg animate-pulse" />
              </div>

              {/* Meta Info Skeleton */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
                  <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
                </div>
                <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
                <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
                <div className="ml-auto flex items-center gap-2">
                  <div className="h-9 w-20 bg-white/10 rounded animate-pulse" />
                  <div className="h-9 w-20 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Skeleton */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Reading Progress Bar */}
            <div className="sticky top-0 z-40 -mx-4 md:-mx-0 mb-8">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden shadow-sm">
                <div className="h-full w-0 bg-gradient-to-r from-blue-600 to-purple-600" />
              </div>
            </div>

            {/* Excerpt Skeleton */}
            <div className="mb-12 p-6 border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg">
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-8">
              {/* Paragraph 1 */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Heading */}
              <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse mt-12" />

              {/* Paragraph 2 */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Paragraph 3 */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Heading */}
              <div className="h-8 w-2/3 bg-gray-300 rounded animate-pulse mt-12" />

              {/* Paragraph 4 */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Tags Skeleton */}
            <div className="mt-16 pt-10 border-t-2 border-gray-200">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="flex flex-wrap gap-3">
                {[80, 100, 90, 110, 85].map((width, i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded-full animate-pulse"
                    style={{ width: `${width}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Author Card Skeleton */}
            <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-9 w-24 bg-gray-300 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Skeleton */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-8 w-56 bg-gray-300 rounded animate-pulse mx-auto mb-3" />
              <div className="h-4 w-72 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                  {/* Image Skeleton */}
                  <div className="aspect-[16/9] bg-gray-200 animate-pulse" />

                  <div className="p-5 space-y-3">
                    {/* Badge */}
                    <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />

                    {/* Title */}
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded animate-pulse" />
                      <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="h-12 w-3/4 bg-white/20 rounded-lg animate-pulse mx-auto" />
            <div className="h-6 w-2/3 bg-white/10 rounded-lg animate-pulse mx-auto" />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <div className="h-14 w-48 bg-white/20 rounded-lg animate-pulse mx-auto sm:mx-0" />
              <div className="h-14 w-40 bg-white/10 rounded-lg animate-pulse mx-auto sm:mx-0" />
            </div>

            <div className="pt-8 flex items-center justify-center gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-6 w-16 bg-white/20 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
