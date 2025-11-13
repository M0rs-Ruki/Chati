"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Generate particles only on client side to avoid hydration mismatch
  const particles = useMemo(() => {
    if (typeof window === "undefined") return [];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }));
  }, []);

  // Animation on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user info
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Show success message with animation
      setSuccess(data.message || "Login successful! Redirecting...");

      // Redirect after animation completes
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Particles Effect - Only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-green-500/30 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card
        className={`w-full max-w-md bg-gray-900/80 backdrop-blur-xl border-gray-800 shadow-2xl relative z-10 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <CardHeader className="space-y-4 text-center pb-8">
          {/* Animated Logo */}
          <div className="mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
            <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 animate-gradient">
              Chati CMS
            </CardTitle>
            <CardDescription className="text-gray-400 text-base">
              Admin Portal
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Alert with Animation */}
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-500/10 border-red-500/50 text-red-400 animate-shake"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Alert with Animation */}
            {success && (
              <Alert className="bg-green-500/10 border-green-500/50 text-green-400 animate-bounce-in">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-200 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@chati.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || !!success}
                  className="bg-gray-800/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300 hover:bg-gray-800/70 disabled:opacity-50 disabled:cursor-not-allowed pl-4 h-12"
                />
                <div className="absolute inset-0 border-2 border-green-500/0 group-focus-within:border-green-500/20 rounded-md transition-all duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-200 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading || !!success}
                  className="bg-gray-800/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300 hover:bg-gray-800/70 disabled:opacity-50 disabled:cursor-not-allowed pl-4 h-12"
                />
                <div className="absolute inset-0 border-2 border-green-500/0 group-focus-within:border-green-500/20 rounded-md transition-all duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Submit Button with Loading State */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold h-12 relative overflow-hidden group transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25"
              disabled={loading || !!success}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="animate-pulse">Signing in...</span>
                </span>
              ) : success ? (
                <span className="flex items-center justify-center gap-2 animate-bounce-in">
                  <CheckCircle className="h-4 w-4" />
                  Redirecting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="pt-4 text-center space-y-2 border-t border-gray-800">
            <p className="text-sm text-gray-500">Chati CMS Admin Portal</p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <span>Powered by Next.js</span>
              <span>•</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
