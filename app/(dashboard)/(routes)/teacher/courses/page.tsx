
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import {db} from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';



const CoursesPage = async () => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return (
        <div className='container'>
           <div>
           {/* <Link href="/teacher/create">
                <Button>
                    Create Course
                </Button>
            </Link> */}
            <DataTable columns={columns} data={courses} />
           </div>
        </div>
    );
}

export default CoursesPage;