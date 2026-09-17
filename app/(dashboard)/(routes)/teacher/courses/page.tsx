import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { PlusCircle } from "lucide-react";

import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/authOptions";
import { Button } from "@/components/ui/button";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursesPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Courses</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your created courses, chapters, and pricing
          </p>
        </div>

        <Link href="/teacher/create">
          <Button className="flex items-center gap-x-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm">
            <PlusCircle className="w-4 h-4" />
            <span>New Course</span>
          </Button>
        </Link>
      </div>

      {/* Data Table View */}
      <div className="pt-2">
        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
