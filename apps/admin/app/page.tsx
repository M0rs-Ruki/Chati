"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter(); // Your original router

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  // YOUR EXACT ORIGINAL LOGIC - NOT CHANGED
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 animate-gradient"></div>

      {/* Floating orbs animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Side - Branding */}
      <div className="md:w-1/2 relative z-10 p-12 flex flex-col justify-center items-center">
        <div className="max-w-md space-y-8 animate-fade-in-up">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 blur-3xl opacity-30 animate-pulse-slow"></div>
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent relative animate-gradient-text">
              Chati
            </h1>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 animate-slide-in-left">
              <Sparkles className="text-emerald-600 w-6 h-6 animate-spin-slow" />
              <p className="text-2xl font-light text-gray-800">
                Content Management System
              </p>
            </div>
            <p className="text-lg text-gray-600 animate-slide-in-left animation-delay-200">
              Manage your content with ease and elegance
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-4 mt-12">
            {[
              { icon: "🚀", text: "Fast & Secure" },
              { icon: "💎", text: "Premium Quality" },
              { icon: "🎨", text: "Beautiful UI" },
              { icon: "⚡", text: "Lightning Speed" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up border border-emerald-100"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <p className="text-sm font-medium text-gray-700">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 relative z-10 p-8 flex items-center justify-center">
        <div className="w-full max-w-md animate-fade-in-up animation-delay-300">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-emerald-100 hover:shadow-emerald-200/50 transition-all duration-500">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3 animate-slide-in-right">
                Welcome Back
              </h2>
              <p className="text-gray-600 animate-slide-in-right animation-delay-100">
                Sign in to your account
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="animate-slide-in-right animation-delay-200">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-5 py-4 bg-white border-2 rounded-xl outline-none transition-all duration-300 ${
                      focusedField === "email"
                        ? "border-emerald-500 shadow-lg shadow-emerald-200/50 scale-105"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                    placeholder="admin@chati.ai"
                    disabled={loading}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl opacity-0 blur transition-opacity duration-300 -z-10 ${
                      focusedField === "email" ? "opacity-20" : ""
                    }`}
                  ></div>
                </div>
              </div>

              {/* Password Input */}
              <div className="animate-slide-in-right animation-delay-300">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-5 py-4 bg-white border-2 rounded-xl outline-none transition-all duration-300 pr-14 ${
                      focusedField === "password"
                        ? "border-emerald-500 shadow-lg shadow-emerald-200/50 scale-105"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl opacity-0 blur transition-opacity duration-300 -z-10 ${
                      focusedField === "password" ? "opacity-20" : ""
                    }`}
                  ></div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative mt-8 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden group shadow-lg hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-105 animate-slide-in-right animation-delay-400 bg-size-200 hover:bg-pos-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="relative z-10">Signing in...</span>
                  </>
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    Sign In
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center animate-fade-in animation-delay-500">
              <p className="text-sm text-gray-500">
                Secured by{" "}
                <span className="font-semibold text-emerald-600">Chati</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        @keyframes gradientText {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-gradient {
          animation: gradient 15s ease infinite;
          background-size: 200% 200%;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-gradient-text {
          animation: gradientText 3s ease infinite;
          background-size: 200% auto;
        }

        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .bg-size-200 {
          background-size: 200% auto;
        }

        .bg-pos-100 {
          background-position: 100% center;
        }
      `}</style>
    </div>
  );
}
