import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "./prisma";

// ==========================================
// TYPES
// ==========================================

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
}

// ==========================================
// JWT UTILITIES
// ==========================================

/**
 * Generates a JWT token with the given payload
 */
export function generateToken(
  payload: Omit<TokenPayload, "iat" | "exp" | "iss" | "aud">
): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
    issuer: "chati-app",
    audience: "chati-api",
  });
}

/**
 * Verifies and decodes a JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  try {
    const decoded = jwt.verify(token, secret, {
      issuer: "chati-app",
      audience: "chati-api",
    }) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

/**
 * Extracts token from Authorization header or cookies
 */
export function extractToken(request: Request): string | null {
  // First, try to get token from Authorization header
  const authHeader = request.headers.get("Authorization");

  if (authHeader) {
    // Support both "Bearer <token>" and just "<token>"
    const parts = authHeader.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      return parts[1];
    }
    // If no "Bearer" prefix, assume the whole string is the token
    return authHeader;
  }

  // If no Authorization header, try to get token from cookies
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    return cookies.token || null;
  }

  return null;
}

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

/**
 * Authenticates a request and returns the user if valid
 */
export async function authenticateRequest(
  request: Request
): Promise<
  { user: AuthUser; error: null } | { user: null; error: NextResponse }
> {
  try {
    // Extract token from header
    const token = extractToken(request);

    if (!token) {
      return {
        user: null,
        error: NextResponse.json(
          { message: "Authentication token is required" },
          { status: 401 }
        ),
      };
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return {
        user: null,
        error: NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        ),
      };
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      return {
        user: null,
        error: NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        ),
      };
    }

    // Check if user is active
    if (user.status !== "ACTIVE") {
      return {
        user: null,
        error: NextResponse.json(
          { message: "Account is disabled" },
          { status: 403 }
        ),
      };
    }

    return { user, error: null };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      user: null,
      error: NextResponse.json(
        { message: "Authentication failed" },
        { status: 500 }
      ),
    };
  }
}

/**
 * Checks if the authenticated user has the required role
 */
export function authorizeRole(user: AuthUser, allowedRoles: string[]): boolean {
  return allowedRoles.includes(user.role);
}

/**
 * Middleware wrapper that requires authentication and optional role authorization
 */
export async function requireAuth(
  request: Request,
  allowedRoles?: string[]
): Promise<
  { user: AuthUser; error: null } | { user: null; error: NextResponse }
> {
  const { user, error } = await authenticateRequest(request);

  if (error) {
    return { user: null, error };
  }

  // Check role if specified
  if (allowedRoles && allowedRoles.length > 0) {
    if (!authorizeRole(user!, allowedRoles)) {
      return {
        user: null,
        error: NextResponse.json(
          { message: "Insufficient permissions" },
          { status: 403 }
        ),
      };
    }
  }

  return { user, error: null };
}

// ==========================================
// VALIDATION UTILITIES
// ==========================================

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * Requirements: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
 */
export function isValidPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Sanitizes user input by trimming whitespace
 */
export function sanitizeInput(input: string): string {
  return input.trim();
}
