"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye } from "lucide-react"
import PageBuilder from "@/components/page-builder"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditPagePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  useEffect(() => {
    fetchPage()
  }, [params.id])

  const fetchPage = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/page/${params.id}`)
      // const result = await response.json()

      await new Promise((resolve) => setTimeout(resolve, 600))

      const storedPages = localStorage.getItem("demo_pages")
      let demoPage

      if (storedPages) {
        const pages = JSON.parse(storedPages)
        demoPage = pages.find((p: any) => p.id === params.id)
      }

      // CHANGE: Remove fallback "Sample Page" - if page not found, show error
      if (!demoPage) {
        toast({
          title: "Error",
          description: "Page not found. Redirecting to pages list...",
          variant: "destructive",
        })
        router.push("/dashboard/pages")
        return
      }

      setFormData({
        title: demoPage.title || "",
        slug: demoPage.slug || "",
        status: demoPage.status || "DRAFT",
      })
      setMetadata({
        description: demoPage.metadata?.description || "",
        tags: demoPage.metadata?.tags || [],
      })
      setContent(demoPage.content?.blocks || [])
    } catch (error) {
      toast({ title: "Error", description: "Failed to load page", variant: "destructive" })
      router.push("/dashboard/pages")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/page/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     title: formData.title,
      //     slug: formData.slug,
      //     content: { blocks: content },
      //     metadata,
      //     status: formData.status
      //   })
      // })

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const storedPages = localStorage.getItem("demo_pages")
      if (storedPages) {
        const pages = JSON.parse(storedPages)
        const updatedPages = pages.map((p: any) =>
          p.id === params.id
            ? {
                ...p,
                title: formData.title,
                slug: formData.slug,
                content: { blocks: content },
                metadata,
                status: formData.status,
                updatedAt: new Date().toISOString(),
              }
            : p,
        )
        localStorage.setItem("demo_pages", JSON.stringify(updatedPages))
      }

      toast({ title: "Success", description: "Page updated successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to update page", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-r-transparent" />
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
            <h2 className="text-2xl font-bold text-gray-900">Edit Page</h2>
            <p className="text-gray-600 mt-1">Update your page content and settings</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/dashboard/pages/${params.id}`)}
            className="border-gray-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
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
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter page title"
                  className="bg-white border-gray-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
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
    </div>
  )
}
