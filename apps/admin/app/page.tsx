import { prisma } from '@repo/database'

export default async function Home() {
  const users = await prisma.user.findMany()
  const themes = await prisma.theme.findMany()
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Users ({users.length})</h2>
          {users.map(user => (
            <div key={user.id} className="mt-2">
              <p>{user.name} - {user.email} ({user.role})</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Themes ({themes.length})</h2>
          {themes.map(theme => (
            <div key={theme.id} className="mt-2">
              <p>{theme.name} - {theme.primaryColor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
