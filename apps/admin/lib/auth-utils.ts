import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

// ==========================================
// PASSWORD UTILITIES
// ==========================================

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error('Error while hashing password', { cause: error })
  }
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
  } catch (error) {
    throw new Error('Error while comparing passwords', { cause: error })
  }
}

// ==========================================
// JWT UTILITIES
// ==========================================

interface TokenPayload {
  userId: string
  email: string
  role?: string
}

export function generateToken(payload: TokenPayload): string {
  const secret = process.env.JWT_SECRET
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign(payload, secret, {
    expiresIn: '7d',
  })
}

export function verifyToken(token: string): TokenPayload | null {
  const secret = process.env.JWT_SECRET
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  try {
    return jwt.verify(token, secret) as TokenPayload
  } catch {
    return null
  }
}

// ==========================================
// COOKIE UTILITIES
// ==========================================

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()

  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('auth-token')
  return cookie?.value || null
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

export async function getCurrentUser(): Promise<TokenPayload | null> {
  const token = await getAuthToken()
  if (!token) return null

  return verifyToken(token)
}
