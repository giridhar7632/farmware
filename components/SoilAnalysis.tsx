"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

export default function SoilAnalysis() {
  const [coordinates, setCoordinates] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleCoordinateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const image = "/sentinel-satellite.png";
    setImageSrc(image);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className={`pt-2 text-4xl font-bold`}>Lorem, ipsum dolor.</h1>
      <form
        onSubmit={(e) => handleCoordinateSubmit(e)}
        className="flex flex-col items-center gap-2"
      >
        <label htmlFor="coordinates" className="text-lg font-semibold">
          Input your coordinates:
        </label>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8"
            >
              <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M20 12a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z"></path>
                <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"></path>
                <path
                  strokeLinecap="round"
                  d="M2 12h2m16 0h2M12 4V2m0 20v-2"
                ></path>
              </g>
            </svg>
            <Input
              id="coordinates "
              type="text"
              className="rounded-sm border-2"
            />
          </div>

          <Button variant="secondary">Use device coordinates</Button>
        </div>
        <Button type="submit">View Soil Moisture Overlay</Button>
      </form>
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            width={600}
            height={400}
            alt={`sentinel satellite image of coordinates ${coordinates}`}
          />
        </>
      )}
    </div>
  );
}
