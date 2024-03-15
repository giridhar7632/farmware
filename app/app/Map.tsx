/* eslint-disable */
// @ts-nocheck

'use client'

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { type LatLngExpression } from 'leaflet'
import { debounce } from 'lodash'
import { type UseFormSetValue } from 'react-hook-form'
import { Input } from '@/components/ui/input'

const customIcon = L.icon({
  iconUrl: '/pin.png',
  iconSize: [48, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

interface DraggableMarkerProps {
  initialPosition?: LatLngExpression
  setMarkerPosition: React.Dispatch<
    React.SetStateAction<LatLngExpression | null>
  >
}

interface MapComponentProps {
  initialPosition?: LatLngExpression
  setValue: UseFormSetValue<{
    lat: number
    lon: number
    timeRangeFrom: string
    timeRangeTo: string
  }>
}

const MapComponent: React.FC<MapComponentProps> = ({
  initialPosition = [51.505, -0.09],
  setValue,
}) => {
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(
    null,
  )
  const mapRef = useRef<L.Map | null>(null)

  // Update form values when markerPosition changes
  useEffect(() => {
    if (markerPosition) {
      setValue('lat', markerPosition[0])
      setValue('lon', markerPosition[1])
    }
  }, [markerPosition, setValue])

  useEffect(() => {
    if (initialPosition && mapRef.current) {
      mapRef.current.flyTo(initialPosition, 18)
      setMarkerPosition(initialPosition)
    }
  }, [initialPosition])

  // Search functionality remains unchanged
  const handleSearch = debounce(async (query) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
    )
    const data = await response.json()

    if (data.length > 0) {
      const { lat, lon } = data[0]
      mapRef.current?.flyTo([lat, lon], 18)
    }
  }, 500)

  return (
    <div className="w-full space-y-2">
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
          initialPosition={markerPosition || initialPosition}
          setMarkerPosition={setMarkerPosition}
          setValue={setValue}
        />{' '}
        {/* Pass setValue to DraggableMarker */}
      </MapContainer>
    </div>
  )
}

// DraggableMarker.js
function DraggableMarker({
  initialPosition = [51.505, -0.09],
  setValue,
}: DraggableMarkerProps & {
  setValue: UseFormSetValue<{ lat: number; lon: number }>
}) {
  const [position, setPosition] = useState(initialPosition)
  const markerRef = useRef(null)
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
        const marker = markerRef.current
        if (marker != null) {
          const newPosition = marker.getLatLng()
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

export default MapComponent
