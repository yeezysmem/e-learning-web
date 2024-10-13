import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { preferencesId: string } }
) {
  try {
    // Get the current user's session
    const session = await getServerSession(authOptions);
    
    const userId = session?.user?.id;
    // Extract the user ID from the session
    // const userId = session?.user?.id;
    // Extract the preferences data from the request body
    const { role } = await req.body;

    // If the user is not authenticated, return an unauthorized response
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create or update user recommendations in the database
    const userData = await db.user.update({
      where: { id: userId },
      data: {
        role: role,
      },
    });

    // Return a JSON response with the updated user recommendations
    return NextResponse.json(userData);
  } catch (error) {
    // Log any errors that occur during the process
    console.error("[USER_RECOMMENDATIONS_UPDATE_ERROR]", error);
    // Return an internal server error response
    return new NextResponse("Internal Error", { status: 500 });
  }
}




 

