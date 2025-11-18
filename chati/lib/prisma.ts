import { PrismaClient } from "@prisma/client";

// Prisma Client singleton pattern for serverless environments
// This works for both Vercel and other serverless platforms
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize Prisma Client with proper error handling
function createPrismaClient(): PrismaClient {
  try {
    const client = new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error", "warn"],
    });

    // Log successful initialization in development
    if (process.env.NODE_ENV === "development") {
      console.log("[PRISMA] Client initialized successfully");
    }

    return client;
  } catch (error) {
    console.error("[PRISMA] Failed to create Prisma Client:", error);
    throw new Error(
      `Prisma Client initialization failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Use singleton pattern for both dev and production (Vercel reuses containers)
// This prevents creating multiple Prisma Client instances in serverless environments
export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

// Store in global to reuse across hot reloads and serverless invocations
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

// Validate that prisma is properly initialized
if (!prisma) {
  const error = new Error(
    "[PRISMA] Prisma Client is not properly initialized. Make sure Prisma Client is generated (run: npx prisma generate)"
  );
  console.error(error);
  throw error;
}
