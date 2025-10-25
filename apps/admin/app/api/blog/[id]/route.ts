import { prisma } from '@repo/database'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-middleware'

// GET single blog post
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const { id } = await params

    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: true,
        tags: true,
        cover: true,
        seo: true,
      },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post }, { status: 200 })

  } catch (error) {
    console.error('Get blog post error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT update blog post
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const { id } = await params
    const body = await req.json()
    const { 
      slug, 
      title, 
      excerpt, 
      content, 
      coverId, 
      categoryId, 
      tagIds 
    } = body

    // Check if slug is taken by another post
    if (slug) {
      const existingPost = await prisma.blogPost.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      })

      if (existingPost) {
        return NextResponse.json(
          { error: 'Slug already in use' },
          { status: 409 }
        )
      }
    }

    const updateData: any = {}
    if (slug !== undefined) updateData.slug = slug
    if (title !== undefined) updateData.title = title
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (content !== undefined) updateData.content = content
    if (coverId !== undefined) updateData.coverId = coverId
    if (categoryId !== undefined) updateData.categoryId = categoryId

    // Handle tags separately
    if (tagIds !== undefined) {
      // Disconnect all existing tags first
      await prisma.blogPost.update({
        where: { id },
        data: {
          tags: {
            set: [],
          },
        },
      })

      // Connect new tags
      if (tagIds.length > 0) {
        updateData.tags = {
          connect: tagIds.map((tagId: string) => ({ id: tagId })),
        }
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: true,
        tags: true,
        cover: true,
      },
    })

    return NextResponse.json(
      { 
        message: 'Blog post updated successfully',
        post 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Update blog post error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE blog post
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const { id } = await params

    await prisma.blogPost.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Blog post deleted successfully' },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Delete blog post error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
