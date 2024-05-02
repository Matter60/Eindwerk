-- CreateTable
CREATE TABLE `Owned` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `game_id` INTEGER NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `background_image` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `metacritic` INTEGER NULL,
    `released` VARCHAR(255) NOT NULL,
    `reviews_count` INTEGER NULL,
    `parent_platforms` JSON NOT NULL,
    `rating` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
