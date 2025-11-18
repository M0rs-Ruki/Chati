"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { MediaPicker } from "@/components/media-picker-multiple";
import {
  Plus,
  Trash2,
  Loader2,
  Image as ImageIcon,
  Edit,
  Package,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import BrandsLoading from "./loading";

interface BrandLogo {
  name: string;
  url: string;
}

interface Brand {
  id: string;
  name: string;
  logoUrl: BrandLogo[]; // Changed to BrandLogo[]
  status: "ACTIVE" | "INACTIVE";
  theme: "DARK" | "COLOR";
  createdAt: string;
  updatedAt: string;
}

export default function BrandsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isTogglingStatus, setIsTogglingStatus] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const [newBrandForm, setNewBrandForm] = useState({
    name: "",
    logoUrls: [] as BrandLogo[], // Changed to BrandLogo[]
    theme: "DARK" as "DARK" | "COLOR",
  });

  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [editingLogoIndex, setEditingLogoIndex] = useState<number | null>(null);
  const [mediaPickerMode, setMediaPickerMode] = useState<"create" | "edit">(
    "create"
  );

  useEffect(() => {
    setMounted(true);
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setIsLoadingBrands(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch("/api/brands", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }

      const result = await response.json();
      setBrands(result.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast({
        title: "Error",
        description: "Failed to fetch brands",
        variant: "destructive",
      });
    } finally {
      setIsLoadingBrands(false);
    }
  };

  const createBrand = async () => {
    if (!newBrandForm.name || newBrandForm.logoUrls.length === 0) {
      toast({
        title: "Validation Error",
        description: "Brand name and at least one logo are required",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch("/api/brands/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newBrandForm.name,
          logoUrl: newBrandForm.logoUrls, // Now sends {name, url} objects
          theme: newBrandForm.theme,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create brand");
      }

      toast({
        title: "Success",
        description: "Brand created successfully!",
      });

      setNewBrandForm({ name: "", logoUrls: [], theme: "DARK" });
      fetchBrands();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const updateBrand = async () => {
    if (!editingBrand) return;

    setIsUpdating(editingBrand.id);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/brands/${editingBrand.id}/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingBrand.name,
          logoUrl: editingBrand.logoUrl,
          theme: editingBrand.theme,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update brand");
      }

      toast({
        title: "Success",
        description: "Brand updated successfully!",
      });

      setEditingBrand(null);
      fetchBrands();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(null);
    }
  };

  const deleteBrand = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setIsDeleting(id);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/brands/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete brand");
      }

      toast({
        title: "Success",
        description: "Brand deleted successfully!",
      });

      fetchBrands();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const toggleBrandStatus = async (brand: Brand) => {
    const newStatus = brand.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setIsTogglingStatus(brand.id);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/brands/${brand.id}/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update brand status");
      }

      toast({
        title: "Success",
        description: `Brand ${
          newStatus === "ACTIVE" ? "activated" : "deactivated"
        } successfully!`,
      });

      fetchBrands();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsTogglingStatus(null);
    }
  };

  // UPDATED: Now handles multiple selection
  const handleMediaSelect = (urls: string[], alts?: string[]) => {
    const newLogos: BrandLogo[] = urls.map((url, index) => ({
      name: alts?.[index] || `Logo ${index + 1}`,
      url: url,
    }));

    if (mediaPickerMode === "create") {
      setNewBrandForm({
        ...newBrandForm,
        logoUrls: [...newBrandForm.logoUrls, ...newLogos],
      });
    } else if (mediaPickerMode === "edit" && editingBrand) {
      setEditingBrand({
        ...editingBrand,
        logoUrl: [...editingBrand.logoUrl, ...newLogos],
      });
    }

    setEditingLogoIndex(null);
    setMediaPickerOpen(false);
  };

  const addLogo = (mode: "create" | "edit") => {
    setMediaPickerMode(mode);
    setEditingLogoIndex(null);
    setMediaPickerOpen(true);
  };

  const removeLogo = (index: number, mode: "create" | "edit") => {
    if (mode === "create") {
      setNewBrandForm({
        ...newBrandForm,
        logoUrls: newBrandForm.logoUrls.filter((_, i) => i !== index),
      });
    } else if (editingBrand) {
      setEditingBrand({
        ...editingBrand,
        logoUrl: editingBrand.logoUrl.filter((_, i) => i !== index),
      });
    }
  };

  const editLogoName = (
    index: number,
    newName: string,
    mode: "create" | "edit"
  ) => {
    if (mode === "create") {
      const updated = [...newBrandForm.logoUrls];
      updated[index] = { ...updated[index], name: newName };
      setNewBrandForm({ ...newBrandForm, logoUrls: updated });
    } else if (editingBrand) {
      const updated = [...editingBrand.logoUrl];
      updated[index] = { ...updated[index], name: newName };
      setEditingBrand({ ...editingBrand, logoUrl: updated });
    }
  };

  if (isLoadingBrands) {
    return <BrandsLoading />;
  }

  return (
    <div
      className={`p-6 lg:p-8 pb-12 max-w-7xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          Brand Management
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage your brand logos for the brand slider component
        </p>
      </div>

      {/* Create New Brand Form */}
      <Card className="border-gray-200 shadow-lg mb-8 animate-in slide-in-from-top duration-500">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-600" />
            Create New Brand
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div>
            <Label htmlFor="brand-name" className="text-gray-700 font-medium">
              Brand Name *
            </Label>
            <Input
              id="brand-name"
              value={newBrandForm.name}
              onChange={(e) =>
                setNewBrandForm({ ...newBrandForm, name: e.target.value })
              }
              placeholder="e.g., Google, Microsoft, Apple"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="brand-theme" className="text-gray-700 font-medium">
              Logo Theme *
            </Label>
            <Select
              value={newBrandForm.theme}
              onValueChange={(value: "DARK" | "COLOR") =>
                setNewBrandForm({ ...newBrandForm, theme: value })
              }
            >
              <SelectTrigger id="brand-theme" className="mt-2 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DARK">
                  Dark (Grayscale with hover color)
                </SelectItem>
                <SelectItem value="COLOR">Color (Always full color)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              {newBrandForm.theme === "DARK"
                ? "Logos will appear in grayscale and show color on hover"
                : "Logos will always display in full color"}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-gray-700 font-medium">
                Brand Logos * ({newBrandForm.logoUrls.length})
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addLogo("create")}
                className="border-indigo-200 hover:bg-indigo-50"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Logos
              </Button>
            </div>

            {newBrandForm.logoUrls.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg bg-gray-50">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-sm font-medium">No logos added yet</p>
                <p className="text-xs mt-1">
                  Click "Add Logos" to select from media library
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {newBrandForm.logoUrls.map((logo, index) => (
                  <div
                    key={index}
                    className="relative border-2 border-gray-200 rounded-lg p-3 bg-white hover:border-indigo-300 transition-colors"
                  >
                    <div
                      className={`aspect-square flex items-center justify-center mb-2 bg-gray-50 rounded transition-all duration-300
                      ${
                        newBrandForm.theme === "DARK"
                          ? "grayscale hover:grayscale-0"
                          : ""
                      }
                      `}
                    >
                      <Image
                        src={logo.url}
                        alt={logo.name}
                        width={80}
                        height={80}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Input
                      value={logo.name}
                      onChange={(e) =>
                        editLogoName(index, e.target.value, "create")
                      }
                      className="text-xs mb-2"
                      placeholder="Logo name"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLogo(index, "create")}
                      className="w-full text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={createBrand}
            disabled={
              isCreating ||
              !newBrandForm.name ||
              newBrandForm.logoUrls.length === 0
            }
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 h-12"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Brand...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Create Brand
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Editing Brand Section */}
      {editingBrand && (
        <Card className="border-indigo-300 shadow-lg mb-8 animate-in slide-in-from-bottom duration-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-600" />
              Editing: {editingBrand.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <Label className="text-gray-700 font-medium">Brand Name *</Label>
              <Input
                value={editingBrand.name}
                onChange={(e) =>
                  setEditingBrand({ ...editingBrand, name: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Logo Theme *</Label>
              <Select
                value={editingBrand.theme}
                onValueChange={(value: "DARK" | "COLOR") =>
                  setEditingBrand({ ...editingBrand, theme: value })
                }
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DARK">
                    Dark (Grayscale with hover color)
                  </SelectItem>
                  <SelectItem value="COLOR">
                    Color (Always full color)
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {editingBrand.theme === "DARK"
                  ? "Logos will appear in grayscale and show color on hover"
                  : "Logos will always display in full color"}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-gray-700 font-medium">
                  Brand Logos * ({editingBrand.logoUrl.length})
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addLogo("edit")}
                  className="border-blue-200 hover:bg-blue-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Logos
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {editingBrand.logoUrl.map((logo, index) => (
                  <div
                    key={index}
                    className="relative border-2 border-gray-200 rounded-lg p-3 bg-white hover:border-blue-300 transition-colors"
                  >
                    <div
                      className={`aspect-square flex items-center justify-center mb-2 bg-gray-50 rounded transition-all duration-300
                      ${
                        editingBrand.theme === "DARK"
                          ? "grayscale hover:grayscale-0"
                          : ""
                      }
                      `}
                    >
                      <Image
                        src={logo.url}
                        alt={logo.name}
                        width={80}
                        height={80}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Input
                      value={logo.name}
                      onChange={(e) =>
                        editLogoName(index, e.target.value, "edit")
                      }
                      className="text-xs mb-2"
                      placeholder="Logo name"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLogo(index, "edit")}
                      className="w-full text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={updateBrand}
                disabled={isUpdating === editingBrand.id}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {isUpdating === editingBrand.id ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Brand"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditingBrand(null)}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Brands List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          All Brands ({brands.length})
        </h2>

        {brands.length === 0 ? (
          <Card className="border-gray-200 shadow-lg">
            <CardContent className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium text-gray-600">No brands yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Create your first brand to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <Card
                key={brand.id}
                className="border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {brand.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-3">
                        <Switch
                          checked={brand.status === "ACTIVE"}
                          onCheckedChange={() => toggleBrandStatus(brand)}
                          disabled={isTogglingStatus === brand.id}
                          className="data-[state=checked]:bg-green-600"
                        />
                        <span
                          className={`text-sm font-medium ${
                            brand.status === "ACTIVE"
                              ? "text-green-700"
                              : "text-gray-500"
                          }`}
                        >
                          {isTogglingStatus === brand.id
                            ? "Updating..."
                            : brand.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {brand.logoUrl.slice(0, 3).map((logo, idx) => (
                        <div
                          key={idx}
                          className={`w-16 h-16 border rounded-lg p-2 bg-gray-50 flex items-center justify-center transition-all duration-300
                          ${
                            brand.theme === "DARK"
                              ? "grayscale hover:grayscale-0"
                              : ""
                          }
                          `}
                          title={logo.name}
                        >
                          <Image
                            src={logo.url}
                            alt={logo.name}
                            width={48}
                            height={48}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      ))}
                      {brand.logoUrl.length > 3 && (
                        <div className="w-16 h-16 border rounded-lg bg-gray-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            +{brand.logoUrl.length - 3}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingBrand(brand)}
                        className="flex-1 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteBrand(brand.id, brand.name)}
                        disabled={isDeleting === brand.id}
                        className="border-red-200 hover:bg-red-50"
                      >
                        {isDeleting === brand.id ? (
                          <Loader2 className="w-4 h-4 text-red-600 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Media Picker Dialog - MULTIPLE SELECTION */}
      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={handleMediaSelect}
        multiple={true} // Enable multiple selection
      />
    </div>
  );
}
