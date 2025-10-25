import { config } from "dotenv";
import {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} from "./lib/auth-utils";

// Load environment variables
config({ path: ".env.local" });

async function test() {
  console.log("Testing auth utilities...\n");

  // Test password hashing
  const hashed = await hashPassword("password123");
  console.log("✅ Hashed:", hashed);

  const isMatch = await comparePassword("password123", hashed);
  console.log("✅ Password match:", isMatch);

  const isWrong = await comparePassword("wrongpassword", hashed);
  console.log("✅ Wrong password match:", isWrong);

  // Test JWT (NOT async anymore)
  const token = generateToken({
    userId: "123",
    email: "test@example.com",
    role: "ADMIN",
  });
  console.log("✅ Token generated:", token.substring(0, 50) + "...");

  const decoded = verifyToken(token);
  console.log("✅ Decoded:", decoded);
}

test();
