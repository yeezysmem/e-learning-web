import { Chapter, Course, UserProgress } from "@prisma/client";

import { NavbarRoutes } from "@/components/navbar-routes";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { MoveLeft } from "lucide-react";
import { Suspense } from "react";
import { CircleDashed } from "lucide-react";
import LinkBack from "../chapters/[chapterId]/components/link-back";

// import { CourseMobileSidebar } from "./course-mobile-sidebar";

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
  const userImage = session?.user?.image || "";
  const userName = session?.user?.name || "";
  const [firstName, lastName] = userName.split(" ");

  return (
    <div className="p-5 border h-full flex items-center justify-between bg-white shadow-sm rounded-md">
      <div className="hidden md:block">
        <LinkBack href="/">Back</LinkBack>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <div className="text-right">
          <p className="text-sm font-medium">{firstName}</p>
          <p className="text-sm font-medium">{lastName}</p>
        </div>
        <Image
          className="rounded-md"
          src={userImage}
          width={37}
          height={37}
          alt="avatar"
        />
      </div>
    </div>
  );
}
