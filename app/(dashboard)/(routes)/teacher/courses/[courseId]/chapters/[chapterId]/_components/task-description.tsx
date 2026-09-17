"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";

interface TaskDescriptionProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  taskDescription: z.string().min(1, { message: "Task description is required" }),
});

export const TaskDescription = ({
  initialData,
  courseId,
  chapterId,
}: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskDescription: initialData?.taskDescription || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Task description updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-gray-200 bg-white rounded-xl p-5 shadow-sm space-y-3">
      {/* Header */}
      <div className="font-bold flex items-center justify-between text-gray-900 text-sm">
        <div className="flex items-center gap-x-2">
          <FileText className="w-4 h-4 text-purple-600" />
          <span>Task Description</span>
        </div>

        <Button
          onClick={toggleEdit}
          variant="ghost"
          size="sm"
          className="text-xs font-semibold hover:bg-gray-100 rounded-lg"
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Edit Description
            </>
          )}
        </Button>
      </div>

      {/* Read View */}
      {!isEditing && (
        <div
          className={cn(
            "text-xs pt-1 text-gray-700",
            !initialData.taskDescription && "text-gray-400 italic font-normal"
          )}
        >
          {!initialData.taskDescription && "Describe your task here..."}
          {initialData.taskDescription && (
            <Preview value={initialData.taskDescription} />
          )}
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="taskDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-500" />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save Description"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
