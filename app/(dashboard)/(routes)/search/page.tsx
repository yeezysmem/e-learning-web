import CardComponent from "../../_components/card";
import AssistantForm from "../teacher/courses/[courseId]/chapters/[chapterId]/_components/assistant-form";
import testimage from "../../../../public/Rectangle81.jpg";
import { Categories } from "./_components/categories";
import { CourseCard } from "@/app/components/course-card";
import { db } from "../../../../lib/db";
import { getCourses } from "@/actions/get-courses";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { CoursesList } from "../../../components/courses-list";
import type { User } from "next-auth";
import bgDashboard from "../../../../public/bg-dashboard.jpg";
import Image from "next/image";

type Props = {
  user: User;
  pagetype: string;
};

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? "";

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <div className="p-6 bg-white min-h-screen  border rounded-md">
      <div>
        <h1 className="mb-5 mt-10 text-2xl font-bold text-black flex justify-center">
          Explore new courses
        </h1>
        <Categories items={categories} />
        <CoursesList items={courses} displayMode="search" />
      </div>
    </div>
  );
};

export default SearchPage;
