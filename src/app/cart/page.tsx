"use client";

import AddToCart from "@/components/AddToCart";
import { useShoppingCart } from "@/context/ShopingCart";
import Image from "next/image";
import React from "react";

const Cart = () => {
  const { cartItems, totalPrice } = useShoppingCart();
  const totolprice = totalPrice();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold border-b-2 p-4 text-center">
        Your Cart
      </h1>
      <div className="flex flex-col justify-between items-center bg-white rounded-lg shadow-lg gap-4 w-full ">
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 w-full">
            <div className="flex justify-center items-center">
              {/* Image */}
              <div className="relative w-1/3 h-32">
                <Image
                  src={item.image}
                  alt={item.description}
                  fill
                  priority
                  sizes="100%"
                  className="object-contain p-4"
                />
              </div>
              {/* info */}
              <div className="flex flex-col text-center gap-2 w-2/3">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-md">{item.description}</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4">
              <div>
                <AddToCart {...item} />
              </div>
              <span className="text-gray-600 font-semibold">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full bg-white shadow-lg rounded-lg  p-4">
        <div className="flex justify-between p-4 w-full">
          <p className="text-gray-900 font-semibold">Total price</p>
          <span className="font-semibold text-gray-900">
            ${totolprice.toFixed(2)}
          </span>
        </div>
        <div className="flex w-full justify-center mb-5">
          <button className="bg-red-500 px-4 py-2 text-white text-center rounded-md  ">
            Complete your order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
