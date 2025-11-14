import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function DocArticleLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Breadcrumb Skeleton */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Article Content Skeleton */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button Skeleton */}
            <div className="mb-6">
              <div className="h-9 w-48 bg-gray-200 rounded-md animate-pulse" />
            </div>

            {/* Article Header Skeleton */}
            <div className="mb-8">
              {/* Badge */}
              <div className="h-6 w-24 bg-blue-200 rounded-full animate-pulse mb-4" />

              {/* Title */}
              <div className="space-y-3 mb-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-4/5 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Description */}
              <div className="space-y-2 mb-6">
                <div className="h-6 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 w-5/6 bg-gray-100 rounded animate-pulse" />
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-20 bg-gray-100 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Article Content Skeleton */}
            <div className="space-y-8">
              {/* Section 1 */}
              <div className="space-y-4">
                {/* Heading */}
                <div className="h-8 w-2/3 bg-gray-300 rounded animate-pulse" />

                {/* Paragraphs */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Subheading */}
              <div className="h-7 w-1/2 bg-gray-300 rounded animate-pulse" />

              {/* List items */}
              <div className="space-y-3 pl-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2" />
                    <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <div className="h-8 w-3/5 bg-gray-300 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Code Block Skeleton */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-gray-200 rounded animate-pulse"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4">
                <div className="h-8 w-1/2 bg-gray-300 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Info Card Skeleton */}
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-blue-200 rounded animate-pulse flex-shrink-0 mt-1" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-32 bg-blue-200 rounded animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-blue-100 rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-blue-100 rounded animate-pulse" />
                    </div>
                    <div className="h-9 w-36 bg-blue-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* More content blocks */}
              <div className="space-y-4">
                <div className="h-7 w-2/5 bg-gray-300 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Another Code Block */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="h-4 w-40 bg-gray-300 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-gray-200 rounded animate-pulse"
                      style={{ width: `${Math.random() * 50 + 50}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Related Articles Skeleton */}
            <div className="mt-16 pt-8 border-t">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="grid md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-4 bg-white"
                  >
                    {/* Badge */}
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2" />

                    {/* Title */}
                    <div className="space-y-2 mb-3">
                      <div className="h-5 bg-gray-200 rounded animate-pulse" />
                      <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-3">
                      <div className="h-3 bg-gray-100 rounded animate-pulse" />
                      <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
                    </div>

                    {/* Read more */}
                    <div className="h-4 w-24 bg-blue-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you get the most out of WhatsApp
            Business API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 w-40 bg-white/20 rounded-lg animate-pulse mx-auto sm:mx-0" />
            <div className="h-12 w-40 bg-white/20 rounded-lg animate-pulse mx-auto sm:mx-0" />
          </div>
        </div>
      </section>
    </div>
  );
}
