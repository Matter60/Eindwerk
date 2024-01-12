import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const data = await req.json();

  const { sessionId, getToken } = await req.auth;

  console.log(data, sessionId);

  if (!data) return NextResponse.error(400, "No data provided");

  prisma.whishlist.create({
    data: {},
  });

  return NextResponse.json(data);
}
