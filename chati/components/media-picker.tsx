"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon, Upload, Loader2, Search } from "lucide-react";

interface MediaFile {
  id: string;
  url: string;
  alt: string;
  filename?: string;
}

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string, alt?: string) => void;
}

export function MediaPicker({ open, onOpenChange, onSelect }: MediaPickerProps) {
  const { toast } = useToast();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");

  // Fetch media files when dialog opens
  useEffect(() => {
    if (open) {
      fetchMedia();
    }
  }, [open]);

  // Filter media files based on search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFiles(mediaFiles);
    } else {
      const filtered = mediaFiles.filter(
        (file) =>
          file.alt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          file.filename?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFiles(filtered);
    }
  }, [searchQuery, mediaFiles]);

  const fetchMedia = async () => {
    setMediaLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/media", {
        headers: { Authorization: `Bearer ${token ?? ""}` },
      });
      
      if (!res.ok) throw new Error("Failed to fetch media");
      
      const result = await res.json();
      setMediaFiles(result.data || []);
      setFilteredFiles(result.data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load media library",
        variant: "destructive",
      });
      setMediaFiles([]);
      setFilteredFiles([]);
    } finally {
      setMediaLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setAltText(file.name.replace(/\.[^/.]+$/, "")); // Remove extension
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("alt", altText);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      const uploadedFile = result.data;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      // Select the uploaded image
      onSelect(uploadedFile.url, uploadedFile.alt);
      onOpenChange(false);

      // Reset form
      setSelectedFile(null);
      setAltText("");

      // Refresh media library
      fetchMedia();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select or Upload Image</DialogTitle>
          <DialogDescription>Choose an image from your library or upload a new one</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="library" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">Media Library</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          {/* Media Library Tab */}
          <TabsContent value="library" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg p-4">
              {mediaLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  {searchQuery ? "No images found matching your search" : "No media files available"}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredFiles.map((file) => (
                    <Button
                      key={file.id}
                      variant="ghost"
                      className="flex flex-col items-center p-2 border border-gray-200 rounded-md hover:border-green-500 transition-colors h-auto"
                      onClick={() => {
                        onSelect(file.url, file.alt);
                        onOpenChange(false);
                        toast({
                          title: "Success",
                          description: "Image selected successfully",
                        });
                      }}
                    >
                      <img src={file.url} alt={file.alt} className="w-full h-24 object-cover rounded mb-1" />
                      <span className="text-xs truncate text-center w-full">{file.alt || file.filename}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select Image</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>

              {selectedFile && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="alt">Alt Text / Description</Label>
                    <Input
                      id="alt"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Describe the image"
                      disabled={uploading}
                    />
                  </div>

                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-contain rounded mx-auto"
                    />
                  </div>

                  <Button onClick={handleUpload} disabled={uploading} className="w-full bg-green-600 hover:bg-green-700">
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload & Select
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
