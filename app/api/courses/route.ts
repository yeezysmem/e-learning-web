import { useSession } from "next-auth/react";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(
    req: Request,
) {
    try {
        const session = await getServerSession(authOptions)
        const { title } = await req.json()
        const userId = session?.user?.id

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        
        const course = await db.course.create({
            data: {
                userId,
                title,
                price: 0,
                
            }
            }).catch(dbError => {
                console.error("[COURSES] Database Error:", dbError);
                throw new Error("Error creating course in the database");
             });
            return NextResponse.json(course)

    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}