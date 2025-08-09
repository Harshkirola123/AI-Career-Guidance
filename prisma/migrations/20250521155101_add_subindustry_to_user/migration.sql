-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subIndustry" TEXT;

-- CreateTable
CREATE TABLE "contactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "contactMessage_pkey" PRIMARY KEY ("id")
);
