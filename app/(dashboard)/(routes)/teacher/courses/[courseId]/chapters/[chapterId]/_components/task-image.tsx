"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle, ArrowDownToLine } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import Image from "next/image";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

interface TaskImageProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const TaskImage = ({
  initialData,
  courseId,
  chapterId,
}: TaskImageProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Task image updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-gray-200 bg-white rounded-xl p-5 shadow-sm space-y-3">
      {/* Header */}
      <div className="font-bold flex items-center justify-between text-gray-900 text-sm">
        <div className="flex items-center gap-x-2">
          <ImageIcon className="w-4 h-4 text-purple-600" />
          <span>Task Image</span>
        </div>

        <Button
          onClick={toggleEdit}
          variant="ghost"
          size="sm"
          className="text-xs font-semibold hover:bg-gray-100 rounded-lg"
        >
          {isEditing && "Cancel"}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Add Image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Edit Image
            </>
          )}
        </Button>
      </div>

      {/* Preview or Placeholder */}
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="space-y-2 pt-1">
            <div className="flex flex-col items-center justify-center h-48 bg-purple-50/50 border border-dashed border-purple-200 rounded-lg space-y-2">
              <ArrowDownToLine className="h-8 w-8 text-purple-400" />
              <span className="text-xs text-gray-500 font-medium">
                No image uploaded for this task
              </span>
            </div>
            <p className="text-[11px] text-gray-400 italic">
              Click the button above to add an image for describing the task.
            </p>
          </div>
        ) : (
          <div className="relative aspect-video mt-2 overflow-hidden rounded-lg border border-gray-200">
            <Image
              alt="Task image description"
              fill
              className="object-cover"
              src={initialData.imageUrl}
            />
          </div>
        ))}

      {/* Edit / Upload Zone */}
      {isEditing && (
        <div className="space-y-2 pt-2">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <p className="text-[11px] text-gray-400 italic">
            16:9 aspect ratio recommended for optimal layout.
          </p>
        </div>
      )}
    </div>
  );
};
