import { redirect } from "next/navigation";
import { File } from "lucide-react";
import { BookOpenText } from "lucide-react";
import { Banner } from "@/components/banner";
import { Separator } from "../../../../../components/ui/separator";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { getChapter } from "@/actions/get-chapter";
import { VideoComponent } from "./components/video-component";
import { CourseEnrollButton } from "./components/enroll-button";
import { CourseProgressButton } from "./components/course-progress-button";
import AssistantForm from "./components/ai-system";
import Image from "next/image";
import Loading from "../../loading";
import { Suspense } from "react";
import { getProgress } from "@/actions/get-progress";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
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

  // const code = ReactHtmlParser(chapter.description);
  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  // const taskDescription = chapter.taskDescription;
  // const codeString = "(num) => num + 1";
  // const progressCount = await getProgress(userId, course.id);

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col mb-20 bg-white">
        {chapter.videoUrl ? (
          // <Suspense fallback={<Loading />}>
            <div className="p-4">
              <VideoComponent
                chapterId={params.chapterId}
                title={chapter.title}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                playbackId={
                  muxData?.playbackId! ||
                  "N34KJa4XH7vl6erxTiFTLOaX4LPcxFFo7W6Diphzlsc"
                }
                isLocked={isLocked}
                completeOnEnd={completeOnEnd}
              />
            </div>
          // </Suspense>
        ) : null}
        <div className="border rounded-md">
          <div className="p-4 flex bg-white flex-col md:flex-row items-center justify-between rounded-t-md ">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              chapter.chapterType === "Exam" ? (
                userProgress?.grade != null && userProgress?.grade > 5 ? (
                  <CourseProgressButton
                    chapterId={params.chapterId}
                    courseId={params.courseId}
                    nextChapterId={nextChapter?.id}
                    isCompleted={!!userProgress?.isCompleted}
                    grade={userProgress?.grade}
                    explanation={userProgress?.explanation}
                  />
                ) : userProgress?.grade === null ? null : null
              ) : (
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                  grade={userProgress?.grade}
                  explanation={userProgress?.explanation}
                />
              )
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <div className="pl-4 pt-4  mt-10  flex gap-2 items-center">
              <BookOpenText className="w-7 h-7" />
              <h1 className="text-xl font-bold ">Theory part</h1>
            </div>
            <div className=" m-4 bg-gray-100 border border-gray-300 rounded-md">
              <pre className="font-bold pl-4 pt-4 uppercase">
                Chapter Description
              </pre>
              <p
                className="quill px-4 pt-2 pb-4 text-sm"
                dangerouslySetInnerHTML={{ __html: chapter.description || "" }}
              ></p>
            </div>

            <div className="mt-8 quill px-4">
              {chapter.chapterType === "Exam" && (
                <div>
                  
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
                    chapterImage={chapter?.imageUrl || ""}                  />
                </div>
              )}
            </div>
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
