"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedChapters = Array.from(chapters);
    const [reorderedItem] = reorderedChapters.splice(result.source.index, 1);
    reorderedChapters.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = reorderedChapters.slice(startIndex, endIndex + 1);

    setChapters(reorderedChapters);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: reorderedChapters.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2.5">
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cn(
                      "flex items-center gap-x-2 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition-all shadow-sm",
                      chapter.isPublished && "bg-emerald-50/60 border-emerald-200 text-emerald-900",
                      snapshot.isDragging && "shadow-md bg-purple-50 border-purple-300 opacity-90 scale-[1.01]"
                    )}
                  >
                    {/* Drag Handle */}
                    <div
                      {...provided.dragHandleProps}
                      className={cn(
                        "px-2.5 py-3 border-r border-gray-200 rounded-l-lg hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600",
                        chapter.isPublished && "border-r-emerald-200 hover:bg-emerald-100/60"
                      )}
                    >
                      <Grip className="h-4 w-4" />
                    </div>

                    {/* Chapter Title */}
                    <span className="truncate max-w-[200px] sm:max-w-xs pl-1">
                      {chapter.title}
                    </span>

                    {/* Right Action & Badges */}
                    <div className="ml-auto flex items-center gap-x-2 pr-3">
                      {chapter.isFree && (
                        <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100 border border-sky-200 text-[10px] px-2 py-0.5">
                          Free
                        </Badge>
                      )}

                      {chapter.chapterType && (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border border-purple-200 text-[10px] px-2 py-0.5 capitalize">
                          {chapter.chapterType}
                        </Badge>
                      )}

                      <Badge
                        className={cn(
                          "text-[10px] px-2 py-0.5 border font-semibold",
                          chapter.isPublished
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-200"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>

                      <button
                        onClick={() => onEdit(chapter.id)}
                        className="p-1 text-gray-500 hover:text-purple-600 hover:bg-white rounded transition-colors"
                        aria-label="Edit Chapter"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
