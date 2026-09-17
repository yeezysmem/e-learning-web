"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video, ArrowDownToLine, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1, { message: "Video is required" }),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter video updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Failed to update video");
    }
  };

  return (
    <div className="mt-6 border border-gray-200 bg-white rounded-xl p-5 shadow-sm space-y-3">
      {/* Header */}
      <div className="font-bold flex items-center justify-between text-gray-900 text-sm">
        <div className="flex items-center gap-x-2">
          <Video className="w-4 h-4 text-purple-600" />
          <span>Chapter Video</span>
        </div>

        <Button
          onClick={toggleEdit}
          variant="ghost"
          size="sm"
          className="text-xs font-semibold hover:bg-gray-100 rounded-lg"
        >
          {isEditing && "Cancel"}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Add Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Edit Video
            </>
          )}
        </Button>
      </div>

      {/* Preview or Placeholder */}
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex flex-col items-center justify-center h-48 bg-purple-50/50 border border-dashed border-purple-200 rounded-lg space-y-2">
            <ArrowDownToLine className="h-8 w-8 text-purple-400" />
            <span className="text-xs text-gray-500 font-medium">
              No video uploaded for this chapter
            </span>
          </div>
        ) : (
          <div className="relative aspect-video mt-2 overflow-hidden rounded-lg border border-gray-200 bg-black">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
            />
          </div>
        ))}

      {/* Edit / Upload Zone */}
      {isEditing && (
        <div className="space-y-3 pt-2">
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <p className="text-[11px] text-gray-400 italic">
            Upload a high-quality video for this chapter.
          </p>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <p className="text-[11px] text-gray-400 italic">
          Videos can take a few minutes to process. Refresh the page if the player doesn&apos;t appear immediately.
        </p>
      )}
    </div>
  );
};
