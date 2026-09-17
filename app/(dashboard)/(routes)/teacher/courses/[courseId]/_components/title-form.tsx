"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, Heading, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course title updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Failed to update title");
    }
  };

  return (
    <div className="mt-6 border border-gray-200 bg-white rounded-xl p-5 shadow-sm space-y-3">
      {/* Header */}
      <div className="font-bold flex items-center justify-between text-gray-900 text-sm">
        <div className="flex items-center gap-x-2">
          <Heading className="w-4 h-4 text-purple-600" />
          <span>Course Title</span>
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
        <p className="text-xs font-semibold text-gray-800 pt-1">
          {initialData.title}
        </p>
      )}

      {/* Edit Form */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced Web Development'"
                      className="text-xs rounded-lg border-gray-200 focus-visible:ring-purple-600"
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
                  "Save Title"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
