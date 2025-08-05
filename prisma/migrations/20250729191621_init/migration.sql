/*
  Warnings:

  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `extraDate` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "description",
DROP COLUMN "extraDate",
DROP COLUMN "isActive";
