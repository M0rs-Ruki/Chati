import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params

  try {
    const page = await prisma.page.findUnique({
      where: { 
        slug: id,
        status: 'PUBLISHED',
      },
      include: {
        sections: {
          where: { visible: true },
          orderBy: { order: 'asc' },
        },
        theme: true,
        seo: true,
      },
    })

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error('Failed to fetch page:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}
