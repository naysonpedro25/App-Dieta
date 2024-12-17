/*
  Warnings:

  - You are about to drop the column `calories_burned` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `calories_consumed` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `calories_burned`,
    DROP COLUMN `calories_consumed`;

-- CreateTable
CREATE TABLE `DailyCalories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `calories_consumed` DOUBLE NOT NULL,
    `calories_burned` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `DailyCalories_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DailyCalories` ADD CONSTRAINT `DailyCalories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
