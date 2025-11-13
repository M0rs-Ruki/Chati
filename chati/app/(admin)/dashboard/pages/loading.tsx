import { Loader2, FileText } from "lucide-react";

export default function Loading() {
  return (
    <div className="pt-8 px-6 pb-12 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="w-10 h-10 text-gray-300 animate-pulse" />
            <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Pages List Skeleton */}
      <div className="grid gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {/* Title */}
                <div className="h-6 w-64 bg-gray-200 rounded mb-2" />

                {/* Slug */}
                <div className="h-4 w-40 bg-gray-200 rounded mb-3" />

                {/* Status & Meta Info */}
                <div className="flex items-center gap-3">
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <div className="h-9 w-20 bg-gray-200 rounded" />
                <div className="h-9 w-20 bg-gray-200 rounded" />
                <div className="h-9 w-9 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
          <span className="text-sm font-medium">Loading pages...</span>
        </div>
      </div>
    </div>
  );
}
