"use client";

import Image from "next/image";
import exam from "@/public/exam.svg";
import lectures from "@/public/lectures.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ChapterCardProps {
  courseId: string;
  chapterId: string;
}

const ChapterCard = ({ courseId, chapterId }: ChapterCardProps) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Practical Task Card */}
      <div
        onClick={onFinalExam}
        className="group bg-white rounded-xl cursor-pointer border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
      >
        <div className="flex items-center justify-center p-8 bg-purple-50/40">
          <Image
            src={exam}
            width={220}
            height={200}
            alt="Practical Task"
            className="transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-6 bg-white border-t border-gray-100 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
              Practical Task / Exam
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              This chapter type bridges the gap between theoretical learning and practical application, helping students achieve proficiency in coding tasks.
            </p>
          </div>
          <span className="inline-block mt-4 text-xs font-semibold text-purple-600 group-hover:underline">
            Select Practical Task &rarr;
          </span>
        </div>
      </div>

      {/* Lectures Card */}
      <div
        onClick={onLectures}
        className="group bg-white rounded-xl cursor-pointer border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
      >
        <div className="flex items-center justify-center p-8 bg-sky-50/40">
          <Image
            src={lectures}
            width={220}
            height={200}
            alt="Lectures"
            className="transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-6 bg-white border-t border-gray-100 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 group-hover:text-sky-600 transition-colors">
              Lectures & Resources
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Essential for delivering structured educational content, combining traditional lecture-based learning with the flexibility of an online platform.
            </p>
          </div>
          <span className="inline-block mt-4 text-xs font-semibold text-sky-600 group-hover:underline">
            Select Lectures &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChapterCard;
