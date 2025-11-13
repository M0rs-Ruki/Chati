import { Loader2, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LoadingDoc() {
  return (
    <div className="pt-8 px-6 pb-12 space-y-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Content Card Skeleton */}
      <Card className="bg-white border-gray-200 shadow-lg">
        <CardContent className="p-8 lg:p-12 space-y-6">
          {/* Title Skeleton */}
          <div className="space-y-3">
            <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Meta Info Skeleton */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Hero Image Skeleton */}
          <div className="h-96 w-full bg-gray-200 rounded-xl animate-pulse" />

          {/* Description Skeleton */}
          <div className="p-6 bg-gray-100 rounded-xl space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Tags Skeleton */}
          <div className="pt-6 border-t border-gray-200 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-7 w-16 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-7 w-20 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-7 w-14 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-sm font-medium">Loading documentation...</span>
        </div>
      </div>
    </div>
  );
}
