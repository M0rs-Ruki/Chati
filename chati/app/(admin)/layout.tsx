import { ReactNode } from "react";
import "./globals.css";

interface AdminRootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Chati CMS - Admin",
  description: "Admin dashboard for Chati CMS",
};

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
