/*
  Warnings:

  - A unique constraint covering the columns `[name,version]` on the table `ProgramminLanguage` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "languageVersion" STRING;

-- AlterTable
ALTER TABLE "ProgramminLanguage" ADD COLUMN     "version" STRING;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" STRING NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "UserProgress" ADD COLUMN     "preferences" STRING;

-- CreateTable
CREATE TABLE "UserRecomendations" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "preferences" STRING NOT NULL,
    "recommendations" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecomendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "preferences" STRING NOT NULL,
    "recommendations" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramminLanguage_name_version_key" ON "ProgramminLanguage"("name", "version");
