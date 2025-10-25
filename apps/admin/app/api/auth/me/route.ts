import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";

export async function GET(req: Request) {
  try {
    const tokenData = await getCurrentUser();
    if (!tokenData) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Account is disabled" },
        { status: 403 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json(
      { error: "Failed to get user data" },
      { status: 500 }
    );
  }
}
