"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import Cart from "./Cart";
import { useRouter, usePathname } from "next/navigation";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchInput.trim()) {
        router.push(`/search?query=${searchInput.trim()}`);
      }
      setSearchInput("");
    },
    [searchInput, router]
  );

  const isSingleProductPage =
    pathname.startsWith("/category/laptop/") ||
    pathname.startsWith("/category/phone/") ||
    pathname.startsWith("/category/smartwatches/") ||
    pathname.startsWith("/category/accessories/");

  return (
    <div className="bg-white border-b-2 border-red-300 gap-4 lg:hidden flex items-center px-6 py-1">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image src="/Digikala.png" alt="Logo" width={100} height={50} />
        </Link>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSubmit} className="flex-grow relative">
        <FaSearch
          className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500"
          aria-label="Search Icon"
        />
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Search Input"
        />
      </form>

      {isSingleProductPage && <Cart />}
    </div>
  );
};

export default SearchBar;
