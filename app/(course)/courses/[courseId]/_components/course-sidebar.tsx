"use client";

import { useState } from "react";
import { X, AlignJustify } from "lucide-react";
import { CourseProgress } from "@/app/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";

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
  isPurchased: boolean;
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

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="p-2 fixed top-4 left-4 z-20 bg-gray-200 rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <AlignJustify />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full p-8 bg-white shadow-lg z-10 transform transition-transform duration-300 md:relative md:p-0 md:w-78 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b">
          <h1 className="font-semibold text-2xl">{course.title}</h1>
          {isPurchased && (
            <div className="mt-4">
              <CourseProgress variant="success" value={progressCount} />
            </div>
          )}
        </div>
        <div className="flex flex-col overflow-y-auto">
          {course.chapters.map((chapter) => (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !isPurchased}
              chapterType={chapter.chapterType || ""}
            />
          ))}
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};
