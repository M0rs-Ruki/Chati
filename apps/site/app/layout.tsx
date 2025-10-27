import type { Metadata } from "next";
import { api } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Website - Powered by Custom CMS",
  description: "Built with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch navigation data
  let headerNav = [];
  let footerNav = [];

  try {
    const headerData = await api.getNavigation("header");
    const footerData = await api.getNavigation("footer");
    headerNav = headerData.items || [];
    footerNav = footerData.items || [];
  } catch (error) {
    console.error("Failed to load navigation:", error);
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Header navigation={headerNav} />
        <main className="flex-1">{children}</main>
        <Footer navigation={footerNav} />
      </body>
    </html>
  );
}
