'use client'

import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type Id } from '@/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

export default function AnalysisHistoryPage() {
  const { data: session } = useSession()
  const images = useQuery(api.satelliteImage.getImagesByUser, {
    userId: session?.user.email ?? '',
  })

  const deleteImage = useMutation(api.satelliteImage.deleteImage)

  const handleDelete = async ({
    imageId,
    storageId,
  }: {
    imageId: Id<'satellite_images'>
    storageId: Id<'_storage'>
  }) => {
    await deleteImage({ imageId, storageId })
  }

  if (!session) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">History</h3>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a summary of your analysis history
        </p>
      </div>
      <Separator />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Longitude</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Time Range</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images?.map((image) => (
            <TableRow key={image._id}>
              <TableCell className="font-medium">{image.longitude}</TableCell>
              <TableCell>{image.latitude}</TableCell>
              <TableCell>
                {image.timeRangeFrom.split('T')[0]} to{' '}
                {image.timeRangeTo.split('T')[0]}
              </TableCell>
              <TableCell>
                {image.url && (
                  <div className="flex gap-2">
                    <Button>
                      <a href={image.url}>View</a>
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        handleDelete({
                          imageId: image._id,
                          storageId: image.image,
                        })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
