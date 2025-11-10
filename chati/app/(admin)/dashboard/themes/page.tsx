"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette, Save, Loader2, Plus, Trash2, Check } from "lucide-react";
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
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New theme form data
  const [newTheme, setNewTheme] = useState({
    name: "",
    primaryColor: "#00D856",
    secondaryColor: "#0A2540",
    accentColor: "#7C3AED",
    logoUrl: "",
    faviconUrl: "",
    typography: "inter",
  });

  useEffect(() => {
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

      // Find and set the active (default) theme
      const defaultTheme = themesData.find((t: Theme) => t.isDefault);
      if (defaultTheme) {
        setActiveTheme(defaultTheme);
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

    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      // Convert typography string to JSON format
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

      const result = await response.json();

      toast({
        title: "Success",
        description: "Theme created successfully and set as active",
      });

      // Reset form and refresh themes
      setNewTheme({
        name: "",
        primaryColor: "#00D856",
        secondaryColor: "#0A2540",
        accentColor: "#7C3AED",
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
      setIsSaving(false);
    }
  };

  const updateTheme = async () => {
    if (!editingTheme) return;

    setIsSaving(true);
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

      // Apply theme to CSS if it's active
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
      setIsSaving(false);
    }
  };

  const setAsActive = async (themeId: string) => {
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
    }
  };

  const deleteTheme = async (themeId: string) => {
    if (!confirm("Are you sure you want to delete this theme?")) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(`/api/themes/${themeId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete theme");
      }

      toast({
        title: "Success",
        description: "Theme deleted successfully",
      });

      fetchThemes();
    } catch (error: any) {
      console.error("Error deleting theme:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete theme",
        variant: "destructive",
      });
    }
  };

  // Extract current font family from the JSON string to use as Select value
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

  // Change handler: update typography JSON string in editingTheme
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
      // fallback simple stringify
      setEditingTheme({
        ...editingTheme,
        typography: JSON.stringify({
          heading: { fontFamily: newFontFamily, weight: 700 },
          body: { fontFamily: newFontFamily, weight: 400 },
        }),
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Theme Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your site's appearance and branding
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Theme
        </Button>
      </div>

      {/* Create Theme Form */}
      {showCreateForm && (
        <Card className="border-gray-200 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900">Create New Theme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme-name">Theme Name</Label>
              <Input
                id="theme-name"
                value={newTheme.name}
                onChange={(e) =>
                  setNewTheme({ ...newTheme, name: e.target.value })
                }
                placeholder="My Custom Theme"
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Primary Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={newTheme.primaryColor}
                    onChange={(e) =>
                      setNewTheme({ ...newTheme, primaryColor: e.target.value })
                    }
                    className="w-16 h-10 rounded cursor-pointer"
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
                <Label>Secondary Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={newTheme.secondaryColor}
                    onChange={(e) =>
                      setNewTheme({
                        ...newTheme,
                        secondaryColor: e.target.value,
                      })
                    }
                    className="w-16 h-10 rounded cursor-pointer"
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
                <Label>Accent Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={newTheme.accentColor}
                    onChange={(e) =>
                      setNewTheme({ ...newTheme, accentColor: e.target.value })
                    }
                    className="w-16 h-10 rounded cursor-pointer"
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

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="logo-url">Logo URL (Optional)</Label>
                <Input
                  id="logo-url"
                  value={newTheme.logoUrl}
                  onChange={(e) =>
                    setNewTheme({ ...newTheme, logoUrl: e.target.value })
                  }
                  placeholder="https://example.com/logo.png"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="favicon-url">Favicon URL (Optional)</Label>
                <Input
                  id="favicon-url"
                  value={newTheme.faviconUrl}
                  onChange={(e) =>
                    setNewTheme({ ...newTheme, faviconUrl: e.target.value })
                  }
                  placeholder="https://example.com/favicon.ico"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="font-family">Font Family</Label>
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
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="open-sans">Open Sans</SelectItem>
                  <SelectItem value="lato">Lato</SelectItem>
                  <SelectItem value="montserrat">Montserrat</SelectItem>
                  <SelectItem value="poppins">Poppins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={createTheme}
                disabled={isSaving}
                className="bg-green-500 hover:bg-green-600"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Create Theme
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Themes List */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`border-gray-200 shadow-sm hover:shadow-md transition-shadow ${
              theme.isDefault ? "ring-2 ring-green-500" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {theme.name}
                  </h3>
                  {theme.isDefault && (
                    <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded mt-1">
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
                    >
                      Set Active
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingTheme(theme)}
                    className="border-green-200 hover:bg-green-50"
                  >
                    Edit
                  </Button>
                  {!theme.isDefault && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteTheme(theme.id)}
                      className="border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div
                  className="flex-1 h-12 rounded"
                  style={{ backgroundColor: theme.primaryColor }}
                  title="Primary"
                />
                <div
                  className="flex-1 h-12 rounded"
                  style={{ backgroundColor: theme.secondaryColor || "#ccc" }}
                  title="Secondary"
                />
                <div
                  className="flex-1 h-12 rounded"
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
        <div className="space-y-6">
          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Palette className="w-5 h-5 text-green-500" />
                Editing: {editingTheme.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="primary_color">Primary Color</Label>
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
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
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
                  <Label htmlFor="secondary_color">Secondary Color</Label>
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
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
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
                  <Label htmlFor="accent_color">Accent Color</Label>
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
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
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

              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Color Preview
                </p>
                <div className="flex gap-4">
                  <div
                    className="flex-1 h-20 rounded-lg shadow-md"
                    style={{ backgroundColor: editingTheme.primaryColor }}
                  />
                  <div
                    className="flex-1 h-20 rounded-lg shadow-md"
                    style={{
                      backgroundColor: editingTheme.secondaryColor || "#ccc",
                    }}
                  />
                  <div
                    className="flex-1 h-20 rounded-lg shadow-md"
                    style={{
                      backgroundColor: editingTheme.accentColor || "#ccc",
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Brand Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logo_url">Logo URL</Label>
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
                  className="mt-2"
                />
                {editingTheme.logoUrl && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border inline-block">
                    <p className="text-xs text-gray-600 mb-2">Logo Preview:</p>
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
                <Label htmlFor="favicon_url">Favicon URL</Label>
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
                  className="mt-2"
                />
                {editingTheme.faviconUrl && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border inline-block">
                    <p className="text-xs text-gray-600 mb-2">
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

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="typography">Font Family</Label>
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
            disabled={isSaving}
            className="w-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Theme
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
