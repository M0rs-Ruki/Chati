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
  const [currentUser] = useState({ id: "user-1", role: "ADMIN" })

  useEffect(() => {
    fetchDoc()
  }, [params.id])

  const fetchDoc = async () => {
    try {
      // Demo: Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Mock documentation data
      const mockDoc: Documentation = {
        id: params.id as string,
        title: "API Reference",
        slug: "api-reference",
        content: {
          markdown:
            '# API Reference\n\nComplete API documentation for all endpoints.\n\n## Authentication\n\nAll API requests require authentication using JWT tokens. Include your token in the Authorization header:\n\n```\nAuthorization: Bearer <your-token>\n```\n\n## Endpoints\n\n### GET /api/users\n\nRetrieve a list of all users.\n\n**Response:**\n```json\n{\n  "users": [\n    {\n      "id": "1",\n      "name": "John Doe",\n      "email": "john@example.com"\n    }\n  ]\n}\n```\n\n### POST /api/users/create\n\nCreate a new user.\n\n**Request Body:**\n```json\n{\n  "name": "Jane Smith",\n  "email": "jane@example.com",\n  "password": "securepassword"\n}\n```',
        },
        imageUrl: "/api-documentation-hero-image.jpg",
        status: "PUBLISHED",
        metadata: {
          tags: ["api", "reference", "documentation"],
          description: "Complete API reference documentation for developers",
        },
        author: { id: "user-1", name: "Admin User", email: "admin@example.com" },
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      }

      setDoc(mockDoc)
    } finally {
      setLoading(false)
    }
  }

  const canEdit = () => {
    if (!doc) return false
    return doc.author.id === currentUser.id || currentUser.role === "ADMIN"
  }

  const canDelete = () => {
    if (!doc) return false
    return doc.author.id === currentUser.id || currentUser.role === "ADMIN"
  }

  const handleDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      // Demo: In production, call DELETE /api/documentation/[id]/delete
      toast({ title: "Success", description: "Documentation deleted successfully" })
      router.push("/dashboard/docs")
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete documentation", variant: "destructive" })
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
            <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm leading-relaxed">
              {doc.content.markdown || "No content"}
            </pre>
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
