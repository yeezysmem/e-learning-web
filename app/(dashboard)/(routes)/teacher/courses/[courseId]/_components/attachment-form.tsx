"use client";

import * as z from "zod";
import axios from "axios";
import { File, Loader2, PlusCircle, X, Paperclip } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course, Attachment } from "@prisma/client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

interface AttachementFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachementForm = ({
  initialData,
  courseId,
}: AttachementFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Attachment added");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Failed to upload attachment");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete attachment");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border border-gray-200 bg-white rounded-xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="font-bold flex items-center justify-between text-gray-900 text-sm">
        <div className="flex items-center gap-x-2">
          <Paperclip className="w-4 h-4 text-purple-600" />
          <span>Resources & Attachments</span>
        </div>

        <Button
          onClick={toggleEdit}
          variant="ghost"
          size="sm"
          className="text-xs font-semibold hover:bg-gray-100 rounded-lg"
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Add File
            </>
          )}
        </Button>
      </div>

      {/* Attachments List */}
      {!isEditing && (
        <div className="space-y-2">
          {initialData.attachments.length === 0 && (
            <p className="text-xs text-gray-500 italic">
              No attachments added yet. Upload PDFs, code samples, or guides for students.
            </p>
          )}

          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-3 w-full bg-sky-50/70 border border-sky-200 text-sky-800 rounded-lg text-xs font-medium"
                >
                  <div className="flex items-center gap-x-2 min-w-0 pr-2">
                    <File className="h-4 w-4 shrink-0 text-sky-600" />
                    <span className="truncate">{attachment.name}</span>
                  </div>

                  {deletingId === attachment.id ? (
                    <Loader2 className="h-4 w-4 animate-spin text-sky-600 shrink-0" />
                  ) : (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="hover:text-rose-600 hover:bg-sky-100/60 p-1 rounded transition-colors shrink-0"
                      aria-label="Remove attachment"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* File Upload Zone */}
      {isEditing && (
        <div className="space-y-3 pt-2">
          <FileUpload
            endpoint="courseAttachement"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <p className="text-[11px] text-gray-500">
            Add documents, slides, or cheatsheets to support course materials.
          </p>
        </div>
      )}
    </div>
  );
};
