import Image from "next/image";
import Link from "next/link";
import React from "react";

const catItems = [
  {
    id: "1",
    title: "Phone",
    url: "/images/MobileCategory.jpeg",
  },
  { id: "2", title: "Laptop", url: "/images/laptopsCat.webp" },
  {
    id: "3",
    title: "Accessories",
    url: "/images/AccessoriesCategory.jpg",
  },
  {
    id: "4",
    title: "Smartwatches",
    url: "/images/smartwatches3.webp",
  },
];

const Categories = () => {
  return (
    <div className="flex items-start justify-center min-h-screen py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-screen-lg">
        {catItems.map((item) => (
          <Link key={item.id} href={`/category/${item.title.toLowerCase()}`}>
            <div className="group relative flex flex-col items-center overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
              {/* تصویر */}
              <div className="relative w-52 h-52 overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* افکت محو با هاور */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
