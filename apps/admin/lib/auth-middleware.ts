import { NextResponse } from "next/server";
import { getCurrentUser } from "./auth-utils";

export async function requireAuth(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      ),
      user: null,
    };
  }
  return { error: null, user };
}

export async function requireAdmin(req: Request) {
  const { error, user } = await requireAuth(req);
  if (error) {
    return { error, user: null };
  }
  if (user!.role !== "ADMIN") {
    return {
      error: NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      ),
      user: null,
    };
  }
  return { error: null, user };
}

