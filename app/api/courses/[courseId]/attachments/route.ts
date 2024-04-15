import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function POST(
    req: Request,
    {params}: {params: {courseId: string}}
) {
    try {
        // const {userId} = await handleAuth();≈
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        const {url} = await req.json();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        };

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if(!courseOwner) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                courseId: params.courseId,
            }
        });

        return NextResponse.json(attachment);

       
    } catch (error) {
        console.error(error);
        return new Response("Internal server error", {status: 500});
    }
}