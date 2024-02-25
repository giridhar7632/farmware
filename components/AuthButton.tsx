'use client'

import { useDescope, useSession } from '@descope/nextjs-sdk/client'
import { useCallback } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
  const { isAuthenticated, isSessionLoading } = useSession()
  const sdk = useDescope()
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    await sdk.logout()
    router.replace('/')
  }, [sdk, router])

  if (isSessionLoading) {
    return <p>Loading...</p>
  }

  return isAuthenticated ? (
    <Button variant={'secondary'} onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
