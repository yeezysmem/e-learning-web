"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import clsx, { ClassValue }  from "clsx";
import {ReverseCombobox} from "@/components/ui/reverseCombobox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

interface ProgrammingLanguagesFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
  options: { label: string; value: string }[];
};

const formSchema = z.object({
  programmingLanguageId: z.string().min(1),
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
    defaultValues: { programmingLanguageId: initialData?.programmingLanguageId || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      // toast.error("Something went wrong");
    }
  };

  const selectedOption = options.find((option) => option.value === initialData.programmingLanguageId);
  

  return (
    <div className="mt-6 border bg-white rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <span className="font-bold">Programming language</span>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit 
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className={clsx("text-sm mt-2", !initialData.programmingLanguageId && "text-slate-500 italic")}>{selectedOption?.value || "No Programming languages"}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="programmingLanguageId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ReverseCombobox
                     options={options} 
                     {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};