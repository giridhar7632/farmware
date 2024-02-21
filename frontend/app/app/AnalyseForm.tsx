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

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2Icon, LocateIcon } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import Image from 'next/image'
import { useUser } from '@descope/react-sdk'

const formSchema = z.object({
  lat: z.string().max(10),
  lon: z.string().max(10),
})

export const AnalyseForm = () => {
  const { user } = useUser()
  console.log(user)
  const [loading, setLoading] = useState<boolean>(false)
  const performRetrieveSatelliteImage = useAction(
    api.satelliteImage.retrieveSatelliteImage,
  )
  const [satelliteImage, setSatelliteImage] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lat: '',
      lon: '',
    },
  })

  if (user === undefined) {
    return <Loader2Icon className="animate-spin" />
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast.message('analysing...')
    const imageUrl = await performRetrieveSatelliteImage({
      longitude: values.lon,
      latitude: values.lat,
      userId: user.userId,
      date: new Date().toISOString(),
    })
    if (imageUrl) {
      setSatelliteImage(imageUrl)
      console.log({ imageUrl })
    }
  }

  function onLocate() {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
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
          <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
            Analyse
          </Button>
        </form>
      </Form>
      {satelliteImage && (
        <Image
          src={satelliteImage}
          height={300}
          width={300}
          alt="satellite image for requested location"
        />
      )}
    </>
  )
}
