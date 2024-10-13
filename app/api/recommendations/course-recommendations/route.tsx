import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
  req: Request,
  { params }: { params: { preferencesId: string } }
) {
  try {
    // Get the current user's session
    const session = await getServerSession(authOptions);
    // Extract the user ID from the session
    const userId = session?.user?.id;
 

    // Check if the user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body to extract the recommendations data
    const {  recommendations } = await req.json();

    // Find the user recommendations record by userId
    const userRecommendations = await db.userRecomendations.findUnique({
      where: {
        id: "25ac88bd-6e7f-4190-b6a5-6fc365d6de6f",
        userId: userId,
      },
    });

    // If user recommendations record not found, return 404 response
    if (!userRecommendations) {
      return new NextResponse("User recommendations not found rrr", {
        status: 404,
      });
    }

    // Update the user recommendations record with new recommendations
    const updatedUserRecommendations = await db.userRecomendations.update({
      where: {
        id: "25ac88bd-6e7f-4190-b6a5-6fc365d6de6f",
      },
      data: {
        recommendations:recommendations,
      },
    });

    // Return a JSON response with the updated user recommendations
    return new NextResponse(JSON.stringify(updatedUserRecommendations), {
      status: 200,
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("[USER_RECOMMENDATIONS_UPDATE_ERROR]", error);
    // Return an internal server error response
    return new NextResponse("Internal Error", { status: 500 });
  }
}
