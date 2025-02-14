"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "@/context/ShopingCart";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

const MobileMenu = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("error in get seasion", error.message);
        return;
      }
      console.log("🔹 Amount of session received:", data.session);
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

  const { cartTotalQuantity } = useShoppingCart();
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
      url: user ? "/profile" : "/signin",
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
                    {item.title === "Cart" && cartTotalQuantity > 0 && (
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
