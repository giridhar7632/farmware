import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/ui/sidebar-nav'
import { redirect } from 'next/navigation'

import { SimpleNav } from '@/components/Navbars'
import { session } from '@descope/nextjs-sdk/server'

const sidebarNavItems = [
  {
    title: 'Analysis',
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

export default function AppLayout({ children }: SettingsLayoutProps) {
  const sessionRes = session()
  if (!sessionRes) {
    redirect('/login')
  }

  return (
    <>
      <SimpleNav />
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Hi There!</h2>
          <p className="text-muted-foreground">
            Welcome to the Dashboard. Here you can view your analysis, history
            and profile.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
