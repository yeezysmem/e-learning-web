import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { getDashboardCourses } from "../../../../actions/get-dashboard-courses";
import { CoursesList } from "@/app/components/courses-list";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { User } from "next-auth";
import { GraduationCap, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from '@prisma/client';

type Props = {
  user: User;
  pagetype: string;
};

export default async function Dashboard({ user, pagetype }: Props) {
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
      updatedAt: 'desc',
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
  console.log(lastUpdatedCourse);

  // return userProgress?.chapter?.course;


  return (
    <div className="p-1.5 pt-0 space-y-1.5 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Hi, {session.user.name} 👋</h1>
              <span className="text-sm text-gray-500 mt-2">
                Here are all your purchased courses.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="border p-4 rounded-lg  flex items-center">
              <GraduationCap className="text-purple-600 w-6 h-6 mr-3" />
              <div>
                <h2 className="text-xl font-semibold">
                  {coursesInProgress.length}
                </h2>
                <p className="text-sm text-gray-500">Courses In Progress</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border flex items-center">
              <BookOpen className="text-green-600 w-6 h-6 mr-3" />
              <div>
                <h2 className="text-xl font-semibold">
                  {completedCourses.length}
                </h2>
                <p className="text-sm text-gray-500">Completed Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold">Your Courses</h1>
        <CoursesList items={[...coursesInProgress, ...completedCourses]} />

        {/* <CoursesList items={[...coursesInProgress, ...completedCourses]} /> */}
        {/* <h1>Last</h1> */}
       
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <p className="text-sm text-gray-500">Looking for more courses?</p>
        <Link href="/search" className="text-purple-600 font-semibold">
          Explore New Courses
        </Link>
      </div>
    </div>
  );
}
