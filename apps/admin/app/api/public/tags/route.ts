import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { title: 'asc' },
    })

    return NextResponse.json({ tags })
  } catch (error) {
    console.error('Failed to fetch tags:', error)
    return NextResponse.json({ tags: [] })
  }
}
