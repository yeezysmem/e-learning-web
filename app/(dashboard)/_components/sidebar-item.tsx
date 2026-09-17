"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const handleClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 w-full text-sm font-medium transition-all text-gray-500 rounded-xl px-3 py-2.5 hover:text-gray-900 hover:bg-gray-100/80",
        isActive &&
          "text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800 font-semibold"
      )}
    >
      <div className="flex items-center gap-x-3">
        <Icon
          size={20}
          className={cn(
            "text-gray-500 transition-colors",
            isActive && "text-purple-700"
          )}
        />
        <span className="truncate">{label}</span>
      </div>

      {/* Активний індикатор смужки справа (опціонально для сучасного UI) */}
      {isActive && (
        <div className="ml-auto w-1.5 h-5 bg-purple-700 rounded-full" />
      )}
    </button>
  );
};
