"use client";

import * as z from "zod";
import axios from "axios";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { ChevronDown } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TaskImageProps {
  initialData: Chapter;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const TaskImage = ({ initialData, courseId }: TaskImageProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-white rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-3">
        <span className="font-bold">Task image</span>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil size={16} />
              <span className="ml-2">Add a file</span>
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div>
            <div className="flex items-center justify-center h-60 bg-[#D7D7ED] rounded-md">
              <ArrowDownToLine className="h-12 w-12 text-black" />
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              Click the button to add an image for describing task</div>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recomended
          </div>
        </div>
      )}
    </div>
  );
};
