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
  chapterType?: string;
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
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
        "flex items-center gap-x-3 text-gray-600 text-xs font-semibold px-4 py-3.5 w-full transition-all duration-200 relative group rounded-lg my-0.5",
        "hover:bg-gray-100 hover:text-gray-900",
        isActive && "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700 font-bold",
        isCompleted && "text-emerald-800 hover:text-emerald-900",
        isCompleted && isActive && "bg-emerald-50/80 text-emerald-900"
      )}
    >
      <div className="flex items-center gap-x-2.5 min-w-0 flex-1">
        <Icon
          size={16}
          className={cn(
            "text-gray-400 shrink-0 transition-colors group-hover:text-gray-700",
            isActive && "text-purple-600 group-hover:text-purple-600",
            isCompleted && "text-emerald-600 group-hover:text-emerald-600",
            isLocked && "text-gray-400"
          )}
        />
        <span className="truncate text-left leading-tight">{label}</span>
      </div>

      <div
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-transparent transition-all duration-200 opacity-0",
          isActive && "bg-purple-600 opacity-100",
          isCompleted && isActive && "bg-emerald-600"
        )}
      />
    </button>
  );
};
