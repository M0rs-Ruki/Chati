import { BookOpen, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BlogListingLoading() {
  return (
    <div className="min-h-screen">

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
    </div>
  );
}
