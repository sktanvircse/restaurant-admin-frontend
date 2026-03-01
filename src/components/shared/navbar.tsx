"use client";

import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const sidebar = useStore(useSidebarToggle, (s) => s) as {
    isOpen: boolean;
    setIsOpen: () => void;
  } | null;

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!sidebar) return null;

  const { isOpen, setIsOpen } = sidebar;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-white/80 dark:bg-[#0f1117]/80 backdrop-blur-md border-b border-black/6 dark:border-white/6 flex items-center px-4 gap-4 transition-all ease-in-out duration-300",
        isOpen ? "left-65" : "left-18",
      )}
    >
      {/* Mobile toggle */}
      <button
        onClick={setIsOpen}
        className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Search bar */}
      {/* <div className="relative hidden sm:flex items-center">
        <Search className="absolute left-3 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        <input
          placeholder="Search anything…"
          className="w-64 pl-9 pr-4 py-2 text-[13px] bg-gray-100 dark:bg-white/5 border border-transparent focus:border-emerald-500/40 focus:bg-white dark:focus:bg-white/8 rounded-lg outline-none text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 transition-all"
        />
        <kbd className="absolute right-3 text-[10px] text-gray-300 dark:text-white/20 font-mono">
          ⌘K
        </kbd>
      </div> */}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Notifications */}
      {/* <div className="relative">
        <button
          onClick={() => {
            setNotifOpen((p) => !p);
            setProfileOpen(false);
          }}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0f1117]" />
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-12 w-72 bg-white dark:bg-[#161922] border border-black/8 dark:border-white/8 rounded-xl shadow-xl overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-black/6 dark:border-white/6 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-gray-800 dark:text-white">
                Notifications
              </span>
              <span className="text-[11px] text-emerald-500 cursor-pointer hover:underline">
                Mark all read
              </span>
            </div>
            {[
              { title: "New user registered", time: "2m ago", dot: true },
              { title: "Monthly report ready", time: "1h ago", dot: true },
              { title: "Server backup complete", time: "3h ago", dot: false },
            ].map((n, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 cursor-pointer transition-colors border-b border-black/4 dark:border-white/4 last:border-0"
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                    n.dot ? "bg-emerald-500" : "bg-transparent",
                  )}
                />
                <div>
                  <p className="text-[13px] text-gray-700 dark:text-white/80 font-medium">
                    {n.title}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-white/30 mt-0.5">
                    {n.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => {
            setProfileOpen((p) => !p);
            setNotifOpen(false);
          }}
          className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">JD</span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-[12px] font-semibold text-gray-800 dark:text-white leading-none">
              John Doe
            </p>
            <p className="text-[10px] text-gray-400 dark:text-white/30 mt-0.5">
              Admin
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-white/30" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-12 w-48 bg-white dark:bg-[#161922] border border-black/8 dark:border-white/8 rounded-xl shadow-xl overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-black/6 dark:border-white/6">
              <p className="text-[13px] font-semibold text-gray-800 dark:text-white">
                John Doe
              </p>
              <p className="text-[11px] text-gray-400 dark:text-white/30">
                john@example.com
              </p>
            </div>
            {["Profile", "Settings",].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2.5 text-[13px] text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/4 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
            <div className="border-t border-black/6 dark:border-white/6">
              <button className="w-full text-left px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
