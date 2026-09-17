import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/authOptions";
import { db } from "@/lib/db";

interface TypeIdProps {
  params: {
    courseId: string;
    chapterId: string;
    types: string;
  };
}

const TypeId = async ({ params }: TypeIdProps) => {
  const { courseId, chapterId, types } = params;
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
          href={`/teacher/courses/${courseId}/chapters/${chapterId}/chapterType`}
          className="inline-flex items-center text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Back to chapter types
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Chapter Type: {types}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure settings specific to this chapter format.
          </p>
        </div>
      </div>

      {/* Content Condition Check */}
      <div className="pt-2">
        {types === "Lectures" ? (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-xs font-semibold text-purple-900">
            Configuring standard video lectures and resources.
          </div>
        ) : (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700">
            Configuring interactive tasks, exams, or challenges.
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeId;
