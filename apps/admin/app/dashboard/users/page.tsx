"use client";

import { useState, useEffect } from "react";
import { Users as UsersIcon, Mail, Shield } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR" | "USER";
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const config = {
      ADMIN: "bg-purple-100 text-purple-800",
      EDITOR: "bg-blue-100 text-blue-800",
      USER: "bg-gray-100 text-gray-800",
    };
    return config[role as keyof typeof config] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <UsersIcon size={32} />
          Users
        </h1>
        <p className="text-gray-600 mt-1">
          Manage team members and their roles
        </p>
      </div>

      {users.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-semibold text-lg">
                  {user.email?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {user.name || user.email}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadge(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield size={16} />
                  Access Level: {user.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <UsersIcon size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No users yet
          </h3>
          <p className="text-gray-600">Invite team members to collaborate</p>
        </div>
      )}
    </div>
  );
}
