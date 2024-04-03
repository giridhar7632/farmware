import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        © 2024 Farmware. All rights reserved.
      </p>
    </footer>
  )
}
