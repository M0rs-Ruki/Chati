"use client"

import { useEffect, useState } from "react"

export function FloatingSocialIcons() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {/* WhatsApp Icon - Top Left */}
      <div
        className="absolute top-[15%] left-[15%] animate-float opacity-80 hover:opacity-100 transition-opacity"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
          <svg
            className="relative w-12 h-12 drop-shadow-lg"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="22" fill="#25D366" />
            <path
              d="M24 12C17.373 12 12 17.373 12 24C12 26.251 12.654 28.349 13.776 30.118L12.5 35.5L18.032 34.248C19.753 35.27 21.805 35.875 24 35.875C30.627 35.875 36 30.502 36 23.875C36 17.248 30.627 12 24 12ZM29.5 27.5C29.25 28.125 28.125 28.625 27.5 28.75C27.125 28.813 26.625 28.875 26 28.688C25.625 28.563 25.125 28.375 24.5 28.063C21.875 26.875 20.125 24.25 20 24.063C19.875 23.875 19 22.75 19 21.563C19 20.375 19.625 19.813 19.875 19.5C20.125 19.188 20.438 19.125 20.625 19.125C20.75 19.125 20.875 19.125 21 19.125C21.125 19.125 21.313 19.063 21.5 19.5C21.688 19.938 22.125 21.125 22.188 21.25C22.25 21.375 22.313 21.563 22.188 21.75C22.063 21.938 22 22.063 21.875 22.188C21.75 22.313 21.625 22.5 21.5 22.625C21.375 22.75 21.25 22.875 21.375 23.125C21.5 23.375 22.125 24.375 23 25.125C24.125 26.063 25.063 26.375 25.313 26.5C25.563 26.625 25.688 26.563 25.875 26.375C26.063 26.188 26.625 25.563 26.813 25.313C27 25.063 27.188 25.125 27.438 25.188C27.688 25.25 28.875 25.813 29.125 25.938C29.375 26.063 29.563 26.125 29.625 26.25C29.688 26.375 29.688 26.875 29.5 27.5Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Instagram Icon - Top Right */}
      <div
        className="absolute top-[20%] right-[12%] animate-float opacity-80 hover:opacity-100 transition-opacity"
        style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
          <svg
            className="relative w-12 h-12 drop-shadow-lg"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FD5949" />
                <stop offset="50%" stopColor="#D6249F" />
                <stop offset="100%" stopColor="#285AEB" />
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#instagram-gradient)" />
            <circle cx="24" cy="24" r="7" stroke="white" strokeWidth="2.5" fill="none" />
            <circle cx="33" cy="15" r="2" fill="white" />
            <rect x="10" y="10" width="28" height="28" rx="7" stroke="white" strokeWidth="2.5" fill="none" />
          </svg>
        </div>
      </div>

      {/* Facebook Icon - Middle Left */}
      <div
        className="absolute top-[45%] left-[12%] animate-float opacity-80 hover:opacity-100 transition-opacity"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
          <svg
            className="relative w-12 h-12 drop-shadow-lg"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="22" fill="#1877F2" />
            <path
              d="M26.5 25.5H29.5L30.5 20.5H26.5V18C26.5 16.47 26.5 15 29 15H30.5V10.7C30.174 10.66 28.943 10.5 27.643 10.5C24.928 10.5 23 12.157 23 15.7V20.5H19V25.5H23V37.5H26.5V25.5Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* RCS Icon - Middle Right */}
      <div
        className="absolute top-[50%] right-[8%] animate-float opacity-80 hover:opacity-100 transition-opacity"
        style={{ animationDelay: "1.5s", animationDuration: "3.8s" }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
          <svg
            className="relative w-12 h-12 drop-shadow-lg"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="rcs-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00B4D8" />
                <stop offset="100%" stopColor="#0077B6" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#rcs-gradient)" />
            <path
              d="M24 12C17.373 12 12 17.373 12 24C12 30.627 17.373 36 24 36C30.627 36 36 30.627 36 24C36 17.373 30.627 12 24 12ZM24 14C29.514 14 34 18.486 34 24C34 29.514 29.514 34 24 34C18.486 34 14 29.514 14 24C14 18.486 18.486 14 24 14ZM19 20V28H21V20H19ZM23 20V28H25V20H23ZM27 20V28H29V20H27Z"
              fill="white"
            />
            <circle cx="24" cy="24" r="3" fill="white" />
          </svg>
        </div>
      </div>

      {/* WhatsApp Icon - Bottom Left (smaller) */}
      <div
        className="absolute bottom-[15%] left-[18%] animate-float opacity-70 hover:opacity-100 transition-opacity"
        style={{ animationDelay: "2s", animationDuration: "3.2s" }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-green-400/15 rounded-full blur-lg group-hover:blur-xl transition-all" />
          <svg
            className="relative w-9 h-9 drop-shadow-lg"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="20" fill="#25D366" />
            <path
              d="M24 13C18.477 13 14 17.477 14 23C14 24.89 14.525 26.66 15.438 28.156L14 33L19.031 31.594C20.484 32.434 22.188 32.906 24 32.906C29.523 32.906 34 28.429 34 22.906C34 17.383 29.523 13 24 13Z"
              fill="white"
              fillOpacity="0.3"
            />
          </svg>
        </div>
      </div>

      {/* Instagram Icon - Bottom Right (smaller) */}
      <div
        className="absolute bottom-[20%] right-[15%] animate-float opacity-70 hover:opacity-100 transition-opacity"
        style={{ animationDelay: "2.5s", animationDuration: "3.6s" }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-pink-400/15 rounded-full blur-lg group-hover:blur-xl transition-all" />
          <svg
            className="relative w-9 h-9 drop-shadow-lg"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="instagram-gradient-small" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FD5949" />
                <stop offset="50%" stopColor="#D6249F" />
                <stop offset="100%" stopColor="#285AEB" />
              </linearGradient>
            </defs>
            <rect x="6" y="6" width="36" height="36" rx="10" fill="url(#instagram-gradient-small)" />
            <circle cx="24" cy="24" r="6" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  )
}
