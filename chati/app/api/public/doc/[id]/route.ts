import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const docId = params.id;
    const doc = await prisma.documentation.findUnique({
      where: { id: docId },
    });

    if (!doc) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doc);
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the document" },
      { status: 500 }
    );
  }
}
