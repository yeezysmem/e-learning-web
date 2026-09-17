"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle, ListChecks } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { ChaptersList } from "./chapters-list";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export const ChaptersForm = ({
  initialData,
  courseId,
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      form.reset();
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Failed to create chapter");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Failed to reorder chapters");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}/chapterType`);
  };

  return (
    <div className="relative mt-6 border border-gray-200 bg-white rounded-xl p-5 shadow-sm space-y-4">
      {/* Reorder Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-purple-600" />
        </div>
      )}

      {/* Header */}
      <div className="font-bold flex items-center justify-between text-gray-900 text-sm">
        <div className="flex items-center gap-x-2">
          <ListChecks className="w-4 h-4 text-purple-600" />
          <span>Course Chapters</span>
        </div>

        <Button
          onClick={toggleCreating}
          variant="ghost"
          size="sm"
          className="text-xs font-semibold hover:bg-gray-100 rounded-lg"
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Add Chapter
            </>
          )}
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 pt-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      className="text-xs rounded-lg border-gray-200 focus-visible:ring-purple-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-500" />
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Chapter"}
            </Button>
          </form>
        </Form>
      )}

      {/* Chapters List */}
      {!isCreating && (
        <div className={cn("text-xs pt-1", !initialData.chapters.length && "text-gray-400 italic")}>
          {!initialData.chapters.length ? (
            "No chapters created yet."
          ) : (
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.chapters || []}
            />
          )}
        </div>
      )}

      {/* Drag & Drop Reorder Hint */}
      {!isCreating && !!initialData.chapters.length && (
        <p className="text-[11px] text-gray-400 italic pt-1">
          Drag and drop chapters to reorder them for students.
        </p>
      )}
    </div>
  );
};
