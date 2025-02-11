"use client";

import { useShoppingCart } from "@/context/ShopingCart";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface IAddToCart {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

const AddToCart = ({
  id,
  name,
  image,
  description,
  price,
  category,
}: IAddToCart) => {
  const {
    getProductQuantity,
    handleIncreaseProductQuantity,
    handleDecreaseProductQuantity,
  } = useShoppingCart();

  const [productQty, setProductQty] = useState<number>(0);

  useEffect(() => {
    const fetchQuantity = async () => {
      const quantity = await getProductQuantity(id);
      setProductQty(quantity);
    };
    fetchQuantity();
  }, [id, getProductQuantity]);

  return (
    <div className="flex w-full items-center justify-center">
      {productQty > 0 ? (
        <div className="flex items-center justify-center gap-4 bg-red-100 shadow-lg px-6 rounded-lg">
          <button
            onClick={() => handleDecreaseProductQuantity(id)}
            className="p-2 rounded-lg text-red-500 text-xl font-semibold"
          >
            {productQty === 1 ? <FaTrashAlt className="text-red-600" /> : "-"}
          </button>
          <span className="text-xl font-semibold text-red-500 ">
            {productQty}
          </span>
          <button
            onClick={() =>
              handleIncreaseProductQuantity({
                id,
                name,
                image,
                description,
                price,
                category,
                quantity: productQty,
              })
            }
            className="p-2 rounded-lg text-red-500 text-xl font-semibold"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            handleIncreaseProductQuantity({
              id,
              name,
              image,
              description,
              price,
              category,
              quantity: 1,
            })
          }
          className="w-full py-2 bg-red-500 text-white font-medium rounded-lg"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default AddToCart;
