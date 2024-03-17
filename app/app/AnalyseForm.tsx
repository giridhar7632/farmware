'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'convex/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/convex/_generated/api'
import { addDays, isDateInFuture } from '@/lib/date'
import { Loader2Icon, LocateIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import MapComponent from './Map'
import Image from 'next/image'

const formSchema = z.object({
  lat: z.number().max(180),
  lon: z.number().max(180),
  timeRangeFrom: z.string(),
  timeRangeTo: z.string(),
})

export const AnalyseForm = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState<boolean>(false)

  // NDMI image
  const performNDMIRetrieveSatelliteImage = useAction(
    api.satelliteImage.retrieveNDMISatelliteImage,
  )
  const [NDMIsatelliteImage, setNDMISatelliteImage] = useState('')
  const [isNDMIImageLoaded, setIsNDMIImageLoaded] = useState(false)

  // RGB image
  const performRGBRetrieveSatelliteImage = useAction(
    api.satelliteImage.retrieveRGBSatelliteImage,
  )
  const [RGBsatelliteImage, setRGBSatelliteImage] = useState('')
  const [isRGBImageLoaded, setIsRGBImageLoaded] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lat: 51.505,
      lon: -0.09,
      timeRangeFrom: '2024-01-01T00:00:00Z',
      timeRangeTo: '2024-01-06T00:00:00Z',
    },
  })

  if (session?.user === undefined) {
    return <Loader2Icon className="animate-spin" />
  }

  // Wrapper function to handle form submission
  const handleFormSubmit = (e: any) => {
    onSubmit(0, e);
  };

  async function onSubmit(days: number, values?: z.infer<typeof formSchema>) {
    const newTimeRangeFrom = addDays(form.getValues('timeRangeFrom'), days)
    const newTimeRangeTo = addDays(form.getValues('timeRangeTo'), days)

    form.setValue('timeRangeFrom', newTimeRangeFrom)
    form.setValue('timeRangeTo', newTimeRangeTo)

    const NDMIImagePromise = performNDMIRetrieveSatelliteImage({
      type: 'NDMI',
      longitude: form.getValues('lon').toString(),
      latitude: form.getValues('lat').toString(),
      userId: session?.user.email ?? '',
      timeRangeFrom: newTimeRangeFrom,
      timeRangeTo: newTimeRangeTo,
    })
    const RGBImagePromise = performRGBRetrieveSatelliteImage({
      type: 'RGB',
      longitude: form.getValues('lon').toString(),
      latitude: form.getValues('lat').toString(),
      userId: session?.user.email ?? '',
      timeRangeFrom: newTimeRangeFrom,
      timeRangeTo: newTimeRangeTo,
    })

    const bothImagePromises = Promise.all([
      NDMIImagePromise,
      RGBImagePromise
    ]).then((imageUrl) => {
      console.log('All promises resolved:', imageUrl);
      if (imageUrl[0] && imageUrl[1]) {
        setNDMISatelliteImage(imageUrl[0])
        setRGBSatelliteImage(imageUrl[1])
        return imageUrl
      } else {
        throw new Error('No image URL returned')
      }
    })
      .catch((error: Error) => {
        console.error('An error occurred:', error);
      });

    toast.promise(bothImagePromises, {
      loading: 'Retrieving new image...',
      success: 'Analysis successful.',
      error: 'Error fetching images. Please try again later or contact admin',
    })
  }

  function onLocate() {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        form.setValue('lat', Number(pos.coords.latitude.toFixed(4)))
        form.setValue('lon', Number(pos.coords.longitude.toFixed(4)))
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
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
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
          <div className="h-92 w-full">
            <MapComponent
              initialPosition={[form.getValues('lat'), form.getValues('lon')]}
              setValue={form.setValue}
            />
          </div>
          <p className="text-sm italic">
            From {form.getValues('timeRangeFrom').split('T')[0]} to{' '}
            {form.getValues('timeRangeTo').split('T')[0]}
          </p>
          <Button
            className="bg-blue-500 hover:bg-blue-600 dark:text-white"
            type="submit"
          >
            Analyse
          </Button>
        </form>
      </Form>

      {NDMIsatelliteImage && RGBsatelliteImage && (
        <div>
          {!isNDMIImageLoaded && <Skeleton className="h-[500px] w-[500px]" />}
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <Image
              onLoad={() => setIsRGBImageLoaded(true)}
              src={RGBsatelliteImage}
              height={500}
              width={500}
              className="rounded-sm"
              alt="RGB satellite image for requested location"
            />
            <Image
              onLoad={() => setIsNDMIImageLoaded(true)}
              src={NDMIsatelliteImage}
              height={500}
              width={500}
              className="rounded-sm"
              alt="NDMI satellite image for requested location"
            />
            <div className="flex gap-4 md:flex-col">
              <Button onClick={() => onSubmit(-5)}>
                &lt;&lt; 5 days earlier
              </Button>
              {!isDateInFuture(form.getValues('timeRangeTo')) && (
                <Button onClick={() => onSubmit(5)}>
                  &gt;&gt; 5 days later
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
