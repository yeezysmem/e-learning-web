"use client"
import Link from "next/link";
import { CircleDashed, MoveLeft } from "lucide-react";
import { useState } from "react";

// Define the types for the props
interface LinkBackProps {
  children: React.ReactNode;  // Type for children
  href?: string;              // Type for href, default is "/"
}

const LinkBack = ({ children, href = "/" }: LinkBackProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <CircleDashed className="w-7 h-7 animate-spin" />
          <span className="text-md font-medium">Loading...</span>
        </div>
      ) : (
        <Link href={href} onClick={handleClick} className="flex items-center gap-2 ml-8 md:ml-0">
          <MoveLeft className="w-7 h-7" />
          <span className="text-md font-medium">{children}</span>
        </Link>
      )}
    </div>
  );
};

export default LinkBack;
