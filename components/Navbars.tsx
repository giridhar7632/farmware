import Link from 'next/link'
import { PaddingIcon } from '@radix-ui/react-icons'
import { ThemeToggle } from './theme-provider'
import { auth } from '@/lib/auth'
import { Button } from './ui/button'
import ProfileMenu from './ProfileMenu'

export async function PublicNav() {
  const session = await auth()
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="#">
        <PaddingIcon className="h-6 w-6" />
        <span className="ml-2 hidden md:inline">Farmware</span>
      </Link>
      <nav className="relative ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/contact"
        >
          Contact
        </Link>
        {session?.user ? (
          <ProfileMenu {...session.user} />
        ) : (
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
        <ThemeToggle />
      </nav>
    </header>
  )
}

export async function SimpleNav() {
  const session = await auth()

  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="#">
        <PaddingIcon className="h-6 w-6" />
        <span className="ml-2 hidden md:inline">Farmware</span>
      </Link>
      <div className="ml-auto flex items-center gap-4 sm:gap-6">
        {session?.user ? (
          <ProfileMenu {...session.user} />
        ) : (
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}
