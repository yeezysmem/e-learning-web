"use client";

import axios from "axios";
import { CheckCircle2, RotateCcw, Loader2, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";

interface ExamProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
  grade?: number | null;
  explanation?: string | null;
}

export const ExamProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
  grade,
  explanation,
}: ExamProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfetti();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          courseId,
          chapterId,
          isCompleted: !isCompleted,
          grade,
          explanation,
        }
      );

      // Запуск конфеті при успішному складанні останнього іспиту
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      // Перехід до наступного глави/уроку
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success(isCompleted ? "Exam status reset" : "Exam completed!");
      router.refresh();
    } catch {
      toast.error("Failed to update exam progress");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? RotateCcw : CheckCircle2;

  return (
    <div className="flex items-center gap-x-3 w-full md:w-auto">
      {/* Відображення балу за іспит, якщо він присутній */}
      {grade !== undefined && grade !== null && (
        <div className="hidden sm:flex items-center gap-x-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-800 rounded-lg text-xs font-semibold">
          <Award className="w-4 h-4 text-purple-600" />
          <span>Score: {grade}/10</span>
        </div>
      )}

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
            <span>{isCompleted ? "Retake Exam" : "Complete Exam"}</span>
            <Icon className="h-4 w-4 shrink-0" />
          </>
        )}
      </Button>
    </div>
  );
};
