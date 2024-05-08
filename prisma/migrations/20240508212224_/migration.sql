-- CreateTable
CREATE TABLE "Wishlist" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "game_id" INTEGER NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "background_image" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "metacritic" INTEGER,
    "released" VARCHAR(255) NOT NULL,
    "reviews_count" INTEGER,
    "parent_platforms" JSONB NOT NULL,
    "rating" INTEGER,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owned" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "game_id" INTEGER NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "background_image" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "metacritic" INTEGER,
    "released" VARCHAR(255) NOT NULL,
    "reviews_count" INTEGER,
    "parent_platforms" JSONB NOT NULL,
    "rating" INTEGER,

    CONSTRAINT "Owned_pkey" PRIMARY KEY ("id")
);
