-- CreateEnum
CREATE TYPE "public"."modelTypeEnum" AS ENUM ('Man', 'Women', 'Others');

-- CreateEnum
CREATE TYPE "public"."modelEthinicityEnum" AS ENUM ('AsianAmerican', 'SouthAsian', 'SouthEastAsian', 'MiddleEastern', 'Black', 'Caucasian', 'Hispanic', 'Other');

-- CreateEnum
CREATE TYPE "public"."modelEyeColorEnum" AS ENUM ('Brown', 'Black', 'Blue', 'Green', 'Other');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "userame" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "type" "public"."modelTypeEnum" NOT NULL,
    "ethinicity" "public"."modelEthinicityEnum" NOT NULL,
    "eyeColor" "public"."modelEyeColorEnum" NOT NULL,
    "bald" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TrainingImages" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "TrainingImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OutputImages" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutputImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Packs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Packs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PackPrompts" (
    "id" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "PackPrompts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TrainingImages" ADD CONSTRAINT "TrainingImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OutputImages" ADD CONSTRAINT "OutputImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PackPrompts" ADD CONSTRAINT "PackPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "public"."Packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
