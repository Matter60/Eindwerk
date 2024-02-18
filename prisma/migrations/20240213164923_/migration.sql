/*
  Warnings:

  - You are about to drop the `Platform` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `parent_platforms` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Platform` DROP FOREIGN KEY `Platform_wishlistId_fkey`;

-- AlterTable
ALTER TABLE `Wishlist` ADD COLUMN `parent_platforms` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `Platform`;
