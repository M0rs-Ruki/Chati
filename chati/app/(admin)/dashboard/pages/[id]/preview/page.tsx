"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { JSX } from "react/jsx-runtime" // Import JSX to declare HeadingTag

export default function PreviewPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [page, setPage] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPage()
  }, [])

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/page/${params.id}`, {
        method: 'GET',
        credentials: 'include', // Include cookies for authentication
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in to view pages",
            variant: "destructive",
          })
          router.push('/auth/login')
          return
        }
        throw new Error("Failed to fetch page")
      }

      const data = await response.json()
      setPage(data.data)
    } catch (error) {
      console.error("Error fetching page:", error)
      toast({
        title: "Error",
        description: "Failed to load page preview",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderComponent = (component: any) => {
    switch (component.type) {
      case "hero":
        return (
          <div className="bg-gradient-to-br from-primary/10 to-transparent py-20 px-6 text-center rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{component.data.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{component.data.subtitle}</p>
            <Button className="bg-primary hover:bg-primary/90">{component.data.buttonText}</Button>
          </div>
        )
      case "heading":
        const HeadingTag = component.data.level as keyof JSX.IntrinsicElements
        return <HeadingTag className="font-bold text-foreground">{component.data.text}</HeadingTag>
      case "paragraph":
        return <p className="text-muted-foreground leading-relaxed">{component.data.text}</p>
      case "button":
        return <Button className="bg-primary hover:bg-primary/90">{component.data.text}</Button>
      case "image":
        return (
          <img src={component.data.src || "/placeholder.svg"} alt={component.data.alt} className="w-full rounded-lg" />
        )
      case "divider":
        return <hr className="border-border my-8" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading preview...</p>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Page not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{page.title}</h2>
            <p className="text-sm text-muted-foreground">Preview Mode</p>
          </div>
        </div>
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Open in New Tab
        </Button>
      </div>

      <div className="bg-background border border-border rounded-lg p-8 space-y-8">
        {page.content?.map((component: any, index: number) => (
          <div key={index}>{renderComponent(component)}</div>
        ))}
      </div>
    </div>
  )
}
