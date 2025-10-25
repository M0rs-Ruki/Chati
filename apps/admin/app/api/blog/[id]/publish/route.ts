import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-middleware'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error, user } = await requireAuth(req)
    if (error) return error

    // Only ADMIN and EDITOR can publish
    if (user!.role !== 'ADMIN' && user!.role !== 'EDITOR') {
      return NextResponse.json(
        { error: 'Only admins and editors can publish blog posts' },
        { status: 403 }
      )
    }

    const { id } = await params

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
      include: {
        author: { select: { id: true, name: true } },
        category: true,
        tags: true,
      },
    })

    return NextResponse.json(
      { 
        message: 'Blog post published successfully',
        post 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Publish blog post error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to publish blog post' },
      { status: 500 }
    )
  }
}
