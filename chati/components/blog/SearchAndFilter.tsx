"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

interface SearchAndFilterProps {
  initialSearch: string
}

export default function SearchAndFilter({ initialSearch }: SearchAndFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [isPending, startTransition] = useTransition()

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      router.push(`/blog?${params.toString()}`)
    })
  }

  return (
    <div className="max-w-xl mx-auto relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 pr-4 py-5 text-sm border-2 focus:border-blue-500 rounded-xl shadow-sm"
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
