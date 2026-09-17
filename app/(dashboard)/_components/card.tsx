"use client";

import Image from "next/image";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface CardComponentProps {
  title: string;
  price?: string | number;
  img: File | string | null | undefined;
  type?: string;
  isPublished: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({
  title = "Title",
  price,
  img,
  type,
  isPublished,
}) => {
  // Безпечне створення прев'ю-силки для File-об'єкта
  const imgSrc = useMemo(() => {
    if (!img) return "/placeholder.svg"; // Fallback-картинка або пустий рядок
    if (typeof img === "string") return img;
    return URL.createObjectURL(img);
  }, [img]);

  return (
    <div className="bg-white border border-gray-200 hover:border-purple-200 transition-all rounded-xl p-4 shadow-sm flex flex-col justify-between group overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
        <Image
          src={imgSrc}
          fill
          alt={title}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-bold text-sm text-gray-900 uppercase line-clamp-1">
            {title}
          </h2>
          {type && (
            <span className="text-[10px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-100 capitalize">
              {type}
            </span>
          )}
        </div>

        {price !== undefined && (
          <p className="text-xs font-semibold text-gray-700">
            Price: <span className="text-purple-600">${price}</span>
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span
            className={cn(
              "text-[10px] font-semibold px-2 py-0.5 rounded-md border",
              isPublished
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-gray-100 text-gray-600 border-gray-200"
            )}
          >
            {isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
