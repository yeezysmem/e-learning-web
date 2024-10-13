"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isTeacher } from "@/lib/teacher";
import { useSession, signIn, signOut } from "next-auth/react";
// import { SearchInput } from "./search-input";
export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";
    const { data: session } = useSession();

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    search
                </div>
            )}
            {/* <Link href="/teacher/courses" className="">
                <button className="flex items-center justify-center gap-x-2 mt-5 px-4 text-white">
                    <span>
                        Teacher mode
                    </span>
                </button>
                </Link> */}
            {/* <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isCoursePage ? (
                    <Link href="/">
                        <button className="text-sm">
                            LogOut
                        </button>
                    </Link>
                ) : isTeacher(session?.user?.id) ? (
                    <Link href="/teacher/courses">
                        <button className="text-text">
                            Teacher mode
                        </button>
                    </Link>
                ) : <div> asdasd</div>}

            </div> */}
        </>
    )
}