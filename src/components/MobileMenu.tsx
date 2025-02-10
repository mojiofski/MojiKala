"use client";

import Link from "next/link";
import React from "react";
import { FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useShopingCartContext } from "@/context/ShopingCart";

const MobileMenu = () => {
  const { user } = useAuth();
  const { cartTotalQuantity } = useShopingCartContext();
  const pathName = usePathname();
  const linksMenu = [
    { id: 1, title: "Home", url: "/", icon: <FaHome /> },
    {
      id: 2,
      title: "Category",
      url: "/category",
      icon: <BiSolidCategoryAlt />,
    },
    { id: 3, title: "Cart", url: "/cart", icon: <FaShoppingCart /> },
    {
      id: 4,
      title: "User",
      url: user ? "/profile" : "/login",
      icon: <FaUserAlt />,
    },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 w-full lg:hidden">
      <div className="flex justify-around items-center p-2">
        {linksMenu.map((item) => {
          const isActive = pathName === item.url;
          return (
            <Link
              key={item.id}
              href={item.url}
              className={`flex-1 text-center py-2 transition duration-200 ${
                isActive
                  ? " font-bold bg-gray-800 text-white rounded-lg"
                  : "text-gray-400"
              }`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`relative text-2xl transition-colors duration-200 ${
                    isActive ? "text-white font-bold " : "text-gray-400"
                  }`}
                >
                  {item.icon}

                  <div>
                    {item.title === "Cart" && (
                      <div className="absolute bottom-4 -right-2 w-5 h-5 bg-red-500 text-white rounded-md text-sm font-semibold">
                        {cartTotalQuantity}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-sm">{item.title}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
