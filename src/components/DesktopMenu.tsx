"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./Cart";
import { User } from "firebase/auth";
import SignInSignOut from "./SignIn-SignOut";
import { IoIosArrowDown } from "react-icons/io";
import { useShopingCartContext } from "@/context/ShopingCart";


interface IDesktopMenuProps {
  user: User | null;
  logout: () => Promise<void>;
}

const DesktopMenu = ({ user, logout }: IDesktopMenuProps) => {
  const menuLinks = [
    { id: "1", title: "Home", url: "/" },
    { id: "2", title: "Category", url: "/category" },
    { id: "3", title: "Blog", url: "/blog" },
    { id: "4", title: "Contact", url: "/contact" },
  ];
  const pathName = usePathname();
   const { cartTotalQuantity } = useShopingCartContext();

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref for the modal container
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="hidden lg:flex w-full h-28 bg-white border-b-2 border-b-red-300 relative">
      {/* Left Section */}
      <div className="h-full w-3/12">
        <Link href={"/"}>
          <div className="relative w-full h-full">
            <Image
              src={"/Digikala.png"}
              alt="Digikala Logo"
              fill
              sizes="100%"
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center justify-center pt-4 w-6/12">
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

      {/* Right Section */}
      <div className="flex flex-1 justify-center items-center gap-6 w-3/12">
        {user ? (
          <>
            {/* Profile Button */}
            <button
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="text-gray-600 text-xl px-4 py-2 rounded-md flex gap-1 items-center"
              aria-label="User Profile"
              aria-expanded={isModalOpen}
            >
              <FaUserAlt />
              <IoIosArrowDown className="text-sm" />
            </button>

            {/* Profile Modal */}
            {isModalOpen && (
              <div ref={modalRef} className="absolute right-20 top-[80px] z-50">
                <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    User Profile
                  </h2>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <button
                    onClick={logout}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <SignInSignOut />
        )}
        <Cart cartTotalQty={cartTotalQuantity} />
      </div>
    </div>
  );
};

export default DesktopMenu;
