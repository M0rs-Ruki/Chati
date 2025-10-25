import { prisma } from '@repo/database'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-middleware'

// GET all categories
export async function GET(req: Request) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { blogPosts: true },
        },
      },
      orderBy: { title: 'asc' },
    })

    return NextResponse.json({ categories }, { status: 200 })

  } catch (error) {
    console.error('Get categories error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST create new category
export async function POST(req: Request) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const body = await req.json()
    const { slug, title, description } = body

    if (!slug || !title) {
      return NextResponse.json(
        { error: 'slug and title are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 409 }
      )
    }

    const category = await prisma.category.create({
      data: {
        slug,
        title,
        description: description || null,
      },
    })

    return NextResponse.json(
      { 
        message: 'Category created successfully',
        category 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
