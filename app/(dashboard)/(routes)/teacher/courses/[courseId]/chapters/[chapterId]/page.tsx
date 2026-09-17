import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clapperboard, CaseSensitive, Code, LayoutDashboard } from "lucide-react";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/authOptions";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { ChapterActions } from "./_components/chapter-actions";
import { TaskDescription } from "./_components/task-description";
import { TaskImage } from "./_components/task-image";
import { TaskCriteriaForm } from "./_components/task-criteria";
import { TaskAnswerForm } from "./_components/task-answer";
import { TaskCodeSnippet } from "./_components/task-snippet";
import { ProgrammingLanguagesForm } from "./_components/programming-language";

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
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
      course: true,
    },
  });

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const programmingLanguages = await db.programminLanguage.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [chapter.title, chapter.description];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm min-h-full space-y-6 pb-12">
      {/* Unpublished Banner */}
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course."
        />
      )}

      {/* Header Bar */}
      <div className="space-y-4 pb-4 border-b">
        <Link
          href={`/teacher/courses/${params.courseId}`}
          className="inline-flex items-center text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Back to course setup
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {chapter.chapterType} Setup
            </h1>
            <span className="text-xs font-semibold text-gray-500 mt-1 block">
              Complete all required fields {completionText}
            </span>
          </div>
          <ChapterActions
            disabled={!isComplete}
            courseId={params.courseId}
            chapterId={params.chapterId}
            isPublished={chapter.isPublished}
          />
        </div>
      </div>

      {/* 1. LECTURES TYPE SETUP */}
      {chapter.chapterType === "Lectures" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div className="space-y-6">
            <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pb-2 border-b">
              <IconBadge icon={CaseSensitive} variant="purple" />
              <h2>Customize your chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pb-2 border-b">
              <IconBadge icon={Clapperboard} variant="default" />
              <h2>Video Content</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      )}

      {/* 2. EXAM TYPE SETUP */}
      {chapter.chapterType === "Exam" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div className="space-y-6">
            <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pb-2 border-b">
              <IconBadge icon={CaseSensitive} variant="default" />
              <h2>Main Information</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />

            <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pt-4 pb-2 border-b">
              <IconBadge icon={Code} variant="default" />
              <h2>Assignment Settings</h2>
            </div>
            <ProgrammingLanguagesForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
              options={programmingLanguages.map((language) => ({
                value: language.name,
                label: language.id,
              }))}
            />
            <TaskCriteriaForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <TaskAnswerForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <TaskDescription
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pb-2 border-b">
              <IconBadge icon={Code} variant="default" />
              <h2>Task Media & Code</h2>
            </div>
            <TaskImage
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <TaskCodeSnippet
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
              defaultLanguage={chapter.programmingLanguageId || ""}
            />
          </div>
        </div>
      )}

      {/* 3. CHALLENGES TYPE SETUP */}
      {chapter.chapterType === "Challenges" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div className="space-y-6">
            <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pb-2 border-b">
              <IconBadge icon={CaseSensitive} variant="default" />
              <h2>Practical Task Setup</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />

            <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pt-4 pb-2 border-b">
              <IconBadge icon={Code} variant="default" />
              <h2>Assignment Configuration</h2>
            </div>
            <ProgrammingLanguagesForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
              options={programmingLanguages.map((language) => ({
                value: language.name,
                label: language.id,
              }))}
            />
            <TaskCriteriaForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <TaskDescription
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pb-2 border-b">
              <IconBadge icon={Code} variant="default" />
              <h2>Assignment Media</h2>
            </div>
            <TaskImage
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      )}

      {/* 4. RESOURCES TYPE SETUP */}
      {chapter.chapterType === "Resources" && (
        <div className="pt-4">
          <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pb-2 border-b">
            <IconBadge icon={LayoutDashboard} variant="purple" />
            <h2>Resources Chapter Details</h2>
          </div>
          <div className="mt-4 space-y-6">
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterIdPage;
