"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Eye, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Page {
  id: string
  title: string
  slug: string
  content: any
  status: string
  publishedAt: string | null
  createdAt: string
  author: {
    id: string
    name: string
    email: string
  }
}

export default function PagesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; pageId: string | null }>({
    open: false,
    pageId: null,
  })

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))

      const storedPages = localStorage.getItem("demo_pages")
      let allPages: Page[] = []

      if (storedPages) {
        allPages = JSON.parse(storedPages)
      }

      // Add default demo pages if none exist
      if (allPages.length === 0) {
        const demoPages: Page[] = [
          {
            id: "1",
            title: "Home Page",
            slug: "home",
            content: { blocks: [] },
            status: "PUBLISHED",
            publishedAt: "2024-01-15",
            createdAt: "2024-01-15",
            author: { id: "1", name: "Admin", email: "admin@example.com" },
          },
          {
            id: "2",
            title: "About Us",
            slug: "about",
            content: { blocks: [] },
            status: "PUBLISHED",
            publishedAt: "2024-01-10",
            createdAt: "2024-01-10",
            author: { id: "1", name: "Admin", email: "admin@example.com" },
          },
          {
            id: "3",
            title: "Contact",
            slug: "contact",
            content: { blocks: [] },
            status: "DRAFT",
            publishedAt: null,
            createdAt: "2024-01-12",
            author: { id: "1", name: "Admin", email: "admin@example.com" },
          },
        ]
        localStorage.setItem("demo_pages", JSON.stringify(demoPages))
        allPages = demoPages
      }

      setPages(allPages)
    } catch (error) {
      toast({ title: "Error", description: "Failed to load pages", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteModal.pageId) return
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))

      const updatedPages = pages.filter((p) => p.id !== deleteModal.pageId)
      localStorage.setItem("demo_pages", JSON.stringify(updatedPages))

      setPages(updatedPages)
      setDeleteModal({ open: false, pageId: null })
      toast({ title: "Success", description: "Page deleted successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete page", variant: "destructive" })
    }
  }

  return (
    <div className="pt-8 px-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Pages</h2>
          <p className="text-lg text-gray-600">Manage your website pages with drag-and-drop builder</p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/pages/create")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Page
        </Button>
      </div>

      {/* Pages List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-r-transparent" />
        </div>
      ) : pages.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No pages found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pages.map((page, index) => (
            <Card
              key={page.id}
              className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] animate-in slide-in-from-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 font-mono">/{page.slug}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          page.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : page.status === "REVIEW"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {page.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        Created {new Date(page.createdAt).toLocaleDateString()}
                      </span>
                      {page.publishedAt && (
                        <span className="text-xs text-gray-500">
                          Published {new Date(page.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/pages/${page.id}`)}
                      className="border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Eye className="h-4 w-4 mr-1 text-blue-600" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/pages/${page.id}/edit`)}
                      className="border-gray-200 hover:bg-green-50 hover:border-green-300"
                    >
                      <Pencil className="h-4 w-4 mr-1 text-green-600" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDeleteModal({ open: true, pageId: page.id })}
                      className="border-gray-200 hover:bg-red-50 hover:border-red-300 h-9 w-9"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setDeleteModal({ open: false, pageId: null })}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Page</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this page? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteModal({ open: false, pageId: null })}
                className="border-gray-200"
              >
                Cancel
              </Button>
              <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
