import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth-utils'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate required fields
    const { email, password, name, role } = body
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: role || 'EDITOR',
        status: 'ACTIVE',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Set auth cookie
    await setAuthCookie(token)

    return NextResponse.json(
      { 
        message: 'User created and logged in successfully',
        user,
        token
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
