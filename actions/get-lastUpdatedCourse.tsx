import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getLastEditedCourseByUser(userId: string) {
  const userProgress = await prisma.userProgress.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      chapter: {
        include: {
          course: true,
        },
      },
    },
  });

  return userProgress?.chapter?.course;
}

export { getLastEditedCourseByUser };
