import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
import { PublicNav } from '@/components/Navbars'

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <PublicNav />
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height={550}
                src="/hero.jpeg"
                width={550}
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-black tracking-tight sm:text-5xl xl:text-6xl/none">
                    Analyze your farm's moisture levels
                  </h1>
                  <p className="max-w-[600px] text-neutral-500 dark:text-neutral-400 md:text-xl">
                    See soil moisture readings using the latest satellite imagery.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size={'lg'} asChild>
                    <Link href="/app"> Get Started </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
