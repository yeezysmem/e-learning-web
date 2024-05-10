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
import Router from "next/navigation";

interface AssistantFormProps {
  chapterId: string;
  courseId: string;
  taskCriteria: string;
  rightAnswer: string;
  initialData: Chapter;
  grade: string;
  explanation: string;
}

function AssistantForm({
  taskCriteria,
  chapterId,
  courseId,
  grade,
  explanation,
}: AssistantFormProps) {
  const [responseText, setResponseText] = useState("");
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const placeholder = `def even_or_odd(number):
	return 'Odd' if number % 2 else 'Even'`;

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleSendMessage() {
    const userCode = editorRef.current.getValue();
    if (userCode.trim() === "") {
      console.log("The userCode is empty");
      return;
    }

    setLoading(true);

    axios
      .post(
        "https://chat-gtp-free.p.rapidapi.com/v1/chat/completions",
        {
          chatId: "92d97036-3e25-442b-9a25-096ab45b0525",
          messages: [
            {
              role: "user",
              content: `evaluate the provided code ${userCode} without considering any comments, any additional information. Please assign a grade to the code based on the following criteria: ${taskCriteria}. If the code does not meet the specified criteria, assign it a score of 0 points.Its must be int between 0 and 10. Your answer should be Grade: and why you gave that grade.`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "dd2b25a7acmsh5c5bbb65b95332dp1bcce0jsn3892aa2992db",
            "X-RapidAPI-Host": "chat-gtp-free.p.rapidapi.com",
          },
        },
      )
      .then((response) => {
        setResponseText(response.data.text);
        const explanation = response.data.text;
        const gradeMatch = response.data.text.match(/Grade: (\d+)/);
        const grade = gradeMatch ? parseInt(gradeMatch[1]) : null;  
        // const totalGrade = parseInt(grade)
        return axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
          grade: grade,
          explanation: explanation,
        });
      })
      .then(() => {
        // if (grade > 6) {
        //   toast.success("You have passed the test. Your grade is" + grade );
        // }
        toast.success("Your grade has been submitted");
        // router.reload();
      })
      .catch((error) => {
        console.error("Error sending userCode:", error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  // const totalGrade = parseInt(grade)
  // console.log(typeof totalGrade)

  return (
    <div>
      <div className="bg-black gap-1 p-2">
        <div className="flex">
          <span className="text-white">
            <FileJson height="20px" />
          </span>
          <span className="text-white text-sm">main.py</span>
        </div>
      </div>
      <div className="grid">
        <div>
          <Editor
            height="50vh"
            width="100%"
            theme="vs-dark"
            defaultLanguage="python"
            defaultValue={placeholder}
            onMount={handleEditorDidMount}
            loading="Loadd"
          />
        </div>
        <div className=" grid mt-2">
          <Button onClick={handleSendMessage}>Sumbit</Button>
        </div>
        <div className="flex items-center justify-center mt-5 p-3">
          {loading && <CircleDashed size={30} className="animate-spin" />}
        </div>
        {/* <div>You have only 3 try </div> */}
        <div>
          <p>
            Response:{" "}
            {responseText ? (
              responseText
            ) : (
              <span className="text-sm text-orange-500">
                Upload your solution
              </span>
            )}
          </p>
        </div>
        <div>
          <h4>
            Your previous grade is: <b>{grade ? grade : ""}</b>
          
            {/* {explanation} */}
          </h4>
          <p>Explanation: {explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default AssistantForm;
