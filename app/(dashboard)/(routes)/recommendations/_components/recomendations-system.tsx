"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { FileJson } from "lucide-react";
import { CircleDashed } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, UserRecomendations } from "@prisma/client";
import Router from "next/navigation";
import { OpenAI } from "openai";
import { Lock } from "lucide-react";
import PayWarning from "@/public/neetdopay.svg";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

interface RecommendationsSystemProps {
  preferencesId: string;
  courses: any;
  recommendations: string;
  userPreferences: string;
  initialData: UserRecomendations;
}

function RecommendationsSystem({
  preferencesId,
  courses,
  recommendations,
  userPreferences,
  initialData,
}: RecommendationsSystemProps) {
  const [responseText, setResponseText] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();



  async function handleSendMessage() {
    try {

      const openai = new OpenAI({
        apiKey: "pk-ZEdsByaTwSOuLxLdcBZnxVglrGdQEiCKTUosWRHULGYsUCwJ",
        baseURL: "https://api.pawan.krd/gpt-3.5-unfiltered/v1",
        dangerouslyAllowBrowser: true,
      });

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Based on the courses ${JSON.stringify(courses)}, give me all posible recommendations according to my preferences:${userPreferences}. You should recommend the courses only the ones i provided in the list. Write only JSON of your choices.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const response = chatCompletion.choices[0].message.content;
      setResponseText(response);

      const teest = "asdas112d-asd--asd";

      await axios.patch(`/api/recommendations/course-recommendations`, {
        recommendations: response,
      });
    } catch (error) {
      console.error("Error sending recomendations:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <h1>Response</h1>
      <Button onClick={handleSendMessage}>Send</Button>

    </div>
  );
}

export default RecommendationsSystem;
