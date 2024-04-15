import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { db } from "@/lib/db";


export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string} }
  ) {
    try {
      const session = await getServerSession(authOptions);
      const userId = session?.user?.id;
      const { chapterType } = await req.json();
  

      if (!params.chapterId) {
        throw new Error("ChapterId is undefined");
      }

      const chapter = await db.chapter.update({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
        data: {
          chapterType
        },
      });
      console.log("CHAPTER ", chapter);
  
      return NextResponse.json(chapter);
      
    } catch (error) {
      console.log("[CHAPTERS]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  

