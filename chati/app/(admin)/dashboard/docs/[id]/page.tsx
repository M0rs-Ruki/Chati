"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoadingDoc from "./loading";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Loader2,
  Calendar,
  User,
  BookOpen,
  Tag,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Documentation {
  id: string;
  title: string;
  slug: string;
  content: Record<string, any>;
  imageUrl?: string | null;
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
  metadata: {
    tags?: string[];
    description?: string;
  };
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function ViewDocPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [doc, setDoc] = useState<Documentation | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (params.id) {
      fetchDoc();
    }
  }, [params.id]);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchDoc = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/documentation/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch documentation");
      }

      const result = await response.json();
      setDoc(result.data);
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

  const canEdit = () => {
    if (!doc || !currentUser) return false;
    return doc.author.id === currentUser.id || currentUser.role === "ADMIN";
  };

  const canDelete = () => {
    if (!doc || !currentUser) return false;
    return doc.author.id === currentUser.id || currentUser.role === "ADMIN";
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/documentation/${doc?.id}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete documentation");
      }

      toast({
        title: "Success",
        description: "Documentation deleted successfully",
      });

      router.push("/dashboard/docs");
    } catch (error) {
      console.error("Error deleting documentation:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete documentation",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

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
    return <LoadingDoc />;
  }

  if (!doc) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Documentation not found
          </h3>
          <p className="text-gray-600">
            The documentation you're looking for doesn't exist
          </p>
          <Link href="/dashboard/docs">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documentation
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pt-8 px-6 pb-12 space-y-8 max-w-5xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/docs">
            <Button
              variant="outline"
              size="icon"
              className="border-gray-200 hover:bg-gray-100 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold border shadow-sm ${getStatusColor(
              doc.status
            )}`}
          >
            {doc.status}
          </span>
        </div>
        <div className="flex gap-2">
          {canEdit() && (
            <Link href={`/dashboard/docs/${doc.id}/edit`}>
              <Button
                variant="outline"
                className="border-green-200 hover:bg-green-50 transition-all"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
          {canDelete() && (
            <Button
              variant="outline"
              onClick={() => setDeleteModal(true)}
              className="border-red-200 text-red-600 hover:bg-red-50 transition-all"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Content Card */}
      <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 lg:p-12">
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6">
            {doc.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <User className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <span className="font-medium">{doc.author.name}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <Calendar className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <span>
                {new Date(doc.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {doc.createdAt !== doc.updatedAt && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">
                  Updated{" "}
                  {new Date(doc.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
          </div>

          {/* Hero Image */}
          {doc.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <img
                src={doc.imageUrl}
                alt={doc.title}
                className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          {/* Description */}
          {doc.metadata.description && (
            <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <p className="text-gray-700 leading-relaxed">
                {doc.metadata.description}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {doc.content.html ? (
              <div
                dangerouslySetInnerHTML={{ __html: doc.content.html }}
                className="text-gray-700 leading-relaxed"
              />
            ) : doc.content.markdown ? (
              <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg text-sm leading-relaxed border border-gray-200">
                {doc.content.markdown}
              </pre>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No content available</p>
              </div>
            )}
          </div>

          {/* Tags */}
          {doc.metadata.tags && doc.metadata.tags.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-green-100 rounded-lg">
                  <Tag className="h-3.5 w-3.5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {doc.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Modal */}
      <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              Delete Documentation
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete "{doc.title}"? This action cannot
              be undone.
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
              onClick={() => setDeleteModal(false)}
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
