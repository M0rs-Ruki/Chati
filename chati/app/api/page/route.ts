import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const { user, error } = await authenticateRequest(req);
    if (error) return error;

    // Query parameters for filtering and pagination
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build filter
    const where: any = {};
    if (status) {
      where.status = status;
    }

    // Get total count
    const total = await prisma.page.count({ where });

    // Fetch pages
    const pages = await prisma.page.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        status: true,
        publishedAt: true,
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
      message: 'Pages fetched successfully',
      data: pages,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { message: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}
