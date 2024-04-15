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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { Editor } from "@/components/editor";
import Editor from "@monaco-editor/react";
import { Preview } from "@/components/preview";

interface TaskCodeSnippetProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
  defaultLanguage: string;
}

const formSchema = z.object({
  codeSnippet: z.string().min(1),
});

export const TaskCodeSnippet = ({
  initialData,
  courseId,
  chapterId,
  defaultLanguage,
}: TaskCodeSnippetProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codeSnippet: initialData?.codeSnippet || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-gray-400 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <span className="font-bold"> Code Snippet</span>
      </div>
      <div className="pt-4">
          <Editor
            height="20vh"
            width="100%"
            defaultLanguage={defaultLanguage}
            defaultValue="// some comment"
            theme="white"
          />
          <div className="grid items-center pt-2">
            <Button disabled={!isValid || isSubmitting} type="submit" >
              Save
            </Button>
          </div>
        </div>
      {/* {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.codeSnippet && "text-slate-500 italic"
          )}
        >
          {!initialData.codeSnippet && "Describe your task here..."}
          {initialData.codeSnippet && (
            <Preview value={initialData.codeSnippet} />
          )}
        </div>
      )}
      {isEditing && (
        <div className="pt-4">
          <Editor
            height="20vh"
            width="100%"
            defaultLanguage={defaultLanguage}
            defaultValue="// some comment"
            theme="vs-dark"
          />
          <div className="flex items-center gap-x-2">
            <Button disabled={!isValid || isSubmitting} type="submit" >
              Save
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
};
