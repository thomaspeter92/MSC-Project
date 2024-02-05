/*
  Warnings:

  - You are about to drop the column `complete` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "complete";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "complete" BOOLEAN;
