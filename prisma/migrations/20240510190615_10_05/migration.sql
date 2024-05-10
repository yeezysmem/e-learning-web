/*
  Warnings:

  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `optionA` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `optionB` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `optionC` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `optionD` on the `Question` table. All the data in the column will be lost.
  - Added the required column `isCorrect` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `UserProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "codeSnippet" STRING;
ALTER TABLE "Chapter" ADD COLUMN     "explanation" STRING;
ALTER TABLE "Chapter" ADD COLUMN     "programmingLanguageId" STRING;
ALTER TABLE "Chapter" ADD COLUMN     "questionId" STRING;
ALTER TABLE "Chapter" ADD COLUMN     "rightAnswer" STRING;
ALTER TABLE "Chapter" ALTER COLUMN "grade" SET DATA TYPE STRING;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "authorId" STRING;
ALTER TABLE "Course" ADD COLUMN     "rating" FLOAT8;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answer";
ALTER TABLE "Question" DROP COLUMN "optionA";
ALTER TABLE "Question" DROP COLUMN "optionB";
ALTER TABLE "Question" DROP COLUMN "optionC";
ALTER TABLE "Question" DROP COLUMN "optionD";
ALTER TABLE "Question" ADD COLUMN     "isCorrect" BOOL NOT NULL;
ALTER TABLE "Question" ADD COLUMN     "option" STRING NOT NULL;

-- AlterTable
ALTER TABLE "UserProgress" ADD COLUMN     "courseId" STRING NOT NULL;
ALTER TABLE "UserProgress" ADD COLUMN     "explanation" STRING;
ALTER TABLE "UserProgress" ADD COLUMN     "grade" INT4;

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "email" STRING NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "verificationToken" (
    "id" STRING NOT NULL,
    "identifier" STRING,
    "email" STRING,
    "token" STRING,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "credentialPublicKey" STRING NOT NULL,
    "counter" INT4 NOT NULL,
    "credentialDeviceType" STRING NOT NULL,
    "credentialBackedUp" BOOL NOT NULL,
    "transports" STRING,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "ProgramminLanguage" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "ProgramminLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "bio" STRING,
    "website" STRING,
    "imageUrl" STRING,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verificationToken_token_key" ON "verificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationToken_identifier_token_key" ON "verificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramminLanguage_name_key" ON "ProgramminLanguage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE INDEX "Chapter_programmingLanguageId_idx" ON "Chapter"("programmingLanguageId");

-- CreateIndex
CREATE INDEX "UserProgress_courseId_idx" ON "UserProgress"("courseId");
