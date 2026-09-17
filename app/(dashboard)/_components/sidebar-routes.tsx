"use client";

import { Layout, Compass, List, BarChart, LogOut, LogIn, UserCheck, LayoutDashboard } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse Courses",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isTeacher = session?.user?.email === "yeezysmem@gmail.com" || session?.user?.role === "admin";

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col justify-between h-full space-y-6 py-4">
      {/* Primary Navigation Links */}
      <div className="flex flex-col w-full space-y-1.5 px-3">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>

      {/* Teacher Mode Switcher & Account Controls */}
      <div className="pt-4 border-t border-gray-100 space-y-3 px-3">
        {/* Toggle Mode Button for Teacher */}
        {isTeacher && (
          <div>
            {isTeacherPage ? (
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center gap-x-2 border-gray-200 hover:bg-gray-100 text-xs font-semibold py-2 rounded-xl text-gray-700 shadow-sm"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Exit Teacher Mode
                </Button>
              </Link>
            ) : (
              <Link href="/teacher/courses">
                <Button
                  size="sm"
                  className="w-full flex items-center justify-center gap-x-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2 rounded-xl shadow-sm transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Teacher Mode
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Authentication Action */}
        <div>
          {session ? (
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center gap-x-2 px-3 py-2 text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="w-full flex items-center justify-center gap-x-2 px-3 py-2 text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 rounded-xl transition-colors shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
