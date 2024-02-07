/*
  Warnings:

  - You are about to alter the column `game_id` on the `Wishlist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Wishlist` MODIFY `game_id` INTEGER NOT NULL;
