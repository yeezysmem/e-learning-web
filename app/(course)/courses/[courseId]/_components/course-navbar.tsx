import { Chapter, Course, UserProgress } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { User as UserIcon } from "lucide-react";

import { authOptions } from "@/app/api/auth/authOptions";
import LinkBack from "../chapters/[chapterId]/components/link-back";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export async function CourseNavbar({
  course,
  progressCount,
}: CourseNavbarProps) {
  const session = await getServerSession(authOptions);
  const userImage = session?.user?.image;
  const userName = session?.user?.name || "Student";

  return (
    <div className="p-4 border-b h-full flex items-center justify-between bg-white shadow-sm px-6">
      {/* Mobile Sidebar Toggle & Link Back */}
      <div className="flex items-center gap-x-3">
        {/* <div className="md:hidden">
          <CourseMobileSidebar
            course={course}
            progressCount={progressCount}
          />
        </div> */}

        <div className="hidden md:block">
          <LinkBack href="/">Back to Dashboard</LinkBack>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-x-2 text-sm font-semibold text-gray-800">
        <span className="max-w-[300px] truncate">{course.title}</span>
      </div>

      <div className="flex items-center gap-x-3 ml-auto">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-900 leading-tight">
            {userName}
          </p>
          <p className="text-[11px] text-gray-500 font-medium">
            {progressCount}% Completed
          </p>
        </div>

        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center shrink-0">
          {userImage ? (
            <Image
              fill
              src={userImage}
              alt={userName}
              className="object-cover"
            />
          ) : (
            <UserIcon className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
}
