import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clapperboard } from "lucide-react";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { CaseSensitive } from "lucide-react";

import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { ChapterActions } from "./_components/chapter-actions";
import { getServerSession } from "next-auth";
import { Code } from "lucide-react";
import { authOptions } from "@/app/api/auth/authOptions";
import { TaskDescription } from "./_components/task-description";
import { TaskImage } from "./_components/task-image";
import { TaskCriteriaForm } from "./_components/task-criteria";
import { TaskAnswerForm } from "./_components/task-answer";
import { TaskCodeSnippet } from "./_components/task-snippet";
import { ProgrammingLanguagesForm } from "./_components/programming-language";
import { LevelForm } from "../../_components/level-form";

const ChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
    typeId: string;
    types: string;
  };
}) => {
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
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const programmingLanguages = await db.programminLanguage.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const programmingLanguage = chapter?.programmingLanguageId;

  // const chapterType = chapterTypes.map((type) => (type.name));

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {chapter.chapterType === "Lectures" && (
        <div className="bg-gray-100 h-[100vh] border rounded-md m-1.5">
          {!chapter.isPublished && (
            <Banner
              variant="warning"
              label="This chapter is unpublished. It will not be visible in the course"
            />
          )}
          <div className="p-6">
            <div className="flex items-center justify-between ">
              <div className="w-full">
                <Link
                  href={`/teacher/courses/${params.courseId}`}
                  className="flex items-center text-xs hover:opacity-75 transition mb-6 text-black"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  Back to course setup
                </Link>
                <div className="flex items-center justify-between w-full border-b pb-3">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                      Lectures & Resources Setup
                    </h1>
                    <span className="text-sm text-slate-700">
                      Complete all fields {completionText}
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
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-16">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={CaseSensitive} variant="purple" />
                    <h2 className="text-xl">Customize your chapter</h2>
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
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Clapperboard} variant="default" />
                  <h2 className="text-xl">Video</h2>
                </div>
                <ChapterVideoForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
                
              </div>
            </div>
          </div>
        </div>
      )}
      {chapter.chapterType === "Exam" && (
        <div className="bg-gray-100 h-[100hv] border m-1.5 rounded-md mb-12">
          {!chapter.isPublished && (
            <Banner variant="warning" label="This chapter isn't published." />
          )}
          <div>
            <span className="bg-black text-white flex rounded-t-md px-4 text-xs p-1">
              Course creation: chapter
            </span>
            <div className="p-6">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="w-full">
                  <Link
                    href={`/teacher/courses/${params.courseId}`}
                    className="flex items-center text-xs hover:opacity-75 transition mb-6 text-black"
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Back to course setup
                  </Link>

                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-2xl font-medium">
                        Practical task Setup
                      </h1>
                      <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
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
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-x-2">
                      <IconBadge icon={CaseSensitive} variant="default" />
                      <h2 className="text-xl font-semibold">
                        Main information
                      </h2>
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
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={Code} variant="default" />
                    <h2 className="text-xl font-semibold">Assignment</h2>
                  </div>
                  {/* <ProgrammingLanguagesForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                  options={programmingLanguages.map((language) => ({
                    value: language.name,
                    label: language.id,
                  }))}
                /> */}
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
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={Code} variant="default" />
                    <h2 className="text-xl font-semibold">Assignment</h2>
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
                  {/* <TaskLanguageForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                /> */}
                </div>
              </div>
              {/* <div className="grid grid-cols-1"> */}
            </div>
          </div>
        </div>
      )}
      {chapter.chapterType === "Challenges" && (
        <div className="bg-white">
          {!chapter.isPublished && <Banner variant="warning" label="Exam" />}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <Link
                  href={`/teacher/courses/${params.courseId}`}
                  className="flex items-center text-sm hover:opacity-75 transition mb-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to course setup
                </Link>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Challenges Setup</h1>
                    <span className="text-sm text-slate-700">
                      Complete all fields {completionText}
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
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 ">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={CaseSensitive} variant="default" />
                    <h2 className="text-xl">Practical task setup</h2>
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
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Code} variant="default" />
                  <h2 className="text-xl">Assignment</h2>
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

              <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Code} variant="default" />
                  <h2 className="text-xl">Assignment</h2>
                </div>

                <TaskImage
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={""}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {chapter.chapterType === "Resources" && (
        <div className="bg-white">
          {!chapter.isPublished && (
            <Banner
              variant="warning"
              label="This chapter is unpublished. It will not be visible in the course"
            />
          )}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <Link
                  href={`/teacher/courses/${params.courseId}`}
                  className="flex items-center text-sm hover:opacity-75 transition mb-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to course setup
                </Link>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Chapter Creation</h1>
                    <span className="text-sm text-slate-700">
                      Complete all fields {completionText}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChapterIdPage;
