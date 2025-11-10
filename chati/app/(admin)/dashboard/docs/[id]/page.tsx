"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Documentation {
  id: string
  title: string
  slug: string
  content: Record<string, any>
  imageUrl?: string | null
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED"
  metadata: {
    tags?: string[]
    description?: string
  }
  author: {
    id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export default function ViewDocPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [doc, setDoc] = useState<Documentation | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ id: string; role: string } | null>(null)

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    if (params.id) {
      fetchDoc()
    }
  }, [params.id])

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setCurrentUser(data.user)
      }
    } catch (error) {
      console.error("Error fetching current user:", error)
    }
  }

  const fetchDoc = async () => {
    try {
      const response = await fetch(`/api/documentation/${params.id}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch documentation")
      }

      const result = await response.json()
      setDoc(result.data)
    } catch (error) {
      console.error("Error fetching documentation:", error)
      toast({
        title: "Error",
        description: "Failed to load documentation",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const canEdit = () => {
    if (!doc || !currentUser) return false
    return doc.author.id === currentUser.id || currentUser.role === "ADMIN"
  }

  const canDelete = () => {
    if (!doc || !currentUser) return false
    return doc.author.id === currentUser.id || currentUser.role === "ADMIN"
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/documentation/${doc?.id}/delete`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete documentation")
      }

      toast({ 
        title: "Success", 
        description: "Documentation deleted successfully" 
      })
      
      router.push("/dashboard/docs")
    } catch (error) {
      console.error("Error deleting documentation:", error)
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to delete documentation", 
        variant: "destructive" 
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700 border-green-300"
      case "DRAFT":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "REVIEW":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "ARCHIVED":
        return "bg-gray-100 text-gray-600 border-gray-300"
      default:
        return "bg-gray-100 text-gray-600 border-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary-green)] border-r-transparent" />
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">Documentation not found</p>
        <Link href="/dashboard/docs">
          <Button className="mt-4 bg-transparent" variant="outline">
            Back to Documentation
          </Button>
        </Link>
      </div>
    )
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
          <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(doc.status)}`}>
            {doc.status}
          </span>
        </div>
        <div className="flex gap-2">
          {canEdit() && (
            <Link href={`/dashboard/docs/${doc.id}/edit`}>
              <Button variant="outline" className="border-[var(--border)] hover:bg-green-50 bg-transparent">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
          {canDelete() && (
            <Button
              variant="outline"
              onClick={() => setDeleteModal(true)}
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
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">{doc.title}</h1>

          <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
            <span>{doc.author.name}</span>
            <span>•</span>
            <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
            {doc.createdAt !== doc.updatedAt && (
              <>
                <span>•</span>
                <span>Updated {new Date(doc.updatedAt).toLocaleDateString()}</span>
              </>
            )}
          </div>

          {doc.imageUrl && (
            <img
              src={doc.imageUrl || "/placeholder.svg"}
              alt={doc.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          {doc.metadata.description && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700">{doc.metadata.description}</p>
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            {doc.content.html ? (
              <div 
                dangerouslySetInnerHTML={{ __html: doc.content.html }} 
                className="text-gray-700"
              />
            ) : doc.content.markdown ? (
              <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm leading-relaxed">
                {doc.content.markdown}
              </pre>
            ) : (
              <p className="text-gray-500">No content available</p>
            )}
          </div>

          {doc.metadata.tags && doc.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--border)]">
              {doc.metadata.tags.map((tag) => (
                <span key={tag} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Modal */}
      <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Documentation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{doc.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
