import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  try {
    const nav = await prisma.navigation.findUnique({
      where: { key: key || "header" },
    });

    return NextResponse.json(nav || { items: [] });
  } catch (error) {
    return NextResponse.json({ items: [] });
  }
}
