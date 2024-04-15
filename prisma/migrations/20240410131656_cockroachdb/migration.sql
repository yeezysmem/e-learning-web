-- CreateTable
CREATE TABLE "Category" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "userName" STRING,
    "userImage" STRING,
    "title" STRING NOT NULL,
    "description" STRING,
    "imageUrl" STRING,
    "price" FLOAT8 NOT NULL,
    "isPublished" BOOL NOT NULL DEFAULT false,
    "categoryId" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "typeId" STRING,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "videoUrl" STRING,
    "isFree" BOOL NOT NULL DEFAULT false,
    "isPublished" BOOL NOT NULL DEFAULT false,
    "position" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" STRING NOT NULL,
    "typeId" STRING,
    "chapterType" STRING,
    "taskDescription" STRING,
    "imageUrl" STRING,
    "taskCriteria" STRING,
    "grade" INT4,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" STRING NOT NULL,
    "question" STRING NOT NULL,
    "optionA" STRING NOT NULL,
    "optionB" STRING NOT NULL,
    "optionC" STRING NOT NULL,
    "optionD" STRING NOT NULL,
    "answer" STRING NOT NULL,
    "chapterId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "url" STRING NOT NULL,
    "courseId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuxData" (
    "id" STRING NOT NULL,
    "playbackId" STRING NOT NULL,
    "assetId" STRING NOT NULL,
    "chapterId" STRING NOT NULL,

    CONSTRAINT "MuxData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProgress" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "chapterId" STRING NOT NULL,
    "isCompleted" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "courseId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "stripeCustomerId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StripeCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE INDEX "Type_id_idx" ON "Type"("id");

-- CreateIndex
CREATE INDEX "Course_typeId_idx" ON "Course"("typeId");

-- CreateIndex
CREATE INDEX "Course_categoryId_idx" ON "Course"("categoryId");

-- CreateIndex
CREATE INDEX "Course_title_idx" ON "Course"("title");

-- CreateIndex
CREATE INDEX "Chapter_courseId_idx" ON "Chapter"("courseId");

-- CreateIndex
CREATE INDEX "Chapter_typeId_idx" ON "Chapter"("typeId");

-- CreateIndex
CREATE INDEX "Question_chapterId_idx" ON "Question"("chapterId");

-- CreateIndex
CREATE INDEX "Attachment_courseId_idx" ON "Attachment"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "MuxData_chapterId_key" ON "MuxData"("chapterId");

-- CreateIndex
CREATE INDEX "UserProgress_chapterId_idx" ON "UserProgress"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_chapterId_key" ON "UserProgress"("userId", "chapterId");

-- CreateIndex
CREATE INDEX "Purchase_courseId_idx" ON "Purchase"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_courseId_key" ON "Purchase"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_stripeCustomerId_key" ON "StripeCustomer"("stripeCustomerId");
