import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";

const Cart = () => {
  return (
    <div className="flex px-2 py-1">
      <Link href={"/cart"}>
        <IoCartOutline className="text-3xl text-gray-700" />
      </Link>
    </div>
  );
};

export default Cart;
