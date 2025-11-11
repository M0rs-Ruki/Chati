"use client"

import type React from "react"
import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import PageBuilder from "@/components/page-builder"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

type SaveStatus = "saved" | "saving" | "unsaved" | "error"

export default function EditPagePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)
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
  const [initialData, setInitialData] = useState<any>(null)

  // Warn user about unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  useEffect(() => {
    fetchPage()
  }, [params.id])

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/page/${params.id}`, {
        method: 'GET',
        credentials: 'include',
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

      const pageData = {
        title: page.title || "",
        slug: page.slug || "",
        status: page.status || "DRAFT",
      }
      const pageMetadata = {
        description: page.metadata?.description || "",
        tags: page.metadata?.tags || [],
      }
      const pageContent = page.content?.blocks || []

      setFormData(pageData)
      setMetadata(pageMetadata)
      setContent(pageContent)
      setInitialData({ formData: pageData, metadata: pageMetadata, content: pageContent })
      setSaveStatus("saved")
      setLastSaved(new Date(page.updatedAt))
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error("Error fetching page:", error)
      toast({ title: "Error", description: "Failed to load page", variant: "destructive" })
      router.push("/dashboard/pages")
    } finally {
      setLoading(false)
    }
  }

  // Auto-save function
  const autoSave = useCallback(async () => {
    if (!hasUnsavedChanges || saving) return

    setSaveStatus("saving")
    
    try {
      const response = await fetch(`/api/page/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
        setSaveStatus("error")
        console.error("Auto-save failed:", result.message)
        return
      }

      setSaveStatus("saved")
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error("Auto-save error:", error)
      setSaveStatus("error")
    }
  }, [hasUnsavedChanges, saving, params.id, formData, content, metadata])

  // Set up auto-save timer
  useEffect(() => {
    if (hasUnsavedChanges && !loading) {
      // Clear existing timer
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }

      // Set new timer for 30 seconds
      autoSaveTimerRef.current = setTimeout(() => {
        autoSave()
      }, 30000) // 30 seconds
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [hasUnsavedChanges, loading, autoSave])

  // Track changes
  useEffect(() => {
    if (initialData && !loading) {
      const hasChanges = 
        JSON.stringify(formData) !== JSON.stringify(initialData.formData) ||
        JSON.stringify(metadata) !== JSON.stringify(initialData.metadata) ||
        JSON.stringify(content) !== JSON.stringify(initialData.content)
      
      if (hasChanges) {
        setHasUnsavedChanges(true)
        setSaveStatus("unsaved")
      }
    }
  }, [formData, metadata, content, initialData, loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveStatus("saving")

    try {
      const response = await fetch(`/api/page/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
        setSaveStatus("error")
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

      toast({ title: "Success", description: "Page saved successfully" })
      setSaveStatus("saved")
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      setInitialData({ formData, metadata, content })
    } catch (error) {
      console.error("Error updating page:", error)
      setSaveStatus("error")
      toast({ title: "Error", description: "Failed to update page. Please check your connection and try again.", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const getSaveStatusDisplay = () => {
    switch (saveStatus) {
      case "saved":
        return (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Saved {lastSaved && `• ${formatTimeSince(lastSaved)}`}</span>
          </div>
        )
      case "saving":
        return (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </div>
        )
      case "unsaved":
        return (
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <AlertCircle className="h-4 w-4" />
            <span>Unsaved changes • Auto-save in progress</span>
          </div>
        )
      case "error":
        return (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>Failed to save • Try manual save</span>
          </div>
        )
    }
  }

  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return "just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-900">Loading page...</p>
          <p className="text-sm text-gray-500">Please wait while we fetch your content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => {
            if (hasUnsavedChanges) {
              if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
                router.back()
              }
            } else {
              router.back()
            }
          }}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Page</h2>
            <p className="text-gray-600 mt-1">Update your page content and settings</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getSaveStatusDisplay()}
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/dashboard/pages/${params.id}/preview`)}
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
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Now
              </>
            )}
          </Button>
        </div>
      </div>

      {saveStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Auto-save failed. Please save manually to prevent data loss.
          </AlertDescription>
        </Alert>
      )}

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
