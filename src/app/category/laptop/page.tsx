import React from "react";
import Image from "next/image";
import Link from "next/link";
export interface ILaptop {
  id: number;
  name: string;
  category: "laptop";
  price: number;
  description: string;
  brand: string;
  image: string;
  stock: number;
  rating: number;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    gpu: string;
    battery: string;
    os: string;
    ports: string[];
  };
  features: string[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
}

async function Laptop() {
  const response = await fetch("http://localhost:3001/laptops", {
    cache: "no-store",
  });
  const result = (await response.json()) as ILaptop[];
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 border-b-2 border-b-red-300 text-gray-500">
        Laptops
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {result.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="w-full h-52 relative">
              <Link href={`/category/laptop/${item.name}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                />
              </Link>
            </div>
            <div className="p-4 flex flex-col items-center text-center border-t-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              <p className="text-xs text-gray-600 mt-1">
                Brand: <span className="font-medium">{item.brand}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                RAM: <span className="font-medium">{item.ram}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                CPU: <span className="font-medium">{item.cpu}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                GPU: <span className="font-medium">{item.gpu}</span>
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

export default Laptop;
