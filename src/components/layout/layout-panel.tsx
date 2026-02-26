"use client";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Footer } from "../shared/footer";

export default function LayoutPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state) as {
    isOpen: boolean;
  } | null;
  const dir = "ltr";

  if (!sidebar) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <main
        className={cn(
          "grow bg-[#F4F8F6] dark:bg-gray-900 transition-[margin-left] ease-in-out duration-300 pt-16",
          sidebar.isOpen === false ? "lg:ml-18" : "lg:ml-65",
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar.isOpen === false ? "lg:ml-18" : "lg:ml-65",
        )}
      >
        <Footer />
      </footer>
    </div>
  );
}
