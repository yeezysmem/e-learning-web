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
        "flex w-full  text-text text-sm font-[400] transition-all hover:text-white hover:bg-slate-300/20",
        isActive && "text-sidebarLinkHover bg-sidebarLink hover:bg-sidebarLink hover:text-white"
      )}
    >
      <span className="flex items-center justify-center gap-x-2 py-3 px-3">
        {/* <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-primary")}
        /> */}
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
