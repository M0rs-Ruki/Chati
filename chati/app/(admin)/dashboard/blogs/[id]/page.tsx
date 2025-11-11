"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Blog {
  id: string
  title: string
  slug: string
  content: Record<string, any>
  imageUrl: string | null
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED"
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    email: string
  }
  metadata: {
    description?: string
    tags?: string[]
  }
}

export default function ViewBlogPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ id: string; role: string } | null>(null)

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setCurrentUser(data.user)
      }
    } catch (error) {
      console.error("Error fetching current user:", error)
    }
  }

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")

      if (!token) {
        router.push("/admin")
        return
      }

      const response = await fetch(`/api/blog/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch blog post")
      }

      const result = await response.json()
      setBlog(result.data)
    } catch (error) {
      console.error("Error fetching blog:", error)
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const canEdit = () => {
    if (!blog || !currentUser) return false
    return blog.author.id === currentUser.id || currentUser.role === "ADMIN"
  }

  const canDelete = () => {
    if (!blog || !currentUser) return false
    return blog.author.id === currentUser.id || currentUser.role === "ADMIN"
  }

  const handleDelete = async () => {
    if (!blog) return

    try {
      setDeleting(true)
      const token = localStorage.getItem("token")

      if (!token) {
        router.push("/admin")
        return
      }

      const response = await fetch(`/api/blog/${blog.id}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete blog post")
      }

      toast({ 
        title: "Success", 
        description: "Blog post deleted successfully" 
      })

      router.push("/dashboard/blogs")
    } catch (error) {
      console.error("Error deleting blog:", error)
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to delete blog post", 
        variant: "destructive" 
      })
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary-green)] border-r-transparent" />
        <p className="mt-4 text-gray-600">Loading blog post...</p>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">Blog post not found</p>
        <Link href="/dashboard/blogs">
          <Button className="mt-4 bg-transparent" variant="outline">
            Back to Blog Posts
          </Button>
        </Link>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700"
      case "DRAFT":
        return "bg-yellow-100 text-yellow-700"
      case "REVIEW":
        return "bg-blue-100 text-blue-700"
      case "ARCHIVED":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="pt-6 px-4 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/blogs">
            <Button variant="outline" size="icon" className="border-[var(--border)] bg-transparent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(blog.status)}`}
          >
            {blog.status}
          </span>
        </div>
        <div className="flex gap-2">
          {canEdit() && (
            <Link href={`/dashboard/blogs/${blog.id}/edit`}>
              <Button 
                variant="outline" 
                className="border-[var(--border)] hover:bg-green-50 bg-transparent"
                disabled={deleting}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
          {canDelete() && (
            <Button
              variant="outline"
              onClick={() => setDeleteDialog(true)}
              disabled={deleting}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </div>

      <Card className="bg-white border-[var(--border)]">
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">{blog.title}</h1>

          <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
            <span>{blog.author.name}</span>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            {blog.createdAt !== blog.updatedAt && (
              <>
                <span>•</span>
                <span>Updated {new Date(blog.updatedAt).toLocaleDateString()}</span>
              </>
            )}
          </div>

          {blog.imageUrl && (
            <img
              src={blog.imageUrl || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          {blog.metadata.description && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700">{blog.metadata.description}</p>
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            {blog.content.html ? (
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content.html }} 
                className="text-gray-700"
              />
            ) : blog.content.markdown ? (
              <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm leading-relaxed">
                {blog.content.markdown}
              </pre>
            ) : (
              <p className="text-gray-500">No content available</p>
            )}
          </div>

          {blog.metadata.tags && blog.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--border)]">
              {blog.metadata.tags.map((tag, index) => (
                <span key={`${tag}-${index}`} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Modal */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{blog.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialog(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDelete} 
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? (
                <>
                  <div className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
