import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string} }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const { title } = await req.json();
    // const { typeName } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
        // typeName: params.typeName,
        // typeName: params.typeName,
      }
    });

  

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      }
    });

    return NextResponse.json(chapter);
    
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

