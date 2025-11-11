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
      const response = await fetch(`/api/page/${params.id}`, {
        method: 'GET',
        credentials: 'include', // Include cookies for authentication
      })

      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: "Error",
            description: "Page not found. Redirecting to pages list...",
            variant: "destructive",
          })
        } else if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in to view pages",
            variant: "destructive",
          })
          router.push('/auth/login')
          return
        } else {
          throw new Error("Failed to fetch page")
        }
        router.push("/dashboard/pages")
        return
      }

      const result = await response.json()
      const page = result.data

      setFormData({
        title: page.title || "",
        slug: page.slug || "",
        status: page.status || "DRAFT",
      })
      setMetadata({
        description: page.metadata?.description || "",
        tags: page.metadata?.tags || [],
      })
      setContent(page.content?.blocks || [])
    } catch (error) {
      console.error("Error fetching page:", error)
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
      const response = await fetch(`/api/page/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
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
            description: result.message || "A page with this slug already exists. Please use a different slug.",
            variant: "destructive",
          })
        } else if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in to update pages",
            variant: "destructive",
          })
          router.push('/auth/login')
        } else if (response.status === 403) {
          toast({
            title: "Forbidden",
            description: result.message || "You don't have permission to update this page",
            variant: "destructive",
          })
        } else if (response.status === 404) {
          toast({
            title: "Not Found",
            description: "Page not found",
            variant: "destructive",
          })
          router.push("/dashboard/pages")
        } else if (response.status === 429) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Too many requests. Please try again later.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to update page",
            variant: "destructive",
          })
        }
        return
      }

      toast({ title: "Success", description: "Page updated successfully" })
    } catch (error) {
      console.error("Error updating page:", error)
      toast({ title: "Error", description: "Failed to update page. Please check your connection and try again.", variant: "destructive" })
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
