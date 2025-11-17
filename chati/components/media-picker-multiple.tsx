"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon, Upload, Loader2, Search, Check } from "lucide-react";

interface MediaFile {
  id: string;
  url: string;
  alt: string;
  filename?: string;
}

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (urls: string[], alts?: string[]) => void;
  multiple?: boolean;
}

export function MediaPicker({
  open,
  onOpenChange,
  onSelect,
  multiple = false,
}: MediaPickerProps) {
  const { toast } = useToast();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaFile[]>([]); // For multiple selection

  useEffect(() => {
    if (open) {
      fetchMedia();
      setSelectedMedia([]); // Reset selection when dialog opens
    }
  }, [open]);

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
      setAltText(file.name.replace(/\.[^/.]+$/, ""));
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

      onSelect([uploadedFile.url], [uploadedFile.alt]);
      onOpenChange(false);

      setSelectedFile(null);
      setAltText("");

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

  const toggleMediaSelection = (file: MediaFile) => {
    if (!multiple) {
      // Single selection mode
      onSelect([file.url], [file.alt]);
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Image selected successfully",
      });
      return;
    }

    // Multiple selection mode
    setSelectedMedia((prev) => {
      const exists = prev.find((m) => m.id === file.id);
      if (exists) {
        return prev.filter((m) => m.id !== file.id);
      } else {
        return [...prev, file];
      }
    });
  };

  const handleConfirmSelection = () => {
    if (selectedMedia.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image",
        variant: "destructive",
      });
      return;
    }

    const urls = selectedMedia.map((m) => m.url);
    const alts = selectedMedia.map((m) => m.alt);

    onSelect(urls, alts);
    onOpenChange(false);
    setSelectedMedia([]);

    toast({
      title: "Success",
      description: `${selectedMedia.length} image(s) selected successfully`,
    });
  };

  const isSelected = (fileId: string) => {
    return selectedMedia.some((m) => m.id === fileId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {multiple ? "Select Multiple Images" : "Select Image"}
          </DialogTitle>
          <DialogDescription>
            {multiple
              ? `Choose multiple images from your library or upload a new one. ${selectedMedia.length} selected.`
              : "Choose an image from your library or upload a new one"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="library"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">Media Library</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          {/* Media Library Tab */}
          <TabsContent
            value="library"
            className="flex-1 overflow-hidden flex flex-col mt-4"
          >
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
                  {searchQuery
                    ? "No images found matching your search"
                    : "No media files available"}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredFiles.map((file) => {
                    const selected = isSelected(file.id);
                    return (
                      <Button
                        key={file.id}
                        variant="ghost"
                        className={`flex flex-col items-center p-2 border rounded-md transition-all h-auto relative ${
                          selected
                            ? "border-green-500 bg-green-50 ring-2 ring-green-500"
                            : "border-gray-200 hover:border-green-500"
                        }`}
                        onClick={() => toggleMediaSelection(file)}
                      >
                        {selected && (
                          <div className="absolute top-1 right-1 bg-green-600 text-white rounded-full p-1 z-10">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <img
                          src={file.url}
                          alt={file.alt}
                          className="w-full h-24 object-cover rounded mb-1"
                        />
                        <span className="text-xs truncate text-center w-full">
                          {file.alt || file.filename}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>

            {multiple && selectedMedia.length > 0 && (
              <div className="mt-4">
                <Button
                  onClick={handleConfirmSelection}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Confirm Selection ({selectedMedia.length})
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent
            value="upload"
            className="flex-1 overflow-hidden flex flex-col mt-4"
          >
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

                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
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
