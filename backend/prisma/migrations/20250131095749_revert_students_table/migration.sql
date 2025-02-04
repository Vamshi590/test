/*
  Warnings:

  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_userId_fkey";

-- DropTable
DROP TABLE "Students";
