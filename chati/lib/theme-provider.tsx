"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface Theme {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logoUrl: string | null
  faviconUrl: string | null
  typography: string | null
  isActive: boolean
  isDefault: boolean
}

interface ThemeContextType {
  theme: Theme | null
  setTheme: (theme: Theme) => void
  refreshTheme: () => Promise<void>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null)

  const refreshTheme = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/themes?active=true')
      // const data = await response.json()

      // Demo data for now
      const demoTheme: Theme = {
        id: "1",
        name: "Green Theme",
        primaryColor: "#22c55e",
        secondaryColor: "#16a34a",
        accentColor: "#15803d",
        logoUrl: "https://via.placeholder.com/150x50/22c55e/ffffff?text=Logo",
        faviconUrl: "https://via.placeholder.com/32x32/22c55e/ffffff?text=F",
        typography: JSON.stringify({
          heading: { fontFamily: "Inter", weight: 700 },
          body: { fontFamily: "Inter", weight: 400 },
        }),
        isActive: true,
        isDefault: true,
      }

      setTheme(demoTheme)
      applyTheme(demoTheme)
    } catch (error) {
      console.error("Failed to fetch theme:", error)
    }
  }

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    root.style.setProperty("--theme-primary", theme.primaryColor)
    root.style.setProperty("--theme-secondary", theme.secondaryColor)
    root.style.setProperty("--theme-accent", theme.accentColor)

    // Update favicon if provided
    if (theme.faviconUrl) {
      const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement
      if (favicon) {
        favicon.href = theme.faviconUrl
      }
    }
  }

  useEffect(() => {
    refreshTheme()
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (t) => {
          setTheme(t)
          applyTheme(t)
        },
        refreshTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
