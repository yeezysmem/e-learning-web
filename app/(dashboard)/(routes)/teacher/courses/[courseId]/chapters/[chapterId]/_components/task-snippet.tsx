"use client";

import axios from "axios";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import * as monaco from "monaco-editor";
import Editor from "@monaco-editor/react";
import { Code2, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TaskCodeSnippetProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
  defaultLanguage: string;
}

export const TaskCodeSnippet = ({
  initialData,
  courseId,
  chapterId,
  defaultLanguage,
}: TaskCodeSnippetProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const router = useRouter();

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  async function handleSendSnippet() {
    try {
      setIsLoading(true);
      const codeSnippet = editorRef.current?.getValue();

      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        codeSnippet,
      });

      toast.success("Code snippet updated successfully");
      router.refresh();
    } catch {
      toast.error("Failed to save code snippet");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6 border border-gray-200 bg-white rounded-xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="font-bold flex items-center justify-between text-gray-900 text-sm">
        <div className="flex items-center gap-x-2">
          <Code2 className="w-4 h-4 text-purple-600" />
          <span>
            {defaultLanguage
              ? `${defaultLanguage} Code Snippet`
              : "Code Snippet (Select language first)"}
          </span>
        </div>
      </div>

      {/* Editor Box */}
      <div className="space-y-3 pt-1">
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <Editor
            height="220px"
            width="100%"
            defaultLanguage={defaultLanguage?.toLowerCase() || "javascript"}
            defaultValue={initialData?.codeSnippet || "// Write your initial code snippet here..."}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 12,
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button
            onClick={handleSendSnippet}
            disabled={isLoading}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-x-1.5"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Snippet</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
