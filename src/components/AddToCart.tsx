"use client";

import { useShopingCartContext } from "@/context/ShopingCart";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

interface IAddToCart {
  id: number;
}

const AddToCart = ({ id }: IAddToCart) => {
  const {
    handleIncreaseProductQuantity,
    handleDecreaseProductQuantity,
    getProductQuantity,
  } = useShopingCartContext();

  const productQty = getProductQuantity(id);

  return (
    <div className="flex w-full items-center justify-center">
      {productQty > 0 ? (
        <div className="flex items-center justify-center gap-4 bg-red-100 shadow-lg px-6 rounded-lg">
          {/* Decrease Quantity Button */}
          <button
            onClick={() => handleDecreaseProductQuantity(id)}
            className="p-2 rounded-lg text-red-500 text-xl font-semibold"
            aria-label={productQty === 1 ? "Remove Item" : "Decrease Quantity"}
          >
            {productQty === 1 ? <FaTrashAlt className="text-red-600" /> : "-"}
          </button>

          {/* Quantity Display */}
          <span className="text-xl font-semibold text-red-500 ">
            {productQty}
          </span>

          {/* Increase Quantity Button */}
          <button
            onClick={() => handleIncreaseProductQuantity(id)}
            className="p-2 rounded-lg text-red-500 text-xl font-semibold"
            aria-label="Increase Quantity"
          >
            +
          </button>
        </div>
      ) : (
        <div className="w-full">
          {/* Add To Cart Button */}
          <button
            onClick={() => handleIncreaseProductQuantity(id)}
            className="w-full py-2 bg-red-500 text-white font-medium rounded-lg "
            aria-label="Add to Cart"
          >
            Add To Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
