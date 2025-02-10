import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
interface ICartProps {
  cartTotalQty: number;
}
const Cart = ({ cartTotalQty }: ICartProps) => {
  return (
    <div className="relative flex px-2 py-1">
      <Link href={"/cart"}>
        <IoCartOutline className="text-3xl text-gray-700 bg-white" />
        {cartTotalQty >= 1 && (
          <div className="absolute right-1 top-5 text-xs bg-red-500 text-white w-4 h-4 rounded-md flex items-center justify-center">
            {cartTotalQty}
          </div>
        )}
      </Link>
    </div>
  );
};

export default Cart;
