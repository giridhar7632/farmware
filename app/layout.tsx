import '@/app/globals.css'

import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import ConvexClientProvider from './ConvexClientProvider'
import { auth } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://farmware-xi.vercel.app'),
  title: {
    default: 'Farmware | The complete analysis of your farm',
    template: '%s | Farmware',
  },
  description: 'The complete analysis of your farm.',
  openGraph: {
    title: 'Farmware',
    description: 'The complete analysis of your farm.',
    url: 'https://farmware-xi.vercel.app',
    siteName: 'Farmware',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Farmware | The complete analysis of your farm',
    card: 'summary_large_image',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${roboto.className} min-h-screen`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>{children}</ConvexClientProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
