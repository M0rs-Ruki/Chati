import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Palette } from "lucide-react";

export default function ThemesLoading() {
  return (
    <div className="p-6 lg:p-8 pb-12 max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Palette className="w-10 h-10 text-gray-300 animate-pulse" />
            <Skeleton className="h-10 w-64 bg-gray-200" />
          </div>
          <Skeleton className="h-6 w-96 bg-gray-200" />
        </div>
        <Skeleton className="h-10 w-48 bg-gray-200 rounded-lg" />
      </div>

      {/* Themes List Skeleton */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[1, 2].map((index) => (
          <Card key={index} className="border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-48 bg-gray-200" />
                  <Skeleton className="h-5 w-24 bg-gray-200 rounded-full" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20 bg-gray-200 rounded" />
                  <Skeleton className="h-8 w-16 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Color Preview Skeleton */}
              <div className="flex gap-2">
                <Skeleton className="flex-1 h-16 bg-gray-200 rounded-lg" />
                <Skeleton className="flex-1 h-16 bg-gray-200 rounded-lg" />
                <Skeleton className="flex-1 h-16 bg-gray-200 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Section Skeleton */}
      <div className="space-y-6">
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <Skeleton className="h-6 w-64 bg-gray-200" />
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-24 bg-gray-200 mb-2" />
                  <div className="flex gap-3">
                    <Skeleton className="w-16 h-16 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-10 w-full bg-gray-200 rounded" />
                      <Skeleton className="h-3 w-24 bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <Skeleton className="h-6 w-48 bg-gray-200" />
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <Skeleton className="h-24 w-full bg-gray-200 rounded-lg" />
            <Skeleton className="h-24 w-full bg-gray-200 rounded-lg" />
          </CardContent>
        </Card>

        <Skeleton className="h-12 w-full bg-gray-200 rounded-lg" />
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8 mt-8">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-green-600" />
          <span className="text-sm font-medium">Loading themes...</span>
        </div>
      </div>
    </div>
  );
}
