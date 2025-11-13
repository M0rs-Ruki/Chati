import { Loader2, ImageIcon } from "lucide-react";

export default function LoadingMedia() {
  return (
    <div className="pt-8 px-6 pb-12 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-10 h-10 text-gray-300 animate-pulse" />
            <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Media Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-3 animate-pulse"
          >
            <div className="aspect-square bg-gray-200 rounded-lg mb-3" />
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-12 bg-gray-200 rounded" />
              <div className="h-3 w-3 bg-gray-200 rounded-full" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
            <div className="flex items-center gap-2">
              <div className="flex-1 h-8 bg-gray-200 rounded" />
              <div className="h-8 w-8 bg-gray-200 rounded" />
              <div className="h-8 w-8 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
          <span className="text-sm font-medium">Loading media library...</span>
        </div>
      </div>
    </div>
  );
}
