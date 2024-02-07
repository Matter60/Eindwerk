import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

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
