"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { FileJson } from "lucide-react";
import { CircleDashed } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
// import Router from "next/navigation";
import { OpenAI } from "openai";
import { Lock } from "lucide-react";
import PayWarning from "@/public/neetdopay.svg";
import Image from "next/image";
import EditorOutput from "./code-output";
import { FileCode2 } from "lucide-react";
import { Bot } from "lucide-react";
import { compileCode } from "@/actions/compile-code";
import { Play, Zap } from "lucide-react";

interface AssistantFormProps {
  chapterId: string;
  courseId: string;
  taskCriteria: string;
  rightAnswer: string;
  initialData: Chapter;
  grade: number;
  explanation: string;
  isLocked: boolean;
  taskDescription: string;
  defaultLanguage: string;
  codeSnippet: string;
  isCompleted?: boolean;
  languageVersion?: string;
}

function AssistantForm({
  taskCriteria,
  chapterId,
  courseId,
  grade,
  explanation,
  isLocked,
  taskDescription,
  defaultLanguage,
  codeSnippet,
  isCompleted,
  languageVersion,
}: AssistantFormProps) {
  const [responseText, setResponseText] = useState("");
  const [isReady, setIsReady] = useState(false);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [editorOptions, setEditorOptions] = useState({
    fontSize: 14,
    fontFamily: "Fira Code, monospace",
    lineNumbers: "on",
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
  });
  const [output, setOutput] = useState("");
  const placeholder = codeSnippet;

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function handleSendMessage() {
    try {
      setLoading(true);
      const userCode = editorRef.current.getValue();
      const openai = new OpenAI({
        apiKey: "pk-ZEdsByaTwSOuLxLdcBZnxVglrGdQEiCKTUosWRHULGYsUCwJ",
        baseURL: "https://api.pawan.krd/pai-001/v1",
        dangerouslyAllowBrowser: true,
      });

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `evaluate the provided code ${userCode} without considering any comments,
             any additional information. Please assign a grade to the code based on the following criteria: ${taskCriteria}.
              If the code does not meet the specified criteria, assign it a score of 0 points.Its must be int between 0 and 10.
               Your answer should be Grade: and why you gave that grade.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const response = chatCompletion.choices[0].message.content;
      setResponseText(response);

      const grade = response;
      const gradeMatch = response.match(/Grade: (\d+)/);

      const intGrade = gradeMatch ? parseInt(gradeMatch[1]) : null;

      const completed = intGrade > 5 ? true : false;
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          courseId: courseId,
          chapterId: chapterId,
          isCompleted: completed,
          grade: intGrade,
          explanation: response,
        }
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const onProgress = async () => {
    try {
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          courseId: courseId, // Include courseId in the request body
          chapterId: chapterId,
          isCompleted: !isCompleted,
          grade: grade,
          explanation: explanation,
        }
      );
    } catch {
      toast.error("Something went wrong");
    }
  };

  async function executeCode() {
    const requestData = {
      language: defaultLanguage.toLowerCase(),
      version: "3.10.0",
      files: [
        {
          name: "my_cool_code",
          content: editorRef.current.getValue(),
        },
      ],
    };
    try {
      const result = await compileCode(requestData);
      setOutput(result.run.output);
      console.log(result);
      toast.success("Compiled Successfully");
    } catch (error) {
      toast.error("Failed to compile the Code");
      console.log(error);
    }
  }

  const getRuntimes = async () => {
    try {
      const response = await axios.get(
        "https://emkc.org/api/v2/piston/runtimes"
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching runtimes:", error);
    }
  };

  return (
    <>
      {isLocked && (
        <div className="flex items-center justify-center bg-gray-100 flex-col gap-y-2 text-secondary pt-20 pb-20 mb-6 rounded-lg border">
          <Image
            src={PayWarning}
            width={120}
            height={100}
            alt="Pay to unlock"
          />
          <p className="text-sm mt-5">This chapter is locked</p>
          <Button>Enroll now</Button>
        </div>
      )}
      {!isLocked && (
        <div>
          <div className="p-4 bg-gray-50 border border-gray-300 rounded-md">
            <pre className="font-bold uppercase">Task description</pre>
            <div
              className="text-md pt-2 pb-2"
              dangerouslySetInnerHTML={{ __html: taskDescription }}
            />
          </div>
          <div className="flex gap-2 items-center mt-6 justify-between">
            <div className="flex gap-2">
              <FileCode2 className="w-7 h-7" />
              <h1 className="text-xl font-bold">Practical part</h1>
            </div>
            <div className="flex items-center gap-3 my-4">
              <Button
                onClick={executeCode}
                className="bg-purple-600 hover:bg-purple-800"
              >
                <Play size={15} /> 
                <span className="pl-1">Run Code</span>
              </Button>
              <Button
                onClick={handleSendMessage}
                // className="bg-green-600 hover:bg-green-800"
              >
                <Zap />
                <span className="pl-1 text-sm">Sumbit code</span>
              </Button>
              <Button onClick={getRuntimes}>getRuntimes</Button>
            </div>
          </div>
          <div className="flex flex-col pt-2">
            <div className="bg-[#1E1E1E] rounded-md w-full h-[50vh] flex flex-col">
              <div className="bg-black p-2 rounded-t-md">
                <span className="text-white text-md">{defaultLanguage}</span>
              </div>
              <div className="flex-1 mt-2">
                <Editor
                  height="100%" // The editor will take up 100% of the container's height
                  theme="vs-dark"
                  defaultLanguage={defaultLanguage}
                  defaultValue={placeholder}
                  onMount={handleEditorDidMount}
                  loading="Loading"
                  options={editorOptions}
                />
              </div>
            </div>
            <div className="mt-4">
              <EditorOutput
                editorRef={editorRef}
                language="python"
                handleSendMessage={handleSendMessage}
                languageVersion="3.10.0"
                userCode={editorRef.current?.getValue()}
                output={output}
              />
            </div>
          </div>

          <div className="grid pb-5">
            <div className="flex items-center justify-center p-3">
              {loading && <CircleDashed size={30} className="animate-spin" />}
            </div>
            <div>
              <div className="max-h-80 overflow-y-auto bg-black border border-gray-300 p-4 rounded-md">
                {explanation ? (
                  <pre className="whitespace-pre-wrap break-words text-green-500">
                    <div className="flex gap-2 items-center mb-6 ">
                      <Bot className="w-8 h-8" />
                      <h1 className="text-xl font-bold">AI Response</h1>
                    </div>
                    <span className="font-bold">Explanation:</span>
                    {explanation}
                  </pre>
                ) : (
                  <div className="text-sm text-green-300 flex items-center gap-2">
                    <span className="relative inline-flex items-center justify-center h-5 w-5">
                      {/* <span className="absolute inset-0 animate-pulse rounded-full bg-green-300 z-10"></span> */}
                      <Bot className="w-6 h-6 relative z-20 animate-pulse" />
                    </span>
                    <span className="animate-pulse">
                      I'm waiting for your sollution
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default AssistantForm;
