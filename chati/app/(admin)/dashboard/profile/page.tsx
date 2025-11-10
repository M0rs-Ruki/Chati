"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Shield, Key, Save, Loader2 } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  name: string
  role: "ADMIN" | "EDITOR"
  status: "ACTIVE" | "DISABLED"
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
  })

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }
      const data = await response.json()
      setProfile(data.user)
      setProfileForm({
        name: data.user.name,
        email: data.user.email,
      })
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    if (!profile) return

    if (!profileForm.name || !profileForm.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required",
        variant: "destructive",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(profileForm.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`/api/user/${profile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile")
      }

      // Refresh profile
      await fetchProfile()

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleChangePassword = async () => {
    if (!profile) return

    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "All password fields are required",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    // Check for password strength
    const hasUpperCase = /[A-Z]/.test(passwordForm.newPassword)
    const hasLowerCase = /[a-z]/.test(passwordForm.newPassword)
    const hasNumber = /[0-9]/.test(passwordForm.newPassword)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.newPassword)

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      toast({
        title: "Validation Error",
        description:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`/api/user/${profile.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password")
      }

      // Clear password form
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Success",
        description: "Password changed successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-8 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-500" />
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="pt-8 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-8 px-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">My Profile</h2>
        <p className="text-lg text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Profile Information Card */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                <User className="h-6 w-6 text-green-600" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Update your personal information and email address
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={`${
                  profile.role === "ADMIN"
                    ? "bg-purple-100 text-purple-700 border-purple-200"
                    : "bg-blue-100 text-blue-700 border-blue-200"
                } border`}
              >
                <Shield className="h-3 w-3 mr-1" />
                {profile.role}
              </Badge>
              <Badge
                className={`${
                  profile.status === "ACTIVE"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                } border`}
              >
                {profile.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                placeholder="John Doe"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                placeholder="john@example.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleUpdateProfile}
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-105"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Account ID:</strong> {profile.id}
            </p>
            <p>
              <strong>Created:</strong> {new Date(profile.createdAt).toLocaleDateString()} at{" "}
              {new Date(profile.createdAt).toLocaleTimeString()}
            </p>
            <p>
              <strong>Last Updated:</strong> {new Date(profile.updatedAt).toLocaleDateString()} at{" "}
              {new Date(profile.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Card */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
            <Key className="h-6 w-6 text-green-600" />
            Change Password
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="old-password" className="text-gray-700">
              Current Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="old-password"
              type="password"
              value={passwordForm.oldPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-gray-700">
              New Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-500">
              Must be at least 8 characters with uppercase, lowercase, number, and special character
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-gray-700">
              Confirm New Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <Button
              onClick={handleChangePassword}
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-105"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
