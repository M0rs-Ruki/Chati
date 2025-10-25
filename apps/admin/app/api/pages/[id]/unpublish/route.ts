import { prisma } from '@repo/database'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-middleware'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error, user } = await requireAuth(req)
    if (error) return error

    // Only ADMIN and EDITOR can unpublish
    if (user!.role !== 'ADMIN' && user!.role !== 'EDITOR') {
      return NextResponse.json(
        { error: 'Only admins and editors can unpublish pages' },
        { status: 403 }
      )
    }

    const { id } = await params

    const page = await prisma.page.update({
      where: { id },
      data: {
        status: 'DRAFT',
        publishedAt: null,
      },
    })

    return NextResponse.json(
      { 
        message: 'Page unpublished successfully',
        page 
      },
      { status: 200 }
    )

  } catch (error: unknown) {
    console.error('Unpublish page error:', error)

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: unknown }).code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Failed to unpublish page' },
      { status: 500 }
    )
  }
}
