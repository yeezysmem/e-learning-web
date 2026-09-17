import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/authOptions";
import ChapterCard from "./_components/chapterCard";

interface ChapterTypeProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterType = async ({ params }: ChapterTypeProps) => {
  const { courseId, chapterId } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId: courseId,
    },
  });

  if (!chapter) {
    return redirect(`/teacher/courses/${courseId}`);
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm min-h-full space-y-6">
      {/* Header Bar */}
      <div className="space-y-4 pb-4 border-b">
        <Link
          href={`/teacher/courses/${courseId}`}
          className="inline-flex items-center text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Back to course setup
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Choose Chapter Type</h1>
          <p className="text-xs text-gray-500 mt-1">
            Select how you want to deliver content for this chapter (Lectures, Exams, or Challenges)
          </p>
        </div>
      </div>

      {/* Chapter Type Selection Cards Component */}
      <div className="pt-2">
        <ChapterCard courseId={courseId} chapterId={chapterId} />
      </div>
    </div>
  );
};

export default ChapterType;
