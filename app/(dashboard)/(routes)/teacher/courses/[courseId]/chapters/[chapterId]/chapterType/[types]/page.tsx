
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

const TypeId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string; typeId: string, types: string};
}) => {
  const { courseId, chapterId, typeId, types } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/");
  }



  return (
    <div className="container">
      <h1 className="text-xl font-bold">Choose Chapter Type</h1>
        {params.types === "Lectures" ? (<div>Lectures</div>) : (<div>Its not Lectures</div>)}
    </div>
  );
};

export default TypeId;
