"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
        "flex w-full  text-[#222] text-sm transition-all duration-400 hover:bg-slate-300/20 rounded-2xl mt-4 font-medium pr-3",
        isActive && "text-[#222] bg-sidebarLink hover:bg-sidebarLink"
      )}
    >
      <span className="flex items-center justify-center gap-x-2 py-3 px-3">
        <Icon
          size={22}
            className={cn("text-[#222]", isActive && "text-[#222]")}
        />
        {label}
      </span>
      {/* <div
        className={cn(
          "ml-auto opacity-0 border-2 border-primary h-full transition-all",
          isActive && "opacity-100"
        )}
      /> */}
    </button>
  );
};
