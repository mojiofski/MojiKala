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
    <div className="flex sticky top-0 right-0 left-0 lg:hidden bg-white border-b-2 border-b-red-300">
      <div className="w-1/4 flex justify-center pl-4">
        <Link href={"/"}>
          <Image src={"/Digikala.png"} alt="" width={120} height={100} />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative md:w-full flex  p-4 text-gray-500 w-3/4 "
      >
        <div className="absolute top-8 left-7 text-xl">
          <FaSearch className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search for"
          className="flex-1 border-none bg-gray-100 px-10 py-2 rounded-full text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
        />
      </form>
    </div>
  );
};

export default SearchBar;
