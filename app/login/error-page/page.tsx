import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <>
      <h3>
        Something went wrong while trying to sign you in! Please try again.
      </h3>
      <Button variant={'secondary'} asChild>
        <Link href="/login">Try again</Link>
      </Button>
    </>
  )
}
