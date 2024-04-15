"use client";

import { Layout, Compass, List, BarChart } from "lucide-react";
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
    label: "Browse",
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
  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="bg-primary">
      {session ? (
        <div>
          <div className="flex justify-center">
            <Image
              src={session?.user?.image}
              alt="Picture of the author"
              width={90}
              height={90}
              className="rounded-sm"
            />
          </div>
          <div className="flex justify-center">
            <p className="text-text mt-3 text-xs">{session?.user?.name}</p>
          </div>
          <div className="flex justify-center text-sm font-[300] ">
            <button onClick={() => signOut()} className="text-sidebarLink">
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

      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
