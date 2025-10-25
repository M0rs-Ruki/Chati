import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-middleware'

// GET single tag
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const { id } = await params

    const tag = await prisma.tag.findUnique({
      where: { id },
      include: {
        blogPosts: {
          select: {
            id: true,
            slug: true,
            title: true,
            status: true,
            publishedAt: true,
          },
          orderBy: { publishedAt: 'desc' },
        },
      },
    })

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ tag }, { status: 200 })

  } catch (error) {
    console.error('Get tag error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tag' },
      { status: 500 }
    )
  }
}

// PUT update tag
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const { id } = await params
    const body = await req.json()
    const { slug, title } = body

    // Check if slug is taken by another tag
    if (slug) {
      const existingTag = await prisma.tag.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      })

      if (existingTag) {
        return NextResponse.json(
          { error: 'Slug already in use' },
          { status: 409 }
        )
      }
    }

    const updateData: any = {}
    if (slug !== undefined) updateData.slug = slug
    if (title !== undefined) updateData.title = title

    const tag = await prisma.tag.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(
      { 
        message: 'Tag updated successfully',
        tag 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Update tag error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update tag' },
      { status: 500 }
    )
  }
}

// DELETE tag
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const { id } = await params

    await prisma.tag.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Tag deleted successfully' },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Delete tag error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    )
  }
}
