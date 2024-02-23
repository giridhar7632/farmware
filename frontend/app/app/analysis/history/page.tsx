'use client'
import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { useUser } from '@descope/react-sdk'
import { useMutation, useQuery } from 'convex/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Id } from '@/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'

export default function AnalysisHistoryPage() {
  const { user } = useUser()
  const images = useQuery(api.satelliteImage.getImagesByUser, {
    userId: user?.userId || '',
  })

  const deleteImage = useMutation(api.satelliteImage.deleteImage)

  const handleDelete = ({
    imageId,
    storageId,
  }: {
    imageId: Id<'satellite_images'>
    storageId: Id<'_storage'>
  }) => {
    deleteImage({ imageId, storageId })
  }

  if (!user) {
    return null
  }

  console.log({ images })
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
          {images &&
            images.map((image) => (
              <TableRow key={image._id}>
                <TableCell className="font-medium">{image.longitude}</TableCell>
                <TableCell>{image.latitude}</TableCell>
                <TableCell>
                  {image.timeRangeFrom.split('T')[0]} -{' '}
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
