"use client";

import axios from "axios";
import { Trash, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({
  disabled,
  courseId,
  isPublished,
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfetti();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published!");
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={isPublished ? "outline" : "default"}
        size="sm"
        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
          !isPublished && !disabled
            ? "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
            : ""
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isPublished ? (
          "Unpublish"
        ) : (
          "Publish"
        )}
      </Button>

      <Button
        onClick={onDelete}
        size="sm"
        disabled={isLoading}
        variant="outline"
        className="border-gray-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors p-2 rounded-lg"
        aria-label="Delete Course"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
