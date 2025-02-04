/*
  Warnings:

  - The `urgency` column on the `Questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "urgency",
ADD COLUMN     "urgency" BOOLEAN;
