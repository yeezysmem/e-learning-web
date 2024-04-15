import { Chapter, Course, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/components/navbar-routes";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";


// import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

export  async function CourseNavbar ({
  course,
  progressCount,
}: CourseNavbarProps)  {
  const session = await getServerSession(authOptions)
  const userImage = session?.user?.image
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <Link href="/" className="text-sm">Back to courses</Link>
      {/* <Image className="flex justify-end" width={40} height={40} src={userImage} alt="user image" className="rounded-full" /> */}

      {/* <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      /> */}
      <NavbarRoutes />      
    </div>
  )
}
