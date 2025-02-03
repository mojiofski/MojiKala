import React from "react";
import Image from "next/image";
import Link from "next/link";
export interface IAccessory {
  id: number;
  name: string;
  category: "accessory";
  price: number;
  description: string;
  brand: string;
  image: string;
  stock: number;
  rating: number;
  specs: {
    color: string;
    compatibility: string[];
    material?: string;
    batteryLife?: string;
    connectivity?: string[];
    waterResistance?: string | boolean;
    fastCharging?: boolean;
    ports?: string[];
  };
  features?: string[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
}

async function Accessories() {
  const response = await fetch("http://localhost:3001/accessories", {
    cache: "no-store",
  });
  const result = (await response.json()) as IAccessory[];
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 border-b-2 border-b-red-300 text-gray-500">
        Accessories
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {result.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="w-full h-52 relative">
              <Link href={`/category/accessories/${item.name}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                />
              </Link>
            </div>
            <div className="p-4 flex flex-col items-center text-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              <p className="text-xs text-gray-600 mt-1">
                Color : <span className="font-medium">{item.color}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Compatibility :
                <span className="font-medium">{item.compatibility}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Type :<span className="font-medium">{item.type}</span>
              </p>
              <p className="text-lg font-bold text-green-600 mt-2">
                ${item.price}
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accessories;
