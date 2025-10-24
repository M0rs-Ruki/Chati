import { prisma } from "@repo/database";
import { NextResponse } from "next/server";

// Get all users
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(users);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

// POST create new user
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                role: body.role,
                status: 'ACTIVE',
                password: body.password
            }
        })
        return NextResponse.json(user, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}