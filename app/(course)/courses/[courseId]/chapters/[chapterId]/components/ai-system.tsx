"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import parse from "html-react-parser";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileCode2, Bot, Play, Send } from "lucide-react";

import { compileCode } from "@/actions/compile-code";
import EditorOutput from "./code-output";
import PayWarning from "@/public/neetdopay.svg";

interface AssistantFormProps {
  chapterId: string;
  courseId: string;
  taskCriteria: string;
  rightAnswer: string;
  grade: number;
  explanation: string;
  isLocked: boolean;
  taskDescription: string;
  defaultLanguage: string;
  codeSnippet: string;
  isCompleted?: boolean;
  languageVersion?: string;
  chapterImage?: string;
}

export default function AssistantForm({
  taskCriteria,
  chapterId,
  courseId,
  explanation,
  isLocked,
  taskDescription,
  defaultLanguage,
  codeSnippet,
}: AssistantFormProps) {
  const router = useRouter();
  const [responseText, setResponseText] = useState("");
  const [displayedText, setDisplayedText] = useState(explanation || "");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(codeSnippet);
  const [output, setOutput] = useState("");

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    fontFamily: "Fira Code, monospace",
    lineNumbers: "on",
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    padding: { top: 12 },
  };

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    const savedCode = localStorage.getItem(`userCode_${chapterId}`);
    if (savedCode) {
      editor.setValue(savedCode);
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      localStorage.setItem(`userCode_${chapterId}`, value);
    }
  };

  useEffect(() => {
    if (responseText) {
      return printTextGradually(responseText, 30);
    }
  }, [responseText]);

  // Універсальна функція для витягування чистого тексту з будь-якого формату відповіді бекенду
  function extractTextContent(data: unknown): string {
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        return extractTextContent(parsed);
      } catch {
        return data;
      }
    }
    if (Array.isArray(data)) {
      return data
        .map((item) => {
          if (typeof item === "string") return item;
          if (item && typeof item === "object") {
            if ("text" in item && typeof (item as { text: unknown }).text === "string") {
              return (item as { text: string }).text;
            }
            return JSON.stringify(item);
          }
          return "";
        })
        .join("\n");
    }
    if (data && typeof data === "object") {
      if ("text" in data && typeof (data as { text: unknown }).text === "string") {
        return (data as { text: string }).text;
      }
      if ("response" in data) {
        return extractTextContent((data as { response: unknown }).response);
      }
    }
    return String(data || "");
  }

  function printTextGradually(fullText: unknown, speed: number) {
    const cleanText = extractTextContent(fullText);
    const words = cleanText.split(" ");
    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => prev + (prev ? " " : "") + words[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }

  async function executeCode() {
    if (!editorRef.current) return;
    const currentCode = editorRef.current.getValue();

    try {
      setLoading(true);
      const result = await compileCode({
        language: defaultLanguage.toLowerCase(),
        files: [{ content: currentCode }],
      });

      if (result?.run?.output !== undefined) {
        setOutput(result.run.output);
        toast.success("Code executed successfully!");
      } else {
        setOutput("No output returned.");
      }
    } catch {
      toast.error("Failed to compile code");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendMessage() {
    try {
      setLoading(true);
      const userCode = editorRef.current ? editorRef.current.getValue().trim() : "";
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

      const response = await axios.post(
        `${apiUrl}/api/generate-text/`,
        {
          prompt: taskCriteria || "Please give feedback on my code solution.",
          user_code: userCode,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const rawResponse = response.data.response;
      const aiFeedback = extractTextContent(rawResponse);

      setResponseText(aiFeedback);

      // Save user progress in DB
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: true,
          explanation: aiFeedback,
        }
      );

      toast.success("Solution submitted & progress saved!");
      router.refresh();
    } catch {
      toast.error("AI Mentor service unavailable");
    } finally {
      setLoading(false);
    }
  }

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 p-12 rounded-xl border border-dashed border-gray-300 text-center space-y-4">
        <Image src={PayWarning} width={160} height={80} alt="Pay to unlock" />
        <div className="space-y-1">
          <h3 className="font-bold text-gray-900">Chapter Locked</h3>
          <p className="text-xs text-gray-500">
            Please enroll in this course to access interactive coding tasks and AI feedback.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Task Description */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700">
          Practical Task
        </h3>
        <div className="text-sm text-gray-800 leading-relaxed prose max-w-none">
          {parse(taskDescription || "Follow the instructions below.")}
        </div>
      </div>

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-x-2 text-gray-900 font-bold">
          <FileCode2 className="w-5 h-5 text-purple-600" />
          <span>Code Workspace</span>
        </div>

        <div className="flex items-center gap-x-3">
          <Button
            onClick={executeCode}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-x-2 border-purple-600 text-purple-700 hover:bg-purple-50 text-xs font-semibold px-4 py-2 rounded-lg"
          >
            <Play className="w-4 h-4 fill-purple-700" />
            <span>Run Code</span>
          </Button>

          <Button
            onClick={handleSendMessage}
            disabled={loading}
            className="flex items-center gap-x-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? "Evaluating..." : "Submit & AI Check"}</span>
          </Button>
        </div>
      </div>

      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[550px]">
        {/* Monaco Editor */}
        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-gray-800 flex flex-col h-full shadow-sm">
          <div className="bg-black/80 px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-300 uppercase">
              {defaultLanguage} Environment
            </span>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage={defaultLanguage.toLowerCase()}
              defaultValue={code}
              onMount={handleEditorDidMount}
              onChange={handleEditorChange}
              options={editorOptions}
            />
          </div>
        </div>

        {/* Console Output */}
        <div className="h-full">
          <EditorOutput
            editorRef={editorRef}
            language={defaultLanguage}
            handleSendMessage={handleSendMessage}
            userCode={editorRef.current?.getValue()}
            output={output}
          />
        </div>
      </div>

      {/* AI Mentor Feedback Box */}
      <div className="bg-black border border-gray-800 rounded-xl p-5 text-green-400 space-y-3 shadow-md">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-x-2">
            <Bot className="w-6 h-6 text-purple-400" />
            <h3 className="text-sm font-bold text-white">AI Mentor Feedback</h3>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-x-3 text-xs text-gray-400 py-4">
            <Bot className="w-5 h-5 text-purple-400 animate-spin" />
            <span className="animate-pulse">Analyzing code solution and criteria...</span>
          </div>
        ) : displayedText ? (
          <div className="text-xs leading-relaxed text-gray-200 prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {displayedText}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-xs text-gray-500 italic py-2">
            Run your code and click &quot;Submit & AI Check&quot; to receive automated feedback.
          </p>
        )}
      </div>
    </div>
  );
}
