'use client'

import { Descope } from '@descope/nextjs-sdk'
import { useTheme } from 'next-themes'

export default function AuthPage() {
  const { theme } = useTheme()

  return (
    <Descope
      flowId="sign-up-or-in"
      theme={theme === 'system' ? 'os' : (theme as 'light' | 'dark')}
      redirectAfterSuccess="/app"
      redirectAfterError="/error-page"
    />
  )
}
