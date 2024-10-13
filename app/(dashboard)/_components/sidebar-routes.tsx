"use client";

import { Layout, Compass, List, BarChart, Settings } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Search",
    href: "/search",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
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
  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div>
      {session ? (
        <div>
          
          {/* <div className="flex justify-center text-sm font-[300] ">
            <button onClick={() => signOut()} className="text-sidebarLink">
              Sign out
            </button>
          </div> */}
        </div>
      ) : (
        <div className="flex justify-center">
          <button onClick={() => signIn()} className="text-sidebarLink">
            Sign in
          </button>
        </div>
      )}

      <div className="mt-16">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      </div>
    </div>
  );
};
