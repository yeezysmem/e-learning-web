import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Book,
  Eye,
  Clapperboard,
  LayoutDashboard,
  Paperclip,
} from "lucide-react";
// import CodeMirror from "@uiw/react-codemirror";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { CaseSensitive } from "lucide-react";

import AssistantForm from "./_components/assistant-form";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { ChapterActions } from "./_components/chapter-actions";
import { getServerSession } from "next-auth";
import { Code } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import SurveyForm from "./_components/survey-form";
import { AttachementForm } from "../../_components/attachment-form";
import CodeSandboxEmbed from "../../_components/code-sandboxer";
import MonacoEditor from "react-monaco-editor";
import { TaskDescription } from "./_components/task-description";
import { TaskImage } from "./_components/task-image";
import { TaskCriteriaForm } from "./_components/task-criteria";
import { TaskAnswerForm } from "./_components/task-answer";
import { Brain } from "lucide-react";
import { TaskCodeSnippet } from "./_components/task-snippet";
import { TaskLanguageForm } from "./_components/task-language";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

  const survey = await db.question.findMany({
    where: {
      chapterId: params.chapterId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const programmingLanguage = chapter?.programmingLanguageId;

  // const chapterType = chapterTypes.map((type) => (type.name));
  console.log(programmingLanguage);

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
      {/* <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}
      {chapter.chapterType === "Lectures" && (
        <div className="bg-[#E7F1ED]">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={CaseSensitive} variant="white" />
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
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={Clapperboard} variant="white" />
                    <h2 className="text-xl">Video</h2>
                  </div>
                  <ChapterVideoForm
                    initialData={chapter}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                  />
                </div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Paperclip} variant="white" />
                  <h2 className="text-xl">Resourses</h2>
                </div>
                {/* <AttachementForm initialData={course} courseId={course.id}  chapterId={params.chapterId}/> */}
              </div>
              <div>{/* <SurveyForm /> */}</div>
            </div>
          </div>
        </div>
      )}
      {chapter.chapterType === "Exam" && (
        <div className="bg-[#EEEEFF]">
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
                <Link
                  href={`/teacher/courses/${params.courseId}/chapters/${params.chapterId}/chapterType`}
                >
                  To Types
                </Link>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Exam Setup</h1>
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
                    <IconBadge icon={CaseSensitive} variant="white" />
                    <h2 className="text-xl">Exam setup</h2>
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
                  <IconBadge icon={Code} variant="white" />
                  <h2 className="text-xl">Assignment</h2>
                </div>

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
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Code} variant="white" />
                  <h2 className="text-xl">Assignment</h2>
                </div>
                <TaskDescription
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
                <TaskImage initialData={chapter} courseId={params.courseId} />
                {/* <TaskLanguageForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                /> */}
              </div>
            </div>
            <div className="grid grid-cols-1">
              <TaskCodeSnippet
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                defaultLanguage="javascript"
              />
            </div>
          </div>
        </div>
      )}
      {chapter.chapterType === "Surveys" && (
        <div className="bg-[#F5D3D3]">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-x-2">
                    <IconBadge icon={Brain} variant="white" />
                    <h2 className="text-xl">Tests</h2>
                  </div>
                  <SurveyForm
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                  />
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChapterIdPage;
