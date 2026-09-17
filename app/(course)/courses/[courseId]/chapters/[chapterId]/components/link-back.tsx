"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LinkBackProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const LinkBack = ({ children, href = "/", className }: LinkBackProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-x-2 text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all active:scale-95 group",
        isLoading && "pointer-events-none opacity-80",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-purple-600 shrink-0" />
      ) : (
        <ArrowLeft className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-1" />
      )}
      <span>{children}</span>
    </Link>
  );
};

export default LinkBack;
