import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Users2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="pt-8 px-6 pb-12 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Users2 className="w-10 h-10 text-gray-300 animate-pulse" />
            <Skeleton className="h-10 w-64 bg-gray-200" />
          </div>
          <Skeleton className="h-6 w-96 bg-gray-200" />
        </div>
        <Skeleton className="h-10 w-32 bg-gray-200 rounded-lg" />
      </div>

      {/* Search Skeleton */}
      <Skeleton className="h-12 w-full bg-gray-200 rounded-lg" />

      {/* Table Skeleton */}
      <Card className="bg-white border-gray-200 shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <TableHead className="text-gray-400">
                <Skeleton className="h-4 w-16 bg-gray-300" />
              </TableHead>
              <TableHead className="text-gray-400">
                <Skeleton className="h-4 w-20 bg-gray-300" />
              </TableHead>
              <TableHead className="text-gray-400">
                <Skeleton className="h-4 w-16 bg-gray-300" />
              </TableHead>
              <TableHead className="text-gray-400">
                <Skeleton className="h-4 w-16 bg-gray-300" />
              </TableHead>
              <TableHead className="text-gray-400">
                <Skeleton className="h-4 w-20 bg-gray-300" />
              </TableHead>
              <TableHead className="text-gray-400">
                <Skeleton className="h-4 w-20 bg-gray-300" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-20 bg-gray-300 ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index} className="border-gray-200">
                <TableCell>
                  <Skeleton className="h-4 w-32 bg-gray-200" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-40 bg-gray-200" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 bg-gray-200 rounded-full" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20 bg-gray-200 rounded-full" />
                    <Skeleton className="h-5 w-10 bg-gray-200 rounded-full" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 bg-gray-200 rounded" />
                    <Skeleton className="h-6 w-16 bg-gray-200 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
                    <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
                    <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-green-600" />
          <span className="text-sm font-medium">Loading users...</span>
        </div>
      </div>
    </div>
  );
}
