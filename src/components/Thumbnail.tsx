"use client";

import Image from "next/image";
import React, { useState } from "react";
interface IThumbnailProps {
  images: string[];
}
const Thumbnail = ({ images }: IThumbnailProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  if (!images || images.length < 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-200">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Currnet Image */}
      <div className="w-full h-80 relative bg-white border-b-2  overflow-hidden">
        <Image
          src={images[currentImage]}
          alt=""
          fill
          sizes="100%"
          className="object-contain p-4"
          priority
        />
      </div>
      {/* thumbnails */}
      <div className="flex items-center gap-2 p-4  w-full justify-center">
        {images.map((img, index) => (
          <div
            onClick={() => setCurrentImage(index)}
            key={index}
            className="relative w-full h-16 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 flex items-center justify-center "
          >
            <Image
              src={img}
              alt=""
              fill
              sizes="100%"
              className="object-contain p-1"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
