"use client";

import { SidebarRoutes } from "./sidebar-routes";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-3 left-3 z-50 p-2.5 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-x-2">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-lg shadow-sm">
                S
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Skill<span className="text-purple-600">UP</span>
              </span>
            </Link>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-full">
              LMS
            </span>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            <SidebarRoutes />
          </div>
          <div className="p-4 border-t border-gray-100 m-4 rounded-xl bg-gradient-to-br from-purple-50 via-indigo-50 to-white border">
            <div className="flex items-center gap-x-2 mb-1 text-purple-900 font-semibold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>AI Assistant Active</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Get real-time code help and mentorship inside your lessons.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
