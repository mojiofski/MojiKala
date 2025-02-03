"use client";

import React from "react";

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import User from "./User";
import Cart from "./Cart";

const DesktopMenu = () => {
  const menuLinks = [
    { id: "1", title: "Home", url: "/" },
    { id: "2", title: "Category", url: "/category" },
    { id: "3", title: "Blog", url: "/blog" },
    { id: "4", title: "Contact", url: "/contact" },
  ];
  const pathName = usePathname();

  return (
    <div className="hidden lg:flex flex-col  w-full h-28 bg-white border-b-2 border-b-red-300">
      {/* Top Section */}
      <div className="flex items-center h-1/2 pt-4  ">
        {/* Logo */}
        <div className="w-3/12 flex justify-center">
          <Link href={"/"} className="relative">
            <Image
              src={"/Digikala.png"}
              alt=""
              width={150}
              height={60}
              className=""
              priority
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex w-6/12">
          <form action="" className="relative w-full flex">
            <div className="absolute inset-y-0 left-4 flex items-center">
              <FaSearch className="text-gray-500 text-lg" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 pl-12 pr-4 py-3 rounded-full text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </form>
        </div>

        {/* User & Cart */}
        <div className="w-3/12 flex justify-center items-center gap-6">
          <User />
          <Cart />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center text-lg text-gray-700 w-full max-w-3xl mx-auto  h-1/2 items-center">
        {menuLinks.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className={`px-4 py-1 rounded-md transition ${
              pathName === item.url
                ? "text-red-500 font-semibold"
                : "hover:text-red-100"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopMenu;
