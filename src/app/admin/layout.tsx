// src/app/admin/layout.tsx
"use client";

import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { useAuthProtection } from "@/hooks/useAuthProtection";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dir = "ltr";
  const { isLoading, isAuthenticated } = useAuthProtection();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, return null (user will be redirected)
  if (!isAuthenticated) {
    return null;
  }

  // Render the protected layout
  return (
    <div dir={dir}>
      <Sidebar />
      <Navbar />
      <div className="flex-1 flex flex-col justify-between w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
