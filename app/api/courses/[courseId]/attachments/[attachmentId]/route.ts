import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    {params}: {params: {courseId: string, attachmentId: string}}
) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        
        }
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if(!courseOwner) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const attachment = await db.attachment.delete({
            where: {
                id: params.attachmentId,
                courseId: params.courseId,

            }
        });
        return NextResponse.json(attachment);

    } catch(error) {
        console.log("ATTACHMENT_ID:",error);
        return new NextResponse("Something went wrong", {status: 500})
    }
}