"use client";

import ReactConfetti from "react-confetti";

import { useConfetti } from "@/hooks/use-confetti";

export const ConfettiProvider = () => {
  const confeti = useConfetti();

  if (!confeti.isOpen) return null;

  return (
    <ReactConfetti
      className="poiner-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confeti.onClose();
      }}
    />
  );
};
