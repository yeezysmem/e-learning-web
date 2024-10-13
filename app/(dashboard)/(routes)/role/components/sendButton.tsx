"use client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

const SendButton = ({ userId, newRole }) => {
  const { data: session, update } = useSession();
  const handleSubmit = async () => {
    try {
      await axios.patch(`/api/update-role`, {
        userId: userId,
        role: newRole,
      } && await update({
        ...session,
        role: newRole,
      }));
      toast.success("Well done!");
      // router.push(`/recommendations/courses-recommendations`);
    } catch {
      toast.error("Something went wrong");
    }
  };
  return <Button onClick={handleSubmit}>ChangeRole</Button>;
};

export default SendButton;
