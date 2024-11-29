import { Category, Course } from "@prisma/client";

import { CourseCard } from "./course-card";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  chapterType?: string;
  level: string | null;

};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
  displayMode: "dashboard" | "search"; 
}

export const CoursesList = ({
  items,
  displayMode,
 
}: CoursesListProps) => {
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mt-8">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={displayMode === "search" ? item.price ?? 0 : 0}
            progress={item.progress}
            category={displayMode === "search" ? item.category?.name! : ""}
            description={displayMode === "search" ? item.description! : ""}
            chapterType={displayMode === "search" ? item.chapterType! : ""}
            isSuggestions={false}
            displayMode={displayMode}
            level={item.level ?? "Unknown"}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-gray-500 mt-10">
          No courses found
        </div>
      )}
    </div>
  )
}
