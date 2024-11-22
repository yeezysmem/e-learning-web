import { useState } from "react";
import Header from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { ArrowRightFromLine, ArrowLeftToLine } from "lucide-react";
import Image from "next/image";
import { BookOpen, GraduationCap } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/api/auth/signin");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  // const userProgress = await prisma.userProgress.findFirst({
  //   where: {
  //     userId: userId,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  //   include: {
  //     chapter: {
  //       include: {
  //         course: true,
  //       },
  //     },
  //   },
  // });

  return (
    <div className="flex h-screen ">
      <aside className="w-48 bg-white md:relative md:top-0 md:left-0">
        <Sidebar />
      </aside>
      <main className="flex flex-col flex-grow h-full overflow-auto p-4 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center mb-4 lg:mb-0">
              <Image
                src={session?.user.image || ""}
                alt={session?.user.name || ""}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <h1 className="text-xl font-bold md:text-2xl">
                  Hi, {session?.user.name || "user"} 👋
                </h1>
                <span className="text-sm text-gray-500">
                  Here are all your purchased courses.
                </span>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 w-full lg:w-auto">
              <div className="border p-4 rounded-lg flex items-center">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <GraduationCap className="text-main w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-md font-semibold md:text-xl">
                    {coursesInProgress ? coursesInProgress.length : 0}
                  </h2>
                  <p className="text-sm text-gray-700">Courses In Progress</p>
                </div>
              </div>
              <div className="border p-4 rounded-lg flex items-center">
                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <BookOpen className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-md font-semibold md:text-xl">
                    {completedCourses ? completedCourses.length : 0}
                  </h2>
                  <p className="text-sm text-gray-700">Completed Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
