import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import parse from "html-react-parser";
import { BookOpenText, File, Lock, Sparkles } from "lucide-react";

import { authOptions } from "@/app/api/auth/authOptions";
import { getChapter } from "@/actions/get-chapter";
// import { Separator } from "@/components/ui/separator";

import { CourseEnrollButton } from "./components/enroll-button";
import { CourseProgressButton } from "./components/course-progress-button";
import AssistantForm from "./components/ai-system";
import BannerController from "./components/banner-conroller";

interface ChapterIdPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/auth/signin");
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <BannerController userProgress={userProgress} isLocked={isLocked} />

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b bg-gray-50/50">
          <div>
            <div className="flex items-center gap-x-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                Chapter
              </span>
              {chapter.isFree && !purchase && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Free Preview
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{chapter.title}</h1>
          </div>

          {/* Action Button: Enroll vs Progress */}
          <div className="shrink-0">
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
                grade={userProgress?.grade}
                explanation={userProgress?.explanation}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
        </div>

        {/* Content & Theory Body */}
        <div className="p-6 space-y-8">
          {/* Theory Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-x-2 text-lg font-bold text-gray-900 border-b pb-2">
              <BookOpenText className="w-5 h-5 text-purple-600" />
              <h2>Theory & Explanation</h2>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 text-gray-800 leading-relaxed space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Chapter Description
              </span>
              <div className="prose max-w-none text-sm leading-relaxed">
                {parse(chapter.description || "")}
              </div>
            </div>
          </div>

          {/* Locked Notice Banner */}
          {isLocked && (
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl flex items-center gap-x-3 text-amber-900">
              <Lock className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-xs font-medium">
                This chapter is locked. Please enroll in the course to unlock interactive coding tasks and AI assistance.
              </p>
            </div>
          )}

          {/* Interactive Coding / AI Assistant Task Section */}
          {!isLocked && (
            <div className="pt-2">
              <AssistantForm
                chapterId={chapter.id}
                taskCriteria={chapter.taskCriteria || ""}
                rightAnswer={chapter.rightAnswer || ""}
                courseId={params.courseId}
                grade={userProgress?.grade || 0}
                explanation={userProgress?.explanation || ""}
                isLocked={isLocked}
                taskDescription={chapter.taskDescription || ""}
                defaultLanguage={chapter.programmingLanguageId || ""}
                codeSnippet={chapter.codeSnippet || ""}
                isCompleted={!!userProgress?.isCompleted}
                languageVersion={chapter?.languageVersion || ""}
                chapterImage={chapter?.imageUrl || ""}
              />
            </div>
          )}

          {/* Attachments Section */}
          {!!attachments.length && (
            <div className="space-y-3 pt-4 border-t">
              <h3 className="text-sm font-bold text-gray-900">Resources & Attachments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={attachment.id}
                    className="flex items-center gap-x-3 p-3 bg-sky-50 border border-sky-200 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors"
                  >
                    <File className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium truncate">
                      {attachment.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
