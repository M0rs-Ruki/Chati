import { Loader2, Newspaper } from "lucide-react";

export default function LoadingBlog() {
  return (
    <div className="pt-8 px-6 pb-12 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Newspaper className="w-10 h-10 text-gray-300 animate-pulse" />
            <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Search Skeleton */}
      <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />

      {/* Blog Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
          >
            {/* Image Skeleton */}
            <div className="h-40 w-full bg-gray-200 rounded-lg mb-4" />

            {/* Status Badge Skeleton */}
            <div className="h-6 w-20 bg-gray-200 rounded-full mb-3" />

            {/* Title Skeleton */}
            <div className="space-y-2 mb-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-5/6 bg-gray-200 rounded" />
            </div>

            {/* Date & Author Skeleton */}
            <div className="h-3 w-32 bg-gray-200 rounded mb-4" />

            {/* Tags Skeleton */}
            <div className="flex gap-1 mb-4">
              <div className="h-6 w-16 bg-gray-200 rounded-md" />
              <div className="h-6 w-20 bg-gray-200 rounded-md" />
              <div className="h-6 w-14 bg-gray-200 rounded-md" />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-2">
              <div className="flex-1 h-9 bg-gray-200 rounded" />
              <div className="flex-1 h-9 bg-gray-200 rounded" />
              <div className="h-9 w-9 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
          <span className="text-sm font-medium">Loading blog posts...</span>
        </div>
      </div>
    </div>
  );
}
