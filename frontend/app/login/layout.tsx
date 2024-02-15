import { type Metadata } from 'next'
import { PaddingIcon } from '@radix-ui/react-icons'

export const metadata: Metadata = {
  title: 'Farmware | Login',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <PaddingIcon className="mr-2 h-6 w-6" />
            Farmware
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Know your farm with the help of technology (Satellites
                and Machine Learning).&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
