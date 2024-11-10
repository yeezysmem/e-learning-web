import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { getDashboardCourses } from "../../../../actions/get-dashboard-courses";
import { CoursesList } from "@/app/components/courses-list";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import type { User } from "next-auth";
import { GraduationCap, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

 

export default async function Dashboard() {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/api/auth/signin");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  const userProgress = await prisma.userProgress.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      chapter: {
        include: {
          course: true,
        },
      },
    },
  });

  const lastUpdatedCourse = userProgress?.chapter?.course;

  return (
    <div className="pt-0 space-y-1.5 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-lg font-semibold">Your Courses</h1>
        <CoursesList items={[...coursesInProgress, ...completedCourses]} displayMode="dashboard" />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <p className="text-xs text-gray-500 md:text-sm">Looking for more courses?</p>
        <Link href="/search" className="text-black font-semibold text-sm md:text-md">
          Explore new courses
        </Link>
      </div>
    </div>
  );
}
