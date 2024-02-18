/*
  Warnings:

  - You are about to drop the column `parent_platforms` on the `Wishlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Wishlist` DROP COLUMN `parent_platforms`;

-- CreateTable
CREATE TABLE `Platform` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `wishlistId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Platform` ADD CONSTRAINT `Platform_wishlistId_fkey` FOREIGN KEY (`wishlistId`) REFERENCES `Wishlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
