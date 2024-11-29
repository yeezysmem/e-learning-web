import { Sidebar } from "./_components/sidebar";
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="hidden md:block w-48 bg-white">
        <Sidebar />
      </aside>
      <main className="flex flex-col flex-grow min-h-full overflow-y-auto p-2 md:p-4 bg-gray-100">
        {/* Top Bar (Visible on Mobile) */}
        <div className="md:hidden bg-white shadow  fixed top-0 left-0 right-0 z-10">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="md:pt-0 bg-white  rounded-lg shadow-sm mb-2">
          <div className="p-4 flex flex-col lg:flex-row justify-between items-center">
            {/* User Info */}
            <div className="flex items-center mb-4 lg:mb-0">
              <Image
                src={session?.user.image || ""}
                alt={session?.user.name || ""}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div className="ml-4">
                <h1 className="text-lg md:text-xl font-bold">
                  Hi, {session?.user.name || "user"} 👋
                </h1>
                <span className="text-sm text-gray-500">
                  Here are all your purchased courses.
                </span>
              </div>
            </div>

            {/* Course Stats */}
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
