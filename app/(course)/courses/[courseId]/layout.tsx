import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  
  if (!course) {
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

  

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="md:pl-80 h-[81px] inset-y-0 m-1.5 mb-1.5 ml-2.5 ">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className=" md:flex h-full w-80 flex-col fixed border rounded-lg  inset-y-0 z-20 mt-1.5 ml-1.5">
        <CourseSidebar course={course} progressCount={progressCount} isPurchased={purchase} />
      </div>
      <main className="md:pl-80 inset-y-0 h-full m-1.5 ml-2.5 z-50 mt-0">
        {children}
      </main>
    </div>
  );
};

export default CourseLayout;
