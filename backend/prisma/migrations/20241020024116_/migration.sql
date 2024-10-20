/*
  Warnings:

  - Added the required column `calories_burned` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calories_consumed` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calories_goals` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `calories_burned` DOUBLE NOT NULL,
    ADD COLUMN `calories_consumed` DOUBLE NOT NULL,
    ADD COLUMN `calories_goals` DOUBLE NOT NULL;
