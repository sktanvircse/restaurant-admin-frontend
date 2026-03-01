import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../styles/table.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AdminPanel",
    template: "%s | AdminPanel",
  },
  description:
    "A modern admin dashboard for managing users, analytics, orders, and reports.",
  keywords: ["admin", "dashboard", "analytics", "management"],
  authors: [{ name: "AdminPanel" }],
  creator: "AdminPanel",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "AdminPanel",
    description:
      "A modern admin dashboard for managing users, analytics, orders, and reports.",
    url: "https://yourdomain.com",
    siteName: "AdminPanel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdminPanel",
    description:
      "A modern admin dashboard for managing users, analytics, orders, and reports.",
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
