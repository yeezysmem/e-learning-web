"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const [isLabelVisible, setIsLabelVisible] = useState(true);
  const [isAction, setIsAction] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleHide = () => {
    setIsLabelVisible(!isLabelVisible); // Перемикає видимість лейбла
    setIsAction(!isAction); // Змінює стиль кнопки при натисканні
  };

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
        "flex w-full text-[#222] text-sm transition-all duration-400 hover:bg-gray-200 rounded-2xl mt-4 font-medium pr-3",
        isActive && "text-white bg-black hover:bg-gray-900"
      )}
    >
      <span className="flex items-center justify-center gap-x-2 py-3 px-3">
        <Icon
          size={22}
          className={cn("text-black", isActive && "text-white")}
        />
        {isLabelVisible && label}
      </span>
    </button>
  );
};
