import Image from "next/image";
import Link from "next/link";
import { BookOpen, GraduationCap } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { CourseProgress } from "@/app/components/course-progress";
import { cn } from "@/lib/utils";
import colab from "@/public/colab.svg";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
  description: string;
  chapterType: string;
  isSuggestions?: boolean;
  authorId?: string;
  displayMode: "dashboard" | "search";
  level?: string;
  // isPurchased: boolean;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  description,
  chapterType,
  isSuggestions,
  authorId,
  displayMode,
  level,
}: // isPurchased,
CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div
        className={cn(
          "hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden rounded-lg p-4 h-full flex flex-col justify-between",
          {
            "bg-[#AFFFAC]": level === "beginner",
            "bg-[#DBCCF8]": level === "intermediate",
            "bg-[#FFCCCD]": level === "advanced",
          }
        )}
      >
        {/* Зображення курсу */}
        <div className="relative w-full aspect-video">
          <Image
            fill
            priority={true}
            className="object-cover rounded-none"
            alt={title}
            src={imageUrl}
          />
        </div>
        {/* Текстова інформація про курс */}
        <div className="flex flex-col pt-4 flex-grow">
          <h3 className="text-md font-semibold text-gray-900 lg:text-lg group-hover:text-main transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-black">{description}</p>
          <div className="mt-4 flex items-center justify-between  gap-x-2 text-sm text-black">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black">
                <GraduationCap width={16} className="text-white" />
              </div>
              <div className="pl-2">
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </div>
            </div>
            <p className="mt-1 text-sm text-black">{category}</p>
          </div>
        </div>

        {/* Прогрес курсу */}
        <div className="mt-4">
          <CourseProgress
            variant={progress === 100 ? "success" : "default"}
            size="sm"
            value={progress || 0}
          />
        </div>
        {displayMode === "search" && (
          <div className="mt-4">
            <button className="w-full py-2 text-sm sm:text-base bg-black text-white rounded-md hover:bg-gray-900 transition-colors duration-300 ease-in-out">
              {price === 0 ? (
                <span className="flex items-center justify-center gap-x-3">
                  <del className="text-xs">19.99 $</del>Free
                </span>
              ) : (
                `${price} $`
              )}
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};
