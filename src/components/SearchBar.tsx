"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="  bg-white border-b-2 border-red-300 lg:hidden flex items-center px-4 py-2">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image src="/Digikala.png" alt="Logo" width={100} height={50} />
        </Link>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSubmit} className="flex-grow relative">
        <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for"
          className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
