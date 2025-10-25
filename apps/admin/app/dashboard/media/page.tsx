"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  Image as ImageIcon,
  X,
} from "lucide-react";

interface Media {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  contentType: string;
  size: number;
  createdAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media', {
        credentials: "include",
      });
      const data = await response.json();
      setMedia(data.media || []);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("alt", file.name.replace(/\.[^/.]+$/, ""));

      try {
        const response = await fetch('/api/media/upload', {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        if (!response.ok) {
          console.error("Failed to upload:", file.name);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setUploading(false);
    fetchMedia();
    e.target.value = ""; // Reset input
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        fetchMedia();
        setSelectedMedia(null);
      }
    } catch (error) {
      console.error("Failed to delete media:", error);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const filteredMedia = media.filter(
    (m) =>
      m.alt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.url?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">
            Upload and manage your images and files
          </p>
        </div>
        <div>
          <input
            type="file"
            id="file-upload"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <label htmlFor="file-upload">
            <button
              disabled={uploading}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Upload Files"}
            </button>
          </label>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Media Grid */}
      {filteredMedia.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMedia.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer group"
              onClick={() => setSelectedMedia(m)}
            >
              <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                <img
                  src={m.url}
                  alt={m.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUrl(m.url);
                    }}
                    className="px-3 py-2 bg-white text-gray-900 rounded-lg text-sm flex items-center gap-2"
                  >
                    {copiedUrl === m.url ? (
                      <>
                        <Check className="w-4 h-4" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy URL
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {m.alt}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatSize(m.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No media files
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? "No files match your search"
              : "Upload your first image or file"}
          </p>
          {!searchQuery && (
            <label htmlFor="file-upload">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 inline-flex items-center cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </button>
            </label>
          )}
        </div>
      )}

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Media Details</h2>
              <button
                onClick={() => setSelectedMedia(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={selectedMedia.alt}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedMedia.url}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <button
                      onClick={() => copyUrl(selectedMedia.url)}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      {copiedUrl === selectedMedia.url ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dimensions
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedMedia.width} × {selectedMedia.height}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <p className="text-sm text-gray-600">
                      {formatSize(selectedMedia.size)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedMedia.contentType}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => handleDelete(selectedMedia.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
