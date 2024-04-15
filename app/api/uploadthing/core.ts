import { createUploadthing, type FileRouter } from "uploadthing/next";

import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const f = createUploadthing();
 
interface CustomErrorResponse extends Record<string, unknown> {
    message: string;
    status: number;
  }
  
  async function handleAuth(): Promise<Record<string, unknown>> {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
  
    if (!userId) {
      const errorResponse: CustomErrorResponse = {
        message: "Unauthorized",
        status: 401,
      };
      return errorResponse;
    }
  
    return { userId };
  }
  


// Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseImage: f({image: {maxFileSize:"4MB", maxFileCount:1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
courseAttachement: f(["text","image","video","audio","pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
    chapterVideo: f({video: {maxFileSize:"512GB", maxFileCount:1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
 
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;