"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Shield,
  Key,
  Save,
  Loader2,
  Calendar,
  Clock,
  CheckCircle,
  Lock,
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR";
  status: "ACTIVE" | "DISABLED";
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setMounted(true);
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      setProfile(data.user);
      setProfileForm({
        name: data.user.name,
        email: data.user.email,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;

    if (!profileForm.name || !profileForm.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileForm.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/user/${profile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      await fetchProfile();

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async () => {
    if (!profile) return;

    if (
      !passwordForm.oldPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      toast({
        title: "Validation Error",
        description: "All password fields are required",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    const hasUpperCase = /[A-Z]/.test(passwordForm.newPassword);
    const hasLowerCase = /[a-z]/.test(passwordForm.newPassword);
    const hasNumber = /[0-9]/.test(passwordForm.newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
      passwordForm.newPassword
    );

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      toast({
        title: "Validation Error",
        description:
          "Password must contain uppercase, lowercase, number, and special character",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/user/${profile.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast({
        title: "Success",
        description: "Password changed successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-8 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-green-600" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="pt-8 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pt-8 px-6 pb-12 space-y-8 max-w-4xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          My Profile ⚙️
        </h2>
        <p className="text-lg text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Information Card */}
      <Card className="relative overflow-hidden bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-xl">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                Profile Information
              </CardTitle>
              <CardDescription className="text-gray-600">
                Update your personal information and email address
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-purple-300 shadow-sm">
                <Shield className="h-3 w-3 mr-1" />
                {profile.role}
              </Badge>
              <Badge
                className={`${
                  profile.status === "ACTIVE"
                    ? "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300"
                    : "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-300"
                } shadow-sm`}
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {profile.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-gray-700 font-medium flex items-center gap-2"
            >
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
              <Input
                id="name"
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, name: e.target.value })
                }
                placeholder="John Doe"
                className="pl-10 focus:border-green-500 focus:ring-green-500/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-gray-700 font-medium flex items-center gap-2"
            >
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
              <Input
                id="email"
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, email: e.target.value })
                }
                placeholder="john@example.com"
                className="pl-10 focus:border-green-500 focus:ring-green-500/20 transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleUpdateProfile}
              disabled={submitting}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:scale-105"
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

          <Separator className="my-6" />

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <User className="h-4 w-4" />
                <span className="text-xs font-medium">Account ID</span>
              </div>
              <p className="text-sm font-mono text-gray-900 truncate">
                {profile.id}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-medium">Created</span>
              </div>
              <p className="text-sm text-gray-900">
                {new Date(profile.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">Last Updated</span>
              </div>
              <p className="text-sm text-gray-900">
                {new Date(profile.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Card */}
      <Card className="relative overflow-hidden bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            Change Password
          </CardTitle>
          <CardDescription className="text-gray-600">
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="space-y-2">
            <Label
              htmlFor="old-password"
              className="text-gray-700 font-medium flex items-center gap-2"
            >
              Current Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                id="old-password"
                type="password"
                value={passwordForm.oldPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    oldPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
                className="pl-10 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="new-password"
              className="text-gray-700 font-medium flex items-center gap-2"
            >
              New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                id="new-password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
                className="pl-10 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Must be 8+ characters with uppercase, lowercase, number, and
              special character
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirm-password"
              className="text-gray-700 font-medium flex items-center gap-2"
            >
              Confirm New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                id="confirm-password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
                className="pl-10 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleChangePassword}
              disabled={submitting}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-600/25 transition-all duration-300 hover:scale-105"
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
  );
}
