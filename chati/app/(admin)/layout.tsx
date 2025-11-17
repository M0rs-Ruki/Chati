import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemeProvider } from "@/lib/theme-provider";
import { ThemeProvider } from "@/components/theme-provider-global";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Professional CMS Dashboard",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextThemeProvider>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
