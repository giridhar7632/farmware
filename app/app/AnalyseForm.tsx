'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { useAction } from 'convex/react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2Icon, LocateIcon } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import Image from 'next/image'
import { addDays, isDateInFuture } from '@/lib/date'
import { useSession } from 'next-auth/react'

const formSchema = z.object({
  lat: z.string().max(10),
  lon: z.string().max(10),
  timeRangeFrom: z.string(),
  timeRangeTo: z.string(),
})

export const AnalyseForm = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState<boolean>(false)
  const performNDMIRetrieveSatelliteImage = useAction(
    api.satelliteImage.retrieveNDMISatelliteImage,
  )
  const [satelliteImage, setSatelliteImage] = useState('')
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lat: '',
      lon: '',
      timeRangeFrom: '2024-01-01T00:00:00Z',
      timeRangeTo: '2024-01-06T00:00:00Z',
    },
  })

  if (session?.user === undefined) {
    return <Loader2Icon className="animate-spin" />
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const imagePromise = performNDMIRetrieveSatelliteImage({
      longitude: values.lon,
      latitude: values.lat,
      userId: session?.user.email ?? '',
      timeRangeFrom: values.timeRangeFrom,
      timeRangeTo: values.timeRangeTo,
    })
      .then((imageUrl: string | null) => {
        if (imageUrl) {
          setSatelliteImage(imageUrl)
          return imageUrl
        } else {
          throw new Error('No image URL returned')
        }
      })
      .catch((error: Error) => {
        throw new Error(error.message)
      })
    toast.promise(imagePromise, {
      loading: 'Analyzing...',
      success: 'Analysis successful.',
      error: 'Error fetching image. Please try again later or contact admin',
    })
  }

  async function handleFetchDiffDate(days: number) {
    const newTimeRangeFrom = addDays(form.getValues('timeRangeFrom'), days)
    const newTimeRangeTo = addDays(form.getValues('timeRangeTo'), days)

    form.setValue('timeRangeFrom', newTimeRangeFrom)
    form.setValue('timeRangeTo', newTimeRangeTo)

    const imagePromise = performNDMIRetrieveSatelliteImage({
      longitude: form.getValues('lon'),
      latitude: form.getValues('lat'),
      userId: session?.user.email ?? '',
      timeRangeFrom: newTimeRangeFrom,
      timeRangeTo: newTimeRangeTo,
    })
      .then((imageUrl: string | null) => {
        if (imageUrl) {
          setSatelliteImage(imageUrl)
          return imageUrl
        } else {
          throw new Error('No image URL returned')
        }
      })
      .catch((error: Error) => {
        throw new Error(error.message)
      })
    toast.promise(imagePromise, {
      loading: 'Retrieving new image...',
      success: 'Analysis successful.',
      error: 'Error fetching image. Please try again later or contact admin',
    })
  }

  function onLocate() {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        form.setValue('lat', pos.coords.latitude.toFixed(4).toString())
        form.setValue('lon', pos.coords.longitude.toFixed(4).toString())
        form.setValue('lat', pos.coords.latitude.toFixed(4).toString())
        form.setValue('lon', pos.coords.longitude.toFixed(4).toString())
        setLoading(false)
      },
      (error) => {
        console.error(error)
        setLoading(false)
        toast.error('Failed to get location!')
      },
    )
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Label>Enter the coordinates of your farm.</Label>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Latitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lon"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Longitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={'secondary'}
                    onClick={onLocate}
                  >
                    {loading ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      <LocateIcon />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Get current location</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm italic">
            From {form.getValues('timeRangeFrom').split('T')[0]} to{' '}
            {form.getValues('timeRangeTo').split('T')[0]}
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
            Analyse
          </Button>
        </form>
      </Form>

      {satelliteImage && (
        <div>
          {!isImageLoaded && <Skeleton className="h-[500px] w-[500px]" />}
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <Image
              onLoad={() => setIsImageLoaded(true)}
              src={satelliteImage}
              height={500}
              width={500}
              className="rounded-sm"
              alt="satellite image for requested location"
            />
            {isImageLoaded && (
              <div className="flex gap-4 md:flex-col">
                <Button onClick={() => handleFetchDiffDate(-5)}>
                  &lt;&lt; 5 days earlier
                </Button>
                {!isDateInFuture(form.getValues('timeRangeTo')) && (
                  <Button onClick={() => handleFetchDiffDate(5)}>
                    &gt;&gt; 5 days later
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
