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
      <div className="w-full h-80 relative bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={images[currentImage]}
          alt=""
          fill
          sizes="100%"
          className="object-contain p-4"
        />
      </div>
      {/* thumbnails */}
      <div className="flex gap-2 mt-4 py-3 ">
        {images.map((img, index) => (
          <div
            onClick={() => setCurrentImage(index)}
            key={index}
            className="w-16 h-16 border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500"
          >
            <Image
              src={img}
              alt=""
              width={64}
              height={64}
              className="object-contain p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
