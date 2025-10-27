import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Failed to fetch pages:', error)
    return NextResponse.json({ pages: [] })
  }
}
