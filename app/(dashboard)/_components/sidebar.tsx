"use client";

import { SidebarRoutes } from "./sidebar-routes";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightFromLine, ArrowLeftToLine,AlignJustify, X } from "lucide-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="p-2 fixed top-4 left-4 z-20 bg-gray-200 rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <AlignJustify />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-full p-10 bg-white shadow-lg z-10 transform transition-transform duration-300 md:relative md:p-0 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="overflow-auto p-4 rounded-md">
          <Link href={"/"}>
            <span className="text-2xl font-bold flex justify-center pt-2 cursor-pointer">
              SkillUP
            </span>
          </Link>
          <div className="flex flex-col flex-grow w-full">
            <SidebarRoutes />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5  md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};
