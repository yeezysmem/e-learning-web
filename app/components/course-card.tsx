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
  authorId
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
  <div className="hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden border border-gray-200 bg-white rounded-lg p-4 h-full flex flex-col justify-between">
    
    {/* Зображення курсу */}
    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100">
      <Image
        fill
        priority={true}
        className="object-cover"
        alt={title}
        src={imageUrl}
      />
    </div>

    {/* Логотип Colab для пропозицій */}
    {isSuggestions && (
      <div className="bg-purple-600 mt-4 p-1.5 flex items-center justify-center rounded-md">
        <Image src={colab} width={130} height={50} alt="colab" />
      </div>
    )}
    
    {/* Текстова інформація про курс */}
    <div className="flex flex-col pt-4 flex-grow">
      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
        {title}
      </h3>
      
      <p className="mt-1 text-sm text-gray-500">{category}</p>
      
      <div className="mt-4 flex items-center gap-x-2 text-sm text-gray-600">
        <IconBadge size="sm" icon={GraduationCap} variant="white" />
        <span>
          {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
        </span>
      </div>
    </div>

    {/* Прогрес курсу */}
    <div className="mt-4">
      <CourseProgress
        variant={progress === 100 ? "success" : "default"}
        size="sm"
        value={progress}
      />
    </div>
    <div className="mt-4">
      <button className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 ease-in-out">
        $20
      </button>
    </div>
    
  </div>
</Link>

  );
};
