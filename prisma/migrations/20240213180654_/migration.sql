/*
  Warnings:

  - You are about to alter the column `parent_platforms` on the `Wishlist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Wishlist` MODIFY `parent_platforms` JSON NOT NULL;
