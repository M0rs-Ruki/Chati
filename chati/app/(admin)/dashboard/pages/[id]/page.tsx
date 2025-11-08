"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PageData {
  id: string
  title: string
  slug: string
  content: any
  status: string
  author: {
    name: string
  }
  publishedAt: string | null
}

export default function ViewPagePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPage()
  }, [params.id])

  const fetchPage = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))

      const storedPages = localStorage.getItem("demo_pages")
      let demoPage

      if (storedPages) {
        const pages = JSON.parse(storedPages)
        demoPage = pages.find((p: any) => p.id === params.id)
      }

      if (!demoPage) {
        toast({
          title: "Error",
          description: "Page not found. Redirecting to pages list...",
          variant: "destructive",
        })
        router.push("/dashboard/pages")
        return
      }

      setPage(demoPage)
    } catch (error) {
      toast({ title: "Error", description: "Failed to load page", variant: "destructive" })
      router.push("/dashboard/pages")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-r-transparent" />
      </div>
    )
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Page not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{page.title}</h2>
            <p className="text-gray-600 mt-1">/{page.slug}</p>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/dashboard/pages/${page.id}/edit`)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Page
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[500px]">
        {page.content?.blocks?.length > 0 ? (
          <div className="space-y-8">
            {page.content.blocks.map((block: any) => (
              <div key={block.id} className="space-y-4">
                {block.type === "hero" && (
                  <div className="text-center py-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <h1 className="text-5xl font-bold mb-4">{block.data.title}</h1>
                    <p className="text-xl text-gray-600">{block.data.subtitle}</p>
                  </div>
                )}
                {block.type === "heading" && (
                  <div
                    className={`font-bold ${
                      block.data.level === "h1"
                        ? "text-4xl"
                        : block.data.level === "h2"
                          ? "text-3xl"
                          : block.data.level === "h3"
                            ? "text-2xl"
                            : "text-xl"
                    }`}
                  >
                    {block.data.text}
                  </div>
                )}
                {block.type === "paragraph" && <p className="text-gray-700 leading-relaxed">{block.data.text}</p>}
                {block.type === "button" && (
                  <Button className="bg-green-600 hover:bg-green-700">{block.data.text}</Button>
                )}
                {block.type === "image" && (
                  <img src={block.data.src || "/placeholder.svg"} alt={block.data.alt} className="w-full rounded-lg" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No content added to this page yet.</p>
        )}
      </div>
    </div>
  )
}
