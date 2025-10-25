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

    if (user!.role !== 'ADMIN' && user!.role !== 'EDITOR') {
      return NextResponse.json(
        { error: 'Only admins and editors can unpublish blog posts' },
        { status: 403 }
      )
    }

    const { id } = await params

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        status: 'DRAFT',
        publishedAt: null,
      },
    })

    return NextResponse.json(
      { 
        message: 'Blog post unpublished successfully',
        post 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Unpublish blog post error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to unpublish blog post' },
      { status: 500 }
    )
  }
}
