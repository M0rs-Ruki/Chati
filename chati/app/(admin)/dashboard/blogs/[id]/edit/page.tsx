"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { RichTextEditor } from "@/components/rich-text-editor"
import { useToast } from "@/hooks/use-toast"

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    status: "DRAFT",
    metadata: {
      description: "",
      tags: "",
    },
  })

  useEffect(() => {
    fetchBlog()
  }, [params.id])

  const fetchBlog = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))

      setFormData({
        title: "Getting Started with Our Platform",
        content: "# Welcome\n\nThis is the blog content...",
        imageUrl: "/placeholder.svg?height=400&width=800",
        status: "PUBLISHED",
        metadata: {
          description: "Learn how to get started",
          tags: "tutorial, beginner",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      toast({ title: "Error", description: "Title and content are required", variant: "destructive" })
      return
    }

    setSaving(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({ title: "Success", description: "Blog post updated successfully" })
      router.push("/dashboard/blogs")
    } catch (error) {
      toast({ title: "Error", description: "Failed to update blog post", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary-green)] border-r-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/blogs">
            <Button variant="outline" size="icon" className="border-[var(--border)] bg-transparent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Edit Blog Post</h2>
            <p className="text-[var(--text-secondary)] mt-2">Update your blog post</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-white border-[var(--border)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Blog Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[var(--text-secondary)]">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter blog post title"
                required
                className="bg-white border-[var(--border)]"
              />
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="meta">Meta</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-[var(--text-secondary)]">
                    Hero Image
                  </Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Create New
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="flex-1 bg-transparent">
                        Choose from existing
                      </Button>
                    </div>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="Or enter image URL"
                      className="bg-white border-[var(--border)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    theme="light"
                  />
                </div>
              </TabsContent>

              <TabsContent value="meta" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[var(--text-secondary)]">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={formData.metadata.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metadata: { ...formData.metadata, description: e.target.value },
                      })
                    }
                    placeholder="Brief description"
                    className="bg-white border-[var(--border)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-[var(--text-secondary)]">
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="tags"
                    value={formData.metadata.tags}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metadata: { ...formData.metadata, tags: e.target.value },
                      })
                    }
                    placeholder="tutorial, guide, tips"
                    className="bg-white border-[var(--border)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-[var(--text-secondary)]">
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="bg-white border-[var(--border)]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="REVIEW">Review</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4 pt-4 border-t border-[var(--border)]">
              <Button
                type="submit"
                className="bg-[var(--primary-green)] hover:bg-[var(--primary-green-dark)] text-white"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Link href="/dashboard/blogs">
                <Button type="button" variant="outline" className="border-[var(--border)] bg-transparent">
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
