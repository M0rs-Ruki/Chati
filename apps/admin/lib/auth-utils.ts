import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// ==========================================
// PASSWORD UTILITIES
// ==========================================

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Error while hashing password", { cause: error });
  }
}

// Compare a password with a hashed password
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error while comparing passwords", { cause: error });
  }
}

// ==========================================
// JWT UTILITIES
// ==========================================

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

// Generate a JWT token
export function generateToken(payload: TokenPayload): string {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }

    return jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  } catch (error) {
    throw new Error("Error while generating token", { cause: error });
  }
}

// Verify a JWT token
export function verifyToken(token: string): TokenPayload | null {
  try {
    const secret = process.env.JWT_SECRET || "your-secret-key-change-this";
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }
    const decoded = jwt.verify(token, secret) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}

// ==========================================
// COOKIE UTILITIES
// ==========================================

// set auth cookie
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: "/",
  });
}

/**
 * Get authentication token from cookie
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("auth-token");
  return cookie?.value || null;
}

/**
 * Clear authentication cookie
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
}

/**
 * Get current user from token
 */
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const token = await getAuthToken();
  if (!token) return null;

  return verifyToken(token);
}
