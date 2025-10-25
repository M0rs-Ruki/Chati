import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-middleware'

// GET all media
export async function GET(req: Request) {
  try {
    const { error } = await requireAuth(req)
    if (error) return NextResponse.json({ error: `Unauthorized: ${error}`}, { status: 401 })

    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const media = await prisma.media.findMany({
      where: {
        ...(search && {
          OR: [
            { alt: { contains: search, mode: 'insensitive' } },
            { url: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    })

    const total = await prisma.media.count({
      where: {
        ...(search && {
          OR: [
            { alt: { contains: search, mode: 'insensitive' } },
            { url: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
    })

    return NextResponse.json(
      {
        media,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Get media error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}
