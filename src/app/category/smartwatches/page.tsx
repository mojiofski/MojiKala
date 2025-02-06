import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating";
export interface ISmartWatch {
  id: number;
  name: string;
  category: "smartwatch";
  price: number;
  colors: string[];
  description: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  specs: {
    display: string;
    batteryLife: string;
    waterResistance: string;
    connectivity: string[];
    os: string;
    healthTracking: string[];
  };
  features: string[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
}

async function SmartWatches() {
  const response = await fetch("http://localhost:3001/smartwatches", {
    cache: "no-store",
  });
  const result = (await response.json()) as ISmartWatch[];
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 border-b-2 border-b-red-300 text-gray-500 pb-3">
        Smart Watches
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {result.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:scale-105 min-h-[400px] flex flex-col"
          >
            {/* تصویر با ارتفاع ثابت */}
            <div>
              <Link href={`/category/smartwatches/${item.name}`}>
                <div className="w-full h-52 relative">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    sizes="100%"
                    priority
                    className="object-contain p-4"
                  />
                </div>
              </Link>
            </div>

            {/* اطلاعات محصول */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
              <div className="text-xl">
                <StarRating rating={item.rating} />
              </div>
              <p className="text-sm text-gray-500 mt-1 flex-grow">
                {item.description}
              </p>
            </div>

            {/* قیمت و دکمه خرید */}
            <div className="flex justify-between p-4 items-center">
              <p className="text-xl font-bold text-gray-600 mt-2 cursor-default">
                ${item.price.toFixed(2)}
              </p>
              <button className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-900 transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SmartWatches;
