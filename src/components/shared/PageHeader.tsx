"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils"; // if you use a classNames helper
import { ReactNode } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string; // optional (no link for last item)
};

type PageHeaderProps = {
  icon?: ReactNode;
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
};

export default function PageHeader({
  icon,
  title,
  breadcrumbs = [],
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row gap-4 justify-between mb-4",
        className,
      )}
    >
      {/* Left: Icon + Title */}
      <div className="text-[#26553f] flex items-center gap-2">
        {icon}
        <h1 className="text-lg font-semibold text-gray-600 dark:text-white">
          {title}
        </h1>
      </div>

      {/* Right: Breadcrumbs */}
      <div className="flex items-center text-gray-500 dark:text-white text-sm gap-1">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href}>
                <span className="hover:text-primary transition">
                  {item.label}
                </span>
              </Link>
            ) : (
              <span className="text-gray-600 dark:text-white font-semibold">
                {item.label}
              </span>
            )}
            {index < breadcrumbs.length - 1 && (
              <ChevronLeft width={16} height={16} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
