import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await authenticateRequest(req);
  if (error) return error;

  try {
    const userId = params.id;
    if (user.role !== "ADMIN" && user.id !== userId) {
      return NextResponse.json(
        { message: "Forbidden: You can only view your own profile" },
        { status: 403 }
      );
    }
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
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

    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User fetched successfully",
      data: targetUser,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await authenticateRequest(req);
  if (error) return error;

  try {
    const userId = params.id;
    const body = await req.json();
    const { name, email, role, status } = body;

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.role === "EDITOR") {
      if (user.id !== userId) {
        return NextResponse.json(
          { message: "Forbidden: Editors can only update their own profile" },
          { status: 403 }
        );
      }
    }

    if (user.role === "ADMIN") {
      if (targetUser.role === "ADMIN" && user.id !== userId) {
        return NextResponse.json(
          { message: "Forbidden: Admins cannot update other admins" },
          { status: 403 }
        );
      }
    }
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email: email.toLowerCase() }),
        ...(role !== undefined && user.role === "ADMIN" && { role }),
        ...(status !== undefined && user.role === "ADMIN" && { status }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}
