import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrandsLoading() {
  return (
    <div className="p-6 lg:p-8 pb-12 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Create Form Skeleton */}
      <Card className="border-gray-200 shadow-lg mb-8">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>

      {/* Brands List Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-16 w-16 rounded-lg" />
                  <Skeleton className="h-16 w-16 rounded-lg" />
                  <Skeleton className="h-16 w-16 rounded-lg" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
