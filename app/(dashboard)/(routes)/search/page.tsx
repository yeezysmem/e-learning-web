import CardComponent from "../../_components/card";
import AssistantForm from "../teacher/courses/[courseId]/chapters/[chapterId]/_components/assistant-form";
import testimage from "../../../../public/Rectangle81.jpg";
import { Categories } from "./_components/categories";
import { CourseCard } from "@/app/components/course-card";
import { db } from "../../../../lib/db";
import { getCourses } from "@/actions/get-courses";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
  const userId = session?.user?.id;

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen m-1.5 border rounded-md relative overflow-hidden">
  {/* Розмитий бекграунд */}
  <div className="absolute inset-0">
    <Image
      src={bgDashboard}
      alt="bg-dashboard"
      className="object-cover w-full h-[200px] blur-3xl"
    />
  </div>

  {/* Основне зображення без розмиття */}
  <div className="relative w-full h-[200px]">
    <Image
      src={bgDashboard}
      alt="bg-dashboard"
      className="object-cover w-full h-full rounded-md"
    />
  </div>

  {/* Контент поверх зображень */}
  <div className="relative z-10">
    <h1 className="mb-5 mt-10 text-2xl font-bold text-gray-800 flex justify-center">
      Explore new courses
    </h1>
    <Categories items={categories} />
    <CoursesList items={courses} />
  </div>
</div>

  );
};

export default SearchPage;
