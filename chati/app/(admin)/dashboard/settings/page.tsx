"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    logoUrl: "",
    faviconUrl: "",
    typography: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      // Demo data - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 600))
      setFormData({
        siteName: "Chati CMS",
        siteDescription: "A powerful content management system for your business",
        contactEmail: "admin@chati.com",
        logoUrl: "https://example.com/logo.png",
        faviconUrl: "https://example.com/favicon.ico",
        typography: "Inter",
      })
    } catch (error) {
      console.error("Error fetching settings:", error)
      toast({
        title: "Error",
        description: "Failed to fetch settings",
        variant: "destructive",
      })
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Demo - replace with actual API call
      // const response = await fetch('/api/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Settings saved successfully!",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
          <p className="mt-2 text-gray-600">Configure your website settings</p>
        </div>
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="mt-2 text-gray-600">Configure your website settings and branding</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings Card */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-gray-900">General Settings</CardTitle>
            <CardDescription className="text-gray-600">Basic information about your website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="siteName" className="text-gray-900 font-medium">
                Site Name *
              </Label>
              <Input
                id="siteName"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                placeholder="Enter your site name"
                className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="siteDescription" className="text-gray-900 font-medium">
                Site Description
              </Label>
              <Textarea
                id="siteDescription"
                value={formData.siteDescription}
                onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                placeholder="Enter a brief description of your website"
                rows={3}
                className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contactEmail" className="text-gray-900 font-medium">
                Contact Email *
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="admin@example.com"
                className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-gray-900">Branding</CardTitle>
            <CardDescription className="text-gray-600">Customize your website's visual identity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="logoUrl" className="text-gray-900 font-medium">
                Logo URL
              </Label>
              <Input
                id="logoUrl"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                placeholder="https://example.com/logo.png"
                className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500">Enter the URL of your website logo image</p>
              {formData.logoUrl && (
                <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={formData.logoUrl || "/placeholder.svg"}
                    alt="Logo preview"
                    className="h-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/abstract-logo.png"
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="faviconUrl" className="text-gray-900 font-medium">
                Favicon URL
              </Label>
              <Input
                id="faviconUrl"
                value={formData.faviconUrl}
                onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                placeholder="https://example.com/favicon.ico"
                className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500">Enter the URL of your website favicon (appears in browser tabs)</p>
              {formData.faviconUrl && (
                <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={formData.faviconUrl || "/placeholder.svg"}
                    alt="Favicon preview"
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/website-favicon.png"
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="typography" className="text-gray-900 font-medium">
                Typography
              </Label>
              <Input
                id="typography"
                value={formData.typography}
                onChange={(e) => setFormData({ ...formData, typography: e.target.value })}
                placeholder="Inter, Roboto, Poppins, Arial"
                className="bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500">Enter the font family for your website (e.g., Inter, Roboto)</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={fetchSettings}
            className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
