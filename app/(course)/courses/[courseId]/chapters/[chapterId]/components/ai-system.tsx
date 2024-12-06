"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CircleDashed } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import PayWarning from "@/public/neetdopay.svg";
import Image from "next/image";
import EditorOutput from "./code-output";
import { FileCode2 } from "lucide-react";
import { Bot } from "lucide-react";
import { compileCode } from "@/actions/compile-code";
import { Play, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as monaco from "monaco-editor";
import parse from "html-react-parser";
import "monaco-editor/min/vs/editor/editor.main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';


interface AssistantFormProps {
  chapterId: string;
  courseId: string;
  taskCriteria: string;
  rightAnswer: string;
  // initialData: Chapter;
  grade: number;
  explanation: string;
  isLocked: boolean;
  taskDescription: string;
  defaultLanguage: string;
  codeSnippet: string;
  isCompleted?: boolean;
  languageVersion?: string;
  chapterImage: string;
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
  chapterImage,
}: AssistantFormProps) {
  const [responseText, setResponseText] = useState("");
  const [datailes, setDetailes] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isReady, setIsReady] = useState(false);
  // const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [version, setVersion] = useState<string | null>(null);
  const [test, setTest] = useState("");
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState(codeSnippet);
  const [codeIde, setCodeIde] = useState("")
  const [editorOptions, setEditorOptions] =
    useState<monaco.editor.IStandaloneEditorConstructionOptions>({
      fontSize: 14,
      fontFamily: "Fira Code, monospace",
      lineNumbers: "on" as monaco.editor.LineNumbersType, 
      minimap: { enabled: false },
      automaticLayout: true,
      scrollBeyondLastLine: false,
    });

  const [output, setOutput] = useState("");
  const placeholder = codeSnippet;
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value); // Synchronize the state with editor content
    }
  };

  
  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  useEffect(() => {
    if (responseText) {
      printTextGradually(responseText, 100); 
    }
  }, [responseText]);

  function printTextGradually(fullText: string, speed: number) {
    const words = fullText.split(" "); 
    let index = 0;
    setDisplayedText(""); 

    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => prev + (prev ? " " : "") + words[index]); // Add one word, prepend space if necessary
        index++;
      } else {
        clearInterval(interval); 
      }
    }, speed);


    return () => clearInterval(interval);
  }
  useEffect(() => {
    const savedCode = localStorage.getItem("userCode"); 
    if (savedCode && editorRef.current) {
      editorRef.current.setValue(savedCode); 
    }
  }, []);

  useEffect(() => {
    const getRuntimes = async () => {
      try {
        const response = await axios.get(
          "https://emkc.org/api/v2/piston/runtimes"
        );
        const runtimes = response.data;
        const selectedVersion = runtimes.find(
          (runtime: { language: string }) =>
            runtime.language.toLowerCase() === selectedLanguage.toLowerCase()
        )?.version;

        if (selectedVersion) {
          setVersion(selectedVersion);
        } else {
          setVersion("Версія не знайдена");
        }
      } catch (error) {
        console.error("Error fetching runtimes:", error);
      }
    };

    if (selectedLanguage) {
      getRuntimes();
    }
  }, [selectedLanguage]); 

  const DynamicEditor = dynamic(() => import("@monaco-editor/react"), {
    ssr: false,
  });

  async function handleSendDetails() {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://e-learning-web-1j1o.onrender.com/v1/chat/completions",
        {
          model: "gpt-4", // Specify the model to use
          messages: [
            {
              role: "user",
              content: `Your task is to give detailed analysis by this explanation: ${explanation}.`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const chatResponse = response.data.choices[0].message.content; // Extract response content
      setDetailes(chatResponse); // Update state with the response
    } catch (error) {
      toast.error("Something went wrong"); // Display error message
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  async function handleSendMessage() {
    try {
      setLoading(true);
      const userCode = editorRef.current
        ? editorRef.current.getValue().trim()
        : "";
      const chatCompletion = await axios.post(
        "https://e-learning-web-1j1o.onrender.com/v1/chat/completions",
        {
          model: "gpt-4", // Specify the correct model
          messages: [
            {
              role: "system",
              content: "You are an AI assistant for checking code.",
            },
            {
              role: "user",
              content: `Please evaluate the following code: ${userCode}. Based on these criteria: ${taskCriteria}, assign a grade (0-10). If it does not meet the criteria, assign a score of 0. Please start your response with "Grade:" and provide a brief explanation and without code reference.`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = chatCompletion.data.choices[0].message.content;
      setResponseText(response);

      const gradeMatch = response.match(/Grade:\s*(\d+)/);
      const intGrade = gradeMatch ? parseInt(gradeMatch[1]) : null;
      const completed = intGrade !== null && intGrade > 5;

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

  async function executeCode() {
    const requestData = {
      language: defaultLanguage.toLowerCase(),
      version: version,
      files: [
        {
          name: "my_cool_code",
          content: editorRef.current!.getValue(),
        },
      ],
    };
    try {
      const result = await compileCode(requestData);
      setOutput(result.run.output);
      toast.success("Compiled Successfully");
    } catch (error) {
      toast.error("Failed to compile the Code");
    }
  }

  return (
    <>
      {isLocked && (
        <div className="flex items-center justify-center bg-gray-100 flex-col gap-y-2 text-secondary pt-20 pb-20 mb-6 rounded-lg border">
          <Image
            src={PayWarning}
            width={200}
            height={100}
            alt="Pay to unlock"
          />
          <p className="text-sm mt-5">This chapter is locked, please enroll</p>
        </div>
      )}
      {!isLocked && (
        <div>
          <div className="flex-1 gap-y4">
            <div className="p-4 bg-gray-50 border border-gray-300 rounded-md">
              <pre className="font-bold uppercase">Task description</pre>

              {parse(taskDescription)}
            </div>
          </div>
          <div className="flex flex-row items-start  gap-2  mt-6 justify-between">
            <div className="flex gap-2">
              <FileCode2 className="w-7 h-7" />
              <h1 className="text-lg font-bold lg:text-xl">Practical part</h1>
            </div>
            <div className="flex items-center gap-3 my-4">
              <Button
                onClick={executeCode}
                className="flex items-center justify-center px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 relative"
              >
                <FontAwesomeIcon icon={faCirclePlay} />
                <span className="pl-4">Run Code</span>
              </Button>
              <Link href="#ai">
                <Button
                  className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 relative"
                  onClick={handleSendMessage}
                >
                  <FontAwesomeIcon icon={faCircleDown} />
                  <span className="pl-4">{loading ? "Processing..." : "Submit Code"}</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <div className="bg-[#1E1E1E] rounded-md w-full lg:w-1/2 h-[587px] flex flex-col">
              <div className="bg-black p-2 rounded-t-md">
                <span className="text-white text-md p-2">
                  {defaultLanguage}: {version}
                </span>
              </div>
              <div className="flex-1 pt-4">
                <Editor
                  height="100%" // The editor will take up 100% of the container's height
                  theme="vs-dark"
                  defaultLanguage={defaultLanguage.toLocaleLowerCase()}
                  defaultValue={code}
                  // value={codeIde}
                  onMount={handleEditorDidMount}
                  onChange={handleEditorChange}
                  loading="Loading"
                  options={editorOptions}
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 h-[587px]">
              <EditorOutput
                editorRef={editorRef}
                language={defaultLanguage}
                handleSendMessage={handleSendMessage}
                languageVersion={version}
                userCode={editorRef.current?.getValue()}
                output={output}
              />
            </div>
          </div>

          <div className="grid pb-5" id="ai">
            <div className="flex items-center justify-center p-3"></div>
            <div className="max-h-180 overflow-y-auto bg-black border border-gray-300 p-4 rounded-md">
              {loading ? (
                <div className="text-sm text-green-300 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-x-2">
                    <span className="relative inline-flex items-center justify-center h-5 w-5">
                      <Bot className="w-6 h-6 relative z-20 animate-spin" />
                    </span>
                    <span className="animate-pulse">
                      Please wait, your request is being processed...
                    </span>
                  </div>
                </div>
              ) : displayedText ? (
                <pre className="whitespace-pre-wrap break-words text-green-500">
                  <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-2">
                      <Bot className="w-8 h-8" />
                      <h1 className="text-xl font-bold">AI Response</h1>
                    </div>
                  </div>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {displayedText}
                  </ReactMarkdown>
                </pre>
              ) : (
                <div className="text-sm text-green-300 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-x-2">
                    <span className="relative inline-flex items-center justify-center h-5 w-5">
                      <Bot className="w-6 h-6 relative z-20 animate-pulse" />
                    </span>
                    <span className="animate-pulse">
                      I&apos;m waiting for your solution
                    </span>
                  </div>
                </div>
              )}
            </div>
            {explanation && (
              <div className="flex flex-col justify-center p-2 mt-2">
                <p className="text-xs font-bold pb-1">Your last result</p>
                <ReactMarkdown className="text-xs" remarkPlugins={[remarkGfm]}>
                  {explanation}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default AssistantForm;
