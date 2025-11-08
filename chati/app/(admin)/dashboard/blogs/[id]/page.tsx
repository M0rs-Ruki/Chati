"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Blog {
  id: string
  title: string
  content: any
  imageUrl: string | null
  status: string
  createdAt: string
  updatedAt: string
  author: {
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
  const [deleteDialog, setDeleteDialog] = useState(false)

  useEffect(() => {
    fetchBlog()
  }, [params.id])

  const fetchBlog = async () => {
    try {
      // Demo data
      await new Promise((resolve) => setTimeout(resolve, 600))

      setBlog({
        id: params.id as string,
        title: "Getting Started with Our Platform",
        content: { markdown: "# Welcome\n\nThis is the blog content in markdown format..." },
        imageUrl: "/placeholder.svg?height=400&width=800",
        status: "PUBLISHED",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
        author: { name: "Admin User", email: "admin@example.com" },
        metadata: {
          description: "Learn how to get started with our platform",
          tags: ["tutorial", "beginner"],
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      toast({ title: "Success", description: "Blog post deleted successfully" })
      router.push("/dashboard/blogs")
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary-green)] border-r-transparent" />
      </div>
    )
  }

  if (!blog) {
    return <div className="text-center py-12 text-[var(--text-secondary)]">Blog post not found</div>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/blogs">
            <Button variant="outline" size="icon" className="border-[var(--border)] bg-transparent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">View Blog Post</h2>
            <p className="text-[var(--text-secondary)] mt-2">Read-only view of the blog post</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/blogs/${blog.id}/edit`)}
            className="border-[var(--border)] bg-transparent hover:bg-green-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => setDeleteDialog(true)}
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <Card className="bg-white border-[var(--border)]">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <span className={`text-sm px-4 py-1.5 rounded-full font-medium ${getStatusColor(blog.status)}`}>
              {blog.status}
            </span>
            <div className="text-sm text-[var(--text-muted)]">
              By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-6">{blog.title}</h1>

          {blog.imageUrl && (
            <img
              src={blog.imageUrl || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          {blog.metadata.description && (
            <p className="text-lg text-[var(--text-secondary)] mb-6 italic">{blog.metadata.description}</p>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm">
              {blog.content.markdown || "No content"}
            </pre>
          </div>

          {blog.metadata.tags && blog.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--border)]">
              {blog.metadata.tags.map((tag) => (
                <span key={tag} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
