import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";

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

    // Return user information (password is already excluded)
    return NextResponse.json({
      user: {
        id: user!.id,
        email: user!.email,
        name: user!.name,
        role: user!.role,
        status: user!.status,
      },
    }, {
      status: 200,
      headers: {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user information" },
      { status: 500 }
    );
  }
}
