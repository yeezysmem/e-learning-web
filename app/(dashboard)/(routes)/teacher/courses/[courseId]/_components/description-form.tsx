"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, AlignLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData?.description || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course description updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Failed to update description");
    }
  };

  return (
    <div className="mt-6 border border-gray-200 bg-white rounded-xl p-5 shadow-sm space-y-3">
      {/* Header */}
      <div className="font-bold flex items-center justify-between text-gray-900 text-sm">
        <div className="flex items-center gap-x-2">
          <AlignLeft className="w-4 h-4 text-purple-600" />
          <span>Course Description</span>
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
              Edit
            </>
          )}
        </Button>
      </div>

      {/* Read View */}
      {!isEditing && (
        <p
          className={cn(
            "text-xs leading-relaxed text-gray-700 pt-1",
            !initialData.description && "text-gray-400 italic"
          )}
        >
          {initialData.description || "No description provided yet."}
        </p>
      )}

      {/* Edit Form */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course covers full-stack web development from scratch using Next.js and Tailwind...'"
                      className="text-xs rounded-lg border-gray-200 focus-visible:ring-purple-600 min-h-[100px] resize-none"
                      {...field}
                    />
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
