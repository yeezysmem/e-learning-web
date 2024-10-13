"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserTypeCard from "./card";
import axios from "axios";
import { toast } from "react-hot-toast";
// import Router from 'next/router';
import { useRouter } from "next/navigation";
import reactImg from "@/public/react.svg";
import python from "@/public/python.svg";
import node from "@/public/nodejs.svg";
import cplusplus from "@/public/cplusplus.svg";
import clang from "@/public/clang.svg";
import swift from "@/public/swift.svg";
import kotlin from "@/public/kotlin.svg";
import docker from "@/public/docker.svg";
import datascience from "@/public/datascience.svg";
import mobile from "@/public/mobile.svg";
import webdev from "@/public/webdev.svg";
import gamedev from "@/public/gamedev.svg";
import { Button } from "@/components/ui/button";
import OpenAI from "openai";
import Link from "next/link";

interface CourseRecommendationFormProps {
  preferencesId: string;
  title: string;
  image: string;
  recomendations: string,
  courses: any,
  userPreferences: string;
}

const languages = [
  { title: "C++", image: cplusplus },
  { title: "React", image: reactImg },
  { title: "Node.js", image: node },
  { title: "Python", image: python },
  { title: "Docker", image: docker },
  { title: "C", image: clang },
  { title: "Swift", image: swift },
  { title: "Kotlin", image: kotlin },
];

const topics = [
  { title: "Game Development", image: gamedev },
  { title: "Web Development", image: webdev },
  { title: "Data Science", image: datascience },
  { title: "Mobile Development", image: mobile },
];

const CourseRecommendationForm = ({
  preferencesId,
  title,
  image,
  courses,
  recomendations,
  userPreferences,
}: CourseRecommendationFormProps) => {
  const [topic, setTopic] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState("");

  const router = useRouter();

  const handleSelect = (title: string) => {
    if (selectedTitles.includes(title)) {
      setSelectedTitles(
        selectedTitles.filter((selectedTitle) => selectedTitle !== title)
      );
    } else {
      setSelectedTitles([...selectedTitles, title]);
    }
  };

  const handleSubmit = async () => {
    console.log(JSON.stringify(selectedTitles));
    try {
      await axios.post(`/api/recommendations`, {
        preferences: JSON.stringify(selectedTitles),
      });
      toast.success("Well done!");
      // router.push(`/recommendations/courses-recommendations`);
    } catch {
      toast.error("Something went wrong");
    }
  };

  async function handleGenerateRecommendations() {
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
            content: `Based on the courses ${JSON.stringify(courses)}, give me all posible recommendations according to my preferences:${userPreferences}. 
            You should recommend the courses only the ones i provided in the list. Write only JSON of your choices like "recommendations":[your choices]`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const response = chatCompletion.choices[0].message.content;
      setResponseText(response);


      await axios.patch(`/api/recommendations/course-recommendations`, {
        recommendations: response,
      });
      toast.success("OK!")
    } catch (error) {
      console.error("Error sending recomendations:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <div className="grid gap-5 justify-between">
        <div className="flex gap-5 justify-center">
          {languages.map((language) => (
            <UserTypeCard
              key={language.title}
              title={language.title}
              image={language.image}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <h1>Choose your path</h1>
        <div className="flex gap-5 justify-center">
          {topics.map((topic) => (
            <UserTypeCard
              key={topic.title}
              title={topic.title}
              image={topic.image}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
      <Link href="/search">
        <Button className="mt-5 float-right">

          SUMBIT 
        </Button>
      </Link>
    </>
  );
};

export default CourseRecommendationForm;
