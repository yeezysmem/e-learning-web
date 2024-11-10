import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/app/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm border rounded-md">
      <div className="p-6 flex flex-col border-b bg-white">
        <h1 className="font-semibold text-2xl">{course.title}</h1>
        {purchase && (
          <div className="mt-5">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
            chapterType={chapter.chapterType || ""}
          />
        ))}
      </div>
    </div>
  );
};
