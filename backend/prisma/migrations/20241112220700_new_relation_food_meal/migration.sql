/*
  Warnings:

  - The primary key for the `Food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mealId` on the `Food` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Food` DROP FOREIGN KEY `Food_mealId_fkey`;

-- AlterTable
ALTER TABLE `Food` DROP PRIMARY KEY,
    DROP COLUMN `mealId`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `MealFood` (
    `foodId` INTEGER NOT NULL,
    `mealId` INTEGER NOT NULL,

    PRIMARY KEY (`mealId`, `foodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MealFood` ADD CONSTRAINT `MealFood_mealId_fkey` FOREIGN KEY (`mealId`) REFERENCES `Meal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealFood` ADD CONSTRAINT `MealFood_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
