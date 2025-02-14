"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./Cart";
import SignInSignOut from "./SignIn-SignOut";
import { IoIosArrowDown } from "react-icons/io";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

const DesktopMenu = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("خطا در دریافت سشن:", error.message);
        return;
      }
      console.log("🔹 مقدار سشن دریافت شد:", data.session);
      setUser(data.session?.user ?? null);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  const menuLinks = [
    { id: "1", title: "Home", url: "/" },
    { id: "2", title: "Category", url: "/category" },
    { id: "3", title: "Blog", url: "/blog" },
    { id: "4", title: "Contact", url: "/contact" },
  ];
  const pathName = usePathname();

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref for the modal container
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("User from getUser():", data?.user);
      setUser(data?.user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth State Changed:", session?.user);
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
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

  console.log(user);

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
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setUser(null);
                    }}
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
        <Cart />
      </div>
    </div>
  );
};

export default DesktopMenu;
