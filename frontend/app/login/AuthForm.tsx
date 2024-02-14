'use client'

import { Descope } from '@descope/nextjs-sdk'

export function AuthForm() {
  return (
    <Descope
      flowId="sign-up-or-in"
      onSuccess={(e) => console.log('Logged in!')}
      onError={(e) => console.log('Could not logged in!')}
      // redirectAfterError="/error-page"
    />
  )
}
