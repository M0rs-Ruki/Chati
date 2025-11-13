import { Loader2, FileText } from "lucide-react";

export default function Loading() {
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        <div className="h-10 w-28 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Metadata Section Skeleton */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-white min-h-[500px] rounded-lg space-y-8">
        {/* Hero Section Skeleton */}
        <div className="bg-gray-100 rounded-lg p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-2/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-3">
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-80 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Features Grid Skeleton */}
        <div className="p-8">
          <div className="text-center mb-8 space-y-3">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 border rounded-lg space-y-3">
                <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-16 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
          <span className="text-sm font-medium">Loading page content...</span>
        </div>
      </div>
    </div>
  );
}
