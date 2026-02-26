"use client";

import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  Bell,
  ShoppingCart,
  Search,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { label: "Reports", icon: FileText, href: "/admin/reports" },
  { label: "Notifications", icon: Bell, href: "/admin/notifications" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (s) => s) as {
    isOpen: boolean;
    setIsOpen: () => void;
  } | null;

  const pathname = usePathname();
  const [search, setSearch] = useState("");

  if (!sidebar) return null;

  const { isOpen, setIsOpen } = sidebar;

  const filtered = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen flex flex-col transition-all ease-in-out duration-300",
        "bg-white border-r border-gray-100 shadow-[2px_0_24px_0_rgba(0,0,0,0.05)]",
        "dark:bg-[#080b0e] dark:border-r dark:border-white/4 dark:shadow-[2px_0_40px_0_rgba(0,0,0,0.6)]",
        isOpen ? "w-64" : "w-18",
      )}
    >
      {/* ═══ BRAND ═══ */}
      <div
        className={cn(
          "flex items-center gap-3 h-16 shrink-0 border-b",
          "border-gray-100 dark:border-white/4",
          isOpen ? "px-5" : "justify-center px-0",
        )}
      >
        {/* Logo */}
        <div className="relative shrink-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/35 dark:shadow-emerald-500/20">
            <span className="text-white font-black text-sm tracking-tight">
              A
            </span>
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-[#080b0e] shadow-sm" />
        </div>

        {isOpen && (
          <div className="flex flex-col leading-none min-w-0">
            <span className="text-gray-900 dark:text-white font-bold text-[15px] tracking-tight truncate">
              AdminPanel
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase mt-0.75 text-emerald-500 dark:text-emerald-400">
              Pro
            </span>
          </div>
        )}
      </div>

      {/* ═══ SEARCH ═══ */}
      <div className={cn("pt-4 pb-2 shrink-0", isOpen ? "px-3" : "px-2.5")}>
        {isOpen ? (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-white/20 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu…"
              className={cn(
                "w-full pl-9 pr-3 py-2 rounded-xl text-[13px] outline-none transition-all",
                /* light */
                "bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400",
                "focus:border-emerald-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)]",
                /* dark */
                "dark:bg-white/4 dark:border-white/6 dark:text-white dark:placeholder:text-white/20",
                "dark:focus:border-emerald-500/40 dark:focus:bg-white/[0.07] dark:focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]",
              )}
            />
          </div>
        ) : (
          <button
            title="Search"
            className={cn(
              "w-full h-9 flex items-center justify-center rounded-xl transition-all",
              /* light */
              "bg-gray-50 border border-gray-200 text-gray-400",
              "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600",
              /* dark */
              "dark:bg-white/4 dark:border-white/6 dark:text-white/25",
              "dark:hover:bg-emerald-500/8 dark:hover:border-emerald-500/30 dark:hover:text-emerald-400",
            )}
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ═══ LABEL ═══ */}
      {isOpen && (
        <p className="px-5 pt-2 pb-1 text-[10px] font-extrabold tracking-[0.16em] uppercase text-gray-300 dark:text-white/15 select-none">
          Navigation
        </p>
      )}

      {/* ═══ NAV ITEMS ═══ */}
      <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5 scrollbar-none">
        {filtered.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={!isOpen ? item.label : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all duration-200 group",
                isOpen ? "px-3 py-2.5" : "justify-center py-2.5 px-0",
                active
                  ? [
                      /* active LIGHT */
                      "bg-emerald-500 text-white shadow-md shadow-emerald-400/20",
                      /* active DARK */
                      "dark:bg-emerald-500/20 dark:text-emerald-300 dark:shadow-emerald-900/40",
                      "dark:border dark:border-emerald-500/25",
                    ].join(" ")
                  : [
                      /* inactive LIGHT */
                      "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
                      /* inactive DARK */
                      "dark:text-white/35 dark:hover:text-white dark:hover:bg-white/5",
                    ].join(" "),
              )}
            >
              {/* Left indicator bar — hover only, open only */}
              {!active && isOpen && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-5 bg-emerald-400 rounded-r-full transition-all duration-200 group-hover:w-0.75" />
              )}

              <item.icon
                className={cn(
                  "shrink-0 w-4.5 h-4.5 transition-colors",
                  active
                    ? "text-white dark:text-emerald-300"
                    : "text-gray-400 group-hover:text-emerald-500 dark:text-white/25 dark:group-hover:text-emerald-400",
                )}
              />

              {isOpen && <span>{item.label}</span>}

              {/* Collapsed active dot */}
              {active && !isOpen && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-[1.5px] border-white dark:border-[#080b0e]" />
              )}
            </Link>
          );
        })}

        {filtered.length === 0 && isOpen && (
          <p className="text-center text-gray-300 dark:text-white/15 text-xs py-8 select-none">
            No results
          </p>
        )}
      </nav>

      {/* ═══ SIGN OUT ═══ */}
      <div
        className={cn(
          "px-2 pb-5 pt-3 border-t shrink-0",
          "border-gray-100 dark:border-white/4",
        )}
      >
        <button
          title={!isOpen ? "Sign out" : undefined}
          className={cn(
            "flex items-center gap-3 w-full rounded-xl text-[13px] font-medium transition-all duration-200 group",
            isOpen ? "px-3 py-2.5" : "justify-center py-2.5 px-0",
            /* light */
            "text-gray-400 hover:text-red-500 hover:bg-red-50/80 border border-transparent hover:border-red-100",
            /* dark */
            "dark:text-white/20 dark:hover:text-red-400 dark:hover:bg-red-500/[0.07] dark:hover:border-red-500/15",
          )}
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          {isOpen && <span>Sign out</span>}
        </button>
      </div>

      {/* ═══ COLLAPSE TOGGLE ═══ */}
      <button
        onClick={setIsOpen}
        className={cn(
          "absolute -right-3.5 top-12 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 z-50",
          /* light */
          "bg-white border-[1.5px] border-gray-200 text-gray-400 shadow-sm",
          "hover:border-emerald-400 hover:text-emerald-500 hover:shadow-[0_0_0_4px_rgba(16,185,129,0.12)]",
          /* dark */
          "dark:bg-[#080b0e] dark:border-white/8 dark:text-white/25",
          "dark:hover:border-emerald-500/50 dark:hover:text-emerald-400 dark:hover:shadow-[0_0_0_4px_rgba(16,185,129,0.08)]",
        )}
      >
        <ChevronLeft
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            !isOpen && "rotate-180",
          )}
        />
      </button>
    </aside>
  );
}
