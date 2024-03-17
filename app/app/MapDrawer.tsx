/* eslint-disable */
// @ts-nocheck

'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from 'react-leaflet'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import { debounce } from 'lodash'
import { type UseFormSetValue } from 'react-hook-form'
import { Input } from '@/components/ui/input'

interface MapComponentProps {
  initialPosition?: L.LatLngExpression
  setValue: UseFormSetValue<{
    lat: number
    lon: number
    timeRangeFrom: Date
    timeRangeTo: Date
  }>
}

interface SearchResult {
  lat: string
  lon: string
}

const iconOptions: L.IconOptions = {
  iconUrl: '/pin.png',
  iconSize: [48, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
}
const customIcon: L.Icon = L.icon(iconOptions)

function DraggableMarker({
  initialPosition = [51.505, -0.09],
  setValue,
}: MapComponentProps & {
  setMarkerPosition: (position: L.LatLngExpression) => void
}) {
  const [position, setPosition] = useState(initialPosition)
  const markerRef = useRef<L.Marker | null>(null)
  const map = useMapEvents({
    click: (e) => {
      const newPosition = e.latlng
      setPosition(newPosition)
      setValue('lat', newPosition.lat)
      setValue('lon', newPosition.lng)
    },
  })
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: L.Marker = markerRef.current
        if (marker != null) {
          const newPosition: L.LatLngExpression = marker.getLatLng()
          setPosition(newPosition)
          setValue('lat', newPosition.lat)
          setValue('lon', newPosition.lng)
        }
      },
    }),
    [setValue],
  )

  useEffect(() => {
    if (position !== initialPosition) {
      setPosition(initialPosition)
    }
  }, [initialPosition])

  return (
    <>
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={customIcon}
      >
        <Popup minWidth={90}>
          <span>Show us your farm location!</span>
        </Popup>
      </Marker>
    </>
  )
}

const MapDrawer: React.FC<MapComponentProps> = ({
  initialPosition = [51.505, -0.09],
  setValue,
}) => {
  const [markerPosition, setMarkerPosition] =
    useState<L.LatLngExpression>(initialPosition)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (markerPosition) {
      setValue('lat', Number(markerPosition[0]))
      setValue('lon', Number(markerPosition[1]))
    }
  }, [markerPosition, setValue])

  useEffect(() => {
    if (initialPosition && mapRef.current) {
      mapRef.current.flyTo(initialPosition, 18)
      setMarkerPosition(initialPosition)
    }
  }, [initialPosition])

  const handleSearch = debounce(async (query: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
    )
    const data: SearchResult[] = await response.json()

    if (data.length > 0) {
      const { lat, lon } = data[0]
      const latLng: L.LatLngExpression = [parseFloat(lat), parseFloat(lon)]
      mapRef.current?.flyTo(latLng, 18)
    }
  }, 500)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={'secondary'}>Open map</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>Pick your farm location</DrawerTitle>
            <DrawerDescription>
              You can also use the search option to find surrounding famous
              places.
            </DrawerDescription>
          </DrawerHeader>

          <div data-vaul-no-drag className="space-y-2 p-4 pb-0">
            <Input
              type="text"
              placeholder="Search places..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            <MapContainer
              center={initialPosition}
              zoom={18}
              ref={mapRef}
              style={{ height: '400px', width: '100%', borderRadius: 12 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <DraggableMarker
                initialPosition={markerPosition ?? initialPosition}
                setMarkerPosition={setMarkerPosition}
                setValue={setValue}
              />{' '}
            </MapContainer>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Select location</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MapDrawer
