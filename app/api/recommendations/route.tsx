import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This function handles the backend logic for updating user recommendations
export async function POST(
  req: Request,
  { params }: { params: { preferencesId: string; } }
) {
  try {
    // Get the current user's session
    const session = await getServerSession(authOptions);
    // Extract the user ID from the session
    const userId = session?.user?.id;
    // Extract the preferences data from the request body
    const { preferences } = await req.json();
     

    // If the user is not authenticated, return an unauthorized response
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 

    // Create or update user recommendations in the database
    const userRecommendations = await db.userRecomendations.create({
      data: {
        // id:preferencesId,
        userId: userId,  
        preferences: preferences, 
        recommendations: "000000", 
      },
    });

    // Return a JSON response with the updated user recommendations
    return NextResponse.json(userRecommendations);
  } catch (error) {
    // Log any errors that occur during the process
    console.error("[USER_RECOMMENDATIONS_UPDATE_ERROR]", error);
    // Return an internal server error response
    return new NextResponse("Internal Error", { status: 500 });
  }
}
