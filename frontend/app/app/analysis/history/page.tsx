'use client'
import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { useUser } from '@descope/react-sdk'
import { useQuery } from 'convex/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function AnalysisHistoryPage() {
  const { user } = useUser()
  const images = useQuery(api.satelliteImage.getImagesByUser, {
    userId: user?.userId || '',
  })

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
            <TableHead className="text-right">Image</TableHead>
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
                <TableCell className="text-right">
                  {image.url && <a href={image.url}>View</a>}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
