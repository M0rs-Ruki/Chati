"use client";

import { useState, useEffect } from "react";
import { Palette, Save } from "lucide-react";

interface Theme {
  id?: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  logoUrl?: string;
  faviconUrl?: string;
  typography?: string;
  isDefault: boolean;
}

export default function ThemePage() {
  const [theme, setTheme] = useState<Theme>({
    name: "Chati Theme",
    primaryColor: "#10B981",
    secondaryColor: "#059669",
    accentColor: "#34D399",
    logoUrl: "",
    faviconUrl: "",
    typography: "Inter",
    isDefault: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    try {
      const response = await fetch("/api/theme", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.theme) {
          setTheme(data.theme);
        }
      }
    } catch (error) {
      console.error("Failed to fetch theme:", error);
    }
  };

  const saveTheme = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const method = theme.id ? "PUT" : "POST";
      const response = await fetch("/api/theme", {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(theme),
      });

      if (response.ok) {
        setSaveSuccess(true);
        fetchTheme();
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save theme:", error);
      alert("Error saving theme. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Theme Settings</h1>
          <p className="text-gray-600 mt-1">Customize your site's appearance</p>
        </div>
        <button
          onClick={saveTheme}
          disabled={isSaving}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 font-semibold"
        >
          <Save size={20} />
          {isSaving ? "Saving..." : "Save Theme"}
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          ✓ Theme saved successfully!
        </div>
      )}

      {/* Brand Colors */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Palette size={24} />
          Brand Colors
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) =>
                  setTheme({ ...theme, primaryColor: e.target.value })
                }
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    setTheme({ ...theme, primaryColor: e.target.value })
                  }
                  placeholder="#10B981"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Main brand color</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) =>
                  setTheme({ ...theme, secondaryColor: e.target.value })
                }
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) =>
                    setTheme({ ...theme, secondaryColor: e.target.value })
                  }
                  placeholder="#059669"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Supporting color</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accent Color
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={theme.accentColor || "#34D399"}
                onChange={(e) =>
                  setTheme({ ...theme, accentColor: e.target.value })
                }
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={theme.accentColor || ""}
                  onChange={(e) =>
                    setTheme({ ...theme, accentColor: e.target.value })
                  }
                  placeholder="#34D399"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Highlight color</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-4">
            Color Preview
          </p>
          <div className="flex gap-4">
            <div
              className="flex-1 h-20 rounded-lg shadow-md"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <div
              className="flex-1 h-20 rounded-lg shadow-md"
              style={{ backgroundColor: theme.secondaryColor }}
            />
            <div
              className="flex-1 h-20 rounded-lg shadow-md"
              style={{ backgroundColor: theme.accentColor }}
            />
          </div>
        </div>
      </div>

      {/* Brand Assets */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Brand Assets</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              type="text"
              value={theme.logoUrl || ""}
              onChange={(e) => setTheme({ ...theme, logoUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {theme.logoUrl && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <img src={theme.logoUrl} alt="Logo" className="h-12" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon URL
            </label>
            <input
              type="text"
              value={theme.faviconUrl || ""}
              onChange={(e) =>
                setTheme({ ...theme, faviconUrl: e.target.value })
              }
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {theme.faviconUrl && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <img src={theme.faviconUrl} alt="Favicon" className="h-8 w-8" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Typography</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <select
            value={theme.typography || "Inter"}
            onChange={(e) => setTheme({ ...theme, typography: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="Inter">Inter (Modern & Clean)</option>
            <option value="Poppins">Poppins (Geometric)</option>
            <option value="Roboto">Roboto (Classic)</option>
            <option value="Lato">Lato (Friendly)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
