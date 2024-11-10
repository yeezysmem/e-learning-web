"use client"
import { SidebarRoutes } from "./sidebar-routes";
import Logo from "./logo";
import { NavbarRoutes } from "@/components/navbar-routes";
import Link from "next/link";
import { useState } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    
    <div className="overflow-auto p-4 rounded-md ">
      <Link href={'/'}>
        <span className="text-2xl font-bold flex justify-center pt-2 cursor-pointer">SkillUP</span>
      </Link>
      <div className="flex flex-col flex-grow w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
