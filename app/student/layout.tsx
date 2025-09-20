
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { StudentNav } from '@/components/student/student-nav'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'student') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentNav user={session?.user} />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}
