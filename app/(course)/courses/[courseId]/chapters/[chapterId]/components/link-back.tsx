"use client";
import Link from "next/link";
import { CircleDashed, MoveLeft } from "lucide-react";
import { useState } from "react";

const LinkBack = ({children,href = "/"}) => {
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
        <Link href={href} onClick={handleClick} className="flex items-center gap-2">
          <MoveLeft className="w-7 h-7" />
          <span className="text-md font-medium">{children}</span>
        </Link>
      )}
    </div>
  );
};

export default LinkBack;
