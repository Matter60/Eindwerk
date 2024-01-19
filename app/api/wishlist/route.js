import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST() {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!data) return NextResponse.error(400, "No data provided");

  console.log(userId);
  prisma.whishlist.create({
    data: {},
  });

  return NextResponse.json({ data });
}

/*export async function POST(req) {
  const data = await req.json();

  const { sessionId, getToken } = await req.auth;

  console.log(data, sessionId, userId);

  if (!data) return NextResponse.error(400, "No data provided");

  prisma.whishlist.create({
    data: {},
  });

  return NextResponse.json(data);
}*/
