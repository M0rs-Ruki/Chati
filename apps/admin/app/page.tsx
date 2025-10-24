import { prisma } from '@repo/database'

export default async function Home() {
  const userCount = await prisma.user.count();
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Users: {userCount}</p>
    </div>
  );
}
