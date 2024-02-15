'use client'

import { useSession } from '@descope/nextjs-sdk/client'
import { Descope } from '@descope/nextjs-sdk'
import { redirect } from 'next/navigation'

export default function AuthPage() {
  const { isAuthenticated, isSessionLoading } = useSession()

  if (isSessionLoading) {
    return <p>Loading...</p>
  }

  if (isAuthenticated) {
    redirect('/app')
  }

  return (
    <Descope
      flowId="sign-up-or-in"
      redirectAfterSuccess="/app"
      redirectAfterError="/error-page"
    />
  )
}
