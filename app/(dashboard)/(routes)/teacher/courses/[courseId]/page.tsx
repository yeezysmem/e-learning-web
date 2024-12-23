import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { TitleForm } from "./_components/title-form";
import { PriceForm } from "./_components/price-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachementForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
 

const CourseIdPage = async ({
  params,
}: {
  params: { courseId: string; types: string };
}) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const courseTypes = await db.type.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) return redirect("/");

  const required = [
    course.title,
    course.description,
    // course.image,
    // course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];
  console.log(course, "course")
  const totalFields = required.length;
  const completedFields = required.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = required.every(Boolean);

  return (
    <div className="h-[100vh] bg-gray-50 m-1.5 border rounded-md">
      <span className="text-xs bg-black text-white p-1 px-4 rounded-t-md w-full mx-auto flex justify-center">
        Course creation: Setup
      </span>
      <div className="container">
        <div className="flex items-center justify-between border-b pb-4 pt-4">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-xl font-bold">01: Setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div>
            <TitleForm initialData={course} courseId={course.id} />
            <PriceForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            {/* <LevelForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            /> */}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex-1 items-center gap-x-2">
                <ImageForm initialData={course} courseId={course.id} />
                <AttachementForm initialData={course} courseId={course.id} />
                <ChaptersForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
