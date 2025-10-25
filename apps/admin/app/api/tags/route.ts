import { prisma } from '@repo/database'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-middleware'

// GET all tags
export async function GET(req: Request) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { blogPosts: true },
        },
      },
      orderBy: { title: 'asc' },
    })

    return NextResponse.json({ tags }, { status: 200 })

  } catch (error) {
    console.error('Get tags error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}

// POST create new tag
export async function POST(req: Request) {
  try {
    const { error } = await requireAuth(req)
    if (error) return error

    const body = await req.json()
    const { slug, title } = body

    if (!slug || !title) {
      return NextResponse.json(
        { error: 'slug and title are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingTag = await prisma.tag.findUnique({
      where: { slug },
    })

    if (existingTag) {
      return NextResponse.json(
        { error: 'Tag with this slug already exists' },
        { status: 409 }
      )
    }

    const tag = await prisma.tag.create({
      data: {
        slug,
        title,
      },
    })

    return NextResponse.json(
      { 
        message: 'Tag created successfully',
        tag 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Create tag error:', error)
    return NextResponse.json(
      { error: 'Failed to create tag' },
      { status: 500 }
    )
  }
}
