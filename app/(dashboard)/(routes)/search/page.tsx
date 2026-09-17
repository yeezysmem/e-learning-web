import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import { authOptions } from "@/app/api/auth/authOptions";
import { CoursesList } from "@/app/components/courses-list";
import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title?: string;
    categoryId?: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? "";

  const [categories, courses] = await Promise.all([
    db.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    getCourses({
      userId,
      ...searchParams,
    }),
  ]);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl min-h-full space-y-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Explore Courses
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Discover technology, web development, and database courses
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Categories items={categories} />
      </div>
      <div className="pt-2">
        <CoursesList items={courses} displayMode="search" />
      </div>
    </div>
  );
};

export default SearchPage;
