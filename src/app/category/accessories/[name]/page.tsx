import React from "react";
import Image from "next/image";
import { IAccessory } from "../page";

export interface ISingleProductProps {
  params: { name: string };
}

async function SingleProduct({ params }: ISingleProductProps) {
  if (!params || !params.name) {
    return (
      <div className="text-red-500 text-lg text-center p-6">
        Invalid Product
      </div>
    );
  }

  try {
    const productName = decodeURIComponent(params.name);
    console.log("Fetching product:", productName);

    const response = await fetch(
      `http://localhost:3001/accessories?name=${encodeURIComponent(
        productName
      )}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const result = (await response.json()) as IAccessory[];

    if (!result.length) {
      return (
        <div className="text-red-500 text-lg text-center p-6">
          Product not found
        </div>
      );
    }

    const item = result[0];

    return (
      <div className="flex flex-col lg:flex-row items-center w-full bg-gray-100 min-h-screen p-6">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 h-96 relative bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={item.image || "/placeholder.jpg"}
            alt={item.name || "No Image"}
            fill
            className="object-contain p-4"
          />
        </div>

        {/* Product Information */}
        <div className="w-full lg:w-1/2 p-4 text-left">
          <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
          <p className="text-gray-600 mt-2">
            {item.description || "No description available."}
          </p>

          {/* Specifications */}
          {item.specs && Object.keys(item.specs).length > 0 && (
            <div className="mt-4">
              <p className="text-xl font-semibold mb-2">Specifications:</p>
              <div className="grid grid-cols-2 gap-2 bg-white p-4 shadow rounded-lg">
                {Object.entries(item.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-gray-700">
                    <span className="font-medium capitalize">{key}:</span>
                    <span>{value || "N/A"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price and Add to Cart Button */}
          <div className="mt-6 flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between">
            <button className="px-8 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-900 transition">
              Add To Cart
            </button>
            <div className="mt-4 lg:mt-0 text-right">
              <div className="line-through text-gray-500 text-md">
                ${(item.price ? item.price * 1.2 : 0).toFixed(2)}
              </div>
              <div className="text-2xl font-bold text-gray-800">
                ${item.price ? item.price.toFixed(2) : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="text-red-500 text-lg text-center p-6">
        Error: Product not found
      </div>
    );
  }
}

export default SingleProduct;
