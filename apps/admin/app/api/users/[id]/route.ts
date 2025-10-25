import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { requireAuth, requireAdmin } from "@/lib/auth-middleware";
import { hashPassword } from "@/lib/auth-utils";

// GET single user
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await requireAuth(req);
    if (error) return error;

    const user = await prisma.user.findUnique({
      where: { id: params.id },
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

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PUT update user
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error, user: currentUser } = await requireAdmin(req);
    if (error) return error;

    const body = await req.json();
    const { email, name, role, status, password } = body;

    if ((role || status) && currentUser!.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required to change role or status" },
        { status: 403 }
      );
    }

    if (params.id !== currentUser!.userId && currentUser!.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Cannot update other users' information" },
        { status: 403 }
      );
    }

    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;
    if (status !== undefined) updateData.status = status;
    if (password !== undefined) {
      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update user error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE user (admin only)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error, user } = await requireAdmin(req);
    if (error) return error;

    if (params.id === user!.userId) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete user error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
