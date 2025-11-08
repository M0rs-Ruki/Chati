"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Key, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"

interface User {
  id: string
  email: string
  name: string
  role: "ADMIN" | "EDITOR"
  status: "ACTIVE" | "DISABLED"
  createdAt: string
  updatedAt: string
  _count?: {
    blogPosts: number
    documentations: number
  }
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentUserRole] = useState<"ADMIN" | "EDITOR">("ADMIN") // Demo - get from auth context
  const [currentUserId] = useState<string>("1") // Demo - get from auth context
  const { toast } = useToast()

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Form states
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR" as const,
    status: "ACTIVE" as const,
  })

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "EDITOR" as "ADMIN" | "EDITOR",
    status: "ACTIVE" as "ACTIVE" | "DISABLED",
  })

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // Demo data - replace with: const response = await fetch('/api/user')
      await new Promise((resolve) => setTimeout(resolve, 600))
      setUsers([
        {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "ADMIN",
          status: "ACTIVE",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
          _count: { blogPosts: 5, documentations: 3 },
        },
        {
          id: "2",
          email: "editor@example.com",
          name: "Editor User",
          role: "EDITOR",
          status: "ACTIVE",
          createdAt: "2024-01-05T00:00:00.000Z",
          updatedAt: "2024-01-05T00:00:00.000Z",
          _count: { blogPosts: 2, documentations: 1 },
        },
        {
          id: "3",
          email: "john@example.com",
          name: "John Doe",
          role: "EDITOR",
          status: "ACTIVE",
          createdAt: "2024-01-10T00:00:00.000Z",
          updatedAt: "2024-01-10T00:00:00.000Z",
          _count: { blogPosts: 0, documentations: 0 },
        },
        {
          id: "4",
          email: "jane@example.com",
          name: "Jane Smith",
          role: "EDITOR",
          status: "DISABLED",
          createdAt: "2024-01-15T00:00:00.000Z",
          updatedAt: "2024-01-15T00:00:00.000Z",
          _count: { blogPosts: 0, documentations: 0 },
        },
      ])
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    if (!createForm.name || !createForm.email || !createForm.password) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      })
      return
    }

    if (createForm.password.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      // Demo - replace with actual API call to POST /api/user/create
      await new Promise((resolve) => setTimeout(resolve, 800))

      const newUser: User = {
        id: String(users.length + 1),
        name: createForm.name,
        email: createForm.email,
        role: "EDITOR",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _count: { blogPosts: 0, documentations: 0 },
      }

      setUsers([newUser, ...users])
      setCreateModalOpen(false)
      setCreateForm({ name: "", email: "", password: "", role: "EDITOR", status: "ACTIVE" })

      toast({
        title: "Success",
        description: "User created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditUser = async () => {
    if (!selectedUser || !editForm.name || !editForm.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      // Demo - replace with: PUT /api/user/[id]
      await new Promise((resolve) => setTimeout(resolve, 800))

      setUsers(
        users.map((u) => (u.id === selectedUser.id ? { ...u, ...editForm, updatedAt: new Date().toISOString() } : u)),
      )

      setEditModalOpen(false)
      setSelectedUser(null)

      toast({
        title: "Success",
        description: "User updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleChangePassword = async () => {
    if (!selectedUser) return

    const isChangingOwnPassword = currentUserId === selectedUser.id

    if (isChangingOwnPassword && !passwordForm.oldPassword) {
      toast({
        title: "Validation Error",
        description: "Old password is required when changing your own password",
        variant: "destructive",
      })
      return
    }

    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New password fields are required",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      // Demo - replace with: PUT /api/user/[id]/password
      await new Promise((resolve) => setTimeout(resolve, 800))

      setPasswordModalOpen(false)
      setSelectedUser(null)
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" })

      toast({
        title: "Success",
        description: "Password changed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return

    const hasContent =
      selectedUser._count && (selectedUser._count.blogPosts > 0 || selectedUser._count.documentations > 0)

    if (hasContent) {
      toast({
        title: "Cannot Delete User",
        description: "User has related content. Please reassign or delete content first.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      // Demo - replace with: DELETE /api/user/[id]/delete
      await new Promise((resolve) => setTimeout(resolve, 800))

      setUsers(users.filter((u) => u.id !== selectedUser.id))
      setDeleteModalOpen(false)
      setSelectedUser(null)

      toast({
        title: "Success",
        description: "User deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleStatus = async (user: User) => {
    if (currentUserRole !== "ADMIN") {
      toast({
        title: "Permission Denied",
        description: "Only admins can change user status",
        variant: "destructive",
      })
      return
    }

    try {
      // Demo - replace with: PUT /api/user/[id]
      const newStatus = user.status === "ACTIVE" ? "DISABLED" : "ACTIVE"

      setUsers(users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)))

      toast({
        title: "Success",
        description: `User ${newStatus === "ACTIVE" ? "enabled" : "disabled"} successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      })
    }
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setEditModalOpen(true)
  }

  const openPasswordModal = (user: User) => {
    setSelectedUser(user)
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" })
    setPasswordModalOpen(true)
  }

  const openDeleteModal = (user: User) => {
    setSelectedUser(user)
    setDeleteModalOpen(true)
  }

  const canEditUser = (user: User) => {
    if (currentUserRole === "ADMIN") {
      return user.role !== "ADMIN" || user.id === currentUserId
    }
    return user.id === currentUserId
  }

  const canDeleteUser = (user: User) => {
    if (currentUserRole === "ADMIN") {
      return user.role !== "ADMIN" || user.id === currentUserId
    }
    return user.id === currentUserId
  }

  const canChangePassword = (user: User) => {
    if (currentUserRole === "ADMIN") {
      return user.role !== "ADMIN" || user.id === currentUserId
    }
    return user.id === currentUserId
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="pt-8 px-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Users</h2>
          <p className="text-lg text-gray-600">Manage user accounts and permissions</p>
        </div>
        {currentUserRole === "ADMIN" && (
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create User
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search users by name, email, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-gray-200 text-gray-900 focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      {/* Users Table */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 animate-in slide-in-from-bottom-4 delay-150">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 hover:bg-gray-50">
                <TableHead className="text-gray-700 font-semibold">Name</TableHead>
                <TableHead className="text-gray-700 font-semibold">Email</TableHead>
                <TableHead className="text-gray-700 font-semibold">Role</TableHead>
                <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                <TableHead className="text-gray-700 font-semibold">Content</TableHead>
                <TableHead className="text-gray-700 font-semibold">Created</TableHead>
                <TableHead className="text-right text-gray-700 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-600">No users found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-200 hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : "bg-blue-100 text-blue-700 border-blue-200"
                        } border`}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${
                            user.status === "ACTIVE"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          } border`}
                        >
                          {user.status}
                        </Badge>
                        {currentUserRole === "ADMIN" && (
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
                          <span title="Blog Posts">{user._count.blogPosts} posts</span>
                          <span className="text-gray-400">•</span>
                          <span title="Documentation">{user._count.documentations} docs</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {canEditUser(user) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(user)}
                            className="border-gray-200 text-gray-700 hover:bg-gray-100"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {canChangePassword(user) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openPasswordModal(user)}
                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          >
                            <Key className="h-4 w-4" />
                          </Button>
                        )}
                        {canDeleteUser(user) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDeleteModal(user)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            disabled={user._count && (user._count.blogPosts > 0 || user._count.documentations > 0)}
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
        )}
      </Card>

      {/* Create User Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Create New User</DialogTitle>
            <DialogDescription className="text-gray-600">
              Create a new editor account. Only EDITOR role can be created.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="create-name" className="text-gray-700">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="create-name"
                value={createForm.name}
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-email" className="text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="create-email"
                type="email"
                value={createForm.email}
                onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-password" className="text-gray-700">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="create-password"
                type="password"
                value={createForm.password}
                onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                placeholder="••••••••"
              />
              <p className="text-sm text-gray-500">Minimum 8 characters</p>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Admin accounts cannot be created through this interface. Only EDITOR role is available.</span>
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateModalOpen(false)} className="border-gray-200">
              Cancel
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {submitting ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Edit User</DialogTitle>
            <DialogDescription className="text-gray-600">Update user information and permissions</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-gray-700">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>

            {currentUserRole === "ADMIN" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-role" className="text-gray-700">
                    Role
                  </Label>
                  <Select
                    value={editForm.role}
                    onValueChange={(value: "ADMIN" | "EDITOR") => setEditForm({ ...editForm, role: value })}
                    disabled={selectedUser?.role === "ADMIN" && selectedUser?.id !== currentUserId}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="EDITOR">EDITOR</SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedUser?.role === "ADMIN" && selectedUser?.id !== currentUserId && (
                    <p className="text-sm text-gray-500">Cannot change role of other admins</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status" className="text-gray-700">
                    Status
                  </Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(value: "ACTIVE" | "DISABLED") => setEditForm({ ...editForm, status: value })}
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
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)} className="border-gray-200">
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Change Password</DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedUser?.id === currentUserId
                ? "Change your password"
                : `Set a new password for ${selectedUser?.name}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedUser?.id === currentUserId && (
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
            )}

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
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="••••••••"
              />
              <p className="text-sm text-gray-500">Minimum 8 characters</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordModalOpen(false)} className="border-gray-200">
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {submitting ? "Changing..." : "Change Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Delete User</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete {selectedUser?.name}?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Warning:</strong> This action cannot be undone. The user account will be permanently deleted.
                </span>
              </p>
            </div>

            {selectedUser?._count && (selectedUser._count.blogPosts > 0 || selectedUser._count.documentations > 0) && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-700 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    This user has {selectedUser._count.blogPosts} blog post(s) and {selectedUser._count.documentations}{" "}
                    documentation(s). Please reassign or delete this content before deleting the user.
                  </span>
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} className="border-gray-200">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteUser}
              disabled={
                submitting ||
                (selectedUser?._count && (selectedUser._count.blogPosts > 0 || selectedUser._count.documentations > 0))
              }
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {submitting ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
