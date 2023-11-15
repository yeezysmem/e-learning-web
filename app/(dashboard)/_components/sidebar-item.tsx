"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname === '/' && href === '/') || (pathname !== '/' && href !== '/' && pathname?.startsWith(`${href}/`));
    const handleClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick={handleClick}
            type="button"
            className={`flex items-center justify-center w-full h-14 rounded-md focus:outline-none text-text ${isActive ? 'bg-primary' : 'hover:bg-sidebarLink text-primary'}`}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-primary"
                    )}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-primary h-full transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    )
}