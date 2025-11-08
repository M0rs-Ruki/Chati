"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Upload, Copy, Trash2, ImageIcon, Check } from "lucide-react"

interface MediaFile {
  id: string
  filename: string
  url: string
  type: string
  size: number
  uploadedAt: string
}

export default function MediaPage() {
  const { toast } = useToast()
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/media')
      // const result = await response.json()

      await new Promise((resolve) => setTimeout(resolve, 600))
      const demoMedia: MediaFile[] = [
        {
          id: "1",
          filename: "hero-image.jpg",
          url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85",
          type: "image/jpeg",
          size: 245000,
          uploadedAt: "2024-01-15T10:30:00Z",
        },
        {
          id: "2",
          filename: "product-photo.png",
          url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          type: "image/png",
          size: 189000,
          uploadedAt: "2024-01-14T14:20:00Z",
        },
        {
          id: "3",
          filename: "team-photo.jpg",
          url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
          type: "image/jpeg",
          size: 312000,
          uploadedAt: "2024-01-13T09:15:00Z",
        },
      ]
      setMedia(demoMedia)
    } catch (error) {
      toast({ title: "Error", description: "Failed to load media", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      // TODO: Replace with actual upload
      // const formData = new FormData()
      // formData.append('file', files[0])
      // const response = await fetch('/api/media/upload', {
      //   method: 'POST',
      //   body: formData
      // })

      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({ title: "Success", description: "Media uploaded successfully" })
      fetchMedia()
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload media", variant: "destructive" })
    } finally {
      setUploading(false)
    }
  }

  const handleCopy = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast({ title: "Copied!", description: "URL copied to clipboard" })
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media file?")) return

    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/media/${id}`, { method: 'DELETE' })

      await new Promise((resolve) => setTimeout(resolve, 400))
      setMedia(media.filter((m) => m.id !== id))
      toast({ title: "Success", description: "Media deleted successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete media", variant: "destructive" })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="pt-8 px-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Media Library</h2>
          <p className="text-lg text-gray-600">Manage your uploaded images and files</p>
        </div>
        <div>
          <input
            type="file"
            id="media-upload"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
          <Label htmlFor="media-upload">
            <Button
              type="button"
              disabled={uploading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById("media-upload")?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload Media"}
            </Button>
          </Label>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-r-transparent" />
        </div>
      ) : media.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="py-12 text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No media files uploaded yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((file, index) => (
            <Card
              key={file.id}
              className="bg-white border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={file.url || "/placeholder.svg"}
                    alt={file.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-gray-900 truncate">{file.filename}</h3>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Input value={file.url} readOnly className="text-xs bg-gray-50 border-gray-200 font-mono" />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopy(file.url, file.id)}
                      className="border-gray-200 hover:bg-green-50 h-9 w-9 flex-shrink-0"
                    >
                      {copiedId === file.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-600" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(file.id)}
                      className="border-gray-200 hover:bg-red-50 h-9 w-9 flex-shrink-0"
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
    </div>
  )
}
