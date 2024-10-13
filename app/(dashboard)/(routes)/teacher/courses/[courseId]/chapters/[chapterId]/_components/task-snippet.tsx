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
import { useRef, useEffect } from "react";

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
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";


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



  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function handleSendSnippet() {
    try {
      const codeSnippet = editorRef.current.getValue();

      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        codeSnippet,
      });

      toast.success("Your snippet has been submitted");
      // router.reload();
    } catch (error) {
      // console.error("Error sending snippet:", error);
      // toast.error("Something went wrong");
    } 
  }

  return (
    <div className="mt-6 border bg-white rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">
          {defaultLanguage ? (
            <span>{defaultLanguage} snippet</span>
          ) : (
            <span>Choose programming language</span>
          )}
        </div>
      </div>
      <div className="pt-4">
        <div className="bg-[#222222] p-2 rounded-md"><Editor
          height="20vh"
          width="100%"
          defaultLanguage={defaultLanguage}
          defaultValue={initialData?.codeSnippet || "//"}
          theme="vs-dark"
          onMount={handleEditorDidMount}
        /></div>
        <div className="grid items-center pt-2">
        <Button onClick={handleSendSnippet}>Sumbit</Button>
        </div>
      </div>
    </div>
  );
};
