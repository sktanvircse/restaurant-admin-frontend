// src/app/(auth)/layout.tsx
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
