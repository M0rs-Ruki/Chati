"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { WYSIWYGEditor } from "@/components/wysiwyg-editor"
import { useToast } from "@/hooks/use-toast"

export default function CreateDocsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    customHtml: "",
    imageUrl: "",
    status: "DRAFT",
    metadata: {
      description: "",
      tags: "",
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      toast({ title: "Error", description: "Title and content are required", variant: "destructive" })
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Documentation created successfully",
      })

      router.push("/dashboard/docs")
    } catch (error) {
      console.error("Error creating documentation:", error)
      toast({
        title: "Error",
        description: "Failed to create documentation",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/docs">
            <Button variant="outline" size="icon" className="border-[var(--border)] bg-transparent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Create Documentation</h2>
            <p className="text-[var(--text-secondary)] mt-2">Write and publish new documentation</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-white border-[var(--border)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Documentation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[var(--text-secondary)]">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter documentation title"
                required
                className="bg-white border-[var(--border)]"
              />
            </div>

            {/* Tabs for Content, Meta */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="meta">Meta</TabsTrigger>
                <TabsTrigger value="html">Custom HTML</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-6">
                {/* Hero Image */}
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

                {/* WYSIWYG Editor */}
                <div className="space-y-2">
                  <Label className="text-[var(--text-secondary)]">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <WYSIWYGEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
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
                    placeholder="Brief description of the documentation"
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
                    placeholder="api, guide, tutorial"
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

              {/* Custom HTML tab */}
              <TabsContent value="html" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="customHtml" className="text-[var(--text-secondary)]">
                    Custom HTML Code
                  </Label>
                  <p className="text-sm text-gray-500">
                    Add custom HTML that will be rendered alongside your content. Use this for special widgets, embeds,
                    or custom styling.
                  </p>
                  <Textarea
                    id="customHtml"
                    value={formData.customHtml}
                    onChange={(e) => setFormData({ ...formData, customHtml: e.target.value })}
                    placeholder="<div>Your custom HTML here...</div>"
                    className="bg-white border-[var(--border)] font-mono text-sm min-h-[300px]"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4 pt-4 border-t border-[var(--border)]">
              <Button
                type="submit"
                className="bg-[var(--primary-green)] hover:bg-[var(--primary-green-dark)] text-white"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Documentation"}
              </Button>
              <Link href="/dashboard/docs">
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
