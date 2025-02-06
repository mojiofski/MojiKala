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
    <div className="hidden lg:flex w-full h-28 bg-white border-b-2 border-b-red-300">
      {/* Left Section */}
      <div className="h-full w-3/12">
        {/* Logo */}
        <Link href={"/"}>
          <div className="relative w-full h-full">
            <Image
              src={"/Digikala.png"}
              alt="DigikalaLogo"
              fill
              sizes="100%"
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Center */}
      <div className="flex flex-col items-center justify-center pt-4 w-6/12 ">
        {/* Search Bar */}
        <div className="flex justify-center w-full">
          <form action="" className="relative w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="absolute inset-y-0 left-4 flex items-center">
              <FaSearch className="text-gray-500 text-lg" aria-label="Search" />
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 pl-12 pr-4 py-3 rounded-full text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </form>
        </div>
        {/* Menu Section */}
        <div className="flex justify-center text-lg text-gray-700 w-full max-w-3xl mx-auto h-1/2 items-center">
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
      {/* Right section */}
      <div className="flex flex-1 justify-center items-center gap-6  w-3/12">
        <User />
        <Cart />
      </div>
    </div>
  );
};

export default DesktopMenu;
