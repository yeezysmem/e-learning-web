import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Book,
  Eye,
  Clapperboard,
  LayoutDashboard,
  Paperclip,
} from "lucide-react";
// import CodeMirror from "@uiw/react-codemirror";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { CaseSensitive } from "lucide-react";
import typeone from "../../../../../../../../../public/typeone.svg";
import { getServerSession } from "next-auth";
import Logo from "../../../../../../../../../public/assets/icons/logo.svg";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import typetwo from "../../../../../../../../../public/typetwo.svg";
import typethree from "../../../../../../../../../public/typethree.svg";
import ChapterCard from "./_components/chapterCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { z } from "zod";

interface ChapterTypeProps {
  params: {
    courseId: string;
    chapterId: string;
    typeId: string;
    chapter: {
      id: string;
      name: string;
      description: string;
    };
  };
}
const formSchema = z.object({
  price: z.coerce.number().min(30, {
    message: "Price is required",
  }),
});

const ChapterType = async ({
  params,
}: {
  params: { courseId: string; chapterId: string; typeId: string };
}) => {
  const { courseId, chapterId, typeId } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="h-[100vh] m-1.5 rounded-md border bg-gray-100">
      <span className="bg-black text-white flex rounded-t-md px-4 text-xs p-1">
        Course creation: choose chapter type
      </span>
      <div className="container">
        <h1 className="text-xl font-bold mt-10">Choose Chapter Type</h1>
        <ChapterCard courseId={params.courseId} chapterId={params.chapterId} />
      </div>
    </div>
  );
};

export default ChapterType;
