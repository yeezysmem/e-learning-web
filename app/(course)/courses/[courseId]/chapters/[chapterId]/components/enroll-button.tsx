"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, ShoppingCart, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong with checkout");
    } finally {
      setIsLoading(false);
    }
  };

  const isFree = price === 0;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className={`w-full md:w-auto flex items-center justify-center gap-x-2 text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all ${
        isFree
          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
          : "bg-black hover:bg-gray-800 text-white"
      }`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-white" />
      ) : (
        <>
          {isFree ? (
            <Sparkles className="h-4 w-4 text-emerald-200" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
          <span>{isFree ? "Enroll for Free" : `Enroll for ${formatPrice(price)}`}</span>
        </>
      )}
    </Button>
  );
};
