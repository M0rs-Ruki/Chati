"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoadingDocs from "./loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  FileText,
  Loader2,
  BookOpen,
  AlertCircle,
  Tag,
} from "lucide-react";
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
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
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
      setDeleting(true);
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
    } finally {
      setDeleting(false);
    }
  };

  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300";
      case "DRAFT":
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border-yellow-300";
      case "REVIEW":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300";
      case "ARCHIVED":
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300";
    }
  };

  if (loading) {
    return <LoadingDocs />;
  }

  return (
    <div
      className={`pt-8 px-6 pb-12 space-y-8 max-w-7xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-blue-600" />
            Documentation 📚
          </h2>
          <p className="text-lg text-gray-600">
            Manage your documentation pages
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/docs/create")}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-600/25 transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Documentation
        </Button>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
        <Input
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all h-12"
        />
      </div>

      {filteredDocs.length === 0 ? (
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardContent className="py-16 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? "No documentation found" : "No documentation yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Try adjusting your search query"
                : "Create your first documentation to get started!"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => router.push("/dashboard/docs/create")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Documentation
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => (
            <Card
              key={doc.id}
              className="relative overflow-hidden bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold border shadow-sm ${getStatusColor(
                      doc.status
                    )}`}
                  >
                    {doc.status}
                  </span>
                </div>
                {doc.imageUrl && (
                  <div className="relative mb-3 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                    <img
                      src={doc.imageUrl}
                      alt={doc.title}
                      className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
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
                        className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                  <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{doc.author?.name || "Unknown"}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/dashboard/docs/${doc.id}`)}
                    className="flex-1 border-blue-200 hover:bg-blue-50 transition-all"
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
                      className="flex-1 border-green-200 hover:bg-green-50 transition-all"
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
                      className="border-red-200 hover:bg-red-50 transition-all"
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

      {/* Delete Modal */}
      <Dialog
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal({ open, docId: null })}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              Delete Documentation
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete this documentation? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Warning:</strong> This will permanently delete the
                documentation.
              </span>
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, docId: null })}
              disabled={deleting}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Forever"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
