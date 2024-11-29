"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  chapterType: string;
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
  chapterType,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-main text-sm font-[500] pl-6 transition-all hover:text-purple-600 hover:bg-purple-300/20",
        isActive &&
          "text-main bg-purple-200/20 hover:bg-purple-200/20 hover:text-purple-700", // Active styles
        isCompleted && "text-emerald-700 hover:text-emerald-700", // Completed styles
        isCompleted && isActive && "bg-green-200" // Completed and active styles
      )}
    >
      <div className="flex items-center gap-x-2 py-4 ml-0">
        <Icon
          size={18}
          className={cn(
            "text-main",
            isActive && "text-main",
            isCompleted && "text-emerald-700"
          )}
        />
        <span className="text-xs text-left">{label}</span>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0  h-full transition-all",
          isActive && "opacity-100 border-animate", // Trigger animation when active
          isCompleted && "border-emerald" // Use emerald color if completed
        )}
      />
    </button>
  );
};
