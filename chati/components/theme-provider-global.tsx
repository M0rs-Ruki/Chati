"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string | null;
  accentColor: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  typography: string | null;
  isDefault: boolean;
}

interface ThemeContextType {
  theme: Theme | null;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  loading: true,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTheme() {
      try {
        const response = await fetch("/api/public/theme");
        if (response.ok) {
          const result = await response.json();
          setTheme(result.data);
          applyTheme(result.data);
        } else {
          console.error("Failed to fetch theme:", response.status);
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTheme();
  }, []);

  const applyTheme = (themeData: Theme) => {
    if (!themeData) return;

    const root = document.documentElement;

    // Apply colors as CSS variables
    if (themeData.primaryColor) {
      root.style.setProperty("--theme-primary", themeData.primaryColor);
    }

    if (themeData.secondaryColor) {
      root.style.setProperty("--theme-secondary", themeData.secondaryColor);
    }

    if (themeData.accentColor) {
      root.style.setProperty("--theme-accent", themeData.accentColor);
    }

    // Apply typography
    if (themeData.typography) {
      root.style.setProperty("--theme-font", themeData.typography);
    }

    // Update favicon dynamically
    if (themeData.faviconUrl) {
      // Remove existing favicons
      const existingFavicons = document.querySelectorAll("link[rel*='icon']");
      existingFavicons.forEach((link) => link.remove());

      // Add new favicon from backend
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = themeData.faviconUrl;
      favicon.type = "image/png";
      document.head.appendChild(favicon);

      // Add apple touch icon if available
      const appleTouchIcon = document.createElement("link");
      appleTouchIcon.rel = "apple-touch-icon";
      appleTouchIcon.href = themeData.faviconUrl;
      document.head.appendChild(appleTouchIcon);

      console.log("Favicon updated to:", themeData.faviconUrl);
    } else {
      // Fallback to default favicon if no backend URL
      const existingFavicons = document.querySelectorAll("link[rel*='icon']");
      if (existingFavicons.length === 0) {
        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = "/favicon.ico";
        document.head.appendChild(favicon);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}
