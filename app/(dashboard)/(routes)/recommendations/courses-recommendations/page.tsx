import { db } from "../../../../../lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import RecomendationsSystem from "../_components/recomendations-system";
import Image from "next/image";
import { CourseCard } from "@/app/components/course-card";
import aiImage from "@/public/ai.svg"


const CoursesRecommendationsPage = async () => {


  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const courses = await db.course.findMany({
    where: {
      userId,
    },
  });



  const userRecomendations = await db.userRecomendations.findFirst({
    where: {
      userId,
    },
  });
 
  let recommendationsArrayNew = [];
  if (userRecomendations?.recommendations) {
    recommendationsArrayNew = JSON.parse(
      userRecomendations.recommendations
    ).recommendations;
  }
  return (
    <div className="container">
      <h1 className="text-lg mt-7 mb-5">Course Recommendations</h1>
     <div className="flex justify-center">
     {recommendationsArrayNew.map((recommendation: any) => (
        <CourseCard
          id={recommendation.id}
          key={recommendation.title}
          title={recommendation.title}
          description={recommendation.description}
          imageUrl={aiImage}
          price={recommendation.price}
          chaptersLength={recommendation.chapters}
          progress={0}
          isSuggestions={true}
        />
  
      ))}
      
     </div> 
    
      {/* <AssistantForm /> */}
    </div>
  );
};

export default CoursesRecommendationsPage;
