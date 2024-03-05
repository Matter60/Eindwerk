import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

// This is the wishlist API route

export async function POST(req) {
  const { userId } = auth();
  const data = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!data) return NextResponse.error(400, "No data provided");

  const wishlist = await prisma.wishlist.findFirst({
    where: {
      user_id: userId,
      game_id: data.game_id,
      slug: data.slug,
    },
  });

  if (wishlist) {
    return NextResponse.json({ error: "Already wishlisted" });
  }
  console.log(userId);
  prisma.wishlist
    .create({
      data: {
        user_id: userId,
        game_id: data.game_id,
        slug: data.slug,
        name: data.name,
        background_image: data.background_image,
        released: data.released,
        metacritic: data.metacritic,
        reviews_count: data.reviews_count,
        parent_platforms: data.parent_platforms,
        rating: data.rating,
      },
    })
    .then((result) => {
      console.log("Wishlist item created:", result);
    })
    .catch((error) => {
      console.error("Error creating wishlist item:", error);
    });

  return NextResponse.json(data);
}

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const wishlistItems = await prisma.wishlist.findMany({
    where: {
      user_id: userId,
    },
  });

  if (wishlistItems.length > 0) {
    return new Response(JSON.stringify(wishlistItems), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("No wishlist items found", { status: 404 });
  }
}

export async function DELETE(req) {
  const { userId } = auth();
  const data = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!data) return NextResponse.error(400, "No data provided");

  const wishlist = await prisma.wishlist.findFirst({
    where: {
      user_id: userId,
      game_id: data.id,
      slug: data.slug,
    },
  });

  if (!wishlist) {
    return NextResponse.error(404, "Wishlist item not found");
  }

  prisma.wishlist
    .delete({
      where: {
        id: wishlist.id,
        game_id: wishlist.game_id,
        slug: wishlist.slug,
      },
    })
    .then((result) => {
      console.log("Wishlist item deleted:", result);
    })
    .catch((error) => {
      console.error("Error deleting wishlist item:", error);
    });

  return NextResponse.json(data);
}

// This is the Owner API route

export async function POST(req) {
  const { userId } = auth();
  const data = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!data) return NextResponse.error(400, "No data provided");

  const owned = await prisma.owned.findFirst({
    where: {
      user_id: userId,
      game_id: data.game_id,
      slug: data.slug,
    },
  });

  if (owned) {
    return NextResponse.json({ error: "Already owned" });
  }

  prisma.owned
    .create({
      data: {
        user_id: userId,
        game_id: data.game_id,
        slug: data.slug,
        name: data.name,
        background_image: data.background_image,
        released: data.released,
        metacritic: data.metacritic,
        reviews_count: data.reviews_count,
        parent_platforms: data.parent_platforms,
        rating: data.rating,
      },
    })
    .then((result) => {
      console.log("Owned item created:", result);
    })
    .catch((error) => {
      console.error("Error creating owned item:", error);
    });

  return NextResponse.json(data);
}

export async function GET(req) {
  const { userId } = auth();
  const data = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!data) return NextResponse.error(400, "No data provided");

  const owned = await prisma.owned.findFirst({
    where: {
      user_id: userId,
      game_id: data.game_id,
      slug: data.slug,
    },
  });

  if (owned) {
    return NextResponse.json({ error: "Already owned" });
  }

  prisma.owned
    .create({
      data: {
        user_id: userId,
        game_id: data.game_id,
        slug: data.slug,
        name: data.name,
        background_image: data.background_image,
        released: data.released,
        metacritic: data.metacritic,
        reviews_count: data.reviews_count,
        parent_platforms: data.parent_platforms,
        rating: data.rating,
      },
    })
    .then((result) => {
      console.log("Owned item created:", result);
    })
    .catch((error) => {
      console.error("Error creating owned item:", error);
    });

  return NextResponse.json(data);
}

export async function DELETE(req) {
  const { userId } = auth();
  const data = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!data) return NextResponse.error(400, "No data provided");

  const owned = await prisma.owned.findFirst({
    where: {
      user_id: userId,
      game_id: data.id,
      slug: data.slug,
    },
  });

  if (!owned) {
    return NextResponse.error(404, "Owned item not found");
  }

  prisma.owned
    .delete({
      where: {
        id: owned.id,
        game_id: owned.game_id,
        slug: owned.slug,
      },
    })
    .then((result) => {
      console.log("Owned item deleted:", result);
    })
    .catch((error) => {
      console.error("Error deleting owned item:", error);
    });

  return NextResponse.json(data);
}
