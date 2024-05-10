import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { Banner } from "@/components/banner";
import { Separator } from "../../../../../components/ui/separator";
import { Preview } from "@/components/preview";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getChapter } from "@/actions/get-chapter";
import { VideoComponent } from "./components/video-component";
// import { CourseEnrollButton } from "./_components/enroll-button";
import { CourseEnrollButton } from "./components/enroll-button";
import { CourseProgressButton } from "./components/course-progress-button";
import AssistantForm from "./components/ai-system";
import Markdown from "react-markdown";
import Rating from "./components/rating-form";

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

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  const taskDescription = chapter.taskDescription;

 
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
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        {chapter.videoUrl ? (
          <div className="p-4">
            <VideoComponent
              chapterId={params.chapterId}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              playbackId={muxData?.playbackId!}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
            />
          </div>
        ) : null}

        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
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
          <Separator />
          <div>
          <h3 className="font-bold pl-7 uppercase">Chapter Description</h3>
          <Preview value={chapter.description!} />
            <div className="container">
              {chapter.chapterType === "Exam" && (
                <div>
                  <h3 className="font-bold uppercase">Task description</h3>
                  <div
                    className="text-sm pt-2 pb-2"
                    dangerouslySetInnerHTML={{ __html: taskDescription }}
                  />
                  <AssistantForm
                    chapterId={chapter.id}
                    taskCriteria={chapter.taskCriteria}
                    rightAnswer={chapter.rightAnswer}
                    courseId={params.courseId}
                    grade={userProgress?.grade}
                    explanation={userProgress?.explanation}
                  />
                  {/* <Rating chapterId={chapter.id} /> */}
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
