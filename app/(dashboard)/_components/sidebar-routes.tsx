"use client";

import { Layout, Compass, List, BarChart, Settings } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react"; 

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
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isTeacherPage = pathname?.includes("/teacher");

  // Ensure only the teacher with example@gmail.com can see teacherRoutes
  const routes = session?.user?.email === "yeezysmem@gmail.com" && isTeacherPage 
    ? teacherRoutes 
    : guestRoutes;

  const [isLabelVisible, setIsLabelVisible] = useState(true);

  return (
    <div>
      {session ? (
        <div>
          <div className="flex justify-center text-sm font-[300] ">
            <button onClick={() => signOut()} className="text-black">
              Sign out
            </button>
          </div>
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
