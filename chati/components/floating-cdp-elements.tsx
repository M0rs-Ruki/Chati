"use client";

import {
  BarChart3,
  MapPin,
  Cloud,
  ShoppingCart,
  MessageCircle,
  Users,
  Zap,
} from "lucide-react";

export function FloatingCDPElementsMobile() {
  return (
    <div className="md:hidden absolute inset-0 pointer-events-none overflow-hidden">
      {/* CRM - Top Center (above image) */}
      <div
        className="absolute top-[12%] left-[50%] -translate-x-1/2 bg-white rounded-xl shadow-md px-2 py-1 border border-gray-100 animate-float"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      >
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
            <Users className="w-3 h-3 text-purple-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-900">CRM</p>
            <p className="text-[8px] text-gray-500">Integration</p>
          </div>
        </div>
      </div>

      {/* Analytics - Top Left (diagonal from image) */}
      <div
        className="absolute top-[20%] left-[8%] bg-white rounded-xl shadow-md px-2 py-1 border border-gray-100 animate-float z-20"
        style={{ animationDelay: "0.3s", animationDuration: "3.2s" }}
      >
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <BarChart3 className="w-3 h-3 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-900">Analytics</p>
            <p className="text-[8px] text-gray-500">3 Products</p>
          </div>
        </div>
      </div>

      {/* Location Intelligence - Top Right (diagonal from image) */}
      <div
        className="absolute top-[20%] right-[8%] bg-white rounded-xl shadow-md px-2 py-1 border border-gray-100 animate-float z-20"
        style={{ animationDelay: "0.6s", animationDuration: "3.4s" }}
      >
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
            <MapPin className="w-3 h-3 text-red-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-900">Location</p>
            <p className="text-[8px] text-gray-500">Intel</p>
          </div>
        </div>
      </div>

      {/* Customer Service - Left Side (left of image) */}
      <div
        className="absolute top-[50%] left-[5%] bg-white rounded-xl shadow-md px-2 py-1 border border-gray-100 animate-float z-20"
        style={{ animationDelay: "0.9s", animationDuration: "3.6s" }}
      >
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
            <MessageCircle className="w-3 h-3 text-teal-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-900">Customer</p>
            <p className="text-[8px] text-gray-500">Service</p>
          </div>
        </div>
      </div>

      {/* Weather Targeting - Right Side (right of image) */}
      <div
        className="absolute top-[50%] right-[5%] bg-white rounded-xl shadow-md px-2 py-1 border border-gray-100 animate-float z-20"
        style={{ animationDelay: "1.2s", animationDuration: "3.8s" }}
      >
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center">
            <Cloud className="w-3 h-3 text-sky-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-900">Weather</p>
            <p className="text-[8px] text-gray-500">Targeting</p>
          </div>
        </div>
      </div>

      {/* Purchase Tracking - Bottom Left (below image, left) */}
      <div
        className="absolute bottom-[20%] left-[15%] bg-white rounded-xl shadow-md px-2 py-1 border border-gray-100 animate-float z-20"
        style={{ animationDelay: "1.5s", animationDuration: "4s" }}
      >
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-lg bg-orange-100 flex items-center justify-center">
            <ShoppingCart className="w-3 h-3 text-orange-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-900">Purchase</p>
            <p className="text-[8px] text-gray-500">Tracking</p>
          </div>
        </div>
      </div>

      {/* 10% Off Coupon - Bottom Right (below image, right) */}
      <div
        className="absolute bottom-[20%] right-[15%] bg-white rounded-xl shadow-md px-2 py-1 border border-gray-100 animate-float z-20"
        style={{ animationDelay: "1.8s", animationDuration: "4.2s" }}
      >
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <Zap className="w-3 h-3 text-green-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-900">10% Off</p>
            <p className="text-[8px] text-gray-500">Coupon</p>
          </div>
        </div>
      </div>

      {/* Circular connecting lines surrounding the image */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient
            id="lineGradientMobile"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Top arc - connecting top elements */}
        <path
          d="M 12% 20% Q 50% 12%, 88% 20%"
          stroke="url(#lineGradientMobile)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4,4"
          className="animate-dash"
        />

        {/* Left arc - connecting top-left to bottom-left */}
        <path
          d="M 8% 20% Q 5% 35%, 15% 50% Q 12% 65%, 15% 80%"
          stroke="url(#lineGradientMobile)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4,4"
          className="animate-dash"
          style={{ animationDelay: "0.3s" }}
        />

        {/* Right arc - connecting top-right to bottom-right */}
        <path
          d="M 92% 20% Q 95% 35%, 85% 50% Q 88% 65%, 85% 80%"
          stroke="url(#lineGradientMobile)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4,4"
          className="animate-dash"
          style={{ animationDelay: "0.6s" }}
        />

        {/* Bottom arc - connecting bottom elements */}
        <path
          d="M 15% 80% Q 50% 75%, 85% 80%"
          stroke="url(#lineGradientMobile)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4,4"
          className="animate-dash"
          style={{ animationDelay: "0.9s" }}
        />
      </svg>
    </div>
  );
}

export function FloatingCDPElements() {
  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none">
      {/* Customer Service - Starting point (left, lower) */}
      <div
        className="absolute top-[45%] left-[5%] bg-white rounded-2xl shadow-lg px-2.5 py-1.5 border border-gray-100 animate-float"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
            <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-900">Customer</p>
            <p className="text-[9px] text-gray-500">Service</p>
          </div>
        </div>
      </div>

      {/* Analytics - Left-center, mid */}
      <div
        className="absolute top-[25%] left-[12%] bg-white rounded-2xl shadow-lg px-2.5 py-1.5 border border-gray-100 animate-float"
        style={{ animationDelay: "0.2s", animationDuration: "3.2s" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-900">Analytics</p>
            <p className="text-[9px] text-gray-500">Visited 3 Products</p>
          </div>
        </div>
      </div>

      {/* CRM - Center-left, upper */}
      <div
        className="absolute top-[12%] left-[25%] bg-white rounded-2xl shadow-lg px-2.5 py-1.5 border border-gray-100 animate-float"
        style={{ animationDelay: "0.4s", animationDuration: "3.4s" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
            <Users className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-900">CRM</p>
            <p className="text-[9px] text-gray-500">Integration</p>
          </div>
        </div>
      </div>

      {/* 10% Off Coupon - Center, highest point */}
      <div
        className="absolute top-[5%] left-[42%] bg-white rounded-2xl shadow-lg px-2.5 py-1.5 border border-gray-100 animate-float"
        style={{ animationDelay: "0.6s", animationDuration: "3.6s" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-900">10% Off</p>
            <p className="text-[9px] text-gray-500">Coupon</p>
          </div>
        </div>
      </div>

      {/* Location Intelligence - Center-right, upper */}
      <div
        className="absolute top-[12%] right-[25%] bg-white rounded-2xl shadow-lg px-2.5 py-1.5 border border-gray-100 animate-float"
        style={{ animationDelay: "0.8s", animationDuration: "3.8s" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-900">Location</p>
            <p className="text-[9px] text-gray-500">Intelligence</p>
          </div>
        </div>
      </div>

      {/* Weather Targeting - Right-center, mid */}
      <div
        className="absolute top-[25%] right-[12%] bg-white rounded-2xl shadow-lg px-2.5 py-1.5 border border-gray-100 animate-float"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center">
            <Cloud className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-900">Weather</p>
            <p className="text-[9px] text-gray-500">Targeting</p>
          </div>
        </div>
      </div>

      {/* Purchase Tracking - Right, lower */}
      <div
        className="absolute top-[45%] right-[5%] bg-white rounded-xl shadow-lg p-3 border border-gray-100 animate-float"
        style={{ animationDelay: "1.2s", animationDuration: "4.2s" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">Purchase</p>
            <p className="text-[10px] text-gray-500">Tracking</p>
          </div>
        </div>
      </div>

      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Gentle arc connecting elements from left to right */}
        <path
          d="M 8% 45% Q 15% 30%, 25% 15% T 42% 8% T 75% 15% Q 85% 30%, 92% 45%"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6,6"
          className="animate-dash"
        />
      </svg>
    </div>
  );
}
