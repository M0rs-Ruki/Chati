import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const docs = await prisma.documentation.findMany();
    return NextResponse.json(docs);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching documents" },
      { status: 500 }
    );
  }
}
