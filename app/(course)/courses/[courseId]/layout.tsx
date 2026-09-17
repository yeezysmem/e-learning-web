import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { authOptions } from "@/app/api/auth/authOptions";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: { courseId: string };
}

const CourseLayout = async ({ children, params }: CourseLayoutProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/auth/signin");
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
    <div className="h-full min-h-screen bg-gray-50">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-30">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>

      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-40 border-r bg-white shadow-sm">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          isPurchased={!!purchase}
        />
      </div>

      <main className="md:pl-80 pt-[80px] h-full overflow-y-auto">
        <div className="p-6 h-full">{children}</div>
      </main>
    </div>
  );
};

export default CourseLayout;
