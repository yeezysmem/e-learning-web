"use client";

import { useState } from "react";
import { X, Menu, BookOpen, Sparkles } from "lucide-react";
import { CourseProgress } from "@/app/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
import LinkBack from "../chapters/[chapterId]/components/link-back";
import { cn } from "@/lib/utils";

interface CourseSidebarProps {
  course: {
    title: string;
    id: string;
    chapters: {
      id: string;
      title: string;
      isFree: boolean;
      chapterType?: string | null;
      userProgress: { isCompleted: boolean }[] | null;
    }[];
  };
  progressCount: number;
  isPurchased: boolean | any;
}

export const CourseSidebar = ({
  course,
  progressCount,
  isPurchased,
}: CourseSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const hasPurchased = !!isPurchased;

  return (
    <>
      <button
        className="p-2.5 fixed top-4 left-4 z-50 bg-white border border-gray-200 shadow-sm rounded-xl md:hidden text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        onClick={toggleSidebar}
        aria-label="Toggle Course Menu"
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
          "fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:w-full",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b md:hidden flex items-center justify-between bg-gray-50">
            <LinkBack href="/">Back to Dashboard</LinkBack>
          </div>

          <div className="p-6 border-b border-gray-100 space-y-3">
            <div className="flex items-center gap-x-2 text-xs font-semibold text-purple-600">
              <BookOpen className="w-4 h-4" />
              <span>{course.chapters.length} Chapters</span>
            </div>
            
            <h1 className="font-bold text-lg text-gray-900 leading-snug">
              {course.title}
            </h1>

            {hasPurchased && (
              <div className="pt-2">
                <CourseProgress variant="success" value={progressCount} size="sm" />
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
            {course.chapters.map((chapter) => (
              <div key={chapter.id} onClick={() => setIsOpen(false)}>
                <CourseSidebarItem
                  id={chapter.id}
                  label={chapter.title}
                  isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                  courseId={course.id}
                  isLocked={!chapter.isFree && !hasPurchased}
                  chapterType={chapter.chapterType || ""}
                />
              </div>
            ))}
          </div>

          {!hasPurchased && (
            <div className="p-4 m-3 border border-amber-200 bg-amber-50 rounded-xl">
              <div className="flex items-center gap-x-2 text-amber-800 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Preview Mode</span>
              </div>
              <p className="text-[11px] text-amber-700 mt-1">
                Unlock full access to all chapters and interactive tasks by enrolling in this course.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
