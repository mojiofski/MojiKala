"use client";

import Link from "next/link";
import React from "react";
import { FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { usePathname } from "next/navigation";
const linksMenu = [
  { id: 1, title: "Home", url: "/", icon: <FaHome /> },
  { id: 2, title: "Category", url: "/category", icon: <BiSolidCategoryAlt /> },
  { id: 3, title: "Cart", url: "/cart", icon: <FaShoppingCart /> },
  { id: 4, title: "User", url: "/user", icon: <FaUserAlt /> },
];
const MobileMenu = () => {
  const pathName = usePathname();
  return (
    <div className="fixed bottom-0 right-0 left-0 bg-white shadow-lg z-50 lg:hidden">
      <div className="flex justify-around items-center p-2">
        {linksMenu.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className={`px-2 md:px-24 py-2 w-36 rounded-md hover:bg-red-100 transition duration-50 ${
              pathName === item.url ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <div className="flex flex-col items-center text-gray-400">
              <div
                className={`text-2xl ${
                  pathName === item.url ? "text-red-500" : "text-gray-400"
                }`}
              >
                {item.icon}
              </div>
              <div
                className={`text-sm ${
                  pathName === item.url
                    ? "text-red-500 font-bold"
                    : "text-gray-400"
                }`}
              >
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
