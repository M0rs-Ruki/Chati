import { Loader2, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoadingEditDoc() {
  return (
    <div className="pt-8 px-6 pb-12 space-y-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Form Card Skeleton */}
      <Card className="bg-white border-gray-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gray-300 animate-pulse" />
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Title Input Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Tabs Skeleton */}
          <div className="space-y-4">
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Content Section Skeleton */}
            <div className="space-y-4 mt-6">
              {/* Hero Image Section */}
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="flex-1 h-9 bg-gray-200 rounded animate-pulse" />
                  <div className="flex-1 h-9 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Content Editor Skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-64 w-full bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-sm font-medium">Loading editor...</span>
        </div>
      </div>
    </div>
  );
}
