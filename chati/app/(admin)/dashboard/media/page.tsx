"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import LoadingMedia from "./loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  Copy,
  Trash2,
  ImageIcon,
  Check,
  Loader2,
  X,
  Sparkles,
  Image as ImageLucide,
} from "lucide-react";

interface MediaFile {
  id: string;
  url: string;
  alt: string;
  type: string;
  size: number;
  uploadedAt: string;
  createdBy?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function MediaPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    mediaId: string | null;
  }>({
    open: false,
    mediaId: null,
  });
  const [mounted, setMounted] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState("");

  useEffect(() => {
    setMounted(true);
    fetchMedia();
  }, []);

  const [previewDialog, setPreviewDialog] = useState<{
    open: boolean;
    file: MediaFile | null;
  }>({
    open: false,
    file: null,
  });

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch("/api/media", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch media");
      }

      const result = await response.json();
      setMedia(result.data || []);
    } catch (error) {
      console.error("Error fetching media:", error);
      toast({
        title: "Error",
        description: "Failed to load media",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be under 5MB",
        variant: "destructive",
      });
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Only image files are allowed (JPEG, PNG, GIF, WEBP, SVG)",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !altText.trim()) {
      toast({
        title: "Validation Error",
        description: "Please select a file and provide alt text",
        variant: "destructive",
      });
      return;
    }

    if (altText.trim().length > 500) {
      toast({
        title: "Validation Error",
        description: "Alt text must be less than 500 characters",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("alt", altText.trim());

      const response = await fetch("/api/media/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to upload media");
      }

      toast({
        title: "Success",
        description: result.message || "Media uploaded successfully",
      });

      setSelectedFile(null);
      setPreviewUrl(null);
      setAltText("");
      setUploadDialog(false);

      fetchMedia();
    } catch (error: any) {
      console.error("Error uploading media:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload media",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast({ title: "Copied!", description: "URL copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!deleteDialog.mediaId) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/media/${deleteDialog.mediaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete media");
      }

      toast({
        title: "Success",
        description: result.message || "Media deleted successfully",
      });

      setMedia((prev) => prev.filter((m) => m.id !== deleteDialog.mediaId));
      setDeleteDialog({ open: false, mediaId: null });
    } catch (error: any) {
      console.error("Error deleting media:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete media",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (loading) {
    return <LoadingMedia />;
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
            <ImageLucide className="w-10 h-10 text-purple-600" />
            Media Library 🖼️
          </h2>
          <p className="text-lg text-gray-600">
            Manage your uploaded images and files
          </p>
        </div>
        <Button
          onClick={() => setUploadDialog(true)}
          disabled={uploading}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-purple-600/25 transition-all duration-300 hover:scale-105"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      {media.length === 0 ? (
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardContent className="py-16 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
              <ImageIcon className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No media files yet
            </h3>
            <p className="text-gray-500 mb-6">
              Upload your first image to get started
            </p>
            <Button
              onClick={() => setUploadDialog(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Your First Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((file, index) => (
            <Card
              key={file.id}
              className="relative overflow-hidden bg-white border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <CardContent className="p-3 relative z-10">
                <div
                  className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 overflow-hidden group-hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setPreviewDialog({ open: true, file })}
                >
                  <img
                    src={file.url}
                    alt={file.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="space-y-2">
                  <h3
                    className="font-semibold text-sm text-gray-900 truncate"
                    title={file.alt}
                  >
                    {file.alt}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {formatFileSize(file.size)}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                  {file.createdBy && (
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span>by</span>
                      <span className="font-medium">{file.createdBy.name}</span>
                    </p>
                  )}
                  <div className="flex items-center gap-2 pt-2">
                    <Input
                      value={file.url}
                      readOnly
                      className="text-xs bg-gray-50 border-gray-200 font-mono flex-1"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopy(file.url, file.id)}
                      className="border-green-200 hover:bg-green-50 h-8 w-8 flex-shrink-0 transition-all"
                    >
                      {copiedId === file.id ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3 text-gray-600" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        setDeleteDialog({ open: true, mediaId: file.id })
                      }
                      className="border-red-200 hover:bg-red-50 h-8 w-8 flex-shrink-0 transition-all"
                    >
                      <Trash2 className="h-3 w-3 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-600" />
              Upload Image
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Upload an image to your media library (max 5MB)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 hover:bg-purple-50/50 transition-all duration-300">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center mb-3">
                        <Upload className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Click to select an image
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG, GIF, WEBP, SVG (max 5MB)
                      </p>
                    </>
                  )}
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </Label>
            </div>

            <div>
              <Label htmlFor="alt-text" className="text-gray-700 font-medium">
                Alt Text <span className="text-red-500">*</span>
              </Label>
              <Input
                id="alt-text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe the image..."
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for accessibility (max 500 characters)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUploadDialog(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploading || !selectedFile || !altText.trim()}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, mediaId: null })}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              Delete Media
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete this media? This action cannot be
              undone and will also delete the file from Cloudinary.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 flex items-start gap-2">
              <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Warning:</strong> This will permanently delete the file.
              </span>
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, mediaId: null })}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              Delete Forever
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Image Preview Dialog */}
      <Dialog
        open={previewDialog.open}
        onOpenChange={(open) => setPreviewDialog({ open, file: null })}
      >
        <DialogContent className="bg-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              Image Preview
            </DialogTitle>
          </DialogHeader>

          {previewDialog.file && (
            <div className="space-y-4">
              {/* Large Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={previewDialog.file.url}
                  alt={previewDialog.file.alt}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {/* Image Details */}
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-gray-700 font-medium text-sm">
                    Alt Text
                  </Label>
                  <p className="text-gray-900 mt-1">{previewDialog.file.alt}</p>
                </div>

                <div>
                  <Label className="text-gray-700 font-medium text-sm">
                    File Size
                  </Label>
                  <p className="text-gray-900 mt-1">
                    {formatFileSize(previewDialog.file.size)}
                  </p>
                </div>

                <div>
                  <Label className="text-gray-700 font-medium text-sm">
                    Uploaded
                  </Label>
                  <p className="text-gray-900 mt-1">
                    {new Date(previewDialog.file.uploadedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>

                {previewDialog.file.createdBy && (
                  <div>
                    <Label className="text-gray-700 font-medium text-sm">
                      Uploaded By
                    </Label>
                    <p className="text-gray-900 mt-1">
                      {previewDialog.file.createdBy.name}
                    </p>
                  </div>
                )}
              </div>

              {/* URL Copy Field */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium text-sm">
                  Image URL
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={previewDialog.file.url}
                    readOnly
                    className="text-sm bg-gray-50 border-gray-200 font-mono"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleCopy(
                        previewDialog.file!.url,
                        previewDialog.file!.id
                      )
                    }
                    className="border-green-200 hover:bg-green-50"
                  >
                    {copiedId === previewDialog.file.id ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPreviewDialog({ open: false, file: null })}
              className="border-gray-200"
            >
              Close
            </Button>
            {previewDialog.file && (
              <Button
                variant="destructive"
                onClick={() => {
                  setPreviewDialog({ open: false, file: null });
                  setDeleteDialog({
                    open: true,
                    mediaId: previewDialog.file!.id,
                  });
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
