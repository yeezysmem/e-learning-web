"use client";

import * as z from "zod";
import axios from "axios";

import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course, Attachment } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Course updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 border bg-white rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between ">
        <span className="font-bold">Attachments</span>
        <Button onClick={toggleEdit} variant="ghost">
        {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {/* <Pencil className="h-4 w-4 mr-2" />
              Edit  */}
            </>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add 
            </>
          )}
         
        </Button>
      </div>
      {!isEditing && (
        <div>
          {initialData.attachments.length === 0 && <p className="text-gray-500 text-sm">No attachments yet</p>}
          {initialData.attachments.length > 0 && (
            <div className="space-2 ">
              {initialData.attachments.map((attachment) => (
                <div className="flex items-center space-2" key={attachment.id}>
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p>{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachement"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything to complete the course
          </div>
        </div>
      )}
    </div>
  );
};
