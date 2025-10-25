import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@chati.ai" },
    update: {},
    create: {
      email: "admin@chati.ai",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  // Create default theme
  const theme = await prisma.theme.upsert({
    where: { name: "Default" },
    update: {},
    create: {
      name: "Default",
      primaryColor: "#4F46E5",
      secondaryColor: "#10B981",
      isDefault: true,
    },
  });

  // Create header navigation
  await prisma.navigation.upsert({
    where: { key: "header" },
    update: {},
    create: {
      key: "header",
      items: [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Blog", href: "/blog" },
        { title: "Contact", href: "/contact" },
      ],
    },
  });

  console.log("✅ Seed data created");
  console.log("Admin credentials:");
  console.log("Email: admin@chati.ai");
  console.log("Password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
