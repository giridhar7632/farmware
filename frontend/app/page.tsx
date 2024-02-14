import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
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
                    <Link href="/login"> Get Started </Link>
                  </Button>
                  {/* <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 border-neutral-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events_none disabled:opacity-50 dark:border-neutral-800 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300"
                    href="/contact"
                  >
                    Contact Sales
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
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
              <h2 className="text-3xl font-black tracking-tighter md:text-4xl/tight">
                Know about your farm more using software.
              </h2>
              <p className="mx-auto max-w-[600px] text-neutral-500 dark:text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get the most out of your land using our analysis and suggestions
                based on your soil moisture and nutirent levels.
              </p>
            </div>
            <div className="flex space-x-4 lg:justify-end">
              <Link
                className="disabled:pointer-events_none inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                href="#"
              >
                Get started
              </Link>
              <Link
                className="disabled:pointer-events_none inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300"
                href="#"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Performance
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Traffic spikes should be exciting, not scary.
                </h2>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events_none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Get Started
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Security</div>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Fully managed infrastructure designed to scale dynamically with your traffic, a global edge to ensure
                  your site is fast for every customer, and the tools to monitor every aspect of your app.
                </p>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events_none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  )
}
