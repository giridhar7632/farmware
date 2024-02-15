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
                    The complete analysis of your farm
                  </h1>
                  <p className="max-w-[600px] text-neutral-500 dark:text-neutral-400 md:text-xl">
                    Farmware can analyse your farm for the soil moisture,
                    nutrients and get recommended about the high yeilding crops
                    all by satellite images
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
        <section className="w-full border-y bg-neutral-50 py-12 md:py-24 lg:py-32">
          <div className="container grid max-w-5xl items-center gap-6 px-4 py-12 md:px-6 lg:grid-cols-2 lg:gap-12">
            <Image
              alt="Image"
              className="mx-auto overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last"
              height={640}
              src="/sentinel-satellite.png"
              width={310}
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Farm coordinates</h3>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      Give us your farm coordinates using the map provided.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Satellite images</h3>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      We will fetch the latest satellite imagery from{' '}
                      <Link
                        href="https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-2"
                        className="underline hover:text-neutral-700"
                      >
                        sentinel-2
                      </Link>
                      .
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Analyse</h3>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      See your farm analysis by or powerful algorithms in
                      minutes.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight md:text-4xl/tight">
                Know more about your farm more using tech
              </h2>
              <p className="mx-auto max-w-[600px] text-neutral-500 dark:text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get the most out of your land using our analysis and suggestions
                based on your soil moisture and nutirent levels.
              </p>
            </div>
            <div className="flex space-x-4 lg:justify-end">
              <Button size={'lg'} asChild>
                <Link href="/app">Get started</Link>
              </Button>
              <Button size={'lg'} variant={'outline'} asChild>
                <Link href="/about">Learn more</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
