import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


const allowedOrigins = [
  'http://localhost:3000',
  'https://site-black-pi.vercel.app',
]

const corsHeaders = (origin: string | null) => {
  const isAllowed = origin && allowedOrigins.includes(origin)
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  return NextResponse.json({}, { headers: corsHeaders(origin) })
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin')
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key') || 'header'

  try {
    const nav = await prisma.navigation.findUnique({
      where: { key },
    })

    if (!nav || !nav.items) {
      return NextResponse.json({ items: [] }, { headers: corsHeaders(origin) })
    }

    return NextResponse.json(nav, { headers: corsHeaders(origin) })
  } catch (error) {
    console.error('Failed to fetch navigation:', error)
    return NextResponse.json({ items: [] }, { headers: corsHeaders(origin) })
  }
}
