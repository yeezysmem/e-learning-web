import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, GraduationCap, PlayCircle, Sparkles } from "lucide-react";

import { authOptions } from "@/app/api/auth/authOptions";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/app/components/courses-list";
import { Categories } from "../search/_components/categories";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  searchParams: {
    title?: string;
    categoryId?: string;
  };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/api/auth/signin");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);
  const userCourses = [...coursesInProgress, ...completedCourses];

  const lastUserProgress = await db.userProgress.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      chapter: {
        include: {
          course: true,
        },
      },
    },
  });

  const lastCourse = lastUserProgress?.chapter?.course;
  const lastChapter = lastUserProgress?.chapter;

  if (userCourses.length === 0) {
    const categories = await db.category.findMany({
      orderBy: { name: "asc" },
    });

    const exploreCourses = await getCourses({
      userId,
      ...searchParams,
    });

    return (
      <div className="space-y-6">
        {/* Banner for new users */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-black rounded-xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-3 text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Start Your Journey
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome to SkillUp, {session?.user?.name || "Student"}!
            </h1>
            <p className="text-sm text-gray-300">
              You haven&apos;t enrolled in any courses yet. Choose a topic below to dive into interactive coding & AI mentorship.
            </p>
          </div>
        </div>

        {/* Explore Catalogue */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Explore New Courses</h2>
              <p className="text-xs text-gray-500 mt-0.5">Filter by category to find your next skill</p>
            </div>
          </div>

          <Categories items={categories} />

          <CoursesList items={exploreCourses} displayMode="search" />
        </div>
      </div>
    );
  }

  // ЯКЩО Є КУПЛЕНІ КУРСИ — ПОКАЗУЄМО ДАШБОРД ТА ПРОГРЕС
  return (
    <div className="space-y-6">
      {/* Resume Last Chapter Card */}
      {lastCourse && lastChapter && (
        <div className="bg-black text-white rounded-xl p-5 shadow-sm border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Continue Learning
            </span>
            <h3 className="text-lg font-bold text-white">{lastCourse.title}</h3>
            <p className="text-xs text-gray-400">
              Last Chapter: <span className="text-gray-200 font-medium">{lastChapter.title}</span>
            </p>
          </div>
          <Link href={`/courses/${lastCourse.id}/chapters/${lastChapter.id}`}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all">
              <PlayCircle className="w-4 h-4" />
              Resume Lesson
            </Button>
          </Link>
        </div>
      )}

      {/* Purchased Courses List */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Active Courses</h2>
            <p className="text-xs text-gray-500">Pick up right where you left off</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 rounded-full text-gray-700">
            {userCourses.length} {userCourses.length === 1 ? "Course" : "Courses"}
          </span>
        </div>

        <CoursesList items={userCourses} displayMode="dashboard" />
      </div>

      {/* Footer Call to Action */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 text-center shadow-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Looking to learn something new?</h3>
        <p className="text-xs text-gray-600 mb-4">Discover our full catalog of programming & web development courses.</p>
        <Link href="/search">
          <Button variant="outline" className="border-black hover:bg-black hover:text-white transition-all text-xs font-semibold px-6 py-2 rounded-lg">
            Browse All Courses
          </Button>
        </Link>
      </div>
    </div>
  );
}
