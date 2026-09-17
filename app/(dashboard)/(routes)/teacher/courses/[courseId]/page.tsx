
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import {
  LayoutDashboard,
  ListChecks,
  CircleDollarSign,
  File,
  Sparkles,
} from "lucide-react";

import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/authOptions";

import { TitleForm } from "./_components/title-form";
import { PriceForm } from "./_components/price-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachementForm } from "./_components/attachment-form";

import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";

interface CourseIdPageProps {
  params: {
    courseId: string;
  };
}

const CourseIdPage = async ({ params }: CourseIdPageProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/");
  }

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

  if (!course) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price !== null,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm min-h-full space-y-8 pb-12">
      {/* Draft Warning Banner */}
      {!course.isPublished && (
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex items-center justify-between text-xs text-amber-900 font-medium">
          <div className="flex items-center gap-x-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              This course is currently un-published. It will not be visible to students until you publish it.
            </span>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Course Setup</h1>
          <span className="text-xs font-semibold text-gray-500 block">
            Complete all required fields {completionText}
          </span>
        </div>

        <Actions
          disabled={!isComplete}
          courseId={params.courseId}
          isPublished={course.isPublished}
        />
      </div>

      {/* Grid Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Basic Details & Pricing */}
        <div className="space-y-6">
          <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pb-2 border-b">
            <LayoutDashboard className="w-5 h-5 text-purple-600" />
            <h2>Customize your course</h2>
          </div>

          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />

          <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pt-4 pb-2 border-b">
            <CircleDollarSign className="w-5 h-5 text-purple-600" />
            <h2>Sell your course</h2>
          </div>

          <PriceForm initialData={course} courseId={course.id} />
        </div>

        {/* Right Column: Media, Chapters & Attachments */}
        <div className="space-y-6">
          <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pb-2 border-b">
            <ListChecks className="w-5 h-5 text-purple-600" />
            <h2>Course Modules & Media</h2>
          </div>

          <ImageForm initialData={course} courseId={course.id} />
          <ChaptersForm initialData={course} courseId={course.id} />

          <div className="flex items-center gap-x-2 font-bold text-gray-900 text-base pt-4 pb-2 border-b">
            <File className="w-5 h-5 text-purple-600" />
            <h2>Resources & Attachments</h2>
          </div>

          <AttachementForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
