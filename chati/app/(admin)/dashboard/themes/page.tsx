"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ThemesLoading from "./loading";
import { MediaPicker } from "@/components/media-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Palette,
  Save,
  Loader2,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string | null;
  accentColor: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  typography: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ThemeEditor() {
  const { toast } = useToast();
  const router = useRouter();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [activeThemeId, setActiveThemeId] = useState<string | null>(null);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<
    "logo" | "favicon" | "create-logo" | "create-favicon" | null
  >(null);

  const [newTheme, setNewTheme] = useState({
    name: "",
    primaryColor: "#10B981",
    secondaryColor: "#059669",
    accentColor: "#34D399",
    logoUrl: "",
    faviconUrl: "",
    typography: "inter",
  });

  useEffect(() => {
    setMounted(true);
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch("/api/themes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch themes");
      }

      const result = await response.json();
      const themesData = result.data || [];
      setThemes(themesData);

      const defaultTheme = themesData.find((t: Theme) => t.isDefault);
      if (defaultTheme) {
        setActiveThemeId(defaultTheme.id);
        setEditingTheme(defaultTheme);
      }
    } catch (error) {
      console.error("Error fetching themes:", error);
      toast({
        title: "Error",
        description: "Failed to fetch themes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTheme = async () => {
    if (!newTheme.name || !newTheme.primaryColor) {
      toast({
        title: "Validation Error",
        description: "Theme name and primary color are required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const typographyJSON = JSON.stringify({
        heading: { fontFamily: newTheme.typography, weight: 700 },
        body: { fontFamily: newTheme.typography, weight: 400 },
      });

      const response = await fetch("/api/themes/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newTheme.name,
          primaryColor: newTheme.primaryColor,
          secondaryColor: newTheme.secondaryColor || null,
          accentColor: newTheme.accentColor || null,
          logoUrl: newTheme.logoUrl || null,
          faviconUrl: newTheme.faviconUrl || null,
          typography: typographyJSON,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create theme");
      }

      toast({
        title: "Success",
        description: "Theme created successfully and set as active",
      });

      setNewTheme({
        name: "",
        primaryColor: "#10B981",
        secondaryColor: "#059669",
        accentColor: "#34D399",
        logoUrl: "",
        faviconUrl: "",
        typography: "inter",
      });
      setShowCreateForm(false);
      fetchThemes();
    } catch (error: any) {
      console.error("Error creating theme:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create theme",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTheme = async () => {
    if (!editingTheme) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/themes/${editingTheme.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingTheme.name,
          primaryColor: editingTheme.primaryColor,
          secondaryColor: editingTheme.secondaryColor,
          accentColor: editingTheme.accentColor,
          logoUrl: editingTheme.logoUrl,
          faviconUrl: editingTheme.faviconUrl,
          typography: editingTheme.typography,
          isDefault: editingTheme.isDefault,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update theme");
      }

      toast({
        title: "Success",
        description: "Theme updated successfully",
      });

      if (editingTheme.isDefault) {
        document.documentElement.style.setProperty(
          "--primary",
          editingTheme.primaryColor
        );
        document.documentElement.style.setProperty(
          "--secondary",
          editingTheme.secondaryColor || ""
        );
        document.documentElement.style.setProperty(
          "--accent",
          editingTheme.accentColor || ""
        );
      }

      fetchThemes();
    } catch (error: any) {
      console.error("Error updating theme:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update theme",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setAsActive = async (themeId: string) => {
    setIsActivating(themeId);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/themes/${themeId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDefault: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to set theme as active");
      }

      toast({
        title: "Success",
        description: "Theme activated successfully",
      });

      fetchThemes();
    } catch (error) {
      console.error("Error activating theme:", error);
      toast({
        title: "Error",
        description: "Failed to activate theme",
        variant: "destructive",
      });
    } finally {
      setIsActivating(null);
    }
  };

  const deleteTheme = async (id: string) => {
    if (!confirm("Are you sure you want to delete this theme?")) return;

    setIsDeleting(id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/themes/${id}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete theme");
      }

      toast({
        title: "Success",
        description: "Theme deleted successfully",
      });

      fetchThemes();
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

  const currentFontFamily = (() => {
    try {
      if (editingTheme?.typography) {
        const parsed = JSON.parse(editingTheme.typography);
        return parsed.body?.fontFamily ?? "inter";
      }
      return "inter";
    } catch {
      return "inter";
    }
  })();

  const handleFontFamilyChange = (newFontFamily: string) => {
    if (!editingTheme) return;

    try {
      const parsed = editingTheme.typography
        ? JSON.parse(editingTheme.typography)
        : {
            heading: { fontFamily: "Inter", weight: 700 },
            body: { fontFamily: "Inter", weight: 400 },
          };
      parsed.heading.fontFamily = newFontFamily;
      parsed.body.fontFamily = newFontFamily;
      setEditingTheme({
        ...editingTheme,
        typography: JSON.stringify(parsed),
      });
    } catch {
      setEditingTheme({
        ...editingTheme,
        typography: JSON.stringify({
          heading: { fontFamily: newFontFamily, weight: 700 },
          body: { fontFamily: newFontFamily, weight: 400 },
        }),
      });
    }
  };

  const handleMediaSelect = (url: string, alt?: string) => {
    if (mediaPickerTarget === "logo" && editingTheme) {
      setEditingTheme({
        ...editingTheme,
        logoUrl: url,
      });
    } else if (mediaPickerTarget === "favicon" && editingTheme) {
      setEditingTheme({
        ...editingTheme,
        faviconUrl: url,
      });
    } else if (mediaPickerTarget === "create-logo") {
      setNewTheme({
        ...newTheme,
        logoUrl: url,
      });
    } else if (mediaPickerTarget === "create-favicon") {
      setNewTheme({
        ...newTheme,
        faviconUrl: url,
      });
    }
    setMediaPickerOpen(false);
    setMediaPickerTarget(null);
  };

  const openMediaPicker = (
    target: "logo" | "favicon" | "create-logo" | "create-favicon"
  ) => {
    setMediaPickerTarget(target);
    setMediaPickerOpen(true);
  };

  if (loading) {
    return <ThemesLoading />;
  }

  return (
    <div
      className={`p-6 lg:p-8 pb-12 max-w-6xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Theme Settings 🎨
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage your site's appearance and branding
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showCreateForm ? "Cancel" : "Create New Theme"}
        </Button>
      </div>

      {/* Create Theme Form */}
      {showCreateForm && (
        <Card className="border-gray-200 shadow-lg mb-8 animate-in slide-in-from-top duration-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              Create New Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <Label htmlFor="theme-name" className="text-gray-700 font-medium">
                Theme Name
              </Label>
              <Input
                id="theme-name"
                value={newTheme.name}
                onChange={(e) =>
                  setNewTheme({ ...newTheme, name: e.target.value })
                }
                placeholder="My Awesome Theme"
                className="mt-2 focus:border-green-500 focus:ring-green-500/20"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-700 font-medium">
                  Primary Color
                </Label>
                <div className="flex gap-3 mt-2">
                  <input
                    type="color"
                    value={newTheme.primaryColor}
                    onChange={(e) =>
                      setNewTheme({ ...newTheme, primaryColor: e.target.value })
                    }
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-green-500 transition-colors"
                  />
                  <Input
                    value={newTheme.primaryColor}
                    onChange={(e) =>
                      setNewTheme({ ...newTheme, primaryColor: e.target.value })
                    }
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-700 font-medium">
                  Secondary Color
                </Label>
                <div className="flex gap-3 mt-2">
                  <input
                    type="color"
                    value={newTheme.secondaryColor}
                    onChange={(e) =>
                      setNewTheme({
                        ...newTheme,
                        secondaryColor: e.target.value,
                      })
                    }
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-green-500 transition-colors"
                  />
                  <Input
                    value={newTheme.secondaryColor}
                    onChange={(e) =>
                      setNewTheme({
                        ...newTheme,
                        secondaryColor: e.target.value,
                      })
                    }
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-700 font-medium">
                  Accent Color
                </Label>
                <div className="flex gap-3 mt-2">
                  <input
                    type="color"
                    value={newTheme.accentColor}
                    onChange={(e) =>
                      setNewTheme({ ...newTheme, accentColor: e.target.value })
                    }
                    className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-green-500 transition-colors"
                  />
                  <Input
                    value={newTheme.accentColor}
                    onChange={(e) =>
                      setNewTheme({ ...newTheme, accentColor: e.target.value })
                    }
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Color Preview */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Color Preview
              </p>
              <div className="flex gap-4">
                <div
                  className="flex-1 h-24 rounded-lg shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: newTheme.primaryColor }}
                />
                <div
                  className="flex-1 h-24 rounded-lg shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: newTheme.secondaryColor }}
                />
                <div
                  className="flex-1 h-24 rounded-lg shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: newTheme.accentColor }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="logo-url" className="text-gray-700 font-medium">
                  Logo URL (Optional)
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="logo-url"
                    value={newTheme.logoUrl}
                    onChange={(e) =>
                      setNewTheme({ ...newTheme, logoUrl: e.target.value })
                    }
                    placeholder="https://example.com/logo.png"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openMediaPicker("create-logo")}
                    className="border-green-200 hover:bg-green-50"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
                {newTheme.logoUrl && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border inline-block">
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                      Preview:
                    </p>
                    <Image
                      src={newTheme.logoUrl}
                      alt="Logo"
                      className="h-12 object-contain"
                      width={150}
                      height={48}
                    />
                  </div>
                )}
              </div>
              <div>
                <Label
                  htmlFor="favicon-url"
                  className="text-gray-700 font-medium"
                >
                  Favicon URL (Optional)
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="favicon-url"
                    value={newTheme.faviconUrl}
                    onChange={(e) =>
                      setNewTheme({ ...newTheme, faviconUrl: e.target.value })
                    }
                    placeholder="https://example.com/favicon.ico"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openMediaPicker("create-favicon")}
                    className="border-green-200 hover:bg-green-50"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
                {newTheme.faviconUrl && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border inline-block">
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                      Preview:
                    </p>
                    <Image
                      src={newTheme.faviconUrl}
                      alt="Favicon"
                      className="h-8 w-8 object-contain"
                      width={32}
                      height={32}
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label
                htmlFor="font-family"
                className="text-gray-700 font-medium"
              >
                Font Family
              </Label>
              <Select
                value={newTheme.typography}
                onValueChange={(value) =>
                  setNewTheme({ ...newTheme, typography: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter (Modern & Clean)</SelectItem>
                  <SelectItem value="roboto">Roboto (Classic)</SelectItem>
                  <SelectItem value="open-sans">
                    Open Sans (Readable)
                  </SelectItem>
                  <SelectItem value="lato">Lato (Friendly)</SelectItem>
                  <SelectItem value="montserrat">Montserrat (Bold)</SelectItem>
                  <SelectItem value="poppins">Poppins (Geometric)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={createTheme}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:scale-105 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Theme
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Themes List */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {themes.map((theme, index) => (
          <Card
            key={theme.id}
            className={`relative overflow-hidden border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] ${
              theme.isDefault ? "ring-2 ring-green-500" : ""
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {theme.isDefault && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16" />
            )}
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {theme.name}
                  </h3>
                  {theme.isDefault && (
                    <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mt-2 font-medium">
                      <Check className="w-3 h-3" />
                      Active Theme
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {!theme.isDefault && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setAsActive(theme.id)}
                      disabled={isActivating === theme.id}
                      className="border-green-200 hover:bg-green-50 hover:text-green-700 transition-all"
                    >
                      {isActivating === theme.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Activate"
                      )}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingTheme(theme)}
                    className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all"
                  >
                    Edit
                  </Button>
                  {!theme.isDefault && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteTheme(theme.id)}
                      disabled={isDeleting === theme.id}
                      className="border-red-200 hover:bg-red-50 transition-all"
                    >
                      {isDeleting === theme.id ? (
                        <Loader2 className="w-4 h-4 text-red-600 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-red-600" />
                      )}
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div
                  className="flex-1 h-16 rounded-lg shadow-md transition-transform hover:scale-105"
                  style={{ backgroundColor: theme.primaryColor }}
                  title="Primary"
                />
                <div
                  className="flex-1 h-16 rounded-lg shadow-md transition-transform hover:scale-105"
                  style={{ backgroundColor: theme.secondaryColor || "#ccc" }}
                  title="Secondary"
                />
                <div
                  className="flex-1 h-16 rounded-lg shadow-md transition-transform hover:scale-105"
                  style={{ backgroundColor: theme.accentColor || "#ccc" }}
                  title="Accent"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Theme Section */}
      {editingTheme && (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
          <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Palette className="w-5 h-5 text-blue-600" />
                Editing: {editingTheme.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label
                    htmlFor="primary_color"
                    className="text-gray-700 font-medium"
                  >
                    Primary Color
                  </Label>
                  <div className="flex gap-3 mt-2">
                    <input
                      type="color"
                      id="primary_color"
                      value={editingTheme.primaryColor}
                      onChange={(e) =>
                        setEditingTheme({
                          ...editingTheme,
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-colors"
                    />
                    <div className="flex-1">
                      <Input
                        value={editingTheme.primaryColor}
                        onChange={(e) =>
                          setEditingTheme({
                            ...editingTheme,
                            primaryColor: e.target.value,
                          })
                        }
                        className="font-mono"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Main brand color
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="secondary_color"
                    className="text-gray-700 font-medium"
                  >
                    Secondary Color
                  </Label>
                  <div className="flex gap-3 mt-2">
                    <input
                      type="color"
                      id="secondary_color"
                      value={editingTheme.secondaryColor || "#000000"}
                      onChange={(e) =>
                        setEditingTheme({
                          ...editingTheme,
                          secondaryColor: e.target.value,
                        })
                      }
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-colors"
                    />
                    <div className="flex-1">
                      <Input
                        value={editingTheme.secondaryColor || ""}
                        onChange={(e) =>
                          setEditingTheme({
                            ...editingTheme,
                            secondaryColor: e.target.value,
                          })
                        }
                        className="font-mono"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Supporting color
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="accent_color"
                    className="text-gray-700 font-medium"
                  >
                    Accent Color
                  </Label>
                  <div className="flex gap-3 mt-2">
                    <input
                      type="color"
                      id="accent_color"
                      value={editingTheme.accentColor || "#000000"}
                      onChange={(e) =>
                        setEditingTheme({
                          ...editingTheme,
                          accentColor: e.target.value,
                        })
                      }
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-colors"
                    />
                    <div className="flex-1">
                      <Input
                        value={editingTheme.accentColor || ""}
                        onChange={(e) =>
                          setEditingTheme({
                            ...editingTheme,
                            accentColor: e.target.value,
                          })
                        }
                        className="font-mono"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Highlight color
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Color Preview
                </p>
                <div className="flex gap-4">
                  <div
                    className="flex-1 h-20 rounded-lg shadow-md transition-transform hover:scale-105"
                    style={{ backgroundColor: editingTheme.primaryColor }}
                  />
                  <div
                    className="flex-1 h-20 rounded-lg shadow-md transition-transform hover:scale-105"
                    style={{
                      backgroundColor: editingTheme.secondaryColor || "#ccc",
                    }}
                  />
                  <div
                    className="flex-1 h-20 rounded-lg shadow-md transition-transform hover:scale-105"
                    style={{
                      backgroundColor: editingTheme.accentColor || "#ccc",
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                Brand Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <Label htmlFor="logo_url" className="text-gray-700 font-medium">
                  Logo URL
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="logo_url"
                    value={editingTheme.logoUrl || ""}
                    onChange={(e) =>
                      setEditingTheme({
                        ...editingTheme,
                        logoUrl: e.target.value,
                      })
                    }
                    placeholder="https://example.com/logo.png"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openMediaPicker("logo")}
                    className="border-purple-200 hover:bg-purple-50"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
                {editingTheme.logoUrl && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border inline-block">
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                      Logo Preview:
                    </p>
                    <Image
                      src={editingTheme.logoUrl}
                      alt="Logo"
                      className="h-12 object-contain"
                      width={150}
                      height={48}
                    />
                  </div>
                )}
              </div>

              <div>
                <Label
                  htmlFor="favicon_url"
                  className="text-gray-700 font-medium"
                >
                  Favicon URL
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="favicon_url"
                    value={editingTheme.faviconUrl || ""}
                    onChange={(e) =>
                      setEditingTheme({
                        ...editingTheme,
                        faviconUrl: e.target.value,
                      })
                    }
                    placeholder="/chati-ai-icon-filled-256.webp"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openMediaPicker("favicon")}
                    className="border-purple-200 hover:bg-purple-50"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
                {editingTheme.faviconUrl && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border inline-block">
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                      Favicon Preview:
                    </p>
                    <Image
                      src={editingTheme.faviconUrl}
                      alt="Favicon"
                      className="h-8 w-8 object-contain"
                      width={32}
                      height={32}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">Aa</span>
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Label htmlFor="typography" className="text-gray-700 font-medium">
                Font Family
              </Label>
              <Select
                value={currentFontFamily}
                onValueChange={(value) => handleFontFamilyChange(value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter (Modern & Clean)</SelectItem>
                  <SelectItem value="Poppins">Poppins (Geometric)</SelectItem>
                  <SelectItem value="Roboto">Roboto (Classic)</SelectItem>
                  <SelectItem value="Lato">Lato (Friendly)</SelectItem>
                  <SelectItem value="Montserrat">Montserrat (Bold)</SelectItem>
                  <SelectItem value="Open Sans">
                    Open Sans (Readable)
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Button
            onClick={updateTheme}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:scale-[1.02] h-12"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Theme
              </>
            )}
          </Button>
        </div>
      )}

      {/* Media Picker Dialog */}
      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={handleMediaSelect}
      />
    </div>
  );
}
