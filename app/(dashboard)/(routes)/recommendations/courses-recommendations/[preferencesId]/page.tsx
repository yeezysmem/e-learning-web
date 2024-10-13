import CardComponent from "../../_components/card";
import AssistantForm from "../teacher/courses/[courseId]/chapters/[chapterId]/_components/assistant-form";
import testimage from "../../../../public/Rectangle81.jpg";

import { db } from "../../../../../../lib/db";
import { getCourses } from "@/actions/get-courses";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { CoursesList } from "../../../../../components/courses-list";
import { useParams } from "next/navigation";
import RecomendationsSystem from "../../_components/recomendations-system";


// { params }: { params: { courseId: string, types: string } }
const CoursesRecommendationsPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const courses = await getCourses({
    userId,
    // ...searchParams,
  });

  const userRecomendations = await db.userRecomendations.findFirst({
    where: {
      userId,
    },
  });

  const recommendationsArray = userRecomendations?.recommendations ? JSON.parse(userRecomendations.recommendations) : [];

//   const params = useParams();
//   console.log(params);
  console.log(userRecomendations);
 

  const titles = courses.map((course) => course.title);
  const descriptions = courses.map((course) => course.description);

    // console.log(userRecomendations?.id);

  return (
    <div className="container">
      <h1 className="text-lg mt-7 mb-5">Course Recommendations</h1>
      <h1>adadsasd</h1>
      {/* <CoursesList items={courses} /> */}
      {/* <RecomendationsSystem
        courses={courses}
        userPreferences={userRecomendations?.preferences}
        preferencesId={userRecomendations?.id}
        recommendations={userRecomendations?.recommendations}
      /> */}
       {/* {recommendationsArray.map((recommendation) => (
      <div key={recommendation.title}>
        <h2>{recommendation.title}</h2>
        <p>{recommendation.description}</p>
      </div>
    ))} */}
  
    </div>
  );
};

export default CoursesRecommendationsPage;
