import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/auth/me
 * Returns the currently authenticated user's information
 */
export async function GET(req: Request) {
  try {
    // Authenticate the request
    const { user, error } = await authenticateRequest(req);

    if (error) {
      return error;
    }

    const userId = user!.id;

    // Fetch user information from the database
    const userRecord = await prisma.user.findUnique({ where: { id: userId } });

    if (!userRecord) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return user information (password is already excluded)
    return NextResponse.json(
      {
        user: {
          id: user!.id,
          email: user!.email,
          name: user!.name,
          createdAt: userRecord!.createdAt,
          updatedAt: userRecord!.updatedAt,
          role: user!.role,
          status: user!.status,
        },
      },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user information" },
      { status: 500 }
    );
  }
}
