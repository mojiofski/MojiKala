"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const offerItems = [
  {
    id: 1,
    title: "HP Spectre x360",
    image: "/images/laptops/HP Spectre x360.jpg",
    cat: "laptop",
    price: 1500,
  },
  {
    id: 2,
    title: "Black Shark 6 Pro",
    image: "/images/mobiles/Black Shark 6 Pro.webp",
    cat: "phone",
    price: 1500,
  },
  {
    id: 3,
    title: "Lenovo ThinkPad X1 Carbon",
    image: "/images/laptops/Lenovo ThinkPad X1 Carbon.jpg",
    cat: "laptop",
    price: 1500,
  },
  {
    id: 4,
    title: "ASUS VivoBook Pro 16X",
    image: "/images/laptops/ASUS VivoBook Pro 16X.jpg",
    cat: "laptop",
    price: 1500,
  },
  {
    id: 5,
    title: "iPhone 15 Pro",
    image: "/images/mobiles/iPhone 15 Pro.jpg",
    cat: "phone",
    price: 1500,
  },
  {
    id: 6,
    title: "LG Gram 17",
    image: "/images/laptops/LG Gram 17.jpg",
    cat: "phone",
    price: 1500,
  },
  {
    id: 7,
    title: "OnePlus 11",
    image: "/images/mobiles/OnePlus 11.jpg",
    cat: "phone",
    price: 1500,
  },
  {
    id: 8,
    title: "HP Spectre x360",
    image: "/images/laptops/HP Spectre x360.jpg",
    cat: "laptop",
    price: 1500,
  },
  {
    id: 9,
    title: "MacBook Pro 16-inch",
    image: "/images/laptops/MacBook Pro 16-inch.jpg",
    cat: "laptop",
    price: 1500,
  },
  {
    id: 10,
    title: "oppo find x6 pro",
    image: "/images/mobiles/oppo find x6 pro.jpg",
    cat: "phone",
    price: 1500,
  },
  {
    id: 11,
    title: "MSI Katana 15",
    image: "/images/laptops/MSI Katana 15.jpg",
    cat: "laptop",
    price: 1500,
  },
  {
    id: 12,
    title: "Amazfit GTR 3 Pro",
    image: "/images/smartwatches/Amazfit GTR 3 Pro.jpg",
    cat: "smartwatches",
    price: 1500,
  },
  {
    id: 13,
    title: "Apple Watch Series 8",
    image: "/images/smartwatches/Apple Watch Series 8.jpg",
    cat: "smartwatches",
    price: 1500,
  },
  {
    id: 14,
    title: "Apple AirPods Pro",
    image: "/images/accessories/Apple AirPods Pro.jpg",
    cat: "accessories",
    price: 1500,
  },
  {
    id: 15,
    title: "Razer DeathAdder V2 Gaming Mouse",
    image: "/images/accessories/Razer DeathAdder V2 Gaming Mouse.jpg",
    cat: "accessories",
    price: 1500,
  },
];
const NewProducts = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const updateVisibility = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateVisibility();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", updateVisibility);
    }
    return () => slider?.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex flex-col mt-10">
      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-4xl text-gray-600 font-semibold mb-2">
          New Products
        </h2>
      </div>
      <div className="relative w-full bg-red-500 h-[300px] flex items-center lg:rounded-lg ">
        {/* Prev Button */}
        {showLeftButton && (
          <button
            className="hidden lg:flex absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white  p-2 rounded-full z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Product List */}
        <div
          ref={sliderRef}
          className="flex w-full overflow-x-auto scrollerbar-hide gap-2 p-4 flex-nowrap"
        >
          {offerItems.map((item) => (
            <div key={item.id}>
              <div className="w-[162px] h-[255px] bg-white rounded-lg">
                <Link href="/">
                  <div className="relative w-full h-3/4 ">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="100%"
                      className="object-contain p-4"
                    />
                  </div>
                </Link>
                <div className="flex flex-col items-center justify-between h-1/4">
                  <div className="flex items-center justify-center mt-2">
                    <p className="text-gray-600 text-sm">{item.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        {showRightButton && (
          <button
            className="hidden lg:flex absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
