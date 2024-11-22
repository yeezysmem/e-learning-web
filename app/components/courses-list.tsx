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
      <div className="grid mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
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
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  )
}
