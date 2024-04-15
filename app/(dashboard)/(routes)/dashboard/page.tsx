import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CardComponent from "../../_components/card";

const DashboardPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string; typeId: string };
}) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const courses = await db.course.findMany();


  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-10 mt-10">Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
