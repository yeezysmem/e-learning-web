import { Sidebar } from "./_components/sidebar";
import Image from "next/image";
import { BookOpen, GraduationCap, User } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/api/auth/signin");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="hidden md:flex flex-col w-64 border-r bg-white z-20">
        <Sidebar />
      </aside>
      <main className="flex-1 flex flex-col h-full overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="md:hidden bg-white border-b p-3 rounded-xl shadow-sm fixed top-0 left-0 right-0 z-30 flex items-center justify-between">
          <Sidebar />
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mt-12 md:mt-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-x-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500 shadow-sm bg-gray-100 flex items-center justify-center shrink-0">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-gray-400" />
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Welcome back, {session?.user?.name || "Student"}! 👋
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Track your learning progress and manage your enrolled courses.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
              <div className="bg-purple-50/50 border border-purple-100 p-3.5 rounded-xl flex items-center gap-x-3 min-w-[170px]">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900 block leading-none">
                    {coursesInProgress ? coursesInProgress.length : 0}
                  </span>
                  <span className="text-xs text-purple-700 font-medium">
                    In Progress
                  </span>
                </div>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl flex items-center gap-x-3 min-w-[170px]">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900 block leading-none">
                    {completedCourses ? completedCourses.length : 0}
                  </span>
                  <span className="text-xs text-emerald-700 font-medium">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Page */}
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
