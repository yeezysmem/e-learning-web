import CardComponent from "../../_components/card";
import AssistantForm from "../teacher/courses/[courseId]/chapters/[chapterId]/_components/assistant-form";
import testimage from "../../../../public/Rectangle81.jpg";
import { Categories } from "./_components/categories";

import { db } from "../../../../lib/db";
import { getCourses } from "@/actions/get-courses";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { CoursesList } from "../../../components/courses-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const categories = await db.category.findMany({
    orderBy : {
      name : "asc"
    }
  })

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <div className="container">
      <Categories items={categories} />
      <CoursesList items={courses} />
      {/* <h1>ChatGPT</h1>
      <AssistantForm /> */}
    </div>
  );
};

export default SearchPage;
