import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";
type CourseWithProgressWithCategory = Course & {
    progress: number | null; 
    category: Category;
    chapters: Chapter[];
};

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses =  async (userId: string): Promise<DashboardCourses> => {
    try {
        const purchasedCourses = await db.purchase.findMany({
            where: {
               userId : userId,
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        },
                    },
                }
            },
        });

    const courses = purchasedCourses.map((purchasedCourse) => purchasedCourse.course) as CourseWithProgressWithCategory;

    for (let course of courses) {
        const progress = await getProgress(userId, course.id);
        course["progress"] = progress;
    }

    const completedCourses = courses.filter((course) => course.progress === 100);
    const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);

    return {
        completedCourses,
        coursesInProgress
    }

    } catch(error){
        console.log("[GET_DASHBOARD_COURSESS]", error);
        return {
            completedCourses: [],
            coursesInProgress: [],
        }
    }
}