"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye, Search, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Documentation {
  id: string;
  title: string;
  slug: string;
  content?: Record<string, any>;
  imageUrl?: string | null;
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
  metadata: {
    tags?: string[];
    description?: string;
  };
  author?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function DocsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    role: string;
  } | null>(null);

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    docId: string | null;
  }>({
    open: false,
    docId: null,
  });

  useEffect(() => {
    // Get current user from localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }

    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch("/api/documentation", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch documentation");
      }

      const result = await response.json();
      setDocs(result.data || []);
    } catch (error) {
      console.error("Error fetching documentation:", error);
      toast({
        title: "Error",
        description: "Failed to load documentation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const canEdit = (doc: Documentation) => {
    if (!currentUser) return false;
    return doc.author?.id === currentUser.id || currentUser.role === "ADMIN";
  };

  const canDelete = (doc: Documentation) => {
    if (!currentUser) return false;
    return doc.author?.id === currentUser.id || currentUser.role === "ADMIN";
  };

  const handleDelete = async () => {
    if (!deleteModal.docId) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(
        `/api/documentation/${deleteModal.docId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete documentation");
      }

      // Remove doc from local state
      setDocs((prev) => prev.filter((d) => d.id !== deleteModal.docId));
      setDeleteModal({ open: false, docId: null });

      toast({
        title: "Success",
        description: "Documentation deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting documentation:", error);
      toast({
        title: "Error",
        description: "Failed to delete documentation",
        variant: "destructive",
      });
    }
  };

  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700 border-green-300";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "REVIEW":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-600 border-gray-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className="pt-8 px-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Documentation
          </h2>
          <p className="text-lg text-gray-600">
            Manage your documentation pages
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/docs/create")}
          className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Documentation
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-gray-200 focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-r-transparent" />
        </div>
      ) : filteredDocs.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">
              {searchQuery
                ? "No documentation found matching your search"
                : "No documentation yet. Create your first documentation to get started!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => (
            <Card
              key={doc.id}
              className="bg-white border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(
                      doc.status
                    )}`}
                  >
                    {doc.status}
                  </span>
                </div>
                {doc.imageUrl && (
                  <img
                    src={doc.imageUrl}
                    alt={doc.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {doc.title}
                  </h3>
                </div>
                {doc.metadata?.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {doc.metadata.description}
                  </p>
                )}
                {doc.metadata?.tags && doc.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {doc.metadata.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-400 mb-4">
                  {new Date(doc.createdAt).toLocaleDateString()} •{" "}
                  {doc.author?.name || "Unknown"}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      router.push(`/dashboard/docs/${doc.id}`)
                    }
                    className="flex-1 border-gray-200 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {canEdit(doc) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/docs/${doc.id}/edit`)
                      }
                      className="flex-1 border-gray-200 hover:bg-green-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                  {canDelete(doc) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setDeleteModal({ open: true, docId: doc.id })
                      }
                      className="border-gray-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal({ open, docId: null })}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Documentation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this documentation? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, docId: null })}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
