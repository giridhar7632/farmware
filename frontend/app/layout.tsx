import '@/app/globals.css'

import { Roboto } from 'next/font/google'
import Script from 'next/script'
import type { Metadata } from 'next'
import { AuthProvider } from '@descope/nextjs-sdk'

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Farmware | Get to know your farm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider projectId={process.env.DESCOPE_PROJECT_ID ?? ''}>
      <html lang="en">
        <body className={`${roboto.className} min-h-screen`}>
          {children}
          <Script src="bower_components/aos/dist/aos.js" />
        </body>
      </html>
    </AuthProvider>
  )
}
