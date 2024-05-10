"use client";

import Image from "next/image";
import typeone from "../../../../../../../../../../public/typeone.svg";
import typetwo from "../../../../../../../../../../public/typetwo.svg";
import typethree from "../../../../../../../../../../public/typethree.svg";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
 
import * as z from "zod";
 
import { Chapter } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ChapterCardProps {
  courseId: string;
  chapterId: string;
  chapter: {
    id: string;
    name: string;
    description: string;
  };
  initialData: Chapter;
}
const formSchema = z.object({
  chapterType: z.string().min(1),
});

const ChapterCard = ({
  initialData,
  courseId,
  chapterId,
  chapter,
}: //   image,
ChapterCardProps) => {
  const [chapterType, setChapterType] = useState<string | undefined>(initialData?.chapterType);

  const router = useRouter();

  const onFinalExam = async () => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/chapterType`,
        { chapterType: "Exam" }
      );
      toast.success("Final exam selected");
      router.refresh();
      router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onResources = async () => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/chapterType`,
        { chapterType: "Lectures" }
      );
      toast.success("Lectures & Resources selected");
      router.refresh();
      router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSurveys = async () => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/chapterType`,
        { chapterType: "Supplementary resources" }
      );
      toast.success("Supplementary resources selected");
      router.refresh();
      router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
      
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex gap-6">
      {/* <Link
        href={`/teacher/courses/${courseId}/chapters/${chapterId}`}
        onClick={onFinalExam}
      > */}
        <div className="bg-[#E1E0FC] rounded-md cursor-pointer" onClick={onFinalExam}>
          <div className="grid items-center justify-center pl-6 pt-6 pr-6 ">
            <Image src={typeone} width={270} height={250}  alt="FinalExam" />
          </div>
          <div className="bg-[#C7C8FA] p-4 rounded-b-md">
            <h1 className="text-lg font-semibold">Final exam</h1>
            <p className="text-[#484848]">
              Please add your content here. Keep it short and simple. And smile
            </p>
          </div>
        </div>
      {/* </Link> */}
      {/* <Link
        href={`/teacher/courses/${courseId}/chapters/${chapterId}`}
        onClick={onResources}
      > */}
        <div className="bg-[#E7F1ED] rounded-md cursor-pointer"  onClick={onResources}>
          <div className="grid items-center justify-center pl-6 pt-6 pr-6 ">
            <Image src={typetwo} width={253} height={250} alt="asdasd" />
          </div>
          <div className="bg-[#CBE1D9] p-4 rounded-b-md">
            <h1 className="text-lg font-semibold">Lectures & Materials</h1>
            <p className="text-[#484848]">
              Please add your content here. Keep it short and simple. And smile
              :)
            </p>
          </div>
        </div>
      {/* </Link> */}
      {/* <Link
        href={`/teacher/courses/${courseId}/chapters/${chapterId}`}
        onClick={onSurveys}
      > */}
        <div className="bg-[#F5D3D3] rounded-md cursor-pointer" onClick={onSurveys}>
          <div className="grid items-center justify-center pl-6 pt-6 pr-6 ">
            <Image src={typethree} width={300}  alt="asdasd" />
          </div>
          <div className="bg-[#FEB8B8] p-4 rounded-b-md">
            <h1 className="text-lg font-semibold">Supplementary resources</h1>
            <p className="text-[#484848]">
              Please add your content here. Keep it short and simple. And smile
              :)
            </p>
          </div>
        </div>
      {/* </Link> */}
    </div>
  );
};

export default ChapterCard;
