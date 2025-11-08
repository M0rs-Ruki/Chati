"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ThemeData {
  id?: string
  name: string
  primary_color: string
  secondary_color: string
  accent_color: string
  logo_url: string
  favicon_url: string
  typography: string
  is_default: boolean
}

export default function ThemeEditor() {
  const { toast } = useToast()
  const [themeData, setThemeData] = useState<ThemeData>({
    name: "Chati Theme",
    primary_color: "#00D856",
    secondary_color: "#0A2540",
    accent_color: "#7C3AED",
    logo_url: "",
    favicon_url: "",
    typography: "inter",
    is_default: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTheme()
  }, [])

  const fetchTheme = async () => {
    try {
      // Demo data - replace with actual API call
      // const response = await fetch('/api/themes')
      // const themes = await response.json()
      // const defaultTheme = themes.find(t => t.is_default)

      await new Promise((resolve) => setTimeout(resolve, 600))

      // Load from localStorage if exists
      const savedTheme = localStorage.getItem("siteTheme")
      if (savedTheme) {
        setThemeData(JSON.parse(savedTheme))
      }
    } catch (error) {
      console.error("Error fetching theme:", error)
      toast({
        title: "Error",
        description: "Failed to fetch theme",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveTheme = async () => {
    setIsSaving(true)
    try {
      // Demo - replace with actual API call
      // if (themeData.id) {
      //   await fetch(`/api/themes/${themeData.id}`, {
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(themeData),
      //   })
      // } else {
      //   await fetch('/api/themes/create', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(themeData),
      //   })
      // }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage
      localStorage.setItem("siteTheme", JSON.stringify(themeData))

      // Apply theme colors to CSS variables
      document.documentElement.style.setProperty("--primary", themeData.primary_color)
      document.documentElement.style.setProperty("--secondary", themeData.secondary_color)
      document.documentElement.style.setProperty("--accent", themeData.accent_color)

      toast({
        title: "Success",
        description: "Theme saved successfully",
      })
    } catch (error) {
      console.error("Error saving theme:", error)
      toast({
        title: "Error",
        description: "Failed to save theme",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Theme Settings</h1>
          <p className="text-gray-600 mt-1">Customize your site's appearance</p>
        </div>
        <Button
          onClick={saveTheme}
          disabled={isSaving}
          className="bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all"
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

      <div className="space-y-6">
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Palette className="w-5 h-5 text-green-500" />
              Brand Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="primary_color" className="text-gray-900">
                  Primary Color
                </Label>
                <div className="flex gap-3 mt-2">
                  <input
                    type="color"
                    id="primary_color"
                    value={themeData.primary_color}
                    onChange={(e) => setThemeData({ ...themeData, primary_color: e.target.value })}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  />
                  <div className="flex-1">
                    <Input
                      value={themeData.primary_color}
                      onChange={(e) => setThemeData({ ...themeData, primary_color: e.target.value })}
                      placeholder="#00D856"
                      className="bg-white border-gray-200 text-gray-900 font-mono"
                    />
                    <p className="text-xs text-gray-500 mt-1">Main brand color</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="secondary_color" className="text-gray-900">
                  Secondary Color
                </Label>
                <div className="flex gap-3 mt-2">
                  <input
                    type="color"
                    id="secondary_color"
                    value={themeData.secondary_color}
                    onChange={(e) => setThemeData({ ...themeData, secondary_color: e.target.value })}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  />
                  <div className="flex-1">
                    <Input
                      value={themeData.secondary_color}
                      onChange={(e) => setThemeData({ ...themeData, secondary_color: e.target.value })}
                      placeholder="#0A2540"
                      className="bg-white border-gray-200 text-gray-900 font-mono"
                    />
                    <p className="text-xs text-gray-500 mt-1">Supporting color</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="accent_color" className="text-gray-900">
                  Accent Color
                </Label>
                <div className="flex gap-3 mt-2">
                  <input
                    type="color"
                    id="accent_color"
                    value={themeData.accent_color}
                    onChange={(e) => setThemeData({ ...themeData, accent_color: e.target.value })}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  />
                  <div className="flex-1">
                    <Input
                      value={themeData.accent_color}
                      onChange={(e) => setThemeData({ ...themeData, accent_color: e.target.value })}
                      placeholder="#7C3AED"
                      className="bg-white border-gray-200 text-gray-900 font-mono"
                    />
                    <p className="text-xs text-gray-500 mt-1">Highlight color</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-4">Color Preview</p>
              <div className="flex gap-4">
                <div
                  className="flex-1 h-20 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  style={{ backgroundColor: themeData.primary_color }}
                  title="Primary Color"
                />
                <div
                  className="flex-1 h-20 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  style={{ backgroundColor: themeData.secondary_color }}
                  title="Secondary Color"
                />
                <div
                  className="flex-1 h-20 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  style={{ backgroundColor: themeData.accent_color }}
                  title="Accent Color"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-gray-900">Brand Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logo_url" className="text-gray-900">
                Logo URL
              </Label>
              <Input
                id="logo_url"
                value={themeData.logo_url}
                onChange={(e) => setThemeData({ ...themeData, logo_url: e.target.value })}
                placeholder="https://example.com/logo.png"
                className="mt-2 bg-white border-gray-200 text-gray-900"
              />
              {themeData.logo_url && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Logo Preview:</p>
                  <img src={themeData.logo_url || "/placeholder.svg"} alt="Logo" className="h-12 object-contain" />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="favicon_url" className="text-gray-900">
                Favicon URL
              </Label>
              <Input
                id="favicon_url"
                value={themeData.favicon_url}
                onChange={(e) => setThemeData({ ...themeData, favicon_url: e.target.value })}
                placeholder="https://example.com/favicon.ico"
                className="mt-2 bg-white border-gray-200 text-gray-900"
              />
              {themeData.favicon_url && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Favicon Preview:</p>
                  <img
                    src={themeData.favicon_url || "/placeholder.svg"}
                    alt="Favicon"
                    className="h-8 w-8 object-contain"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-gray-900">Typography</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="typography" className="text-gray-900">
                Font Family
              </Label>
              <Select
                value={themeData.typography}
                onValueChange={(value) => setThemeData({ ...themeData, typography: value })}
              >
                <SelectTrigger className="mt-2 bg-white border-gray-200 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="inter">Inter (Modern & Clean)</SelectItem>
                  <SelectItem value="poppins">Poppins (Geometric)</SelectItem>
                  <SelectItem value="roboto">Roboto (Classic)</SelectItem>
                  <SelectItem value="lato">Lato (Friendly)</SelectItem>
                  <SelectItem value="montserrat">Montserrat (Bold)</SelectItem>
                  <SelectItem value="opensans">Open Sans (Readable)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-2">Choose the primary font for your website</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
