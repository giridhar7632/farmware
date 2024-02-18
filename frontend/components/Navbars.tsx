import Link from 'next/link'
import { PaddingIcon } from '@radix-ui/react-icons'
import { ThemeToggle } from './theme-provider'
import AuthButton from './AuthButton'

export function PublicNav() {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="#">
        <PaddingIcon className="h-6 w-6" />
        <span className="ml-2 hidden md:inline">Farmware</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
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
        <ThemeToggle />
        <AuthButton />
      </nav>
    </header>
  )
}

export function SimpleNav() {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="#">
        <PaddingIcon className="h-6 w-6" />
        <span className="ml-2 hidden md:inline">Farmware</span>
      </Link>
      <div className="ml-auto flex items-center gap-4 sm:gap-6">
        <ThemeToggle />
        <AuthButton />
      </div>
    </header>
  )
}
