import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-middleware'

// GET single category
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const { id } = await params

    const category = await prisma.category.findUnique({
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

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ category }, { status: 200 })

  } catch (error) {
    console.error('Get category error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}

// PUT update category
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const { id } = await params
    const body = await req.json()
    const { slug, title, description } = body

    // Check if slug is taken by another category
    if (slug) {
      const existingCategory = await prisma.category.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      })

      if (existingCategory) {
        return NextResponse.json(
          { error: 'Slug already in use' },
          { status: 409 }
        )
      }
    }

    const updateData: any = {}
    if (slug !== undefined) updateData.slug = slug
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description

    const category = await prisma.category.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(
      { 
        message: 'Category updated successfully',
        category 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Update category error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

// DELETE category
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const { id } = await params

    // Check if category has blog posts
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { blogPosts: true },
        },
      },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    if (category._count.blogPosts > 0) {
      return NextResponse.json(
        { error: `Cannot delete category with ${category._count.blogPosts} blog posts` },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Delete category error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
