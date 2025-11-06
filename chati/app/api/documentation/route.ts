import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const total = await prisma.documentation.count({ where });

    const docs = await prisma.documentation.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    return NextResponse.json({
      message: 'Documentation fetched successfully',
      data: docs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching All documentation:', error);
    return NextResponse.json(
      { message: 'Failed to fetch All documentation' },
      { status: 500 }
    );
  }
}
