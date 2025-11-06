import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";

/**
 * POST /api/auth/logout
 * Logs out the user by clearing the authentication cookie
 */
export async function POST(req: Request) {
  const { user, error } = await authenticateRequest(req);

  if (error) {
    return error;
  }
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the token cookie
    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "An error occurred during logout" },
      { status: 500 }
    );
  }
}
