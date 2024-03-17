import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/ui/sidebar-nav'
import { SimpleNav } from '@/components/Navbars'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const sidebarNavItems = [
  {
    title: 'Analyse',
    href: '/app',
  },
  {
    title: 'History',
    href: '/app/analysis/history',
  },
  {
    title: 'Profile',
    href: '/app/profile',
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({ children }: SettingsLayoutProps) {
  const session = await auth()
  if (!session?.user) {
    redirect('/auth/login')
  }
  return (
    <>
      <SimpleNav />
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi {session?.user.name?.split(' ')[0]}!
          </h2>
          <p className="text-muted-foreground">
            Welcome to the Dashboard. Here you can view your analysis, history
            and profile.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-6xl">{children}</div>
        </div>
      </div>
    </>
  )
}
