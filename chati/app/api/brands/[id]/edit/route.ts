import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
    try {
        const { user, error } = await authenticateRequest(req);
        if (error) return error;
        
        if (user.role !== "ADMIN" && user.role !== "EDITOR") {
            return NextResponse.json(
                { message: "Access denied. Only admins and editors can edit brand." },
                { status: 403 }
            );
        };
        const body = await req.json();
        const { name, logoUrl } = body;
        const updatedBrand = await prisma.brand.update({
            where: { id: params.id },
            data: {
                name,
                logoUrl,
            },
        });

        return NextResponse.json({
            message: "Brand updated successfully",
            data: updatedBrand,
        });
    } catch (error) {
        console.error("[ERROR] Error updating brand:", error);
        return NextResponse.json(
            { message: "Failed to update brand" },
            { status: 500 }
        );
    }
}