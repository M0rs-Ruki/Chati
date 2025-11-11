"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye } from "lucide-react"
import PageBuilder from "@/components/page-builder"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function CreatePagePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "DRAFT",
  })
  const [metadata, setMetadata] = useState({
    description: "",
    tags: [] as string[],
  })
  const [content, setContent] = useState<any[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast({ title: "Error", description: "Please enter a page title", variant: "destructive" })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/page/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          title: formData.title,
          content: { blocks: content },
          metadata: {
            description: metadata.description || "",
            keywords: [],
            tags: metadata.tags || [],
          },
          status: formData.status
        })
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          toast({
            title: "Duplicate Slug",
            description: result.message || "A page with a similar title already exists. Please use a different title.",
            variant: "destructive",
          })
        } else if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in to create pages",
            variant: "destructive",
          })
          router.push('/auth/login')
        } else if (response.status === 403) {
          toast({
            title: "Forbidden",
            description: result.message || "You don't have permission to create pages",
            variant: "destructive",
          })
        } else if (response.status === 429) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Too many requests. Please try again later.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to create page",
            variant: "destructive",
          })
        }
        return
      }

      toast({
        title: "Success",
        description: "Page created successfully",
      })
      
      // Redirect to edit page with the new page ID
      router.push(`/dashboard/pages/${result.data.id}/edit`)
    } catch (error) {
      console.error("Error creating page:", error)
      toast({
        title: "Error",
        description: "Failed to create page. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Page</h2>
            <p className="text-gray-600 mt-1">Build your page with drag-and-drop components</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => setShowPreview(true)} className="border-gray-200">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Creating..." : "Create Page"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Page Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setFormData({
                      ...formData,
                      title,
                      slug: generateSlug(title),
                    })
                  }}
                  placeholder="Enter page title"
                  className="bg-white border-gray-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug (auto-generated)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="page-url-slug"
                  className="bg-white border-gray-200 font-mono text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="REVIEW">Review</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Input
                  id="description"
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  placeholder="SEO meta description"
                  className="bg-white border-gray-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Page Content</CardTitle>
          </CardHeader>
          <CardContent>
            <PageBuilder content={content} onChange={setContent} />
          </CardContent>
        </Card>
      </form>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>Page Preview</DialogTitle>
          </DialogHeader>
          <div className="border border-gray-200 rounded-lg p-8 bg-white">
            <h1 className="text-4xl font-bold mb-6">{formData.title || "Untitled Page"}</h1>
            {content.length === 0 ? (
              <p className="text-gray-500">No content added yet. Add components to see the preview.</p>
            ) : (
              <div className="space-y-8">
                {content.map((block: any) => (
                  <div key={block.id} className="space-y-4">
                    {block.type === "hero" && (
                      <div className="text-center py-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <h1 className="text-5xl font-bold mb-4">{block.data.title || "Hero Title"}</h1>
                        <p className="text-xl text-gray-600">{block.data.subtitle || "Hero subtitle"}</p>
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
                        {block.data.text || "Heading"}
                      </div>
                    )}
                    {block.type === "paragraph" && (
                      <p className="text-gray-700 leading-relaxed">{block.data.text || "Paragraph text"}</p>
                    )}
                    {block.type === "button" && (
                      <Button className="bg-green-600 hover:bg-green-700">{block.data.text || "Button"}</Button>
                    )}
                    {block.type === "image" && (
                      <img
                        src={block.data.src || "/placeholder.svg?height=400&width=800"}
                        alt={block.data.alt || "Image"}
                        className="w-full rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
