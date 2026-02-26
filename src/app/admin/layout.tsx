"use client";

import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dir = "ltr";

  return (
    <div dir={dir}>
      <Sidebar />
      <Navbar />
      <div className="flex-1 flex flex-col justify-between w-full mx-auto ">
        {children}
      </div>
    </div>
  );
}
