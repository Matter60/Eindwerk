/*
  Warnings:

  - Added the required column `background_image` to the `Wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_platforms` to the `Wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `released` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Wishlist` ADD COLUMN `background_image` VARCHAR(255) NOT NULL,
    ADD COLUMN `metacritic` INTEGER NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `parent_platforms` VARCHAR(255) NOT NULL,
    ADD COLUMN `rating` INTEGER NULL,
    ADD COLUMN `released` VARCHAR(255) NOT NULL,
    ADD COLUMN `reviews_count` INTEGER NULL;
