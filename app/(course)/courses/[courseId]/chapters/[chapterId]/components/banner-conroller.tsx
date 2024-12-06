// components/BannerController.tsx
"use client"; // Позначаємо компонент клієнтським

import { useState, useEffect } from "react";
import { Banner } from "@/components/banner";

interface UserProgress {
  isCompleted: boolean | null;
  grade: number | null;
  explanation: string | null;
  preferences: string | null;
}

interface BannerControllerProps {
  userProgress: UserProgress | null;
  isLocked: boolean;
}

const BannerController = ({ userProgress, isLocked }: BannerControllerProps) => {
  const [banner, setBanner] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (userProgress?.isCompleted) {
      setBanner(<Banner variant="success" label="You already completed this chapter." />);
    } else if (isLocked) {
      setBanner(<Banner variant="warning" label="You need to purchase this course to watch this chapter." />);
    } else {
      setBanner(null); // Hide banner when neither condition is met
    }
  }, [userProgress, isLocked]); // Re-run effect when these values change

  return <>{banner}</>;
};

export default BannerController;
