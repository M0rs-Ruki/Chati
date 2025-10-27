import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key') || 'header'

  try {
    const nav = await prisma.navigation.findUnique({
      where: { key },
    })

    // Return proper structure
    if (!nav || !nav.items) {
      return NextResponse.json({ items: [] })
    }

    return NextResponse.json(nav)
  } catch (error) {
    console.error('Failed to fetch navigation:', error)
    return NextResponse.json({ items: [] })
  }
}
