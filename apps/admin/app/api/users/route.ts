import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-middleware";

// Get all users
export async function GET(req: Request) {
  try {
    const { error, user } = await requireAdmin(req);
    if (error) {
      return error;
    }
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

