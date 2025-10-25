import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

// GET navigation by key (header or footer)
export async function GET(req: Request) {
  try {
    const { error } = await requireAuth(req);
    if (error)
      return NextResponse.json(
        { error: `Unauthorized: ${error}` },
        { status: 401 }
      );

    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { error: "key query parameter is required (header or footer)" },
        { status: 400 }
      );
    }

    const navigation = await prisma.navigation.findUnique({
      where: { key },
    });

    if (!navigation) {
      return NextResponse.json(
        { error: "Navigation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ navigation }, { status: 200 });
  } catch (error) {
    console.error("Get navigation error:", error);
    return NextResponse.json(
      { error: "Failed to fetch navigation" },
      { status: 500 }
    );
  }
}

// PUT upsert navigation (create or update)
export async function PUT(req: Request) {
  try {
    const { error, user } = await requireAuth(req);
    if (error) return error;

    // Only ADMIN and EDITOR can update navigation
    if (user!.role !== "ADMIN" && user!.role !== "EDITOR") {
      return NextResponse.json(
        { error: "Only admins and editors can update navigation" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { key, items } = body;

    if (!key || !items) {
      return NextResponse.json(
        { error: "key and items are required" },
        { status: 400 }
      );
    }

    if (key !== "header" && key !== "footer") {
      return NextResponse.json(
        { error: 'key must be "header" or "footer"' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: "items must be an array" },
        { status: 400 }
      );
    }

    // Upsert (update if exists, create if not)
    const navigation = await prisma.navigation.upsert({
      where: { key },
      update: { items },
      create: { key, items },
    });

    return NextResponse.json(
      {
        message: "Navigation updated successfully",
        navigation,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update navigation error:", error);
    return NextResponse.json(
      { error: "Failed to update navigation" },
      { status: 500 }
    );
  }
}
