import Image from "next/image";
import Link from "next/link";
import { GraduationCap, BookOpen } from "lucide-react";
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
  chapterType?: string;
  isSuggestions?: boolean;
  authorId?: string;
  displayMode: "dashboard" | "search";
  level?: string;
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
  displayMode,
  level,
}: CourseCardProps) => {
  const normalizedLevel = level?.toLowerCase();

  return (
    <Link href={`/courses/${id}`} className="group h-full flex">
     <div className="w-full bg-white border border-gray-900 hover:border-purple-600 hover:bg-gradient-to-br hover:from-white hover:via-purple-50/50 hover:to-indigo-50/60 rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">


        <div>
          {/* Header Image & Level Badge */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <Image
              fill
              priority={true}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              alt={title}
              src={imageUrl || colab}
            />
            {level && (
              <span
                className={cn(
                  "absolute top-2 right-2 px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm backdrop-blur-md",
                  {
                    "bg-emerald-100/90 text-emerald-800 border border-emerald-200":
                      normalizedLevel === "beginner",
                    "bg-purple-100/90 text-purple-800 border border-purple-200":
                      normalizedLevel === "intermediate",
                    "bg-rose-100/90 text-rose-800 border border-rose-200":
                      normalizedLevel === "advanced",
                  }
                )}
              >
                {level}
              </span>
            )}
          </div>

          {/* Course Content */}
          <div className="flex flex-col pt-4">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
              {title}
            </h3>
            
            <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* Course Meta Info */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 font-medium pt-2 border-t border-gray-100">
              <div className="flex items-center gap-x-1.5 text-gray-700">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-900 text-white">
                  <GraduationCap width={12} height={12} />
                </div>
                <span>
                  {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                </span>
              </div>
              <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">
                {category}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Progress & Action */}
        <div className="mt-4 pt-2">
          {progress !== null && (
            <div className="mb-3">
              <CourseProgress
                variant={progress === 100 ? "success" : "default"}
                size="sm"
                value={progress || 0}
              />
            </div>
          )}

          {displayMode === "search" && (
            <button className="w-full py-2.5 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-x-2 shadow-sm">
              {price === 0 ? (
                <span className="flex items-center gap-x-2">
                  <del className="text-xs text-gray-400 font-normal">$19.99</del>
                  <span className="text-emerald-400 font-bold">Free</span>
                </span>
              ) : (
                `$${price}`
              )}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};
