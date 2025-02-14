import { useShoppingCart } from "@/context/ShopingCart";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import AddToCart from "./AddToCart";

const Cart = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { cartItems, cartTotalQuantity } = useShoppingCart();

  return (
    <div
      className="relative flex px-2 py-1"
      onMouseEnter={() => setModalIsOpen(true)}
      onMouseLeave={() => setModalIsOpen(false)}
    >
      <Link href={"/cart"}>
        <IoCartOutline className="text-3xl text-gray-700 bg-white" />
        {cartTotalQuantity >= 1 && (
          <div className="absolute right-1 top-5 text-xs bg-red-500 text-white w-4 h-4 rounded-md flex items-center justify-center">
            {cartTotalQuantity}
          </div>
        )}
      </Link>
      {/* Modal */}
      {modalIsOpen && (
        <div className="absolute top-9 right-0 bg-white rounded-lg shadow-lg z-50 ">
          {cartItems.length > 0 && (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <div className="flex">
                    <Link
                      href={`/category/${item.category}/${item.name}`}
                      className="flex"
                    >
                      <div className="relative w-40 h-32">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="100%"
                          priority
                          className="object-contain p-2"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col w-52 p-2 items-center justify-center gap-4">
                      <h1 className="font-semibold text-center ">
                        {item.name}
                      </h1>
                      <p className="text-center text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-2 py-2">
                    <div>
                      <AddToCart
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        description={item.description}
                        price={item.price}
                        category={item.category}
                      />
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      Price : ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
