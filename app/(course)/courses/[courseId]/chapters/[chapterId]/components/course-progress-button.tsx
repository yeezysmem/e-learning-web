"use client";

import axios from "axios";
import { CheckCircle2, RotateCcw, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
  grade?: number | null;
  explanation?: string | null;
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
  grade,
  explanation,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfetti();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
          grade,
          explanation,
        }
      );

      // Trigger confetti if completing the final chapter
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      // Navigate to the next chapter if available
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success(isCompleted ? "Marked as incomplete" : "Chapter completed!");
      router.refresh();
    } catch {
      toast.error("Failed to update progress");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? RotateCcw : CheckCircle2;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "default"}
      className={`w-full md:w-auto flex items-center justify-center gap-x-2 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all ${
        isCompleted
          ? "border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
          : "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
      }`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        <>
          <span>{isCompleted ? "Mark Incomplete" : "Mark as Complete"}</span>
          <Icon className="h-4 w-4 shrink-0" />
        </>
      )}
    </Button>
  );
};
