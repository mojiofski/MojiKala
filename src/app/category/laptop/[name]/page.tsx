import React from "react";
import { ISingleProductProps } from "../../accessories/[name]/page";
import { ILaptop } from "../page";
import Thumbnail from "@/components/Thumbnail";
import ColorSelector from "@/components/ColorSelector";

async function SingleProduct({ params }: ISingleProductProps) {
  const productName = decodeURIComponent((await params).name);
  try {
    const response = await fetch(
      `http://localhost:3001/laptops?name=${encodeURIComponent(productName)}`,
      { cache: "no-store" }
    );
    if (!response.ok) throw new Error("Product not found");
    const result = (await response.json()) as ILaptop[];
    if (!result.length) {
      return (
        <div className="text-red-500 text-lg text-center p-6">
          Product not found
        </div>
      );
    }

    const item = result[0];

    return (
      <div className="flex flex-col lg:flex-row lg:mt-2 w-full bg-gray-100 min-h-screen lg:p-4">
        {/* Product Image and Thumbnails*/}
        <div className="w-full lg:w-1/2 lg:h-full relative bg-white shadow-lg rounded-lg overflow-hidden">
          <Thumbnail images={item.images} />
        </div>

        {/* Product Information */}
        <div className="w-full lg:w-1/2 lg:px-4 ">
          {/* Product Name And Rating */}

          {/* Product Description And Color */}
          <div className="grid grid-cols-1 gap-2 bg-white p-4 shadow rounded-lg">
            <div className="flex justify-center items-baseline gap-6 bg-white">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center">
                {item.name}
              </h1>
              <p className="text-yellow-400 text-xl ">★{item.rating}</p>
            </div>
            <p className="text-gray-600 mt-2  text-center">
              {item.description || "No description available."}
            </p>
            <ColorSelector colors={item.colors} />
          </div>
          {/* Specifications */}
          {item.specs && Object.keys(item.specs).length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-1 gap-2 bg-white p-4 shadow rounded-lg">
                <p className="text-xl font-semibold mb-2 text-center border-b-2 ">
                  Specifications
                </p>
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
          <div className="flex fixed lg:sticky w-full py-4 shadow rounded-lg bg-white border-t-2 bottom-0 right-0 left-0 z-50 mt-6  lg:flex-row-reverse lg:items-center lg:justify-between">
            <div className="lg:mt-0 w-1/3 flex flex-col justify-center items-center ">
              <div className="line-through text-red-500 text-sm">
                ${(item.price ? item.price * 1.2 : 0).toFixed(2)}
              </div>
              <div className="text-xl font-bold text-gray-800">
                ${item.price ? item.price.toFixed(2) : "N/A"}
              </div>
            </div>
            <div className="w-2/3 px-2 flex justify-center items-center ">
              <button className="w-full py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-900 transition">
                Add To Cart
              </button>
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
