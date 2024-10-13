"use client";
import Image from "next/image";
import React, { useState } from "react";

interface UserTypeCardProps {
  title: string;
  image?: string;
  onSelect: (title: string) => void;
}

const UserTypeCard = ({ title, image,onSelect }: UserTypeCardProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onSelect(title);
  };

  return (
    <div
      className={`bg-white p-5 rounded-md border cursor-pointer hover:border-[#A259FF] group ${
        isSelected ? "border-[#A259FF]" : ""
      }`}
      onClick={handleClick}
    >
      <div className="relative w-full">
        <Image src={image} height={140} width={140} alt={title} priority={true} />
      </div>
      <p className="text-sm font-medium pt-4 flex items-center justify-center">{title}</p>
    </div>
  );
};

export default UserTypeCard;
