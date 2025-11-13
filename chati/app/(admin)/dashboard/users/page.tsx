"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Key,
  AlertCircle,
  Users2,
  Loader2,
  Shield,
  UserCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR";
  status: "ACTIVE" | "DISABLED";
  createdAt: string;
  updatedAt: string;
  _count?: {
    blogPosts: number;
    documentations: number;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState<
    "ADMIN" | "EDITOR" | null
  >(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR" as const,
    status: "ACTIVE" as const,
  });

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "EDITOR" as "ADMIN" | "EDITOR",
    status: "ACTIVE" as "ACTIVE" | "DISABLED",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setMounted(true);
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch current user");
      }
      const data = await response.json();
      setCurrentUserId(data.user.id);
      setCurrentUserRole(data.user.role);

      fetchUsers();
    } catch (error) {
      console.error("Error fetching current user:", error);
      toast({
        title: "Error",
        description: "Failed to authenticate. Please login again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!createForm.name || !createForm.email || !createForm.password) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    if (createForm.password.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: createForm.name,
          email: createForm.email,
          password: createForm.password,
          role: "EDITOR",
          status: createForm.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      await fetchUsers();

      setCreateModalOpen(false);
      setCreateForm({
        name: "",
        email: "",
        password: "",
        role: "EDITOR",
        status: "ACTIVE",
      });

      toast({
        title: "Success",
        description: "User created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser || !editForm.name || !editForm.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/user/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          role: editForm.role,
          status: editForm.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      await fetchUsers();

      setEditModalOpen(false);
      setSelectedUser(null);

      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update user",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async () => {
    if (!selectedUser) return;

    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New password fields are required",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/user/${selectedUser.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setPasswordModalOpen(false);
      setSelectedUser(null);
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

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/user/${selectedUser.id}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      await fetchUsers();

      setDeleteModalOpen(false);
      setSelectedUser(null);

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (user: User) => {
    if (currentUserRole !== "ADMIN") {
      toast({
        title: "Permission Denied",
        description: "Only admins can change user status",
        variant: "destructive",
      });
      return;
    }

    try {
      const newStatus = user.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user status");
      }

      await fetchUsers();

      toast({
        title: "Success",
        description: `User ${
          newStatus === "ACTIVE" ? "enabled" : "disabled"
        } successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setEditModalOpen(true);
  };

  const openPasswordModal = (user: User) => {
    setSelectedUser(user);
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordModalOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const canEditUser = (user: User) => {
    if (currentUserRole === "EDITOR") {
      return false;
    }

    if (currentUserRole === "ADMIN") {
      return user.role === "EDITOR" && user.id !== currentUserId;
    }

    return false;
  };

  const canDeleteUser = (user: User) => {
    if (currentUserRole === "EDITOR") {
      return false;
    }

    if (currentUserRole === "ADMIN") {
      return user.role === "EDITOR" && user.id !== currentUserId;
    }

    return false;
  };

  const canChangePassword = (user: User) => {
    if (currentUserRole === "EDITOR") {
      return false;
    }

    if (currentUserRole === "ADMIN") {
      return user.role === "EDITOR" && user.id !== currentUserId;
    }

    return false;
  };

  const canToggleStatus = (user: User) => {
    return (
      currentUserRole === "ADMIN" &&
      user.role === "EDITOR" &&
      user.id !== currentUserId
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`pt-8 px-6 pb-12 space-y-8 max-w-7xl mx-auto transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent flex items-center gap-3">
            <Users2 className="w-10 h-10 text-green-600" />
            Users Management
          </h2>
          <p className="text-lg text-gray-600">
            Manage user accounts and permissions
          </p>
        </div>
        {currentUserRole === "ADMIN" && (
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create User
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
        <Input
          placeholder="Search users by name, email, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-gray-200 text-gray-900 focus:border-green-500 focus:ring-green-500/20 transition-all h-12"
        />
      </div>

      {/* Users Table */}
      <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-50">
              <TableHead className="text-gray-700 font-semibold">
                Name
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Email
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Role
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Content
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Created
              </TableHead>
              <TableHead className="text-right text-gray-700 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <Users2 className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-600">No users found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="border-gray-200 hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium text-gray-900">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        user.role === "ADMIN"
                          ? "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-purple-300"
                          : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300"
                      } border shadow-sm`}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${
                          user.status === "ACTIVE"
                            ? "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300"
                            : "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-300"
                        } border shadow-sm`}
                      >
                        <UserCheck className="w-3 h-3 mr-1" />
                        {user.status}
                      </Badge>
                      {canToggleStatus(user) && (
                        <Switch
                          checked={user.status === "ACTIVE"}
                          onCheckedChange={() => handleToggleStatus(user)}
                          className="data-[state=checked]:bg-green-500"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 text-sm">
                    {user._count && (
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-xs">
                          {user._count.blogPosts} posts
                        </span>
                        <span className="inline-flex items-center gap-1 bg-purple-50 px-2 py-1 rounded text-xs">
                          {user._count.documentations} docs
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {canEditUser(user) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(user)}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canChangePassword(user) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openPasswordModal(user)}
                          className="border-green-200 text-green-600 hover:bg-green-50 transition-all"
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                      )}
                      {canDeleteUser(user) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDeleteModal(user)}
                          className="border-red-200 text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Create User Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              Create New User
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Create a new editor account. Only EDITOR role can be created.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="create-name"
                className="text-gray-700 font-medium"
              >
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="create-name"
                value={createForm.name}
                onChange={(e) =>
                  setCreateForm({ ...createForm, name: e.target.value })
                }
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="create-email"
                className="text-gray-700 font-medium"
              >
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="create-email"
                type="email"
                value={createForm.email}
                onChange={(e) =>
                  setCreateForm({ ...createForm, email: e.target.value })
                }
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="create-password"
                className="text-gray-700 font-medium"
              >
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="create-password"
                type="password"
                value={createForm.password}
                onChange={(e) =>
                  setCreateForm({ ...createForm, password: e.target.value })
                }
                placeholder="••••••••"
              />
              <p className="text-sm text-gray-500">Minimum 8 characters</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Admin accounts cannot be created through this interface. Only
                  EDITOR role is available.
                </span>
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateModalOpen(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={submitting}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-600" />
              Edit User
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Update user information and permissions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-gray-700 font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-gray-700 font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
            </div>

            {currentUserRole === "ADMIN" && selectedUser?.role === "EDITOR" && (
              <div className="space-y-2">
                <Label
                  htmlFor="edit-status"
                  className="text-gray-700 font-medium"
                >
                  Status
                </Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value: "ACTIVE" | "DISABLED") =>
                    setEditForm({ ...editForm, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="DISABLED">DISABLED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditModalOpen(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              disabled={submitting}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Modal */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Key className="w-5 h-5 text-green-600" />
              Change Password
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Set a new password for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="new-password"
                className="text-gray-700 font-medium"
              >
                New Password <span className="text-red-500">*</span>
              </Label>
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
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-gray-700 font-medium"
              >
                Confirm Password <span className="text-red-500">*</span>
              </Label>
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
              />
              <p className="text-sm text-gray-500">Minimum 8 characters</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPasswordModalOpen(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={submitting}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              Delete User
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete {selectedUser?.name}?
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Warning:</strong> This action cannot be undone. The user
                account will be permanently deleted.
              </span>
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteUser}
              disabled={submitting}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
