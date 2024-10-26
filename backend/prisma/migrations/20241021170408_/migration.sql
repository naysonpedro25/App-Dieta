/*
  Warnings:

  - You are about to drop the column `userId` on the `Food` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Food_userId_key` ON `Food`;

-- AlterTable
ALTER TABLE `Food` DROP COLUMN `userId`;
