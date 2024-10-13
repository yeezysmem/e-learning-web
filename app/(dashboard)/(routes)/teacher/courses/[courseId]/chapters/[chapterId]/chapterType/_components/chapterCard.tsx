"use client";

import Image from "next/image";
import exam from "@/public/exam.svg";
import lectures from "@/public/lectures.svg";
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
  const [chapterType, setChapterType] = useState<string | undefined>(
    initialData?.chapterType
  );

  const router = useRouter();

  const onFinalExam = async () => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/chapterType`,
        { chapterType: "Exam" }
      );
      toast.success("Practical task type selected");
      router.refresh();
      router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onLectures = async () => {
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

  return (
    <div className="flex gap-6 mt-8">
      <div
        className="bg-[#fff] rounded-md cursor-pointer border border-[#000]"
        onClick={onFinalExam}
      >
        <div className="grid items-center justify-center pl-6 pt-6 pr-6 ">
          <Image src={exam} width={270} height={250} alt="FinalExam" />
        </div>
        <div className="bg-[#000] p-4 rounded-b-md">
          <h1 className="text-lg font-semibold text-white">Practical task</h1>
          <p className="text-[#fff] pt-4">
            This chapter type is a crucial component of our platform,
            bridging the gap between theoretical learning and practical
            application, and helping students achieve a higher level of
            proficiency in coding.
          </p>
        </div>
      </div>

      <div
        className="bg-[#fff] rounded-md cursor-pointer border border-[#000]"
        onClick={onLectures}
      >
        <div className="grid items-center justify-center pl-6 pt-6 pr-6 ">
          <Image src={lectures} width={270} height={260} alt="asdasd" />
        </div>
        <div className="bg-[#000] p-4 rounded-b-md">
          <h1 className="text-lg font-semibold text-white">Lectures</h1>
          <p className="text-[#fff] pt-4">
            The Lectures chapter type is essential for delivering high-quality,
            structured educational content. It combines the benefits of
            traditional lecture-based learning with the flexibility and
            interactivity of an online platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChapterCard;
