import type { Metadata } from "next";
import { api } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Website - Powered by Custom CMS",
  description: "Built with Next.js",
};

async function getNavigationWithPages() {
  try {
    const [navData, pagesData] = await Promise.all([
      api.getNavigation("header"),
      api.getPages(),
    ]);

    const pages = pagesData?.pages || [];

    const navigation = [
      { id: "home", label: "Home", url: "/" },
      { id: "blog", label: "Blog", url: "/blog" },
    ];

    pages.forEach((page: any) => {
      navigation.push({
        id: page.id,
        label: page.title,
        url: `/${page.slug}`,
      });
    });

    return navigation;
  } catch (error) {
    console.error("Failed to load navigation:", error);
    return [
      { id: "home", label: "Home", url: "/" },
      { id: "blog", label: "Blog", url: "/blog" },
    ];
  }
}

async function getTheme() {
  try {
    const theme = await api.getTheme();
    return theme || null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerNav, theme] = await Promise.all([
    getNavigationWithPages(),
    getTheme(),
  ]);

  let footerNav = [];
  try {
    const footerData = await api.getNavigation("footer");
    footerNav = footerData?.items || headerNav;
  } catch {
    footerNav = headerNav;
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Header navigation={headerNav} theme={theme} />
        <main className="flex-1">{children}</main>
        <Footer navigation={footerNav} theme={theme} />
      </body>
    </html>
  );
}
