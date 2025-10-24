import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  // Create Default Themes
  const theme = await prisma.theme.upsert({
    where: { name: "Default" },
    update: {},
    create: {
      name: "Default",
      primaryColor: "#3498db",
      secondaryColor: "#2ecc71",
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
        { label: "Home", url: "/" },
        { label: "About", url: "/about" },
        { title: "Blog", href: "/blog" },
        { label: "Contact", url: "/contact" },
      ],
    },
  });
  console.log("✅ Seed data created:", { admin, theme });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
