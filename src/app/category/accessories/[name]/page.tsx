import React from "react";
import Image from "next/image";

interface ISingleProductProps {
  params: { name: string };
}

async function SingleProduct({ params }: ISingleProductProps) {
  // چک کن که params مقدار داره
  if (!params || !params.name) {
    return (
      <div className="text-red-500 text-lg text-center p-6">
        Invalid Product
      </div>
    );
  }

  try {
    // تبدیل `params.name` به مقدار درست
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

    const result = await response.json();

    // چک کن که محصولی دریافت شده یا نه
    if (!result.length) {
      return (
        <div className="text-red-500 text-lg text-center p-6">
          Product not found
        </div>
      );
    }

    const item = result[0]; // فقط اولین محصول برگردون

    return (
      <div className="flex flex-col items-center w-full p-6 bg-gray-100 min-h-screen">
        {/* Product Image */}
        <div className="w-full max-w-md h-96 relative bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-4"
          />
        </div>

        {/* Product Information */}
        <div className="w-full max-w-md mt-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{item.name}</h1>
          <p className="text-gray-600 mt-2">{item.description}</p>
        </div>

        {/* Fixed Bottom Section */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t shadow-lg py-4 flex justify-between px-6 items-center">
          {/* Price Section */}
          <div>
            <div className="line-through text-gray-500 text-sm">
              ${(item.price * 1.2).toFixed(2)}
            </div>
            <div className="text-xl font-bold text-gray-800">${item.price}</div>
          </div>

          {/* Add to Cart Button */}
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
            Add To Cart
          </button>
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
