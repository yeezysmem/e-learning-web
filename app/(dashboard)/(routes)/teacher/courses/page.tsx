import Link from 'next/link';

const CoursesPage = () => {
    return (
        <div>
            <Link href="/teacher/create">
                <button>
                    Create Course
                </button>
            </Link>
        </div>
    );
}

export default CoursesPage;