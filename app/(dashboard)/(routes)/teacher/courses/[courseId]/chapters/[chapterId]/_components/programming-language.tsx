"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, Code, Loader2 } from "lucide-react";
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
import { ReverseCombobox } from "@/components/ui/reverseCombobox";
import { cn } from "@/lib/utils";

interface ProgrammingLanguagesFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  programmingLanguageId: z.string().min(1, { message: "Language is required" }),
});

export const ProgrammingLanguagesForm = ({
  initialData,
  courseId,
  chapterId,
  options,
}: ProgrammingLanguagesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programmingLanguageId: initialData?.programmingLanguageId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Programming language updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.programmingLanguageId
  );

  return (
    <div className="mt-6 border border-gray-200 bg-white rounded-xl p-5 shadow-sm space-y-3">
      {/* Header */}
      <div className="font-bold flex items-center justify-between text-gray-900 text-sm">
        <div className="flex items-center gap-x-2">
          <Code className="w-4 h-4 text-purple-600" />
          <span>Programming Language</span>
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
              Edit Language
            </>
          )}
        </Button>
      </div>

      {/* Read View */}
      {!isEditing && (
        <p
          className={cn(
            "text-xs font-semibold text-gray-800 pt-1",
            !initialData.programmingLanguageId && "text-gray-400 italic font-normal"
          )}
        >
          {selectedOption?.label || selectedOption?.value || "No programming language selected"}
        </p>
      )}

      {/* Edit Form */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="programmingLanguageId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ReverseCombobox options={options} {...field} />
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
                  "Save Language"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
