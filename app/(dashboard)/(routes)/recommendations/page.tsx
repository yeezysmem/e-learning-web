import RecomendationsForm from "./_components/course-recomendations-form";
import { db } from "../../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserTypeCard from "./_components/card";
interface RecomendationsPageProps {
  image: string;
  title: string;
}

const RecomendationsPage = async ({
  image,
  title,
}: RecomendationsPageProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const userRecomendations = await db.userRecomendations.findFirst({
    where: {
      userId,
    },
  });

  const courses = await db.course.findMany({
    where: {
      userId,
    },
  });

   
  return (
    <div className="container">
      <h1 className="mt-5 mb-5 text-xl">Welcome to SkillUP</h1>
      <h3 className="mb-10">Choose your preferences</h3>
      <RecomendationsForm
        preferencesId={userRecomendations?.id}
        courses={courses}
        recomendations={userRecomendations?.recommendations}
        userPreferences={userRecomendations?.preferences}
      />
    </div>
  );
};

export default RecomendationsPage;
